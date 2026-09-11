"use client";

import { useState } from "react";
import { BookingService } from "@/data/booking-services";
import { PatientFormData } from "./PatientForm";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Home,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface BookingReviewProps {
  service: BookingService;
  partySize?: number;
  patient: PatientFormData;
  selectedDate: string;
  selectedTime: string;
  onBack: () => void;
  onReset: () => void;
}

interface BookingSuccessResult {
  confirmationCode: string;
  serviceName: string;
  date: string;
  time: string;
  patientName: string;
  email: string;
  phone: string;
  phnMasked: string;
}

export default function BookingReview({
  service,
  partySize,
  patient,
  selectedDate,
  selectedTime,
  onBack,
  onReset,
}: BookingReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<BookingSuccessResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const pharmacyAddress = "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1";
  const pharmacyPhone = "(604) 746-4444";

  // Human date formatting
  const formattedDate = (() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  async function handleConfirmBooking() {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          partySize,
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          phn: patient.phn,
          reasonForVisit: patient.reasonForVisit,
          date: selectedDate,
          time: selectedTime,
          caslConsent: patient.caslConsent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessResult({
          confirmationCode: data.confirmationCode,
          serviceName: service.name,
          date: formattedDate,
          time: selectedTime,
          patientName: `${patient.firstName} ${patient.lastName}`,
          email: patient.email,
          phone: patient.phone,
          phnMasked: `***-***-${patient.phn.slice(-4)}`,
        });
      } else {
        setSubmitError(data.error || "Failed to confirm appointment. Please try again.");
      }
    } catch {
      setSubmitError("Network error submitting appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Generate Google Calendar Add Link
  function getGoogleCalendarUrl(code: string): string {
    if (!selectedDate || !selectedTime) return "#";

    const [y, m, d] = selectedDate.split("-").map(Number);

    // Parse time
    let hour = 9;
    let minute = 0;
    if (selectedTime.includes("AM") || selectedTime.includes("PM")) {
      const isPm = selectedTime.includes("PM");
      const clean = selectedTime.replace(/\s*(AM|PM)/i, "").trim();
      const [h, min] = clean.split(":").map(Number);
      hour = isPm && h < 12 ? h + 12 : !isPm && h === 12 ? 0 : h;
      minute = min;
    }

    const start = new Date(y, m - 1, d, hour, minute);
    const end = new Date(start.getTime() + service.durationMinutes * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (dt: Date) =>
      `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(
        dt.getHours()
      )}${pad(dt.getMinutes())}00`;

    const title = encodeURIComponent(
      `iHealth Pharmacy: ${service.name} [${code}]`
    );
    const details = encodeURIComponent(
      `Appointment at iHealth Pharmacy Abbotsford\nService: ${service.name}\nConfirmation: ${code}\nLocation: ${pharmacyAddress}\nPhone: ${pharmacyPhone}`
    );
    const location = encodeURIComponent(
      `iHealth Pharmacy, ${pharmacyAddress}`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(
      start
    )}/${fmt(end)}&details=${details}&location=${location}`;
  }

  // WhatsApp link
  function getWhatsAppUrl(code: string): string {
    const text = encodeURIComponent(
      `Hello iHealth Pharmacy, I have an appointment booked for ${service.name} on ${formattedDate} at ${selectedTime}. My confirmation code is ${code}.`
    );
    return `https://wa.me/16047464444?text=${text}`;
  }

  // SUCCESS SCREEN
  if (successResult) {
    return (
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5 animate-in fade-in duration-300">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-rose-100 text-[var(--brand)] ring-8 ring-rose-50">
            <CheckCircle2 size={40} className="stroke-[2.5]" />
          </div>

          <div className="mt-4">
            <span className="inline-block rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-900 border border-rose-200/80">
              Booking Confirmed
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Your Appointment Is Scheduled!
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            A confirmation email has been sent to <strong>{successResult.email}</strong>.
          </p>

          {/* Confirmation Code Card */}
          <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-red-900">
              Official Confirmation Reference
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <p className="font-mono text-3xl sm:text-4xl font-black tracking-widest text-red-950">
                {successResult.confirmationCode}
              </p>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(successResult.confirmationCode);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2500);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-300/80 bg-white px-3 py-1.5 text-xs font-bold text-red-900 hover:bg-rose-100/60 transition-colors shadow-2xs cursor-pointer"
                title="Copy confirmation code"
              >
                {copiedCode ? (
                  <>
                    <Check size={14} className="text-[var(--brand)]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-red-900/80">
              Please present this reference ID or your BC Services Card when checking in at our dispensary.
            </p>
          </div>

          {/* Summary Details */}
          <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 text-left text-xs space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-semibold text-slate-500">Service:</span>
              <span className="font-bold text-slate-900">{successResult.serviceName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-semibold text-slate-500">Date & Time:</span>
              <span className="font-bold text-slate-900">
                {successResult.date} at {successResult.time}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-semibold text-slate-500">Patient:</span>
              <span className="font-bold text-slate-900">{successResult.patientName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-semibold text-slate-500">BC CareCard / PHN:</span>
              <span className="font-mono font-semibold text-slate-800">
                {successResult.phnMasked}
              </span>
            </div>
            <div className="flex items-start justify-between pt-1">
              <span className="font-semibold text-slate-500">Dispensary Location:</span>
              <span className="font-medium text-slate-800 text-right">
                iHealth Pharmacy Abbotsford
                <br />
                {pharmacyAddress}
                <br />
                Phone: {pharmacyPhone}
              </span>
            </div>
          </div>

          {/* Important Patient Instructions */}
          <div className="mt-6 rounded-2xl border border-teal-200/80 bg-teal-50/60 p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-teal-700" />
              <span>Important Reminders for Your Visit:</span>
            </p>
            <ul className="mt-2.5 list-disc pl-5 text-xs text-teal-900 space-y-1.5">
              <li>Bring your official British Columbia Services Card (PHN).</li>
              <li>Please arrive 5 minutes prior to your scheduled consultation.</li>
              <li>Wear loose clothing if receiving an injection or seasonal vaccine.</li>
              <li>Free patient parking is available directly in front of the clinic.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={getGoogleCalendarUrl(successResult.confirmationCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              <Calendar size={16} />
              <span>Add to Google Calendar</span>
              <ExternalLink size={13} className="text-slate-400" />
            </a>

            <a
              href={getWhatsAppUrl(successResult.confirmationCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition-all active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Dispensary</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              <RotateCcw size={14} />
              <span>Book Another Appointment</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[var(--brand)] transition-colors"
            >
              <Home size={14} />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // REVIEW & SUBMISSION VIEW
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-red-900 border border-rose-200/80 mb-2">
            <ShieldCheck size={12} className="text-[var(--brand)]" />
            <span>Review & Verify</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            4. Review & Confirm Booking
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Please verify all details before scheduling your appointment.
          </p>
        </div>

        {submitError && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Card 1: Service & Schedule Details */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Service & Schedule
            </h3>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">{service.name}</span>
                <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-900 border border-teal-300">
                  {service.coverageBadge}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{service.description}</p>
            </div>

            <div className="border-t border-slate-200/80 pt-3.5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Calendar size={16} className="text-[var(--brand)]" />
                <span className="font-semibold">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Clock size={16} className="text-[var(--brand)]" />
                <span className="font-semibold">
                  {selectedTime} ({service.durationMinutes} mins)
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="shrink-0 text-[var(--brand)] mt-0.5" />
                <div>
                  <strong className="text-slate-900">iHealth Pharmacy Abbotsford</strong>
                  <br />
                  {pharmacyAddress}
                  <br />
                  <span className="text-slate-500">Phone: {pharmacyPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Patient Demographics */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Patient Identification
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">
                  {patient.firstName} {patient.lastName}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">Email:</span>
                <span className="font-semibold text-slate-900">{patient.email}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-900">{patient.phone}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-900">{patient.dateOfBirth}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">Gender:</span>
                <span className="font-semibold text-slate-900">{patient.gender}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5">
                <span className="font-medium text-slate-500">BC Personal Health Number (PHN):</span>
                <span className="font-mono font-bold text-slate-900">
                  ***-***-{patient.phn.slice(-4)}
                </span>
              </div>

              {patient.reasonForVisit && (
                <div className="pt-1">
                  <span className="font-medium text-slate-500">Symptoms / Notes:</span>
                  <p className="mt-1 text-xs text-slate-800 italic bg-white/70 p-2 rounded-lg border border-slate-200/60">
                    &quot;{patient.reasonForVisit}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cancellation Notice */}
        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4.5 text-xs text-slate-600">
          <p className="font-bold text-slate-800">
            Rescheduling & Cancellation Policy:
          </p>
          <p className="mt-1 leading-relaxed">
            If you need to change your appointment, please call the pharmacy at {pharmacyPhone} or message us on WhatsApp at least 2 hours in advance so another patient may use this clinical consultation slot.
          </p>
        </div>
      </div>

      {/* Navigation & Submit Action */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:px-6 sm:py-4 shadow-xl shadow-slate-900/10">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          <span>Back to Date & Time</span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleConfirmBooking}
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition-all duration-150 hover:bg-teal-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Confirming Booking...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Confirm & Book Appointment</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
