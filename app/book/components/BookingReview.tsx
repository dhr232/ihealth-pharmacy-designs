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
import { motion } from "motion/react";

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
        const phnDigits = patient.phn ? patient.phn.replace(/\D/g, "") : "";
        const formattedPhn =
          data.details?.phnMasked ||
          (phnDigits.length === 10
            ? `***-***-${phnDigits.slice(-4)}`
            : "Not provided (optional)");

        setSuccessResult({
          confirmationCode: data.confirmationCode,
          serviceName: service.name,
          date: formattedDate,
          time: selectedTime,
          patientName: `${patient.firstName} ${patient.lastName}`,
          email: patient.email,
          phone: patient.phone,
          phnMasked: formattedPhn,
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
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden"
      >
        {/* Ambient background decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-100/30 to-red-100/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          {/* Animated Glowing Icon & Rings */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            {/* Outer ambient pulsing ripple ring */}
            <motion.div
              animate={{
                scale: [1, 1.45, 1],
                opacity: [0.45, 0.1, 0.45],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-rose-200/60"
            />

            {/* Inner pulsing ring */}
            <motion.div
              animate={{
                scale: [1, 1.22, 1],
                opacity: [0.65, 0.3, 0.65],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute inset-1 rounded-full bg-rose-100"
            />

            {/* Main Spring Pop Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                delay: 0.1,
              }}
              className="relative flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-200 text-[var(--brand)] shadow-md shadow-red-900/15"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 20,
                  delay: 0.25,
                }}
              >
                <CheckCircle2 size={42} className="stroke-[2.5]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Booking Confirmed Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-red-900 border border-rose-200/80 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
              Booking Confirmed
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            Your Appointment Is Scheduled!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-2 text-sm text-slate-600"
          >
            A confirmation email has been sent to <strong>{successResult.email}</strong>.
          </motion.p>

          {/* Confirmation Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="mt-6 rounded-2xl border border-rose-200/80 bg-gradient-to-b from-rose-50/70 via-rose-50/40 to-white p-6 text-center shadow-xs"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-red-900">
              Official Confirmation Reference
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <p className="font-mono text-3xl sm:text-4xl font-black tracking-widest text-red-950">
                {successResult.confirmationCode}
              </p>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
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
              </motion.button>
            </div>
            <p className="mt-2 text-xs text-red-900/80">
              Please present this reference ID or your BC Services Card when checking in at our dispensary.
            </p>
          </motion.div>

          {/* Summary Details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
            className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 text-left text-xs space-y-3.5 shadow-2xs"
          >
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
              <span
                className={
                  successResult.phnMasked && successResult.phnMasked !== "Not provided (optional)"
                    ? "font-mono font-semibold text-slate-800"
                    : "font-medium text-slate-500 italic"
                }
              >
                {successResult.phnMasked || "Not provided (optional)"}
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
          </motion.div>

          {/* Important Patient Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.65 }}
            className="mt-6 rounded-2xl border border-teal-200/80 bg-teal-50/60 p-5 text-left"
          >
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
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.75 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={getGoogleCalendarUrl(successResult.confirmationCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Calendar size={16} />
              <span>Add to Google Calendar</span>
              <ExternalLink size={13} className="text-slate-400" />
            </motion.a>

            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={getWhatsAppUrl(successResult.confirmationCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Dispensary</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.85 }}
            className="mt-8 flex items-center justify-center gap-6 border-t border-slate-100 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[var(--brand)] transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Book Another Appointment</span>
            </motion.button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[var(--brand)] transition-colors cursor-pointer"
              >
                <Home size={14} />
                <span>Return to Homepage</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // REVIEW & SUBMISSION VIEW
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
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
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800"
          >
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>{submitError}</span>
          </motion.div>
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
                {patient.phn && patient.phn.trim().length >= 4 ? (
                  <span className="font-mono font-bold text-slate-900">
                    ***-***-{patient.phn.replace(/\D/g, "").slice(-4)}
                  </span>
                ) : (
                  <span className="font-medium text-slate-500 italic">
                    Not provided (optional)
                  </span>
                )}
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          <span>Back to Date & Time</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={isSubmitting}
          onClick={handleConfirmBooking}
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition-all duration-150 hover:bg-teal-700 hover:shadow-lg cursor-pointer disabled:opacity-50"
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
        </motion.button>
      </div>
    </motion.div>
  );
}
