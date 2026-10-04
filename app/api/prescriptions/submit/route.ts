import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import type { Prisma } from "@prisma/client";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { sendPrescriptionConfirmationEmail, sendStaffRefillNotification } from "@/lib/resend";
import { isValidEmail } from "@/lib/validation";
import { resolvePrescriptionPhoto } from "@/lib/uploads";

const MAX_PHOTOS = 10;

export interface PrescriptionSubmitPayload {
  type: "NEW_PRESCRIPTION" | "REFILL" | "TRANSFER";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth?: string;
  submissionMode: "PHOTOS" | "MANUAL";
  items?: Array<{
    medicationName?: string;
    rxNumber?: string;
    notes?: string;
    doctorName?: string;
  }>;
  photoUrls?: string[];
  previousPharmacyName?: string;
  previousPharmacyPhone?: string;
  transferAll?: boolean;
  fulfillmentMethod: "PICKUP" | "DELIVERY";
  deliveryStreet?: string;
  deliveryUnit?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  preferredReadyDate?: string;
  preferredReadyTime?: string;
  notificationMethod?: "CALL" | "SMS";
  patientNotes?: string;
  newsletterOptIn?: boolean;
}

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const randomSuffix = crypto.randomInt(1000, 9999);
  return `RX-${year}-${randomSuffix}`;
}

export async function POST(request: NextRequest) {
  try {
    let body: PrescriptionSubmitPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const {
      type = "REFILL",
      firstName,
      lastName,
      phone,
      email,
      dateOfBirth,
      submissionMode = "MANUAL",
      items = [],
      photoUrls: rawPhotoUrls = [],
      previousPharmacyName,
      previousPharmacyPhone,
      transferAll,
      fulfillmentMethod = "PICKUP",
      deliveryStreet,
      deliveryUnit,
      deliveryCity,
      deliveryPostalCode,
      preferredReadyDate,
      preferredReadyTime,
      notificationMethod: rawNotificationMethod,
      patientNotes,
      newsletterOptIn = false,
    } = body;

    // Patients are told by phone call or text message; anything other than "SMS" falls back to a call
    const notificationMethod: "CALL" | "SMS" = rawNotificationMethod === "SMS" ? "SMS" : "CALL";

    // Date of birth is required on every prescription request
    if (!dateOfBirth?.trim() || isNaN(new Date(dateOfBirth).getTime())) {
      return NextResponse.json(
        { success: false, error: "Date of birth is required." },
        { status: 400 }
      );
    }

    // Validate patient identity
    if (!firstName?.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }
    if (!lastName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Last name is required." },
        { status: 400 }
      );
    }
    if (!phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }
    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required for confirmation." },
        { status: 400 }
      );
    }

    // Only accept photos that went through our upload route (staff-only URLs we issued)
    const photoFiles = (Array.isArray(rawPhotoUrls) ? rawPhotoUrls : [])
      .slice(0, MAX_PHOTOS)
      .map((url) => (typeof url === "string" ? resolvePrescriptionPhoto(url) : null))
      .filter((f): f is NonNullable<typeof f> => f !== null);
    const photoUrls = photoFiles.map((f) => `/api/prescriptions/photo/${f.filename}`);

    // Validate mode specifics
    if (submissionMode === "PHOTOS" && (!photoUrls || photoUrls.length === 0)) {
      return NextResponse.json(
        { success: false, error: "Please upload at least one prescription photo." },
        { status: 400 }
      );
    }

    if (submissionMode === "MANUAL" && (!items || items.length === 0) && !transferAll) {
      return NextResponse.json(
        { success: false, error: "Please enter at least one medication or prescription number." },
        { status: 400 }
      );
    }

    if (type === "TRANSFER" && !previousPharmacyName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide the name of your current/previous pharmacy." },
        { status: 400 }
      );
    }

    // Generate unique reference number
    const referenceNumber = generateReferenceNumber();

    // Parse DOB if provided
    let parsedDob: Date | null = null;
    if (dateOfBirth && dateOfBirth.trim()) {
      const d = new Date(dateOfBirth);
      if (!isNaN(d.getTime())) {
        parsedDob = d;
      }
    }

    // Format delivery address string for email
    const deliveryAddressFormatted =
      fulfillmentMethod === "DELIVERY"
        ? [
            deliveryUnit ? `Unit/Apt ${deliveryUnit}` : "",
            deliveryStreet,
            deliveryCity || "Chilliwack",
            deliveryPostalCode,
          ]
            .filter(Boolean)
            .join(", ")
        : undefined;

    // Database persistence to Neon PostgreSQL
    let savedRequest;
    try {
      savedRequest = await withPrismaFallback(
        async () => {
          return await prisma.prescriptionRequest.create({
            data: {
              referenceNumber,
              type,
              status: "PENDING",
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              phone: phone.trim(),
              email: email.trim().toLowerCase(),
              dateOfBirth: parsedDob,
              submissionMode,
              itemCount: submissionMode === "PHOTOS" ? photoUrls.length : (items.length || 1),
              items: items && items.length > 0 ? (items as Prisma.InputJsonValue) : undefined,
              photoUrls: photoUrls || [],
              previousPharmacyName: previousPharmacyName?.trim() || null,
              previousPharmacyPhone: previousPharmacyPhone?.trim() || null,
              transferAll: transferAll ?? null,
              fulfillmentMethod,
              deliveryStreet: deliveryStreet?.trim() || null,
              deliveryUnit: deliveryUnit?.trim() || null,
              deliveryCity: deliveryCity?.trim() || null,
              deliveryPostalCode: deliveryPostalCode?.trim() || null,
              preferredReadyDate: preferredReadyDate?.trim() || null,
              preferredReadyTime: preferredReadyTime?.trim() || null,
              notificationMethod,
              patientNotes: patientNotes?.trim() || null,
              newsletterOptIn: Boolean(newsletterOptIn),
            },
          });
        },
        () => {
          console.warn("[Prescription API] Database fallback triggered for reference", referenceNumber);
          return {
            id: `temp_${Date.now()}`,
            referenceNumber,
            type,
            status: "PENDING",
            firstName,
            lastName,
            email,
            phone,
          };
        }
      );
    } catch (dbErr) {
      console.error("[Prescription API] Error saving to Neon DB:", dbErr);
      // Fallback object so customer order is not lost
      savedRequest = {
        id: `mock_${Date.now()}`,
        referenceNumber,
        type,
        status: "PENDING",
      };
    }

    // Send customer confirmation email via Resend
    let emailResult = { success: false };
    try {
      emailResult = await sendPrescriptionConfirmationEmail({
        email: email.trim().toLowerCase(),
        referenceNumber,
        type,
        patientName: `${firstName.trim()} ${lastName.trim()}`,
        phone: phone.trim(),
        dateOfBirth: dateOfBirth || undefined,
        submissionMode,
        itemCount: items?.length || 1,
        items,
        photoCount: photoUrls?.length || 0,
        previousPharmacyName: previousPharmacyName?.trim() || undefined,
        previousPharmacyPhone: previousPharmacyPhone?.trim() || undefined,
        transferAll,
        fulfillmentMethod,
        deliveryAddress: deliveryAddressFormatted,
        preferredReadyDate: preferredReadyDate || undefined,
        preferredReadyTime: preferredReadyTime || undefined,
        notificationMethod,
        patientNotes: patientNotes?.trim() || undefined,
        submittedAt: new Date().toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    } catch (emailErr) {
      console.error("[Prescription API] Resend email dispatch failed:", emailErr);
    }

    // Alert the dispensary so the request is actually picked up by staff
    const typeLabel =
      type === "NEW_PRESCRIPTION" ? "New Prescription" : type === "TRANSFER" ? "Prescription Transfer" : "Prescription Refill";
    const itemSummary = items
      .map((i) => [i.rxNumber && `Rx ${i.rxNumber}`, i.medicationName, i.doctorName && `(${i.doctorName})`, i.notes && `- ${i.notes}`]
        .filter(Boolean)
        .join(" "))
      .filter(Boolean);
    // Attach the photos so staff can see them straight from the alert email
    const attachments = (
      await Promise.all(
        photoFiles.map(async (f, i) => {
          try {
            return { filename: `${referenceNumber}-photo-${i + 1}${f.filename.slice(f.filename.lastIndexOf("."))}`, content: await fs.readFile(f.filePath) };
          } catch {
            return null;
          }
        })
      )
    ).filter((a): a is NonNullable<typeof a> => a !== null);

    try {
      await sendStaffRefillNotification({
        confirmationId: referenceNumber,
        requestTitle: `New ${typeLabel} Request`,
        patientName: `${firstName.trim()} ${lastName.trim()}`,
        patientPhone: phone.trim(),
        patientEmail: email.trim().toLowerCase(),
        patientDob: dateOfBirth || undefined,
        refillType: type === "TRANSFER" ? "transfer" : submissionMode === "PHOTOS" ? "photo" : "rx_numbers",
        rxNumbers:
          submissionMode === "PHOTOS"
            ? `${photoUrls.length} photo${photoUrls.length === 1 ? "" : "s"} attached to this email`
            : transferAll && type === "TRANSFER"
            ? "Transfer all active prescriptions"
            : itemSummary,
        previousPharmacy: [previousPharmacyName?.trim(), previousPharmacyPhone?.trim()].filter(Boolean).join(" - ") || undefined,
        pickupOrDelivery: fulfillmentMethod === "DELIVERY" ? "delivery" : "pickup",
        deliveryAddress: deliveryAddressFormatted,
        readyBy: [preferredReadyDate, preferredReadyTime].filter(Boolean).join(", ") || undefined,
        notifyBy: notificationMethod === "SMS" ? `Text message to ${phone.trim()}` : `Phone call to ${phone.trim()}`,
        refillNotes: patientNotes?.trim() || undefined,
        submittedAt: new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" }),
        adminPortalUrl: "",
        attachments,
      });
    } catch (staffErr) {
      console.error("[Prescription API] Staff alert email failed:", staffErr);
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      emailSent: emailResult.success,
      recordId: savedRequest.id,
      message: "Prescription submitted successfully.",
    });
  } catch (error) {
    console.error("[Prescription Submit Error]:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting prescription." },
      { status: 500 }
    );
  }
}
