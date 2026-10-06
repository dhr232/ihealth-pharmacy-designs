import { NextResponse } from "next/server";
import { withPrismaFallback } from "@/lib/prisma";
import {
  ADMIN_EMAIL,
  ensureAdminUser,
  generateOtpCode,
  OTP_TTL_MINUTES,
  saveTwoFactorToken,
} from "@/lib/auth";
import { sendTwoFactorCodeEmail } from "@/lib/resend";

// Step 1 of sign-in: ask for a code. Only the pharmacy inbox (ADMIN_EMAIL) can sign in; the code is
// emailed there. Any other address gets the same reply and nothing is sent, so the endpoint does not
// reveal which address is valid. Step 2 is /api/auth/verify-2fa.

const RESEND_COOLDOWN_MS = 60_000;
const MAX_REQUESTS_PER_HOUR = 6;

// In-memory limiter (resets on restart). The hashed code, its 2-minute expiry and the 3-attempt
// limit in lib/auth.ts are the real protection; this just stops inbox flooding.
const recentRequests = new Map<string, number[]>();

function tooSoon(key: string): "cooldown" | "hourly" | null {
  const now = Date.now();
  const hits = (recentRequests.get(key) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  recentRequests.set(key, hits);
  if (hits.length >= MAX_REQUESTS_PER_HOUR) return "hourly";
  if (hits.length > 0 && now - hits[hits.length - 1] < RESEND_COOLDOWN_MS) return "cooldown";
  hits.push(now);
  return null;
}

const GENERIC_REPLY = {
  success: true,
  message: "If that address can sign in, a verification code has been sent to it.",
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email =
      body && typeof body === "object" && typeof (body as { email?: unknown }).email === "string"
        ? (body as { email: string }).email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(GENERIC_REPLY);
    }

    const limited = tooSoon(email);
    if (limited) {
      return NextResponse.json(
        {
          success: false,
          error:
            limited === "cooldown"
              ? "A code was just sent. Please wait a minute before asking for another."
              : "Too many code requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const user = await withPrismaFallback(
      () => ensureAdminUser(),
      () => ({ id: "admin-fallback", email: ADMIN_EMAIL, name: "iHealth Pharmacy", role: "ADMIN" as const })
    );

    const code = generateOtpCode();
    await saveTwoFactorToken({
      userId: user.id,
      email: ADMIN_EMAIL,
      code,
      expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
    });

    const sent = await sendTwoFactorCodeEmail({
      email: ADMIN_EMAIL,
      code,
      expiresMinutes: OTP_TTL_MINUTES,
    });

    if (!sent.success) {
      return NextResponse.json(
        { success: false, error: "We could not send the code. Please try again in a moment." },
        { status: 502 }
      );
    }

    if (sent.mock) {
      // No RESEND_API_KEY. Locally, hand the code back so sign-in can be tested; in production
      // no email went out, so say so instead of leaving staff waiting for a code.
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, error: "Email is not configured, so no code could be sent." },
          { status: 503 }
        );
      }
      return NextResponse.json({ ...GENERIC_REPLY, debugCode: code });
    }

    return NextResponse.json(GENERIC_REPLY);
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
