"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Users,
  ShieldCheck,
  PackageCheck,
  HeartHandshake,
  Sparkles,
  PhoneCall,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SectionReveal, HoverCard, StaggerContainer, StaggerItem } from "./MotionKit";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";
import { isValidEmail, isValidPhone, formatPhoneNumber } from "@/lib/validation";

const BENEFITS = [
  {
    title: "Medication Synchronization",
    desc: "We align all your recurring medications so they renew on the exact same day each month.",
  },
  {
    title: "Doctor Renewal Requests",
    desc: "When refills run low, our pharmacists contact your doctor directly for renewals on your behalf.",
  },
  {
    title: "Complimentary MyHealthPack Blister Packs",
    desc: "Organized by date and time of day to eliminate missed doses and pill bottle confusion.",
  },
  {
    title: "Free Same-Day Abbotsford Delivery",
    desc: "Prescriptions brought safely to your doorstep when you order before 2:00 PM on weekdays.",
  },
  {
    title: "Multilingual Pharmacist Reviews",
    desc: "In-depth one-on-one reviews in English, Punjabi (ਪੰਜਾਬੀ), or Hindi (हिन्दी).",
  },
];

const PILLARS = [
  {
    icon: Users,
    title: "Expert Clinical Team",
    desc: "Licensed pharmacists who take time to explain each medication and potential interactions.",
  },
  {
    icon: ShieldCheck,
    title: "Direct Billing Savings",
    desc: "We direct-bill BC Fair PharmaCare, Pacific Blue Cross, Sun Life, and all major Canadian plans.",
  },
  {
    icon: PackageCheck,
    title: "All-in-One Pharmacy Care",
    desc: "From minor ailments and compounding to vaccines and regular refills, all under one roof.",
  },
  {
    icon: HeartHandshake,
    title: "Senior & Caregiver Friendly",
    desc: "Dedicated support for seniors, caregivers, and family members coordinating health regimens.",
  },
];

export default function PatientCareProgramSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceNeeded: "Refill Synchronization & Delivery",
    notes: "",
  });
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone && isValidPhone(formatted)) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, email: val }));
    if (errors.email && isValidEmail(val)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { email?: string; phone?: string } = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    // Simulate swift confirmation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section id="care-program" className="bg-slate-100/80 pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-white/95 border border-slate-200 px-3.5 py-1 mb-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand)]">
              Patient Care Program
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Healthcare That Cares More
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Join the iHealth Patient Care program at zero extra cost. We simplify your medications, coordinate renewals with your doctor, and deliver directly to your Abbotsford home.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Benefits & Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <SectionReveal>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-[var(--brand)]" />
                  What is included in the program:
                </h3>
                <ul className="mt-6 space-y-4">
                  {BENEFITS.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <strong className="text-sm font-semibold text-slate-900">{b.title}: </strong>
                        <span className="text-sm text-slate-600">{b.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* 4 Feature Pillars */}
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerItem key={p.title}>
                    <HoverCard className="h-full rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs transition hover:border-slate-300 hover:shadow-xs">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                        <Icon size={18} />
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-slate-900">{p.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{p.desc}</p>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Right Column: Enrollment Card */}
          <div className="lg:col-span-5">
            <SectionReveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-md">
                <div className="border-b border-slate-100 pb-4">
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    100% Free · No Membership Fees
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Enroll or Request a Consult
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Speak directly with an Abbotsford pharmacist. We handle transfers and renewals.
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-6 rounded-xl bg-emerald-50 p-6 text-center text-emerald-900">
                    <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-2" />
                    <h4 className="text-base font-bold">Request Received!</h4>
                    <p className="mt-1 text-xs text-emerald-800">
                      Our pharmacist will reach out to <strong>{formData.phone || "your number"}</strong> during pharmacy hours to confirm your preferences.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          serviceNeeded: "Refill Synchronization & Delivery",
                          notes: "",
                        });
                        setErrors({});
                      }}
                      className="mt-4 text-xs font-semibold text-emerald-700 underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                    <div>
                      <label htmlFor="care-name" className="block text-xs font-semibold text-slate-700">
                        Full Name *
                      </label>
                      <input
                        id="care-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Gurpreet Singh or Mary Jenkins"
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-2xs focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="care-email" className="block text-xs font-semibold text-slate-700">
                        Email Address *
                      </label>
                      <input
                        id="care-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "care-email-error" : undefined}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-2xs focus:outline-none focus:ring-1 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-[var(--brand)] focus:ring-[var(--brand)]"
                        }`}
                      />
                      {errors.email && (
                        <p id="care-email-error" role="alert" className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
                          <AlertCircle size={13} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="care-phone" className="block text-xs font-semibold text-slate-700">
                        Phone Number *
                      </label>
                      <input
                        id="care-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(604) 000-0000"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "care-phone-error" : undefined}
                        className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 shadow-2xs focus:outline-none focus:ring-1 ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:border-[var(--brand)] focus:ring-[var(--brand)]"
                        }`}
                      />
                      {errors.phone && (
                        <p id="care-phone-error" role="alert" className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600">
                          <AlertCircle size={13} />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="care-service" className="block text-xs font-semibold text-slate-700">
                        Primary Care Need
                      </label>
                      <select
                        id="care-service"
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-2xs focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                      >
                        <option value="Refill Synchronization & Delivery">Medication Synchronization & Free Delivery</option>
                        <option value="Transfer All Prescriptions">Transfer Prescriptions from Another Pharmacy</option>
                        <option value="MyHealthPack Blister Packaging">MyHealthPack Custom Blister Packs</option>
                        <option value="Medication Review & Senior Care">Comprehensive Medication Review (Senior Care)</option>
                        <option value="Minor Ailment Assessment">Minor Ailment Assessment</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="care-notes" className="block text-xs font-semibold text-slate-700">
                        Notes or Questions (Optional)
                      </label>
                      <textarea
                        id="care-notes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Current pharmacy name, preferred call time, or language (English/Punjabi/Hindi)..."
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-2xs focus:border-[var(--brand)] focus:outline-none focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[var(--brand-hover)] active:scale-[0.99] disabled:opacity-70"
                    >
                      {submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      <span>Enroll in Free Care Program</span>
                    </button>
                  </form>
                )}

                <div className="mt-5 border-t border-slate-100 pt-4 flex flex-col gap-2 text-center">
                  <p className="text-xs text-slate-500">Or talk with our team directly:</p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <a
                      href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[var(--brand)] underline underline-offset-2"
                    >
                      <PhoneCall size={12} />
                      Call {PHARMACY_INFO.phoneDisplay}
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={getWhatsAppUrl("Hello! I want to enroll in the iHealth Care Program and ask about medication synchronization.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#128C7E] hover:underline underline-offset-2"
                    >
                      WhatsApp Message
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
