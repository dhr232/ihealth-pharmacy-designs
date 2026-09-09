import { Resend } from "resend";
import * as React from "react";
import {
  BookingConfirmationEmail,
  BookingConfirmationEmailProps,
} from "../app/components/emails/BookingConfirmationEmail";
import {
  TwoFactorCodeEmail,
  TwoFactorCodeEmailProps,
} from "../app/components/emails/TwoFactorCodeEmail";
import {
  WelcomeNewsletterEmail,
  WelcomeNewsletterEmailProps,
} from "../app/components/emails/WelcomeNewsletterEmail";

// Safely initialize Resend client with fallback for dev / missing credentials
const apiKey = process.env.RESEND_API_KEY;

export const resend: Resend | null = apiKey ? new Resend(apiKey) : null;

export const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "iHealth Pharmacy <noreply@ihealthpharmacy.ca>";

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
  mock?: boolean;
}

export interface BookingAppointmentData extends BookingConfirmationEmailProps {
  email: string;
  from?: string;
}

export interface TwoFactorEmailData extends TwoFactorCodeEmailProps {
  from?: string;
}

export interface WelcomeNewsletterData extends WelcomeNewsletterEmailProps {
  from?: string;
}

export interface SyncSubscriberData {
  email: string;
  firstName?: string;
}

/**
 * Send a branded booking confirmation email to the patient.
 */
export async function sendBookingConfirmationEmail(
  appointmentData: BookingAppointmentData
): Promise<SendEmailResult> {
  const {
    email,
    from = DEFAULT_FROM_EMAIL,
    confirmationId = "IH-2026-8941",
    serviceName,
  } = appointmentData;

  const subject = `Booking Confirmed: ${serviceName} [${confirmationId}] - iHealth Pharmacy`;

  if (!resend) {
    console.log(
      `[Resend Mock] sendBookingConfirmationEmail -> To: ${email} | Subject: ${subject} | Confirmation ID: ${confirmationId}`
    );
    return {
      success: true,
      id: `mock_booking_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject,
      react: React.createElement(BookingConfirmationEmail, appointmentData),
    });

    if (error) {
      console.error("[Resend Error] sendBookingConfirmationEmail failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send booking confirmation email.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error sending booking email.";
    console.error("[Resend Exception] sendBookingConfirmationEmail exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send a 2FA OTP verification code email.
 */
export async function sendTwoFactorCodeEmail({
  email,
  code,
  expiresMinutes = 10,
  userName,
  from = DEFAULT_FROM_EMAIL,
}: TwoFactorEmailData): Promise<SendEmailResult> {
  const subject = `Your iHealth Pharmacy Verification Code: ${code}`;

  if (!resend) {
    console.log(
      `[Resend Mock] sendTwoFactorCodeEmail -> To: ${email} | Code: ${code} | Expires: ${expiresMinutes}m`
    );
    return {
      success: true,
      id: `mock_2fa_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject,
      react: React.createElement(TwoFactorCodeEmail, {
        email,
        code,
        expiresMinutes,
        userName,
      }),
    });

    if (error) {
      console.error("[Resend Error] sendTwoFactorCodeEmail failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send two-factor verification email.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error sending two-factor email.";
    console.error("[Resend Exception] sendTwoFactorCodeEmail exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send a CASL-compliant welcome newsletter email with a 1-click unsubscribe link.
 */
export async function sendWelcomeNewsletterEmail({
  email,
  firstName,
  unsubscribeUrl,
  from = DEFAULT_FROM_EMAIL,
}: WelcomeNewsletterData): Promise<SendEmailResult> {
  const subject = "Welcome to iHealth Pharmacy Wellness Updates";

  if (!resend) {
    console.log(
      `[Resend Mock] sendWelcomeNewsletterEmail -> To: ${email} | Name: ${firstName || "Patient"} | Unsubscribe: ${unsubscribeUrl}`
    );
    return {
      success: true,
      id: `mock_newsletter_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject,
      react: React.createElement(WelcomeNewsletterEmail, {
        email,
        firstName,
        unsubscribeUrl,
      }),
    });

    if (error) {
      console.error("[Resend Error] sendWelcomeNewsletterEmail failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send welcome newsletter email.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error sending welcome newsletter email.";
    console.error("[Resend Exception] sendWelcomeNewsletterEmail exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Sync a subscriber to the Resend Audience/Contacts list if RESEND_AUDIENCE_ID is configured.
 */
export async function syncResendSubscriber({
  email,
  firstName,
}: SyncSubscriberData): Promise<{ success: boolean; id?: string; error?: string }> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    // No audience configured, gracefully skip
    return { success: true };
  }

  if (!resend) {
    console.log(
      `[Resend Mock] syncResendSubscriber -> Audience: ${audienceId} | Email: ${email} | Name: ${firstName || "None"}`
    );
    return {
      success: true,
      id: `mock_contact_${Date.now()}`,
    };
  }

  try {
    const { data, error } = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      console.error("[Resend Error] syncResendSubscriber failed:", error);
      return {
        success: false,
        error: error.message || "Failed to sync subscriber to Resend audience.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error syncing subscriber to Resend.";
    console.error("[Resend Exception] syncResendSubscriber exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}
