import { NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import {
  comparePassword,
  generateOtpCode,
  saveTwoFactorToken,
  SEEDED_ADMIN,
  SEEDED_PHARMACIST,
} from "@/lib/auth";
import { sendTwoFactorCodeEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check database for user with fallback
    const userRecord = await withPrismaFallback(
      () => prisma.user.findUnique({ where: { email: normalizedEmail } }),
      () => null
    );

    let isValid = false;
    let userName = "";
    let userId = "";

    if (userRecord) {
      if (!userRecord.isActive) {
        return NextResponse.json(
          { success: false, error: "This staff account has been deactivated. Please contact the administrator." },
          { status: 403 }
        );
      }
      isValid = await comparePassword(password, userRecord.hashedPassword);
      userName = userRecord.name;
      userId = userRecord.id;
    } else {
      // Fallback check against seeded admin and pharmacist
      if (normalizedEmail === SEEDED_ADMIN.email.toLowerCase()) {
        isValid = password === SEEDED_ADMIN.defaultPassword;
        userName = SEEDED_ADMIN.name;
        userId = SEEDED_ADMIN.id;
      } else if (normalizedEmail === SEEDED_PHARMACIST.email.toLowerCase()) {
        isValid = password === SEEDED_PHARMACIST.defaultPassword;
        userName = SEEDED_PHARMACIST.name;
        userId = SEEDED_PHARMACIST.id;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid staff email or password." },
        { status: 401 }
      );
    }

    // 2. Generate secure 6-digit OTP code
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // 3. Save hashed token in TwoFactorToken or memory fallback
    await saveTwoFactorToken({
      userId,
      email: normalizedEmail,
      code,
      expiresAt,
    });

    // 4. Send email via Resend
    await sendTwoFactorCodeEmail({
      email: normalizedEmail,
      code,
      expiresMinutes: 10,
      userName: userName || "Staff Member",
    });

    // 5. Return success step
    return NextResponse.json({
      success: true,
      step: "2FA_REQUIRED",
      email: normalizedEmail,
      ...(process.env.NODE_ENV !== "production" ? { debugCode: code } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
