"use client";

import { useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  FileText,
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  Store,
  Phone,
  AlertCircle,
  Loader2,
  ArrowRight,
  Mail,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { isValidEmail, isValidPhone, formatPhoneNumber } from "@/lib/validation";

type TimingOption = "asap" | "today" | "tomorrow" | "custom";
type NotificationMethod = "CALL" | "SMS";

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

// Shared form styles -- one input style and one label style across the whole form
const inputClass =
  "block min-h-12 w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 transition focus:border-[var(--brand)] focus:outline-none focus:ring-4 focus:ring-[var(--brand)]/15";
const labelClass = "mb-1.5 block text-base font-semibold text-slate-800";
const hintClass = "mt-1.5 text-sm text-slate-500";

const TIMING_OPTIONS: { id: TimingOption; label: string }[] = [
  { id: "asap", label: "As soon as possible" },
  { id: "today", label: "Later today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "custom", label: "Choose a date" },
];

const TIME_WINDOWS = [
  "Morning (8:30 am – 12:00 pm)",
  "Early afternoon (12:00 – 2:30 pm)",
  "Late afternoon (2:30 – 5:00 pm)",
];

function Section({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-lg font-bold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-xl font-bold leading-8 text-slate-900 sm:text-2xl">{title}</h2>
          {description && <p className="mt-1 text-base text-slate-600">{description}</p>}
        </div>
      </div>
      <div className="mt-5 sm:pl-[3.4rem]">{children}</div>
    </section>
  );
}

// Big selectable box used for every single-choice option: large tap area, icon, plain-language
// detail line and an obvious "selected" state (thick border, tint and tick) for easier reading.
function Choice({
  selected,
  onSelect,
  icon: Icon,
  title,
  detail,
}: {
  selected: boolean;
  onSelect: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  detail?: string;
  /** kept for call-site compatibility; every choice is now a full-size box */
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex min-h-[4.5rem] w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand)]/25 sm:px-5 ${
        selected
          ? "border-[var(--brand)] bg-[var(--brand-subtle)] shadow-sm"
          : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
      }`}
    >
      {Icon && (
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            selected ? "bg-white text-[var(--brand)]" : "bg-slate-100 text-slate-600"
          }`}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold leading-snug text-slate-900">{title}</span>
        {detail && <span className="mt-0.5 block text-base leading-snug text-slate-600">{detail}</span>}
      </span>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-slate-300 bg-white"
        }`}
        aria-hidden="true"
      >
        {selected && <CheckCircle2 className="h-5 w-5" />}
      </span>
    </button>
  );
}

export default function PrescriptionFlow({ mode }: PrescriptionFlowProps) {
  // Submission method
  const [submissionTab, setSubmissionTab] = useState<"photos" | "manual">(
    mode === "new" ? "photos" : "manual"
  );

  // Photos
  const [photos, setPhotos] = useState<Array<{ name: string; dataUrl: string; size: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Line items for manual entry
  const [items, setItems] = useState<PrescriptionItem[]>([
    { id: "item-1", rxNumber: "", medicationName: "", doctorName: "", notes: "" },
  ]);

  // Transfer
  const [previousPharmacyName, setPreviousPharmacyName] = useState("");
  const [previousPharmacyPhone, setPreviousPharmacyPhone] = useState("");
  const [transferAll, setTransferAll] = useState(true);

  // Patient
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  // Fulfillment
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryUnit, setDeliveryUnit] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Chilliwack");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("");

  // Timing
  const [timingOption, setTimingOption] = useState<TimingOption>("asap");
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  // Ready notification
  const [notificationMethod, setNotificationMethod] = useState<NotificationMethod>("CALL");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSentStatus, setEmailSentStatus] = useState<boolean | null>(null);

  const pageDetails = {
    new: {
      eyebrow: "New prescription",
      title: "Submit a new prescription",
      subtitle:
        "Upload a photo of your prescription or enter the details. A pharmacist will review it and have it ready for pickup or free delivery in Chilliwack.",
      typeEnum: "NEW_PRESCRIPTION" as const,
    },
    refill: {
      eyebrow: "Prescription refill",
      title: "Request a refill",
      subtitle:
        "Enter the Rx number from your bottle label, or upload a photo of the label. We will let you know when it is ready.",
      typeEnum: "REFILL" as const,
    },
    transfer: {
      eyebrow: "Prescription transfer",
      title: "Transfer your prescriptions to iHealth",
      subtitle:
        "Tell us which pharmacy you are leaving. We contact your previous pharmacy and take care of the transfer for you.",
      typeEnum: "TRANSFER" as const,
    },
  }[mode];

  // Photo handlers
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Matches the server-side limit in /api/prescriptions/submit
    if (photos.length + files.length > 10) {
      setErrorMessage("You can upload up to 10 photos per request.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("One of your photos is larger than 5 MB. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [
            ...prev,
            { name: file.name, dataUrl: event.target!.result as string, size: file.size },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

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
      { id: `item-${Date.now()}`, rxNumber: "", medicationName: "", doctorName: "", notes: "" },
    ]);
  }

  function removeItem(id: string) {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: string, field: keyof PrescriptionItem, val: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    // "Transfer all" needs no photos or medication list, whatever tab was last open
    const effectiveTab = mode === "transfer" && transferAll ? "manual" : submissionTab;

    // Section 1: prescription
    if (effectiveTab === "photos" && photos.length === 0) {
      setErrorMessage("Please upload at least one photo of your prescription, or switch to entering the details.");
      return;
    }
    if (effectiveTab === "manual") {
      if (mode === "refill") {
        if (!items.some((item) => item.rxNumber?.trim() || item.medicationName?.trim())) {
          setErrorMessage("Please enter at least one Rx number or medication name.");
          return;
        }
      } else if (mode === "transfer") {
        if (!previousPharmacyName.trim()) {
          setErrorMessage("Please enter the name of your previous pharmacy.");
          return;
        }
      } else if (mode === "new") {
        if (!items.some((item) => item.medicationName?.trim())) {
          setErrorMessage("Please enter at least one medication name, or upload a photo of the prescription.");
          return;
        }
      }
    }

    // Section 2: patient
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter the patient's first and last name.");
      return;
    }
    if (!isValidPhone(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!dateOfBirth.trim()) {
      setErrorMessage("Please enter the patient's date of birth. We need it to find the right file.");
      return;
    }

    // Section 3: delivery
    if (fulfillmentMethod === "DELIVERY" && !deliveryStreet.trim()) {
      setErrorMessage("Please enter the delivery street address.");
      return;
    }

    // Section 4: timing
    let readyDateStr = "As soon as possible";
    let readyTimeStr = "";
    if (timingOption === "today") {
      readyDateStr = "Later today";
    } else if (timingOption === "tomorrow") {
      readyDateStr = "Tomorrow";
    } else if (timingOption === "custom") {
      if (!customDate) {
        setErrorMessage("Please choose the date you would like your prescription ready.");
        return;
      }
      readyDateStr = customDate;
      readyTimeStr = customTime;
    }

    setSubmitting(true);

    try {
      // Upload photos as files rather than embedding base64 in the JSON payload / database
      let uploadedPhotoUrls: string[] = [];
      if (effectiveTab === "photos" && photos.length > 0) {
        try {
          uploadedPhotoUrls = await Promise.all(
            photos.map(async (photo) => {
              const blob = await (await fetch(photo.dataUrl)).blob();
              const uploadForm = new FormData();
              uploadForm.append("file", blob, photo.name);

              const uploadRes = await fetch("/api/prescriptions/upload-photo", {
                method: "POST",
                body: uploadForm,
              });
              const uploadData = await uploadRes.json();
              if (!uploadRes.ok || !uploadData.success) {
                throw new Error(uploadData.error || `Failed to upload ${photo.name}.`);
              }
              return uploadData.url as string;
            })
          );
        } catch (uploadErr) {
          setErrorMessage(
            uploadErr instanceof Error ? uploadErr.message : "One of your photos could not be uploaded. Please try again."
          );
          setSubmitting(false);
          return;
        }
      }

      const payload = {
        type: pageDetails.typeEnum,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        dateOfBirth: dateOfBirth.trim(),
        submissionMode: effectiveTab === "photos" ? "PHOTOS" : "MANUAL",
        items:
          effectiveTab === "manual"
            ? items.filter((i) => i.rxNumber?.trim() || i.medicationName?.trim())
            : [],
        photoUrls: uploadedPhotoUrls,
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
        notificationMethod,
        patientNotes: patientNotes.trim() || undefined,
      };

      const response = await fetch("/api/prescriptions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not submit your request.");
      }

      setReferenceNumber(data.referenceNumber);
      setEmailSentStatus(data.emailSent);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? `${err.message} Please try again, or call us at ${PHARMACY_INFO.phoneDisplay}.`
          : `Something went wrong. Please call us at ${PHARMACY_INFO.phoneDisplay}.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setPhotos([]);
    setItems([{ id: "item-1", rxNumber: "", medicationName: "", doctorName: "", notes: "" }]);
    setReferenceNumber("");
    setErrorMessage("");
  }

  // ---------- Success screen ----------
  if (submitted) {
    const summary: [string, string][] = [
      ["Request", pageDetails.title.replace(/^./, (c) => c.toUpperCase())],
      [
        "Pickup or delivery",
        fulfillmentMethod === "DELIVERY" ? `Free delivery to ${deliveryStreet}` : "Pickup at the pharmacy",
      ],
      [
        "Ready",
        timingOption === "custom"
          ? [customDate, customTime].filter(Boolean).join(", ")
          : TIMING_OPTIONS.find((o) => o.id === timingOption)?.label ?? "",
      ],
      ["We'll let you know by", notificationMethod === "SMS" ? `Text message to ${phone}` : `Phone call to ${phone}`],
    ];

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-[var(--brand)]">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Request received</h2>
            <p className="mt-1 text-base text-slate-600">
              Thank you, {firstName}. A pharmacist will review your request and we will let you know
              as soon as it is ready.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm text-slate-500">Reference number</p>
          <p className="mt-0.5 font-mono text-2xl font-semibold tracking-tight text-slate-900">
            {referenceNumber}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please quote this number if you call us about your request.
          </p>
        </div>

        <dl className="mt-6 divide-y divide-slate-100 border-y border-slate-100">
          {summary.map(([term, value]) => (
            <div key={term} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:gap-6">
              <dt className="w-44 shrink-0 text-sm text-slate-500">{term}</dt>
              <dd className="text-sm font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 flex items-start gap-2 text-sm text-slate-600">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          {emailSentStatus === false
            ? "We could not send your confirmation email, but your request has been received."
            : `A confirmation has been sent to ${email}.`}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
          >
            Back to homepage
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Submit another request
          </button>
          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-[var(--brand)] hover:underline sm:ml-auto"
          >
            <Phone className="h-4 w-4" />
            {PHARMACY_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  // ---------- Form ----------
  const showItems = mode !== "transfer" || !transferAll;

  return (
    <div>
      <header className="mb-7">
        <p className="text-sm font-semibold text-[var(--brand)]">{pageDetails.eyebrow}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {pageDetails.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{pageDetails.subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* 1. Prescription */}
        <Section
          step={1}
          title={mode === "transfer" ? "Your previous pharmacy" : "Your prescription"}
          description={
            mode === "transfer"
              ? "Which pharmacy filled your prescriptions before?"
              : "Upload a photo or enter the details, whichever is easier."
          }
        >
          {mode === "transfer" && (
            <div className="mb-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="prevPharmacy" className={labelClass}>
                    Pharmacy name
                  </label>
                  <input
                    id="prevPharmacy"
                    type="text"
                    value={previousPharmacyName}
                    onChange={(e) => setPreviousPharmacyName(e.target.value)}
                    placeholder="e.g. Shoppers Drug Mart, Luckakuck Way"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="prevPharmacyPhone" className={labelClass}>
                    Pharmacy phone <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="prevPharmacyPhone"
                    type="tel"
                    value={previousPharmacyPhone}
                    onChange={(e) => setPreviousPharmacyPhone(formatPhoneNumber(e.target.value))}
                    placeholder="(604) 555-0199"
                    className={inputClass}
                  />
                </div>
              </div>

              <div role="radiogroup" aria-label="What to transfer" className="grid gap-3 sm:grid-cols-2">
                <Choice
                  selected={transferAll}
                  onSelect={() => setTransferAll(true)}
                  title="All my prescriptions"
                  detail="We transfer everything on file"
                />
                <Choice
                  selected={!transferAll}
                  onSelect={() => setTransferAll(false)}
                  title="Only some prescriptions"
                  detail="List the medications below"
                />
              </div>
            </div>
          )}

          {(mode !== "transfer" || !transferAll) && (
            <>
              <div role="radiogroup" aria-label="How to provide your prescription" className="grid gap-3 sm:grid-cols-2">
                <Choice
                  selected={submissionTab === "photos"}
                  onSelect={() => setSubmissionTab("photos")}
                  icon={Camera}
                  title="Upload a photo"
                  detail="Take a picture of the paper or bottle label"
                />
                <Choice
                  selected={submissionTab === "manual"}
                  onSelect={() => setSubmissionTab("manual")}
                  icon={FileText}
                  title="Type the details"
                  detail="Write in the medication names yourself"
                />
              </div>

              {submissionTab === "photos" && (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-40 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-[var(--brand)] hover:bg-[var(--brand-subtle)]/40"
                  >
                    <Upload className="h-8 w-8 text-[var(--brand)]" />
                    <span className="mt-2 text-lg font-semibold text-slate-900">Tap here to choose photos</span>
                    <span className="mt-1 text-sm text-slate-600">
                      Prescription paper or bottle label. JPG, PNG or WebP, up to 5 MB each.
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {photos.length > 0 && (
                    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
                      {photos.map((photo, idx) => (
                        <li
                          key={idx}
                          className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.dataUrl}
                            alt={`Prescription photo ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            aria-label={`Remove photo ${idx + 1}`}
                            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {submissionTab === "manual" && showItems && (
                <div className="mt-5 space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-base font-bold text-slate-700">Medication {index + 1}</span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {mode === "refill" && (
                          <div>
                            <label htmlFor={`rx-${item.id}`} className={labelClass}>
                              Rx number
                            </label>
                            <input
                              id={`rx-${item.id}`}
                              type="text"
                              value={item.rxNumber || ""}
                              onChange={(e) => updateItem(item.id, "rxNumber", e.target.value)}
                              placeholder="From your bottle label"
                              className={inputClass}
                            />
                            <p className={hintClass}>The number printed on the pharmacy label of your bottle.</p>
                          </div>
                        )}
                        <div>
                          <label htmlFor={`med-${item.id}`} className={labelClass}>
                            Medication name
                            {mode === "refill" && <span className="font-normal text-slate-400"> (optional)</span>}
                          </label>
                          <input
                            id={`med-${item.id}`}
                            type="text"
                            value={item.medicationName || ""}
                            onChange={(e) => updateItem(item.id, "medicationName", e.target.value)}
                            placeholder={mode === "refill" ? "e.g. Metformin 500 mg" : "e.g. Amoxicillin 500 mg"}
                            className={inputClass}
                          />
                        </div>
                        {mode === "new" && (
                          <div>
                            <label htmlFor={`doc-${item.id}`} className={labelClass}>
                              Prescriber or clinic <span className="font-normal text-slate-400">(optional)</span>
                            </label>
                            <input
                              id={`doc-${item.id}`}
                              type="text"
                              value={item.doctorName || ""}
                              onChange={(e) => updateItem(item.id, "doctorName", e.target.value)}
                              placeholder="e.g. Dr. Smith"
                              className={inputClass}
                            />
                          </div>
                        )}
                        <div className={mode === "transfer" ? "" : "sm:col-span-2"}>
                          <label htmlFor={`notes-${item.id}`} className={labelClass}>
                            Notes <span className="font-normal text-slate-400">(optional)</span>
                          </label>
                          <input
                            id={`notes-${item.id}`}
                            type="text"
                            value={item.notes || ""}
                            onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                            placeholder="e.g. 90-day supply"
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-[var(--brand)] px-4 text-base font-semibold text-[var(--brand)] transition hover:bg-[var(--brand-subtle)]"
                  >
                    <Plus className="h-4 w-4" />
                    Add another medication
                  </button>
                </div>
              )}
            </>
          )}
        </Section>

        {/* 2. Patient information */}
        <Section
          step={2}
          title="Patient information"
          description="So we can match your records and reach you if we have a question."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder="(604) 555-0123"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="dob" className={labelClass}>
                Date of birth
              </label>
              <input
                id="dob"
                type="date"
                autoComplete="bday"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                aria-required="true"
                className={inputClass}
              />
              <p className={hintClass}>Needed to find the right patient file.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className={labelClass}>
                Notes for the pharmacist <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="Allergies, questions, or over-the-counter items to add to this order"
                className={inputClass}
              />
            </div>
          </div>
        </Section>

        {/* 3. Preferred ready time */}
        <Section step={3} title="Preferred ready time" description={`Store hours: ${PHARMACY_INFO.hoursSummary}`}>
          <div role="radiogroup" aria-label="Preferred ready time" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {TIMING_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                compact
                selected={timingOption === option.id}
                onSelect={() => setTimingOption(option.id)}
                title={option.label}
              />
            ))}
          </div>

          {timingOption === "custom" && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="readyDate" className={labelClass}>
                  Date
                </label>
                <input
                  id="readyDate"
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="readyTime" className={labelClass}>
                  Time of day <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <select
                  id="readyTime"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any time</option>
                  {TIME_WINDOWS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </Section>

        {/* 4. Ready notification */}
        <Section step={4} title="How should we tell you it's ready?" description="Choose how you would like us to reach you.">
          <div role="radiogroup" aria-label="Ready notification method" className="grid gap-3 sm:grid-cols-2">
            <Choice
              selected={notificationMethod === "CALL"}
              onSelect={() => setNotificationMethod("CALL")}
              icon={PhoneCall}
              title="Phone call"
              detail={phone.trim() ? `We call ${phone.trim()}` : "We call the number above"}
            />
            <Choice
              selected={notificationMethod === "SMS"}
              onSelect={() => setNotificationMethod("SMS")}
              icon={MessageSquare}
              title="Text message"
              detail={phone.trim() ? `We text ${phone.trim()}` : "We text the number above"}
            />
          </div>
        </Section>

        {/* 5. Pickup or delivery */}
        <Section step={5} title="Pickup or delivery">
          <div role="radiogroup" aria-label="Pickup or delivery" className="grid gap-3 sm:grid-cols-2">
            <Choice
              compact
              selected={fulfillmentMethod === "PICKUP"}
              onSelect={() => setFulfillmentMethod("PICKUP")}
              icon={Store}
              title="Pick up in store"
              detail={PHARMACY_INFO.address.street}
            />
            <Choice
              compact
              selected={fulfillmentMethod === "DELIVERY"}
              onSelect={() => setFulfillmentMethod("DELIVERY")}
              icon={Truck}
              title="Free delivery"
              detail="Anywhere in Chilliwack"
            />
          </div>

          {fulfillmentMethod === "DELIVERY" && (
            <div className="mt-5 grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="street" className={labelClass}>
                  Street address
                </label>
                <input
                  id="street"
                  type="text"
                  autoComplete="address-line1"
                  value={deliveryStreet}
                  onChange={(e) => setDeliveryStreet(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="unit" className={labelClass}>
                  Unit <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="unit"
                  type="text"
                  autoComplete="address-line2"
                  value={deliveryUnit}
                  onChange={(e) => setDeliveryUnit(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="postal" className={labelClass}>
                  Postal code <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="postal"
                  type="text"
                  autoComplete="postal-code"
                  value={deliveryPostalCode}
                  onChange={(e) => setDeliveryPostalCode(e.target.value.toUpperCase())}
                  placeholder="V2P 2N1"
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </Section>

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-14 w-full shrink-0 sm:w-auto sm:self-start items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-8 py-3.5 text-lg font-semibold text-white transition hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit request
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
          <p className="text-sm text-slate-500">
            Every request is reviewed by a pharmacist.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-700">
              How we protect your information
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
