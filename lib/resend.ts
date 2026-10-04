import { Resend } from "resend";
import { PHARMACY_INFO } from "../data/pharmacy-info";
import * as React from "react";
import { render } from "@react-email/render";
import {
  BookingConfirmationEmail,
  BookingConfirmationEmailProps,
} from "../app/components/emails/BookingConfirmationEmail";
import {
  PrescriptionConfirmationEmail,
  PrescriptionConfirmationEmailProps,
} from "../app/components/emails/PrescriptionConfirmationEmail";
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

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

// Safely initialize Resend client with fallback for dev / missing credentials
export const resend: Resend | null = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function renderEmailHtml(component: React.ReactElement): Promise<string> {
  return await render(component);
}

export const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "iHealth Pharmacy <notifications@notifications.ihealthpharmacy.ca>";

// Every staff / pharmacist alert goes to the pharmacy's one public inbox. Deliberately not
// overridable by an environment variable so no alert can be sent to another address.
export const DEFAULT_DISPENSARY_ALERT_EMAIL = PHARMACY_INFO.email;

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
  requestTitle?: string;
  previousPharmacy?: string;
  readyBy?: string;
  notifyBy?: string;
  submittedAt?: string;
  adminPortalUrl?: string;
  attachments?: { filename: string; content: Buffer }[];
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
  const client = getResendClient();

  if (!client) {
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
    const html = await renderEmailHtml(
      React.createElement(BookingConfirmationEmail, appointmentData)
    );

    const { data, error } = await client.emails.send({
      from,
      to: email,
      subject,
      html,
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
  const client = getResendClient();

  if (!client) {
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
    const html = await renderEmailHtml(
      React.createElement(RefillConfirmationEmail, refillData)
    );

    const { data, error } = await client.emails.send({
      from,
      to: email,
      subject,
      html,
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
  const client = getResendClient();

  if (!client) {
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

    const html = await renderEmailHtml(
      React.createElement(StaffNotificationEmail, emailProps)
    );

    const { data, error } = await client.emails.send({
      from,
      to,
      subject,
      html,
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
    requestTitle,
    previousPharmacy,
    readyBy,
    notifyBy,
    submittedAt,
    adminPortalUrl,
    attachments,
  } = refillData;

  const subject = `[DISPENSARY ALERT] ${requestTitle || "New Refill Request"}: ${patientName} [${confirmationId}]`;
  const client = getResendClient();

  if (!client) {
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
      requestTitle,
      previousPharmacy,
      readyBy,
      notifyBy,
      submittedAt,
      adminPortalUrl,
    };

    const html = await renderEmailHtml(
      React.createElement(StaffNotificationEmail, emailProps)
    );

    const { data, error } = await client.emails.send({
      from,
      to,
      subject,
      html,
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
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
  const client = getResendClient();

  if (!client) {
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
    const html = await renderEmailHtml(
      React.createElement(TwoFactorCodeEmail, {
        email,
        code,
        expiresMinutes,
        userName,
      })
    );

    const { data, error } = await client.emails.send({
      from,
      to: email,
      subject,
      html,
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
  const client = getResendClient();

  if (!client) {
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
    const html = await renderEmailHtml(
      React.createElement(WelcomeNewsletterEmail, {
        email,
        firstName,
        unsubscribeUrl,
      })
    );

    const { data, error } = await client.emails.send({
      from,
      to: email,
      subject,
      html,
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

  const client = getResendClient();

  if (!client) {
    console.log(
      `[Resend Mock] syncResendSubscriber -> Audience: ${audienceId} | Email: ${email} | Name: ${firstName || "None"}`
    );
    return {
      success: true,
      id: `mock_contact_${Date.now()}`,
    };
  }

  try {
    const { data, error } = await client.contacts.create({
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

export interface PrescriptionConfirmationData extends PrescriptionConfirmationEmailProps {
  email: string;
  from?: string;
}

/**
 * Send branded prescription confirmation email to the customer.
 */
export async function sendPrescriptionConfirmationEmail(
  prescriptionData: PrescriptionConfirmationData
): Promise<SendEmailResult> {
  const {
    email,
    from = DEFAULT_FROM_EMAIL,
    referenceNumber = "RX-2026-1001",
    type = "REFILL",
  } = prescriptionData;

  const typeSubjectPrefix =
    type === "NEW_PRESCRIPTION"
      ? "New Prescription Received"
      : type === "TRANSFER"
      ? "Prescription Transfer Request Received"
      : "Prescription Refill Request Received";

  const subject = `${typeSubjectPrefix} [${referenceNumber}] - iHealth Pharmacy`;
  const client = getResendClient();

  if (!client) {
    console.log(
      `[Resend Mock] sendPrescriptionConfirmationEmail -> To: ${email} | Subject: ${subject} | Ref: ${referenceNumber}`
    );
    return {
      success: true,
      id: `mock_rx_${Date.now()}`,
      mock: true,
    };
  }

  try {
    const html = await renderEmailHtml(
      React.createElement(PrescriptionConfirmationEmail, prescriptionData)
    );

    const { data, error } = await client.emails.send({
      from,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("[Resend Error] sendPrescriptionConfirmationEmail failed:", error);
      return {
        success: false,
        error: error.message || "Failed to send prescription confirmation email.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error sending prescription confirmation email.";
    console.error("[Resend Exception] sendPrescriptionConfirmationEmail exception:", message);
    return {
      success: false,
      error: message,
    };
  }
}


function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface StaffFormAlert {
  /** Short description of the form, e.g. "Contact form message" */
  title: string;
  /** Label/value rows shown in the alert */
  fields: [string, string | undefined | null][];
  /** Patient email so staff can hit Reply */
  replyTo?: string;
}

/**
 * Alert the pharmacy inbox (info@) that someone submitted a website form.
 * Used by forms that have no richer branded alert (contact, newsletter sign-up).
 */
export async function sendStaffFormAlert(alert: StaffFormAlert): Promise<SendEmailResult> {
  const to = DEFAULT_DISPENSARY_ALERT_EMAIL;
  const subject = `[WEBSITE ALERT] ${alert.title}`;
  const client = getResendClient();

  if (!client) {
    console.log(`[Resend Mock] sendStaffFormAlert -> To: ${to} | ${alert.title}`);
    return { success: true, mock: true };
  }

  const rows = alert.fields
    .filter(([, value]) => value && String(value).trim())
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5a6270;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1e2a44;white-space:pre-wrap">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1e2a44"><h2 style="margin:0 0 12px;font-size:18px">${escapeHtml(alert.title)}</h2><table style="border-collapse:collapse">${rows}</table><p style="margin-top:16px;color:#5a6270;font-size:13px">Received ${escapeHtml(new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" }))} (Pacific) from the iHealth Pharmacy website.</p></div>`;

  try {
    const { data, error } = await client.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to,
      subject,
      html,
      ...(alert.replyTo ? { replyTo: alert.replyTo } : {}),
    });
    if (error) {
      console.error("[Resend Error] sendStaffFormAlert failed:", error);
      return { success: false, error: error.message || "Failed to send staff alert." };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error sending staff alert.";
    console.error("[Resend Exception] sendStaffFormAlert exception:", message);
    return { success: false, error: message };
  }
}
