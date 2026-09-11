"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  phn: string;
  reasonForVisit: string;
  caslConsent: boolean;
}

interface PatientFormProps {
  initialData: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
  onBack: () => void;
}

export default function PatientForm({
  initialData,
  onSubmit,
  onBack,
}: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});

  // Helper for formatting PHN: 10 digits formatted as 9XXX-XXX-XXX
  function handlePhnChange(raw: string) {
    const digitsOnly = raw.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phn: digitsOnly }));
    if (errors.phn) {
      setErrors((prev) => ({ ...prev, phn: undefined }));
    }
  }

  // Helper for phone formatting
  function handlePhoneChange(raw: string) {
    const digitsOnly = raw.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Must be at least 2 characters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required for appointment confirmation.";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Must be a 10-digit phone number.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender option.";
    }

    if (!formData.phn) {
      newErrors.phn = "BC Personal Health Number (PHN) is required.";
    } else if (formData.phn.length !== 10) {
      newErrors.phn = "BC PHN must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-900 border border-teal-200 mb-2">
            <ShieldCheck size={12} className="text-teal-700" />
            <span>BC Health Privacy Protected</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            2. Patient Demographics & Health Card
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Please provide patient identification matching your official British Columbia Services Card.
          </p>
        </div>

        <div className="mt-8 space-y-7">
          {/* Section 1: Demographics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Patient Contact Information
            </h3>

            {/* Name Row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                    }}
                    placeholder="e.g. Gurpreet"
                    className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) setErrors({ ...errors, lastName: undefined });
                    }}
                    placeholder="e.g. Gill"
                    className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                      errors.lastName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="patient@example.com"
                    className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                    }`}
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Your appointment confirmation code will be sent here.
                </p>
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Telephone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Phone
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="604-555-0199"
                    className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                    }`}
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  10-digit Canadian mobile or home number.
                </p>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Date of Birth & Gender */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Calendar
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    id="dateOfBirth"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={formData.dateOfBirth}
                    onChange={(e) => {
                      setFormData({ ...formData, dateOfBirth: e.target.value });
                      if (errors.dateOfBirth)
                        setErrors({ ...errors, dateOfBirth: undefined });
                    }}
                    className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                      errors.dateOfBirth
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                    }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.dateOfBirth}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: undefined });
                  }}
                  className={`mt-1.5 w-full rounded-2xl border bg-slate-50/50 py-3 px-4 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                    errors.gender
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary / Other">Non-binary / Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                    <AlertCircle size={13} />
                    <span>{errors.gender}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: BC Health Card PHN */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              British Columbia Healthcare Coverage
            </h3>

            <div>
              <label
                htmlFor="phn"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                BC Personal Health Number (PHN) <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <CreditCard
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  id="phn"
                  type="text"
                  value={formData.phn}
                  onChange={(e) => handlePhnChange(e.target.value)}
                  placeholder="10-digit number (e.g. 9123456789)"
                  maxLength={10}
                  className={`w-full rounded-2xl border bg-slate-50/50 py-3 pl-10.5 pr-4 font-mono text-sm tracking-widest text-slate-900 placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                    errors.phn
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-[var(--brand)] focus:ring-red-500/10"
                  }`}
                />
              </div>
              <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck size={14} className="shrink-0 mt-0.5 text-[var(--brand)]" />
                <span>
                  Found on the back of your BC Driver&apos;s Licence or front of your BC Services Card. Used for MSP billing eligibility.
                </span>
              </div>
              {errors.phn && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={13} />
                  <span>{errors.phn}</span>
                </p>
              )}
            </div>

            {/* Reason for Visit */}
            <div className="mt-5">
              <label
                htmlFor="reasonForVisit"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Reason for Visit / Symptoms Description
              </label>
              <div className="relative mt-1.5">
                <FileText
                  size={17}
                  className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
                />
                <textarea
                  id="reasonForVisit"
                  rows={3}
                  value={formData.reasonForVisit}
                  onChange={(e) =>
                    setFormData({ ...formData, reasonForVisit: e.target.value })
                  }
                  placeholder="Briefly describe your symptoms, how long you have had them, or any specific questions for the pharmacist..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand)] focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all"
                />
              </div>
            </div>

            {/* CASL Compliance Checkbox */}
            <div className="mt-5 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4.5 hover:bg-slate-50 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.caslConsent}
                  onChange={(e) =>
                    setFormData({ ...formData, caslConsent: e.target.checked })
                  }
                  className="mt-1 h-4.5 w-4.5 rounded-md border-slate-300 text-[var(--brand)] focus:ring-red-600 transition-colors"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  Keep me informed with seasonal clinic updates, health tips, and pharmacy announcements (CASL express consent). You may withdraw consent at any time.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 sm:px-6 sm:py-4 shadow-xl shadow-slate-900/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
        >
          <ChevronLeft size={16} />
          <span>Back to Services</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand)] px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-700/20 transition-all duration-150 hover:bg-[var(--brand-hover)] hover:shadow-lg active:scale-[0.98]"
        >
          <span>Select Date & Time</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </form>
  );
}
