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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            2. Patient Demographics & Health Card
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Please provide patient identification matching your official British Columbia Services Card.
          </p>
        </div>

        <div className="mt-8 space-y-6">
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
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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
                  className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
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
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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
                  className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={13} />
                  <span>{errors.lastName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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
                  className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Your appointment confirmation code will be sent here.
              </p>
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
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
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="604-555-0199"
                  className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                10-digit Canadian mobile or home number.
              </p>
              {errors.phone && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={13} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <Calendar
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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
                  className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.dateOfBirth
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                  }`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
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
                className={`mt-1.5 w-full rounded-xl border bg-slate-50/60 py-2.5 px-3.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.gender
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                }`}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary / Other">Non-binary / Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={13} />
                  <span>{errors.gender}</span>
                </p>
              )}
            </div>
          </div>

          {/* BC Personal Health Number (PHN) */}
          <div>
            <label
              htmlFor="phn"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              BC Personal Health Number (PHN) <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1.5">
              <CreditCard
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="phn"
                type="text"
                value={formData.phn}
                onChange={(e) => handlePhnChange(e.target.value)}
                placeholder="10-digit number (e.g. 9123456789)"
                maxLength={10}
                className={`w-full rounded-xl border bg-slate-50/60 py-2.5 pl-10 pr-4 font-mono text-sm tracking-widest text-slate-900 placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.phn
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-emerald-600 focus:ring-emerald-600/20"
                }`}
              />
            </div>
            <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="shrink-0 mt-0.5 text-emerald-600" />
              <span>
                Found on the back of your BC Driver&apos;s Licence or front of your BC Services Card. Used for MSP billing eligibility.
              </span>
            </div>
            {errors.phn && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={13} />
                <span>{errors.phn}</span>
              </p>
            )}
          </div>

          {/* Reason for Visit / Symptoms Description */}
          <div>
            <label
              htmlFor="reasonForVisit"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Reason for Visit / Symptoms Description
            </label>
            <div className="relative mt-1.5">
              <FileText
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />
              <textarea
                id="reasonForVisit"
                rows={3}
                value={formData.reasonForVisit}
                onChange={(e) =>
                  setFormData({ ...formData, reasonForVisit: e.target.value })
                }
                placeholder="Briefly describe your symptoms, how long you have had them, or any specific questions for the pharmacist..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          {/* CASL Compliance Checkbox */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.caslConsent}
                onChange={(e) =>
                  setFormData({ ...formData, caslConsent: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                Keep me informed with seasonal clinic updates, health tips, and pharmacy announcements (CASL express consent). You may withdraw consent at any time.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Services</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <span>Select Date & Time</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </form>
  );
}
