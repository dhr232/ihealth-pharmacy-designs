import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendWelcomeNewsletterEmail, syncResendSubscriber } from "@/lib/resend";

interface SubscribeRequestBody {
  email?: string;
  firstName?: string;
  source?: string;
  caslConsent?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    let body: SubscribeRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { email, firstName, source = "website", caslConsent } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Canada Anti-Spam Legislation (CASL) explicit consent requirement
    if (caslConsent !== true) {
      return NextResponse.json(
        {
          success: false,
          error:
            "CASL compliance requires express consent to receive electronic marketing messages.",
        },
        { status: 400 }
      );
    }

    // Generate cryptographic unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString("hex");

    // Insert or update Subscriber in Prisma with graceful fallback
    let finalUnsubscribeToken = unsubscribeToken;
    try {
      const existing = await prisma.subscriber.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        finalUnsubscribeToken = existing.unsubscribeToken || unsubscribeToken;
        await prisma.subscriber.update({
          where: { email: normalizedEmail },
          data: {
            firstName: firstName?.trim() || existing.firstName,
            source: source || existing.source,
            caslConsent: true,
            consentTimestamp: new Date(),
            unsubscribedAt: null,
            unsubscribeToken: finalUnsubscribeToken,
          },
        });
      } else {
        await prisma.subscriber.create({
          data: {
            email: normalizedEmail,
            firstName: firstName?.trim() || null,
            source: source || "website",
            caslConsent: true,
            consentTimestamp: new Date(),
            unsubscribeToken: finalUnsubscribeToken,
          },
        });
      }
    } catch (dbError) {
      console.warn(
        "[Newsletter Subscribe API] Prisma operation warning (graceful fallback):",
        dbError
      );
    }

    // Construct full CASL-compliant unsubscribe URL
    const host =
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      "";
    const protocol =
      request.headers.get("x-forwarded-proto") ||
      (host.includes("localhost") ? "http" : "https");

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (host ? `${protocol}://${host}` : "https://ihealthpharmacy.ca");

    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${encodeURIComponent(
      finalUnsubscribeToken
    )}`;

    // Sync to Resend audience if configured
    await syncResendSubscriber({
      email: normalizedEmail,
      firstName: firstName?.trim(),
    });

    // Send welcome newsletter email
    await sendWelcomeNewsletterEmail({
      email: normalizedEmail,
      firstName: firstName?.trim(),
      unsubscribeUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Newsletter Subscribe API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing subscription." },
      { status: 500 }
    );
  }
}
