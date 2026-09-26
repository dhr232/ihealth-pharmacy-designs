import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PharmacistTeamSection from "../components/PharmacistTeamSection";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  HeartHandshake,
  Truck,
  Clock,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Lock,
  Languages,
  Package,
  MessageCircle,
  CheckCircle2,
  Users,
  MapPin,
} from "lucide-react";
import { PHARMACY_INFO } from "@/data/pharmacy-info";
import { getBookingUrl } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About Us — Family-Run Pharmacy in Chilliwack | iHealth Pharmacy",
  description:
    "iHealth is an independent, family-run pharmacy in Chilliwack, BC. Personal pharmacists who know you by name, free same-day delivery, and care for seniors and the families who look after them.",
};

// Shared link styles: 48px+ tall targets, visible keyboard focus, 200ms transitions
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";
const BTN_PRIMARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[var(--brand-hover)]";
const BTN_SECONDARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]";

const PROOF_POINTS = [
  { icon: HeartHandshake, text: "Independent and family-run" },
  { icon: Clock, text: "Many refills in under 30 minutes" },
  { icon: Truck, text: "Free same-day delivery" },
  { icon: Languages, text: "English, Punjabi, and Hindi" },
];

const WHY_US = [
  {
    icon: HeartHandshake,
    title: "Independent and family-run",
    body: "We're local owners, not a chain. Decisions are made here in Chilliwack, for the people we see every week.",
  },
  {
    icon: Users,
    title: "We know you by name",
    body: "You'll see the same friendly faces each visit. We remember your medications, your history, and how you're doing.",
  },
  {
    icon: Clock,
    title: "Refills without the long wait",
    body: "Many in-stock prescription refills are ready in under 30 minutes, so you're not stuck waiting in line.",
  },
  {
    icon: Truck,
    title: "Free same-day delivery",
    body: "We deliver prescriptions and blister packs to your door anywhere in Chilliwack, at no charge.",
  },
  {
    icon: Languages,
    title: "Care in your language",
    body: "We speak English, Punjabi, and Hindi, so you and your family can ask questions comfortably.",
  },
  {
    icon: Stethoscope,
    title: "More than prescriptions",
    body: "Minor ailment assessments, vaccinations, and medication reviews with a pharmacist who has time to talk.",
  },
];

const CAREGIVER_POINTS = [
  {
    icon: Package,
    text: "MyHealthPack blister packs that sort each day's medications by time of day",
  },
  {
    icon: MessageCircle,
    text: "Send a photo of a pill bottle on WhatsApp to request a refill",
  },
  {
    icon: Truck,
    text: "Free same-day delivery to your parent's home in Chilliwack",
  },
  {
    icon: Users,
    text: "One pharmacy team that knows the whole picture and speaks with the doctor for you",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-24">
            <div className="lg:col-span-7">
              <BlurReveal>
                <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                  About iHealth Pharmacy
                </span>
              </BlurReveal>
              <BlurReveal className="mt-5">
                <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
                  Your neighbourhood pharmacist, who knows you by name.
                </h1>
              </BlurReveal>
              <BlurReveal className="mt-5">
                <p className="max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl">
                  Independent and family-run in Chilliwack. We look after your health, not just your
                  prescriptions, and we take the time to do it properly.
                </p>
              </BlurReveal>
              <BlurReveal className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/transfer" className={`${BTN_PRIMARY} ${FOCUS}`}>
                    Transfer my prescriptions
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <Link href={getBookingUrl()} className={`${BTN_SECONDARY} ${FOCUS}`}>
                    <CalendarCheck size={18} aria-hidden="true" />
                    Book an appointment
                  </Link>
                </div>
              </BlurReveal>
            </div>

            <BlurReveal className="lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-slate-900/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacy-storefront.jpg"
                  alt="The iHealth Pharmacy storefront on Yale Road in Chilliwack"
                  width={800}
                  height={600}
                  className="aspect-4/3 h-full w-full object-cover"
                />
                <figcaption className="flex items-center gap-2 px-5 py-4 text-base text-slate-700">
                  <MapPin size={18} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                  {PHARMACY_INFO.address.full}
                </figcaption>
              </figure>
            </BlurReveal>
          </div>

          {/* Verified facts only -- see .agents/product-marketing.md */}
          <div className="border-t border-white/70 bg-white/60">
            <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-3 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
              {PROOF_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.text} className="flex items-center gap-3 text-base font-medium text-slate-800">
                    <Icon size={20} className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                    {point.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="scroll-mt-24">
          <SectionReveal className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-slate-900">Our story</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                We opened iHealth Pharmacy because we believe a pharmacy should feel like part of the
                family. When you walk in, you should be greeted by name, by a pharmacist who already
                knows your medications and remembers to ask how your knee is healing or how your mom
                is settling in.
              </p>
              <p>
                As an independent, family-run pharmacy, we get to work the way we think care should
                work. We slow down and explain your medications in plain language. We call your doctor
                when something doesn&apos;t look right. And we recommend what is best for you, not
                what a head office wants sold this month.
              </p>
              <p>
                Many of the people we look after are seniors managing several medications, and the
                sons, daughters, and spouses who help them. We are here for all of you. Our job
                doesn&apos;t end at the counter. It ends when you feel confident about your health.
              </p>
            </div>
          </SectionReveal>
        </section>

        {/* Mission */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Our promise
            </span>
            <p className="mt-5 text-2xl font-medium leading-relaxed text-[var(--foreground)] md:text-3xl">
              To be the pharmacist you can call by name: someone who listens, explains things
              honestly, and cares about how you are doing long after your prescription is filled.
            </p>
          </div>
        </SectionReveal>

        {/* Team */}
        <div id="team" className="scroll-mt-24">
          <PharmacistTeamSection />
        </div>

        {/* Why us (anchor kept as #multilingual for header menu links) */}
        <section id="multilingual" className="scroll-mt-24">
          <SectionReveal className="bg-[var(--surface)]">
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Why Chilliwack families choose iHealth
                </h2>
                <p className="mt-4 text-lg text-[var(--muted)]">
                  The personal touch of a neighbourhood pharmacy, with the conveniences you need.
                </p>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {WHY_US.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Caregivers */}
        <section id="caregivers" className="scroll-mt-24">
          <SectionReveal className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-block rounded-full bg-[var(--brand-secondary-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-secondary-hover)]">
                  For families and caregivers
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl text-slate-900">
                  Looking after a parent&apos;s medications?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  Keeping track of refills, doctor changes, and pill schedules for someone you love is a
                  lot to carry. Bring their prescriptions to us and we&apos;ll help share the load, with
                  one team you can call or message any time we&apos;re open.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/transfer"
                    className={`${BTN_PRIMARY} ${FOCUS}`}
                  >
                    Transfer their prescriptions
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/services/myhealthpack"
                    className={`${BTN_SECONDARY} ${FOCUS}`}
                  >
                    About blister packs
                  </Link>
                </div>
              </div>
              <ul className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                {CAREGIVER_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.text} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand)] shadow-2xs">
                        <Icon size={20} />
                      </span>
                      <span className="pt-2 text-base leading-relaxed text-slate-700">{point.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SectionReveal>
        </section>

        {/* Direct billing & BC Fair PharmaCare */}
        <section id="billing" className="scroll-mt-24 border-y border-slate-200 bg-[var(--surface)] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block rounded-full bg-white border border-slate-200 px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
                  Insurance and direct billing
                </span>

                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl leading-tight">
                  We handle the paperwork for you
                </h2>

                <p className="text-lg leading-relaxed text-slate-700">
                  Medication coverage shouldn&apos;t be confusing. We bill your extended health plan
                  directly at the counter, so there are no paper receipts to send in and no waiting
                  to be paid back.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">No claims to file</h3>
                      <p className="mt-1 text-base text-slate-600 leading-relaxed">
                        We send your claim to your insurer electronically. You only pay any remaining
                        co-pay or deductible.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">Help with BC Fair PharmaCare</h3>
                      <p className="mt-1 text-base text-slate-600 leading-relaxed">
                        We can help you and your family understand your PharmaCare deductible and which
                        plans may apply to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                  <h3 className="text-lg font-semibold text-slate-900">Plans we bill directly</h3>
                  <p className="text-base text-slate-500 mt-1">Including, but not limited to:</p>

                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PHARMACY_INFO.accreditation.directBilling.map((plan) => (
                      <li
                        key={plan}
                        className="flex items-center gap-2.5 rounded-xl bg-[var(--surface)] p-3.5 border border-slate-200/80 text-slate-800"
                      >
                        <CheckCircle2 size={18} className="shrink-0 text-[var(--brand)]" />
                        <span className="text-base font-medium leading-tight">{plan}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-[var(--brand-subtle)] p-5">
                    <p className="text-base text-slate-700 leading-relaxed">
                      <strong>Don&apos;t see your plan?</strong> We work with most Canadian insurers.
                      Give us a call and we&apos;ll check your coverage for you.
                    </p>
                    <a
                      href={`tel:${PHARMACY_INFO.phoneClean}`}
                      className={`mt-3 inline-block text-base font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)] hover:underline rounded-sm ${FOCUS}`}
                    >
                      Call {PHARMACY_INFO.phone} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licensing & privacy -- deliberately low-key; plain facts only, see .agents/product-marketing.md */}
        <section id="accreditation" className="scroll-mt-24 border-t border-slate-200 py-8">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Licensing and privacy
            </h2>
            <ul className="mt-3 grid gap-3 text-base leading-relaxed text-slate-600 md:grid-cols-2 md:gap-8">
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
                <span>
                  Licensed community pharmacy. Our pharmacists are registered with the College of
                  Pharmacists of British Columbia.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Lock size={18} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
                <span>
                  PHIPA privacy standard: your health information stays confidential. See our{" "}
                  <Link href="/privacy" className={`font-semibold text-[var(--brand)] hover:underline rounded-sm ${FOCUS}`}>
                    privacy policy
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--brand-subtle)]">
          <SectionReveal className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              We&apos;d love to get to know you.
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Switching is free and simple. We contact your current pharmacy for you, so there are no
              awkward phone calls.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/transfer"
                className={`${BTN_PRIMARY} ${FOCUS}`}
              >
                Transfer my prescriptions
                <ArrowRight size={18} />
              </Link>
              <Link
                href={getBookingUrl()}
                className={`${BTN_SECONDARY} ${FOCUS}`}
              >
                <CalendarCheck size={18} />
                Book an appointment
              </Link>
            </div>
            <p className="mt-6 text-base text-[var(--muted)]">
              {PHARMACY_INFO.hoursShort} &middot; {PHARMACY_INFO.address.full} &middot;{" "}
              <a href={`tel:${PHARMACY_INFO.phoneClean}`} className={`font-semibold text-[var(--foreground)] hover:underline rounded-sm ${FOCUS}`}>
                {PHARMACY_INFO.phone}
              </a>
            </p>
          </SectionReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
