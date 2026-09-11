import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStaffSession } from "@/lib/auth";
import { memoryStatusStore } from "../route";
export function generateStaticParams() {
  return [];
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentStaffSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  const { id } = await props.params;
  const body = await request.json().catch(() => null);

  if (!body || !body.status) {
    return NextResponse.json(
      { success: false, error: "Status is required." },
      { status: 400 }
    );
  }

  const { status } = body as { status: "CONFIRMED" | "COMPLETED" | "CANCELLED" };

  if (!["CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
    return NextResponse.json(
      { success: false, error: "Invalid status value." },
      { status: 400 }
    );
  }

  // Update in database if exists
  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.warn("Database appointment update failed, storing in memory:", error);
    memoryStatusStore.set(id, status);
    return NextResponse.json({
      success: true,
      message: `Appointment ${id} status updated to ${status}`,
      status,
    });
  }
}
