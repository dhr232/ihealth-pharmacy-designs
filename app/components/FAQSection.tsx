"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from "lucide-react";
import { SectionReveal } from "./MotionKit";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I transfer my prescriptions to iHealth Pharmacy?",
    answer:
      "Transferring is simple and takes less than 2 minutes. You don't need to contact your old pharmacy. Just give us your name, date of birth, and current pharmacy name. Our pharmacists handle the entire transfer, verify your refill history, and coordinate with your doctor if any renewals are needed.",
    category: "Transfers & Refills",
  },
  {
    question: "Can an iHealth pharmacist prescribe medications without me visiting a doctor or walk-in clinic?",
    answer:
      "Yes! Under BC's PPRAC regulations, our licensed pharmacists can assess and directly prescribe medications for 21 minor ailments (such as urinary tract infections (UTIs), shingles, cold sores, acid reflux/GERD, allergies, impetigo, and conjunctivitis) as well as prescribe and renew contraceptives on-site.",
    category: "Minor Ailments",
  },
  {
    question: "How does BC Fair PharmaCare and direct insurance billing work?",
    answer:
      "We bill directly to BC Fair PharmaCare and all major private insurers (Pacific Blue Cross, Sun Life, Manulife, Canada Life, Green Shield, and NIHB). You only pay your eligible plan co-pay (if any), eliminating paperwork and out-of-pocket delays.",
    category: "Coverage & Billing",
  },
  {
    question: "Is prescription delivery free anywhere in Abbotsford?",
    answer:
      "Yes! We provide complimentary same-day prescription delivery across Abbotsford for all medication orders over $25. Orders placed before 2:00 PM on weekdays are typically delivered straight to your door that afternoon.",
    category: "Delivery",
  },
  {
    question: "What is MyHealthPack blister packaging, and is it suitable for seniors?",
    answer:
      "MyHealthPack organizes your daily medications into clearly sealed, color-coded blister cards separated by morning, noon, evening, and bedtime. It is ideal for seniors, caregivers, and anyone managing complex multi-drug regimens to ensure you never miss a dose.",
    category: "Services",
  },
  {
    question: "Can I speak with a pharmacist in Punjabi or Hindi?",
    answer:
      "Yes! Our clinical team proudly offers fluent consultations in English, Punjabi (ਪੰਜਾਬੀ), and Hindi (हिन्दी). We make sure you and your family understand exactly how and when to take your medicines.",
    category: "General",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIdx((curr) => (curr === idx ? null : idx));
  }

  return (
    <section id="faq" className="bg-white py-20 lg:py-28 border-b border-slate-200/60">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionReveal className="text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--brand)]">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Get Clarity, Feel Confident
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about switching pharmacies, BC Fair PharmaCare coverage, pharmacist prescribing, and free home delivery.
          </p>
        </SectionReveal>

        <div className="mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <SectionReveal key={item.question}>
                <div
                  className={`overflow-hidden rounded-xl border transition-colors duration-150 ${
                    isOpen
                      ? "border-[var(--brand)]/40 bg-[var(--brand-subtle)]/40 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left transition"
                  >
                    <span className="flex items-center gap-3 text-base font-semibold text-slate-900">
                      <HelpCircle
                        size={18}
                        className={`shrink-0 ${
                          isOpen ? "text-[var(--brand)]" : "text-slate-400"
                        }`}
                      />
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--brand)]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100/80 px-6 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <SectionReveal className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h3 className="text-base font-bold text-slate-900">Have a specific health question?</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Talk directly with a pharmacist on duty in Abbotsford. No appointment required.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-3">
            <a
              href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:border-[var(--brand)] hover:text-[var(--brand)] transition"
            >
              <PhoneCall size={14} />
              Call {PHARMACY_INFO.phoneDisplay}
            </a>
            <a
              href={getWhatsAppUrl("Hello pharmacist! I have a question regarding my medication.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 transition"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
