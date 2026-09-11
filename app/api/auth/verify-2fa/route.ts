import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  encryptSessionToken,
  SEEDED_ADMIN,
  SEEDED_PHARMACIST,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  StaffRole,
  verifyTwoFactorToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, code } = body as { email?: string; code?: string };

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    // Verify OTP code
    const verification = await verifyTwoFactorToken({
      email: normalizedEmail,
      code: cleanCode,
    });

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // Lookup user details
    let userDetails: {
      id: string;
      email: string;
      name: string;
      role: StaffRole;
    } | null = null;

    try {
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (user) {
        userDetails = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as StaffRole,
        };
      }
    } catch (dbError) {
      console.warn("Database lookup error during session creation:", dbError);
    }

    if (!userDetails) {
      // Fallback seeded accounts
      if (normalizedEmail === SEEDED_ADMIN.email.toLowerCase()) {
        userDetails = {
          id: SEEDED_ADMIN.id,
          email: SEEDED_ADMIN.email,
          name: SEEDED_ADMIN.name,
          role: SEEDED_ADMIN.role,
        };
      } else if (normalizedEmail === SEEDED_PHARMACIST.email.toLowerCase()) {
        userDetails = {
          id: SEEDED_PHARMACIST.id,
          email: SEEDED_PHARMACIST.email,
          name: SEEDED_PHARMACIST.name,
          role: SEEDED_PHARMACIST.role,
        };
      } else {
        userDetails = {
          id: verification.userId || `staff-${Date.now()}`,
          email: normalizedEmail,
          name: "Staff Member",
          role: "PHARMACIST",
        };
      }
    }

    // Generate encrypted session token
    const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const sessionToken = encryptSessionToken({
      userId: userDetails.id,
      email: userDetails.email,
      name: userDetails.name,
      role: userDetails.role,
      exp,
    });

    // Optionally store session record in database
    try {
      await prisma.session.create({
        data: {
          sessionToken,
          userId: userDetails.id,
          expiresAt: new Date(exp),
        },
      });
    } catch {
      // Best-effort: stateless encrypted token can also be decoded directly
    }

    const response = NextResponse.json({
      success: true,
      user: {
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("verify-2fa route error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
