import { NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import {
  ADMIN_EMAIL,
  encryptSessionToken,
  ensureAdminUser,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  verifyTwoFactorToken,
} from "@/lib/auth";

// Step 2 of sign-in: check the emailed code and start a 12-hour admin session.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request payload." }, { status: 400 });
    }

    const { email, code } = body as { email?: string; code?: string };
    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: "Invalid verification code." },
        { status: 400 }
      );
    }

    const verification = await verifyTwoFactorToken({ email: normalizedEmail, code: code.trim() });
    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    const user = await withPrismaFallback(
      () => ensureAdminUser(),
      () => ({ id: verification.userId || "admin-fallback", email: ADMIN_EMAIL, name: "iHealth Pharmacy", role: "ADMIN" as const })
    );

    const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const sessionToken = encryptSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp,
    });

    // Best-effort record; the encrypted cookie works on its own.
    try {
      await prisma.session.create({
        data: { sessionToken, userId: user.id, expiresAt: new Date(exp) },
      });
    } catch {
      /* ignore */
    }

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });

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
    console.error("verify-2fa route error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
