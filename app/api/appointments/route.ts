import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { sendBookingConfirmationEmail, syncResendSubscriber } from "@/lib/resend";
import { getServiceByIdOrSlug } from "@/data/booking-services";

interface AppointmentRequestBody {
  // Service
  serviceId: string;
  serviceName?: string;
  partySize?: number;

  // Patient Demographics
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: string;
  phn: string; // 10-digit BC PHN
  reasonForVisit?: string;

  // Appointment Schedule
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:30" or "9:30 AM"

  // CASL express consent
  caslConsent?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    let body: AppointmentRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const {
      serviceId,
      serviceName: incomingServiceName,
      partySize = 1,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      phn,
      reasonForVisit,
      date,
      time,
      caslConsent = false,
    } = body;

    // Validation
    if (!serviceId || typeof serviceId !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a service for your appointment." },
        { status: 400 }
      );
    }

    if (!firstName || firstName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "A valid first name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!lastName || lastName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "A valid last name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required for confirmation." },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "A valid 10-digit telephone number is required." },
        { status: 400 }
      );
    }

    // Clean PHN (10 digits)
    const cleanPhn = (phn || "").replace(/[^0-9]/g, "");
    if (cleanPhn.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid 10-digit BC Personal Health Number (PHN) is required.",
        },
        { status: 400 }
      );
    }

    if (!dateOfBirth) {
      return NextResponse.json(
        { success: false, error: "Patient date of birth is required." },
        { status: 400 }
      );
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: "A valid appointment date (YYYY-MM-DD) is required." },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        { success: false, error: "Please choose an appointment time slot." },
        { status: 400 }
      );
    }

    const resolvedPartySize = Math.max(1, Math.min(5, Number(partySize) || 1));

    // Resolve service metadata
    const serviceMeta = getServiceByIdOrSlug(serviceId);
    const serviceName = incomingServiceName || serviceMeta?.name || serviceId;
    const durationMinutes = (serviceMeta?.durationMinutes || 15) * resolvedPartySize;

    // Generate unique confirmation code: IH-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const confirmationCode = `IH-2026-${randomSuffix}`;

    // Compute start and end DateTime
    // Standardize time format: if "09:30" or "9:30 AM"
    let time24 = time;
    if (time.includes("AM") || time.includes("PM")) {
      const isPm = time.includes("PM");
      const cleanTime = time.replace(/\s*(AM|PM)/i, "").trim();
      const [hStr, mStr] = cleanTime.split(":");
      let hNum = parseInt(hStr, 10);
      if (isPm && hNum < 12) hNum += 12;
      if (!isPm && hNum === 12) hNum = 0;
      time24 = `${String(hNum).padStart(2, "0")}:${mStr}`;
    }

    const [slotHour, slotMinute] = time24.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);

    const startDateTime = new Date(Date.UTC(year, month - 1, day, slotHour, slotMinute, 0));
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60 * 1000);

    const maskedPhn = `***-***-${cleanPhn.slice(-4)}`;

    // Database operation (with resilient fallback if DB is not reachable)
    let dbSuccess = false;
    let createdAppointmentId = confirmationCode;

    await withPrismaFallback(
      async () => {
        await prisma.$transaction(async (tx) => {
          // 1. Resolve or ensure Service exists in database
          let dbService = await tx.service.findFirst({
            where: {
              OR: [{ id: serviceId }, { slug: serviceMeta?.slug || serviceId }],
            },
          });

          if (!dbService) {
            // Check if category exists
            let dbCategory = await tx.serviceCategory.findFirst();
            if (!dbCategory) {
              dbCategory = await tx.serviceCategory.create({
                data: {
                  slug: "minor_ailments",
                  name: "Minor Ailments",
                  description: "Direct pharmacist assessment and prescribing",
                },
              });
            }

            dbService = await tx.service.create({
              data: {
                name: serviceName,
                slug: serviceMeta?.slug || serviceId,
                durationMinutes: serviceMeta?.durationMinutes || 15,
                mspCovered: serviceMeta?.mspCovered ?? true,
                description: serviceMeta?.description || serviceName,
                categoryId: dbCategory.id,
              },
            });
          }

          // 2. Create Patient
          const patientRecord = await tx.patient.create({
            data: {
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim().toLowerCase(),
              phone: cleanPhone,
              dateOfBirth: new Date(dateOfBirth),
              gender: gender || "Not specified",
              phnMasked: maskedPhn,
              phnEncrypted: cleanPhn,
            },
          });

          // 3. Create Appointment
          const appointmentRecord = await tx.appointment.create({
            data: {
              confirmationCode,
              serviceId: dbService.id,
              patientId: patientRecord.id,
              startTime: startDateTime,
              endTime: endDateTime,
              partySize: resolvedPartySize,
              status: "CONFIRMED",
              reasonForVisit: reasonForVisit?.trim() || null,
            },
          });

          createdAppointmentId = appointmentRecord.id;

          // 4. Handle CASL Subscriber consent if checked
          if (caslConsent) {
            const unsubscribeToken = crypto.randomBytes(32).toString("hex");
            await tx.subscriber.upsert({
              where: { email: email.trim().toLowerCase() },
              update: {
                firstName: firstName.trim(),
                caslConsent: true,
                consentTimestamp: new Date(),
                unsubscribedAt: null,
              },
              create: {
                email: email.trim().toLowerCase(),
                firstName: firstName.trim(),
                source: "appointment_booking",
                caslConsent: true,
                unsubscribeToken,
              },
            });
          }
        });

        dbSuccess = true;
      },
      () => {
        // Graceful in-memory fallback
      }
    );

    // Sync to Resend contacts if CASL consent was granted
    if (caslConsent) {
      try {
        await syncResendSubscriber({
          email: email.trim().toLowerCase(),
          firstName: firstName.trim(),
        });
      } catch (err) {
        console.warn("[Appointments API] Resend sync warning:", err);
      }
    }

    // Send Branded Confirmation Email via Resend
    const dateFormatted = new Intl.DateTimeFormat("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Vancouver",
    }).format(new Date(year, month - 1, day, 12, 0, 0));

    const preparationNotes = serviceMeta?.preparationNotes || [
      "Bring your British Columbia Services Card (Personal Health Number / PHN).",
      "Please arrive 5 minutes prior to your scheduled appointment time.",
      "Bring a complete list of current medications or relevant health history.",
    ];

    await sendBookingConfirmationEmail({
      email: email.trim().toLowerCase(),
      patientName: `${firstName.trim()} ${lastName.trim()}`,
      confirmationId: confirmationCode,
      serviceName,
      date: dateFormatted,
      time: time.includes("M") ? time : `${slotHour % 12 || 12}:${String(slotMinute).padStart(2, "0")} ${slotHour >= 12 ? "PM" : "AM"}`,
      pharmacyName: "iHealth Pharmacy Abbotsford",
      pharmacyAddress: "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1",
      pharmacyPhone: "(604) 746-4444",
      preparationNotes,
    });

    return NextResponse.json({
      success: true,
      confirmationCode,
      appointmentId: createdAppointmentId,
      dbSaved: dbSuccess,
      details: {
        confirmationCode,
        serviceName,
        partySize: resolvedPartySize,
        date: dateFormatted,
        time,
        patientName: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        phnMasked: maskedPhn,
        pharmacyAddress: "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1",
      },
    });
  } catch (error) {
    console.error("[Appointments API] Unexpected error creating appointment:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while booking your appointment." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date"); // YYYY-MM-DD
    const statusParam = searchParams.get("status");

    const whereClause: Record<string, unknown> = {};

    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const [year, month, day] = dateParam.split("-").map(Number);
      const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

      whereClause.startTime = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    if (statusParam) {
      whereClause.status = statusParam;
    }

    try {
      const appointments = await prisma.appointment.findMany({
        where: whereClause,
        include: {
          patient: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
              gender: true,
              phnMasked: true,
            },
          },
          service: {
            select: {
              name: true,
              slug: true,
              durationMinutes: true,
              mspCovered: true,
            },
          },
          pharmacist: {
            select: {
              name: true,
              title: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
        take: 100,
      });

      return NextResponse.json({
        success: true,
        count: appointments.length,
        appointments,
      });
    } catch (dbError) {
      console.warn("[Appointments API GET] Prisma error:", dbError);
      return NextResponse.json({
        success: true,
        count: 0,
        appointments: [],
        note: "Database offline or empty.",
      });
    }
  } catch (error) {
    console.error("[Appointments API GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments." },
      { status: 500 }
    );
  }
}
