import { Resend } from "resend";
import * as React from "react";
import {
  BookingConfirmationEmail,
  BookingConfirmationEmailProps,
} from "../app/components/emails/BookingConfirmationEmail";
import {
  RefillConfirmationEmail,
  RefillConfirmationEmailProps,
} from "../app/components/emails/RefillConfirmationEmail";
import {
  StaffNotificationEmail,
  StaffNotificationEmailProps,
} from "../app/components/emails/StaffNotificationEmail";
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
  process.env.RESEND_FROM_EMAIL ||
  "iHealth Pharmacy <notifications@notifications.ihealthpharmacy.ca>";

export const DEFAULT_DISPENSARY_ALERT_EMAIL =
  process.env.DISPENSARY_ALERT_EMAIL || "dispensary@ihealthpharmacy.ca";

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

export interface RefillConfirmationData extends RefillConfirmationEmailProps {
  email: string;
  from?: string;
}

export interface StaffBookingNotificationData {
  to?: string;
  from?: string;
  confirmationId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientPhn?: string;
  patientDob?: string;
  patientGender?: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  duration?: string;
  partySize?: number;
  reasonForVisit?: string;
  submittedAt?: string;
  adminPortalUrl?: string;
}

export interface StaffRefillNotificationData {
  to?: string;
  from?: string;
  confirmationId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientPhn?: string;
  patientDob?: string;
  patientGender?: string;
  refillType?: "rx_numbers" | "photo" | "transfer" | string;
  rxNumbers?: string[] | string;
  pickupOrDelivery?: "pickup" | "delivery" | string;
  deliveryAddress?: string;
  refillNotes?: string;
  submittedAt?: string;
  adminPortalUrl?: string;
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
 * Send a branded refill confirmation email to the patient.
 */
export async function sendRefillConfirmationEmail(
  refillData: RefillConfirmationData
): Promise<SendEmailResult> {
  const {
    email,
    from = DEFAULT_FROM_EMAIL,
    confirmationId = "RF-2026-1042",
  } = refillData;

  const subject = `Refill Request Received [${confirmationId}] - iHealth Pharmacy`;

  if (!resend) {
    console.log(
      `[Resend Mock] sendRefillConfirmationEmail -> To: ${email} | Subject: ${subject} | Refill ID: ${confirmationId}`
    );
    return {
      success: true,
      id: `mock_refill_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject,
      react: React.createElement(RefillConfirmationEmail, refillData),
    });

    if (error) {
      console.error("[Resend Error] sendRefillConfirmationEmail failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send refill confirmation email.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error sending refill email.";
    console.error("[Resend Exception] sendRefillConfirmationEmail exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send an internal alert to dispensary staff for a new appointment booking.
 */
export async function sendStaffBookingNotification(
  staffData: StaffBookingNotificationData
): Promise<SendEmailResult> {
  const {
    to = DEFAULT_DISPENSARY_ALERT_EMAIL,
    from = DEFAULT_FROM_EMAIL,
    confirmationId,
    patientName,
    patientPhone,
    patientEmail,
    patientPhn,
    patientDob,
    patientGender,
    serviceName,
    appointmentDate,
    appointmentTime,
    duration,
    partySize,
    reasonForVisit,
    submittedAt,
    adminPortalUrl,
  } = staffData;

  const subject = `[DISPENSARY ALERT] New Appointment: ${patientName} - ${serviceName} [${confirmationId}]`;

  if (!resend) {
    console.log(
      `[Resend Mock] sendStaffBookingNotification -> To: ${to} | Patient: ${patientName} | Service: ${serviceName} [${confirmationId}]`
    );
    return {
      success: true,
      id: `mock_staff_booking_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const emailProps: StaffNotificationEmailProps = {
      notificationType: "appointment",
      referenceId: confirmationId,
      patientName,
      patientPhone,
      patientEmail,
      patientPhn,
      patientDob,
      patientGender,
      serviceName,
      appointmentDate,
      appointmentTime,
      duration,
      partySize,
      reasonForVisit,
      submittedAt,
      adminPortalUrl,
    };

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: React.createElement(StaffNotificationEmail, emailProps),
    });

    if (error) {
      console.error("[Resend Error] sendStaffBookingNotification failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send dispensary booking alert.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error sending staff booking alert.";
    console.error("[Resend Exception] sendStaffBookingNotification exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send an internal alert to dispensary staff for a new prescription refill.
 */
export async function sendStaffRefillNotification(
  refillData: StaffRefillNotificationData
): Promise<SendEmailResult> {
  const {
    to = DEFAULT_DISPENSARY_ALERT_EMAIL,
    from = DEFAULT_FROM_EMAIL,
    confirmationId,
    patientName,
    patientPhone,
    patientEmail,
    patientPhn,
    patientDob,
    patientGender,
    refillType,
    rxNumbers,
    pickupOrDelivery,
    deliveryAddress,
    refillNotes,
    submittedAt,
    adminPortalUrl,
  } = refillData;

  const subject = `[DISPENSARY ALERT] New Refill Request: ${patientName} [${confirmationId}]`;

  if (!resend) {
    console.log(
      `[Resend Mock] sendStaffRefillNotification -> To: ${to} | Patient: ${patientName} | Refill: ${confirmationId}`
    );
    return {
      success: true,
      id: `mock_staff_refill_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const emailProps: StaffNotificationEmailProps = {
      notificationType: "refill",
      referenceId: confirmationId,
      patientName,
      patientPhone,
      patientEmail,
      patientPhn,
      patientDob,
      patientGender,
      refillType,
      rxNumbers,
      pickupOrDelivery,
      deliveryAddress,
      refillNotes,
      submittedAt,
      adminPortalUrl,
    };

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react: React.createElement(StaffNotificationEmail, emailProps),
    });

    if (error) {
      console.error("[Resend Error] sendStaffRefillNotification failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send dispensary refill alert.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error sending staff refill alert.";
    console.error("[Resend Exception] sendStaffRefillNotification exception:", message);
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
 * Gracefully handles sending/audience access issues and missing configurations.
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
      // Log as warning and gracefully handle access/permission restrictions without crashing
      console.warn("[Resend Warning] syncResendSubscriber skipped or unauthorized:", error.message || error);
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
    console.warn("[Resend Warning] syncResendSubscriber exception handled gracefully:", message);
    return {
      success: false,
      error: message,
    };
  }
}
