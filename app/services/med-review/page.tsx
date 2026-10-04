import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SectionReveal } from "../../components/MotionKit";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Lock,
  MessageCircle,
  Phone,
  Pill,
  Users,
} from "lucide-react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export const metadata: Metadata = {
  title: "Medication Review Consultation | iHealth Pharmacy Chilliwack",
  description:
    "A private, one-on-one medication review with a pharmacist at iHealth Pharmacy in Chilliwack. We go through everything you take and check that it works safely together.",
};

const BOOK_HREF = "/book?service=medication-review-service";

const HIGHLIGHTS = [
  { icon: Clock, label: "About 30 minutes" },
  { icon: Lock, label: "Private consultation" },
];

const STEPS = [
  {
    title: "Book a time",
    text: "Choose a time online, or call us and we will set it up with you.",
  },
  {
    title: "Bring everything you take",
    text: "Prescription bottles, over-the-counter products, vitamins and herbal remedies. All of it helps.",
  },
  {
    title: "Talk it through with your pharmacist",
    text: "We go over each medication, check for interactions and duplicates, and answer your questions in plain language.",
  },
  {
    title: "Leave with a clear plan",
    text: "You receive an up-to-date medication list, and with your agreement we can share any suggestions with your doctor.",
  },
];

const GOOD_FIT = [
  "You take several prescription medications",
  "You were recently discharged from hospital or your medications have changed",
  "You are not sure why you take something, or when to take it",
  "You see more than one doctor or specialist",
  "You look after a parent or family member who takes many medications",
  "You have side effects or concerns you want to talk about",
];

const WHAT_WE_COVER = [
  "A full review of your prescriptions, over-the-counter products and supplements",
  "Interaction and duplication checks",
  "Clear dosing times that fit your day",
  "Questions about side effects and how to take each medication",
  "An up-to-date medication list you can carry with you",
];

export default function MedicationReviewPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F3FBF6] to-white">
          <span className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-[#C9EBD8]/60" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-8 pb-12 lg:px-8 lg:pt-12 lg:pb-16">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[var(--brand)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to all services
            </Link>

            <div className="mt-4 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <SectionReveal>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B7E4C9] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2F9A62]">
                  <ClipboardCheck size={14} aria-hidden="true" />
                  One-on-One Pharmacist Care
                </span>
                <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] md:text-4xl lg:text-5xl">
                  Medication Review Consultation
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  Sit down privately with a pharmacist to go through everything you take. We check that your
                  medications work safely together, explain what each one is for, and answer your questions
                  without rushing you.
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-[#B7E4C9] bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-700"
                    >
                      <Icon size={16} className="text-[#2F9A62]" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={BOOK_HREF}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2F9A62] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#268050]"
                  >
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book Appointment
                  </Link>
                  <a
                    href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Call {PHARMACY_INFO.phoneDisplay}
                  </a>
                </div>
              </SectionReveal>

              <SectionReveal>
                <div className="overflow-hidden rounded-3xl border border-[#C9EBD8] bg-[#E5F6EC] p-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/services/med-review.jpg"
                    alt="Pharmacist reviewing medications with a patient in a private consultation"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-12 lg:py-16" aria-labelledby="how-it-works">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <SectionReveal>
              <h2 id="how-it-works" className="text-2xl font-bold tracking-tight md:text-3xl">
                How it works
              </h2>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="rounded-2xl border border-[#C9EBD8] bg-[#F6FCF8] p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F9A62] text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </li>
                ))}
              </ol>
            </SectionReveal>
          </div>
        </section>

        {/* Fit + coverage */}
        <section className="bg-slate-50 py-12 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
            <SectionReveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F7EC] text-[#2F9A62]">
                  <Users size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-xl font-bold">Who it is for</h2>
                <ul className="mt-4 space-y-3">
                  {GOOD_FIT.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base text-slate-700">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#2F9A62]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8ECFB] text-[var(--brand)]">
                  <Pill size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-xl font-bold">What we cover</h2>
                <ul className="mt-4 space-y-3">
                  {WHAT_WE_COVER.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base text-slate-700">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-[var(--brand)]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Coverage note + CTA */}
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <SectionReveal>
              <div className="relative overflow-hidden rounded-3xl border border-[#C9EBD8] bg-gradient-to-br from-[#F3FBF6] to-[#E5F6EC] px-6 py-8 text-center sm:px-10 sm:py-10">
                <span className="pointer-events-none absolute -right-8 -bottom-12 h-36 w-36 rounded-full bg-[#C9EBD8]" aria-hidden="true" />
                <div className="relative">
                  <h2 className="text-2xl font-bold tracking-tight">Ready to go through your medications?</h2>
                  <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                    Bring your medications, supplements and any questions, and we will go through them
                    together. Not sure if a review is right for you? Call or message us and we will help
                    you decide before you book.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                      href={BOOK_HREF}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2F9A62] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#268050]"
                    >
                      <CalendarCheck size={18} aria-hidden="true" />
                      Book Appointment
                    </Link>
                    <a
                      href={getWhatsAppUrl("Hi iHealth Pharmacy, I would like to ask about a medication review consultation.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#B7E4C9] bg-white px-6 py-3 text-base font-semibold text-[#1F7A4C] transition hover:bg-[#E6F7EC]"
                    >
                      <MessageCircle size={18} aria-hidden="true" />
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
