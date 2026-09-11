import { NextResponse } from "next/server";
import { getCurrentStaffSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getCurrentStaffSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        userId: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("auth/me error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
