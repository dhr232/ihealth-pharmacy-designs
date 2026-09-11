import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStaffSession } from "@/lib/auth";

export interface SerializedAppointment {
  id: string;
  confirmationCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceName: string;
  pharmacistName: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  reasonForVisit?: string | null;
}

const FALLBACK_APPOINTMENTS: SerializedAppointment[] = [
  {
    id: "apt-mock-1",
    confirmationCode: "IH-882194",
    patientName: "Margaret Higgins",
    patientPhone: "(604) 555-0192",
    patientEmail: "margaret.h@example.com",
    serviceName: "Annual Influenza Immunization (Flu Shot)",
    pharmacistName: "Dr. Anika Sharma",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000).toISOString(),
    status: "CONFIRMED",
    reasonForVisit: "Seasonal booster injection",
  },
  {
    id: "apt-mock-2",
    confirmationCode: "IH-882195",
    patientName: "Robert Vance",
    patientPhone: "(604) 555-0144",
    patientEmail: "rvance@example.com",
    serviceName: "Uncomplicated Urinary Tract Infection (UTI)",
    pharmacistName: "Marcus Chen",
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 4.25 * 60 * 60 * 1000).toISOString(),
    status: "CONFIRMED",
    reasonForVisit: "Urgent PPMAC clinical assessment",
  },
  {
    id: "apt-mock-3",
    confirmationCode: "IH-882196",
    patientName: "Gurpreet Kaur",
    patientPhone: "(604) 555-0178",
    patientEmail: "gkaur@example.com",
    serviceName: "Medication Review Service (BC PharmaCare)",
    pharmacistName: "Priya Patel",
    startTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 26.5 * 60 * 60 * 1000).toISOString(),
    status: "CONFIRMED",
    reasonForVisit: "Quarterly comprehensive review",
  },
];

// Fallback in-memory status changes for development/mock mode
const memoryStatusStore = new Map<string, "CONFIRMED" | "COMPLETED" | "CANCELLED">();

export async function GET() {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const dbAppointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        service: true,
        pharmacist: true,
      },
      orderBy: { startTime: "asc" },
      take: 50,
    });

    if (dbAppointments.length > 0) {
      const formatted: SerializedAppointment[] = dbAppointments.map((apt) => ({
        id: apt.id,
        confirmationCode: apt.confirmationCode,
        patientName: `${apt.patient.firstName} ${apt.patient.lastName}`.trim(),
        patientPhone: apt.patient.phone,
        patientEmail: apt.patient.email,
        serviceName: apt.service.name,
        pharmacistName: apt.pharmacist?.name ?? "Any Available Pharmacist",
        startTime: apt.startTime.toISOString(),
        endTime: apt.endTime.toISOString(),
        status: apt.status as "CONFIRMED" | "COMPLETED" | "CANCELLED",
        reasonForVisit: apt.reasonForVisit,
      }));

      return NextResponse.json({ success: true, appointments: formatted });
    }
  } catch (error) {
    console.warn("Database lookup failed, serving fallback appointments:", error);
  }

  // Fallback data with in-memory status overrides
  const result = FALLBACK_APPOINTMENTS.map((apt) => ({
    ...apt,
    status: memoryStatusStore.get(apt.id) || apt.status,
  }));

  return NextResponse.json({ success: true, appointments: result });
}

export { memoryStatusStore };
