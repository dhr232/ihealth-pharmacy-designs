import { NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import {
  comparePassword,
  encryptSessionToken,
  SEEDED_ADMIN,
  SEEDED_PHARMACIST,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  StaffRole,
} from "@/lib/auth";

// NOTE: 2FA (OTP email step) is temporarily disabled.
// To re-enable: restore OTP generation, saveTwoFactorToken, sendTwoFactorCodeEmail,
// return { step: "2FA_REQUIRED" } here, and restore the OTP step in the login page.

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
    let userDetails: {
      id: string;
      email: string;
      name: string;
      role: StaffRole;
    } | null = null;

    if (userRecord) {
      if (!userRecord.isActive) {
        return NextResponse.json(
          { success: false, error: "This staff account has been deactivated. Please contact the administrator." },
          { status: 403 }
        );
      }
      isValid = await comparePassword(password, userRecord.hashedPassword);
      if (isValid) {
        userDetails = {
          id: userRecord.id,
          email: userRecord.email,
          name: userRecord.name,
          role: userRecord.role as StaffRole,
        };
      }
    } else {
      // Fallback seeded accounts
      if (normalizedEmail === SEEDED_ADMIN.email.toLowerCase()) {
        isValid = password === SEEDED_ADMIN.defaultPassword;
        if (isValid) {
          userDetails = {
            id: SEEDED_ADMIN.id,
            email: SEEDED_ADMIN.email,
            name: SEEDED_ADMIN.name,
            role: SEEDED_ADMIN.role,
          };
        }
      } else if (normalizedEmail === SEEDED_PHARMACIST.email.toLowerCase()) {
        isValid = password === SEEDED_PHARMACIST.defaultPassword;
        if (isValid) {
          userDetails = {
            id: SEEDED_PHARMACIST.id,
            email: SEEDED_PHARMACIST.email,
            name: SEEDED_PHARMACIST.name,
            role: SEEDED_PHARMACIST.role,
          };
        }
      }
    }

    if (!isValid || !userDetails) {
      return NextResponse.json(
        { success: false, error: "Invalid staff email or password." },
        { status: 401 }
      );
    }

    // 2. Create session directly (2FA step skipped)
    const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const sessionToken = encryptSessionToken({
      userId: userDetails.id,
      email: userDetails.email,
      name: userDetails.name,
      role: userDetails.role,
      exp,
    });

    // 3. Optionally persist session record in database
    try {
      await prisma.session.create({
        data: {
          sessionToken,
          userId: userDetails.id,
          expiresAt: new Date(exp),
        },
      });
    } catch {
      // Best-effort: stateless encrypted token works without DB record
    }

    const response = NextResponse.json({
      success: true,
      user: {
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      },
    });

    // 4. Set HTTP-only secure cookie
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
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
