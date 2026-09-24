"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Building,
  Mail,
  Calendar,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { isValidEmail, isValidPhone, formatPhoneNumber } from "@/lib/validation";
import PhipaBadge from "../PhipaBadge";

export type PrescriptionWorkflowMode = "new" | "refill" | "transfer";

interface PrescriptionItem {
  id: string;
  rxNumber?: string;
  medicationName?: string;
  doctorName?: string;
  notes?: string;
}

interface PrescriptionFlowProps {
  mode: PrescriptionWorkflowMode;
}

export default function PrescriptionFlow({ mode }: PrescriptionFlowProps) {
  // Mode selection & Tab state
  const [submissionTab, setSubmissionTab] = useState<"photos" | "manual">(
    mode === "new" ? "photos" : "manual"
  );

  // Photos state
  const [photos, setPhotos] = useState<Array<{ name: string; dataUrl: string; size: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Line items for manual entry
  const [items, setItems] = useState<PrescriptionItem[]>([
    { id: "item-1", rxNumber: "", medicationName: "", doctorName: "", notes: "" },
  ]);

  // Transfer specific state
  const [previousPharmacyName, setPreviousPharmacyName] = useState("");
  const [previousPharmacyPhone, setPreviousPharmacyPhone] = useState("");
  const [transferAll, setTransferAll] = useState(true);

  // Fulfillment
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryUnit, setDeliveryUnit] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Chilliwack");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("");

  // Timing
  const [timingOption, setTimingOption] = useState<"asap" | "today" | "tomorrow" | "custom">("asap");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  // Patient Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSentStatus, setEmailSentStatus] = useState<boolean | null>(null);

  // Titles & headings based on mode
  const pageDetails = {
    new: {
      badge: "Doctor Prescription",
      title: "Submit a New Prescription",
      subtitle:
        "Upload a photo of your new paper prescription or enter your medication information. Our licensed pharmacists will review and prepare it for dispensary pickup or free Chilliwack delivery.",
      typeEnum: "NEW_PRESCRIPTION" as const,
    },
    refill: {
      badge: "Easy Refill Service",
      title: "Prescription Refills",
      subtitle:
        "Refill your active medications quickly without waiting in line. Enter your Rx numbers from your bottle or upload a photo of the label.",
      typeEnum: "REFILL" as const,
    },
    transfer: {
      badge: "Pharmacy Transfer",
      title: "Transfer Prescriptions to iHealth",
      subtitle:
        "Switching is fast and completely free. Provide your previous pharmacy's details and our pharmacists will handle the transfer directly with zero interruption to your care.",
      typeEnum: "TRANSFER" as const,
    },
  }[mode];

  // Photo handlers
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      // Limit to 5MB per photo
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("One of your photos exceeds 5MB. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [
            ...prev,
            {
              name: file.name,
              dataUrl: event.target!.result as string,
              size: file.size,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  // Item handlers
  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        rxNumber: "",
        medicationName: "",
        doctorName: "",
        notes: "",
      },
    ]);
  }

  function removeItem(id: string) {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: keyof PrescriptionItem, val: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  }

  // Phone input formatting
  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhoneNumber(e.target.value));
  }

  function handlePrevPharmacyPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPreviousPharmacyPhone(formatPhoneNumber(e.target.value));
  }

  // Submission handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    // Validate patient essentials
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      return;
    }
    if (!phone.trim() || !isValidPhone(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number so our pharmacist can reach you.");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address to receive your confirmation.");
      return;
    }

    // Mode-specific validation
    if (submissionTab === "photos" && photos.length === 0) {
      setErrorMessage("Please upload at least one prescription photo, or switch to manual entry.");
      return;
    }

    if (submissionTab === "manual") {
      if (mode === "refill") {
        const hasValidRx = items.some((item) => item.rxNumber?.trim() || item.medicationName?.trim());
        if (!hasValidRx) {
          setErrorMessage("Please enter at least one Rx number or medication name to refill.");
          return;
        }
      } else if (mode === "transfer") {
        if (!previousPharmacyName.trim()) {
          setErrorMessage("Please enter the name of your current/previous pharmacy.");
          return;
        }
        if (!dateOfBirth.trim()) {
          setErrorMessage("Date of birth is required for prescription transfers in BC PharmaNet.");
          return;
        }
      } else if (mode === "new") {
        const hasMed = items.some((item) => item.medicationName?.trim());
        if (!hasMed) {
          setErrorMessage("Please enter at least one medication name or upload a photo of the script.");
          return;
        }
      }
    }

    // Delivery validation
    if (fulfillmentMethod === "DELIVERY" && !deliveryStreet.trim()) {
      setErrorMessage("Please enter your delivery street address.");
      return;
    }

    // Compute preferred ready date/time display
    let readyDateStr = "As soon as possible";
    let readyTimeStr = "";
    if (timingOption === "today") {
      readyDateStr = "Today";
      readyTimeStr = "Afternoon (Before 5:00 PM)";
    } else if (timingOption === "tomorrow") {
      readyDateStr = "Tomorrow";
      readyTimeStr = "Morning";
    } else if (timingOption === "custom") {
      readyDateStr = customDate || "Selected Date";
      readyTimeStr = customTime || "Preferred Time";
    }

    setSubmitting(true);

    try {
      const payload = {
        type: pageDetails.typeEnum,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        dateOfBirth: dateOfBirth ? dateOfBirth.trim() : undefined,
        submissionMode: submissionTab === "photos" ? "PHOTOS" : "MANUAL",
        items:
          submissionTab === "manual"
            ? items.filter((i) => i.rxNumber?.trim() || i.medicationName?.trim())
            : [],
        photoUrls:
          submissionTab === "photos" ? photos.map((p) => p.dataUrl) : [],
        previousPharmacyName: mode === "transfer" ? previousPharmacyName.trim() : undefined,
        previousPharmacyPhone: mode === "transfer" ? previousPharmacyPhone.trim() : undefined,
        transferAll: mode === "transfer" ? transferAll : undefined,
        fulfillmentMethod,
        deliveryStreet: fulfillmentMethod === "DELIVERY" ? deliveryStreet.trim() : undefined,
        deliveryUnit: fulfillmentMethod === "DELIVERY" ? deliveryUnit.trim() : undefined,
        deliveryCity: fulfillmentMethod === "DELIVERY" ? deliveryCity.trim() : undefined,
        deliveryPostalCode: fulfillmentMethod === "DELIVERY" ? deliveryPostalCode.trim() : undefined,
        preferredReadyDate: readyDateStr,
        preferredReadyTime: readyTimeStr,
        patientNotes: patientNotes.trim() || undefined,
      };

      const response = await fetch("/api/prescriptions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit prescription request.");
      }

      setReferenceNumber(data.referenceNumber);
      setEmailSentStatus(data.emailSent);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred. Please call the dispensary directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Reset form to submit another request
  function handleReset() {
    setSubmitted(false);
    setPhotos([]);
    setItems([{ id: "item-1", rxNumber: "", medicationName: "", doctorName: "", notes: "" }]);
    setReferenceNumber("");
    setErrorMessage("");
  }

  // RENDER: Success Screen
  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle className="h-10 w-10" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            Request Received
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Prescription Request Submitted
          </h2>

          <p className="mt-3 text-base text-slate-600">
            Thank you, <strong className="text-slate-900">{firstName}</strong>. Our dispensary team has received your submission and is preparing your order.
          </p>

          {/* Reference Card */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Your Reference Tracking Code
            </div>
            <div className="mt-1 font-mono text-3xl font-extrabold tracking-tight text-blue-900">
              {referenceNumber}
            </div>
            <p className="mt-2 text-xs text-blue-700">
              Please save this reference code for dispensary check-in or phone inquiries.
            </p>
          </div>

          {/* Email Notification Status */}
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Confirmation Email Sent:</strong> A complete summary of your request, tracking number, and dispensary pickup/delivery details has been sent to <strong className="text-slate-900">{email}</strong>.
            </div>
          </div>

          {/* Summary Details */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-left text-sm text-slate-700">
            <h3 className="font-bold text-slate-900">Submission Summary</h3>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-500">Service Type</dt>
                <dd className="font-semibold text-slate-900">{pageDetails.title}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Fulfillment Method</dt>
                <dd className="font-semibold text-slate-900">
                  {fulfillmentMethod === "DELIVERY"
                    ? `Free Delivery to ${deliveryStreet || "Chilliwack"}`
                    : "Dispensary Pick Up"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Patient Phone</dt>
                <dd className="font-semibold text-slate-900">{phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Submission Mode</dt>
                <dd className="font-semibold text-slate-900">
                  {submissionTab === "photos"
                    ? `${photos.length} Photo${photos.length > 1 ? "s" : ""} Uploaded`
                    : "Direct Form Entry"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Dispensary Contact & Hours */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-left text-white">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="font-bold text-white">iHealth Pharmacy Chilliwack</div>
                <div className="text-xs text-slate-400">#101 - 45619 Yale Rd, Chilliwack, BC V2P 2N1</div>
                <div className="mt-2 text-xs text-slate-300">
                  <strong>Dispensary Hours:</strong> Mon–Fri 9:00 AM – 5:00 PM | Sat &amp; Sun Closed
                </div>
              </div>
              <a
                href={`tel:${PHARMACY_INFO.phoneClean}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200"
              >
                <Phone className="h-4 w-4" />
                Call {PHARMACY_INFO.phone}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Submit Another Request
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Main Interactive Form
  return (
    <div className="mx-auto max-w-4xl">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {pageDetails.badge}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {pageDetails.title}
          </h1>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            {pageDetails.subtitle}
          </p>
        </div>
        <div className="shrink-0 pt-1 sm:pt-0">
          <PhipaBadge />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div className="text-sm font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Section 1: Submission Method / Tab Selector */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                1. How would you like to provide your prescription?
              </h2>
              <p className="text-sm text-slate-500">
                Choose the method that is most convenient for you.
              </p>
            </div>

            {/* Senior-friendly big tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setSubmissionTab("photos")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition min-h-[44px] ${
                  submissionTab === "photos"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Camera className="h-4 w-4" />
                Upload Photos
              </button>
              <button
                type="button"
                onClick={() => setSubmissionTab("manual")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition min-h-[44px] ${
                  submissionTab === "manual"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="h-4 w-4" />
                Enter Details
              </button>
            </div>
          </div>

          {/* TAB A: Photo Upload */}
          {submissionTab === "photos" && (
            <div className="mt-6 space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer min-h-[180px]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm group-hover:scale-105 transition">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-3 text-base font-bold text-slate-800">
                  Click or drag photo(s) here to upload
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Take a photo of your doctor prescription paper or medication bottle label (JPG, PNG, WebP up to 5MB each).
                </p>
              </div>

              {/* Uploaded Photos Preview Grid */}
              {photos.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Attached Photos ({photos.length})
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {photos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 aspect-square"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.dataUrl}
                          alt={`Prescription upload ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition"
                          title="Remove photo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB B: Manual Form Entry */}
          {submissionTab === "manual" && (
            <div className="mt-6 space-y-6">
              {/* Transfer Mode Specifics */}
              {mode === "transfer" && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-base">
                    <Building className="h-5 w-5 text-purple-700" />
                    Previous Pharmacy Information
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Previous Pharmacy Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={previousPharmacyName}
                        onChange={(e) => setPreviousPharmacyName(e.target.value)}
                        placeholder="e.g. Shoppers Drug Mart (Downtown)"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[48px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Previous Pharmacy Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={previousPharmacyPhone}
                        onChange={handlePrevPharmacyPhoneChange}
                        placeholder="(604) 555-0199"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[48px]"
                      />
                    </div>
                  </div>

                  {/* Transfer Scope */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      What would you like to transfer?
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setTransferAll(true)}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition min-h-[64px] ${
                          transferAll
                            ? "border-purple-600 bg-white ring-2 ring-purple-600 text-purple-950 font-bold"
                            : "border-slate-300 bg-white/70 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            transferAll ? "border-purple-600 bg-purple-600 text-white" : "border-slate-400"
                          }`}
                        >
                          {transferAll && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold">Transfer ALL Prescriptions</div>
                          <div className="text-xs text-slate-500 font-normal">
                            We will transfer all active repeats on file directly.
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTransferAll(false)}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition min-h-[64px] ${
                          !transferAll
                            ? "border-purple-600 bg-white ring-2 ring-purple-600 text-purple-950 font-bold"
                            : "border-slate-300 bg-white/70 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            !transferAll ? "border-purple-600 bg-purple-600 text-white" : "border-slate-400"
                          }`}
                        >
                          {!transferAll && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold">Transfer Specific Medications</div>
                          <div className="text-xs text-slate-500 font-normal">
                            List individual medications you want transferred below.
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Medication Line Items (shown for Refills, New Scripts, or Transfer Specific) */}
              {(mode !== "transfer" || !transferAll) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Medication Details
                    </span>
                    <span className="text-xs text-slate-500">
                      {items.length} item{items.length > 1 ? "s" : ""} added
                    </span>
                  </div>

                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                          Medication #{index + 1}
                        </span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {mode === "refill" && (
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Rx Number (from bottle) *
                            </label>
                            <input
                              type="text"
                              value={item.rxNumber || ""}
                              onChange={(e) => updateItem(item.id, "rxNumber", e.target.value)}
                              placeholder="e.g. 1234567"
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            {mode === "refill" ? "Medication Name (Optional)" : "Medication Name *"}
                          </label>
                          <input
                            type="text"
                            value={item.medicationName || ""}
                            onChange={(e) => updateItem(item.id, "medicationName", e.target.value)}
                            placeholder={mode === "refill" ? "e.g. Metformin 500mg" : "e.g. Amoxicillin 500mg"}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                          />
                        </div>

                        {mode === "new" && (
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                              Prescribing Doctor / Clinic
                            </label>
                            <input
                              type="text"
                              value={item.doctorName || ""}
                              onChange={(e) => updateItem(item.id, "doctorName", e.target.value)}
                              placeholder="e.g. Dr. Smith / Chilliwack Clinic"
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                            />
                          </div>
                        )}

                        <div className={mode === "transfer" ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Specific Instructions or Notes
                          </label>
                          <input
                            type="text"
                            value={item.notes || ""}
                            onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                            placeholder="e.g. 30-day supply, blister pack requested"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addItem}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-3.5 text-sm font-bold text-blue-700 hover:border-blue-500 hover:bg-blue-50/40 transition min-h-[48px]"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another Prescription
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 2: Fulfillment Method (Pick Up vs Free Delivery) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            2. Choose Pick Up or Free Delivery
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select how you would like to receive your medications.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setFulfillmentMethod("PICKUP")}
              className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition min-h-[80px] ${
                fulfillmentMethod === "PICKUP"
                  ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600 text-blue-950 font-bold"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  fulfillmentMethod === "PICKUP" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-bold">Pick Up at Dispensary</div>
                <div className="mt-1 text-xs text-slate-500 font-normal">
                  #101 - 45619 Yale Rd, Chilliwack (Free parking available)
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFulfillmentMethod("DELIVERY")}
              className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition min-h-[80px] ${
                fulfillmentMethod === "DELIVERY"
                  ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600 text-emerald-950 font-bold"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  fulfillmentMethod === "DELIVERY" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-bold">Free Home Delivery</div>
                <div className="mt-1 text-xs text-slate-500 font-normal">
                  Delivered safely to your door anywhere in Chilliwack
                </div>
              </div>
            </button>
          </div>

          {/* Delivery Address fields */}
          {fulfillmentMethod === "DELIVERY" && (
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 space-y-4">
              <div className="text-sm font-bold text-emerald-900">
                Delivery Address (Chilliwack &amp; Surrounding Areas)
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryStreet}
                    onChange={(e) => setDeliveryStreet(e.target.value)}
                    placeholder="e.g. 45619 Yale Rd"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Unit / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryUnit}
                    onChange={(e) => setDeliveryUnit(e.target.value)}
                    placeholder="e.g. Apt 204"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[48px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[48px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryPostalCode}
                    onChange={(e) => setDeliveryPostalCode(e.target.value.toUpperCase())}
                    placeholder="e.g. V2P 2N1"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[48px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Preferred Ready Timing */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                3. Preferred Ready Time
              </h2>
              <p className="text-sm text-slate-500">
                Let us know when you need your prescription ready.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              Hours: Mon–Fri 9:00 AM – 5:00 PM
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { id: "asap", label: "As Soon As Possible" },
              { id: "today", label: "Today (Afternoon)" },
              { id: "tomorrow", label: "Tomorrow" },
              { id: "custom", label: "Custom Date" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTimingOption(option.id as any)}
                className={`rounded-xl border p-3.5 text-center text-sm font-bold transition min-h-[48px] ${
                  timingOption === option.id
                    ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {timingOption === "custom" && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Time Window
                </label>
                <select
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
                >
                  <option value="">Select time window</option>
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Early Afternoon (12:00 PM - 2:30 PM)">Early Afternoon (12:00 PM - 2:30 PM)</option>
                  <option value="Late Afternoon (2:30 PM - 5:00 PM)">Late Afternoon (2:30 PM - 5:00 PM)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Patient Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            4. Patient Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please provide your details so our dispensary can confirm your identity and match records in BC PharmaNet.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. John"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Doe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (for pharmacist verification) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(604) 555-0123"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address (for order confirmation) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth {mode === "transfer" ? "(Required for PharmaNet Transfer) *" : "(Optional)"}
              </label>
              <input
                type="date"
                required={mode === "transfer"}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Questions, OTC Items, or Notes for the Pharmacist (Optional)
              </label>
              <textarea
                rows={3}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="Include any vitamins, over-the-counter items you need added to this order, allergies, or questions."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Senior-friendly Email-Only Notification Preference */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            5. Ready Notification Method
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            How would you like to be notified when your prescription is ready?
          </p>

          <div className="mt-4 rounded-2xl border-2 border-blue-600 bg-blue-50/60 p-5">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="notify-email"
                name="notify-pref"
                checked
                readOnly
                className="h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-600"
              />
              <label htmlFor="notify-email" className="font-bold text-slate-900 text-base cursor-pointer">
                Notify me when ready by: Email
              </label>
            </div>
            <p className="mt-2 text-sm text-slate-600 pl-8">
              We will automatically dispatch a confirmation email with your reference code, preparation status, and pickup/delivery instructions to <strong className="text-slate-900">{email || "your email address"}</strong>.
            </p>
          </div>
        </div>

        {/* Action Button & Reassurance */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:from-blue-600 hover:via-blue-500 hover:to-blue-300 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/25 disabled:opacity-60 transition-all duration-200 min-h-[56px] cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Submitting Your Request...
              </>
            ) : (
              <>
                Submit Prescription Request
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-1">
            <PhipaBadge variant="inline" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Confidential &amp; BC PharmaNet Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              Reviewed by a Licensed BC Pharmacist
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-emerald-600" />
              Free Delivery Across Chilliwack
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
