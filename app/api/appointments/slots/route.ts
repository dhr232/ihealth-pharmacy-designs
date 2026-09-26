import { NextRequest, NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { PHARMACY_INFO, formatHour } from "@/data/pharmacy-info";

export interface TimeSlotItem {
  time: string; // "09:00"
  label: string; // "9:00 AM"
  period: "morning" | "afternoon";
  available: boolean;
  reason?: string;
}

// Generate bookable slots from PHARMACY_INFO.onlineBooking (e.g. 09:00 - 14:30, 15-minute steps)
function generateClinicSlots(): Omit<TimeSlotItem, "available">[] {
  const { firstSlot, lastSlot, slotMinutes } = PHARMACY_INFO.onlineBooking;
  const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: Omit<TimeSlotItem, "available">[] = [];

  for (let t = toMinutes(firstSlot); t <= toMinutes(lastSlot); t += slotMinutes) {
    const hour = Math.floor(t / 60);
    const minute = t % 60;
    const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    slots.push({
      time: timeStr,
      label: formatHour(timeStr),
      period: hour < 13 ? "morning" : "afternoon",
    });
  }

  return slots;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date"); // YYYY-MM-DD
    const serviceId = searchParams.get("serviceId");

    if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      return NextResponse.json(
        { success: false, error: "A valid date in YYYY-MM-DD format is required." },
        { status: 400 }
      );
    }

    // Parse date parts to prevent timezone offsets
    const [year, month, day] = dateParam.split("-").map(Number);
    const targetDate = new Date(year, month - 1, day);
    const dayOfWeek = targetDate.getDay(); // 0 is Sunday, 6 is Saturday

    // Online booking is weekdays only (see PHARMACY_INFO.onlineBooking)
    if (!(PHARMACY_INFO.onlineBooking.weekdays as readonly number[]).includes(dayOfWeek)) {
      return NextResponse.json({
        success: true,
        date: dateParam,
        isClosed: true,
        closedReason: `Online booking is available ${PHARMACY_INFO.onlineBooking.summary}.`,
        slots: [],
      });
    }

    // Check if date is in the past
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (targetDate < today) {
      return NextResponse.json({
        success: true,
        date: dateParam,
        isPast: true,
        slots: [],
      });
    }

    const isToday = targetDate.getTime() === today.getTime();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Query booked appointments from Prisma
    const bookedTimes = new Set<string>();

    try {
      // Find appointments between start and end of target day
      const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

      const existingAppointments = await withPrismaFallback(
        () =>
          prisma.appointment.findMany({
            where: {
              startTime: {
                gte: startOfDay,
                lte: endOfDay,
              },
              status: {
                not: "CANCELLED",
              },
            },
            select: {
              startTime: true,
              endTime: true,
            },
          }),
        () => []
      );

      for (const appt of existingAppointments) {
        // Extract UTC time representation for slot matching
        const apptDate = new Date(appt.startTime);
        const hours = String(apptDate.getUTCHours()).padStart(2, "0");
        const minutes = String(apptDate.getUTCMinutes()).padStart(2, "0");
        bookedTimes.add(`${hours}:${minutes}`);

        // If an appointment spans beyond 15 minutes, exclude all spanned slots
        const startMs = apptDate.getTime();
        const endMs = new Date(appt.endTime).getTime();
        if (endMs > startMs + 15 * 60 * 1000) {
          let currentMs = startMs + 15 * 60 * 1000;
          while (currentMs < endMs) {
            const spanDate = new Date(currentMs);
            const spanHours = String(spanDate.getUTCHours()).padStart(2, "0");
            const spanMinutes = String(spanDate.getUTCMinutes()).padStart(2, "0");
            bookedTimes.add(`${spanHours}:${spanMinutes}`);
            currentMs += 15 * 60 * 1000;
          }
        }
      }
    } catch (dbError) {
      // If DB is unreachable during testing or build, proceed gracefully
      console.warn("[Slots API] Prisma query warning:", dbError);
    }

    const baseSlots = generateClinicSlots();

    const slots: TimeSlotItem[] = baseSlots.map((slot) => {
      const [h, m] = slot.time.split(":").map(Number);
      const slotMinutes = h * 60 + m;

      // If appointment is today and time has passed, mark unavailable
      if (isToday && slotMinutes <= currentMinutes + 15) {
        return {
          ...slot,
          available: false,
          reason: "Past time slot",
        };
      }

      // Check if slot was booked
      if (bookedTimes.has(slot.time)) {
        return {
          ...slot,
          available: false,
          reason: "Booked",
        };
      }

      return {
        ...slot,
        available: true,
      };
    });

    return NextResponse.json({
      success: true,
      date: dateParam,
      serviceId,
      totalSlots: slots.length,
      availableSlotsCount: slots.filter((s) => s.available).length,
      slots,
    });
  } catch (error) {
    console.error("[Slots API] Error generating time slots:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve available appointment slots." },
      { status: 500 }
    );
  }
}
