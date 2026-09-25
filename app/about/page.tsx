import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PharmacistTeamSection from "../components/PharmacistTeamSection";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  HeartHandshake,
  Truck,
  Globe,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Lock,
  Languages,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — iHealth Pharmacy Chilliwack",
  description:
    "Independent, family-run pharmacy in Chilliwack, BC. Meet our pharmacists, learn our story, and discover what makes iHealth different.",
};

const WHY_US = [
  {
    icon: HeartHandshake,
    title: "Independently owned",
    body: "We're local owners, not a chain. Decisions are made in Chilliwack, for Chilliwack patients.",
  },
  {
    icon: Sparkles,
    title: "Fast refills",
    body: "Most prescriptions are filled the same day. Many in under 30 minutes for in-stock medications.",
  },
  {
    icon: Truck,
    title: "Free local delivery",
    body: "Free same-day delivery across Chilliwack for prescriptions, OTC, and compliance packs.",
  },
  {
    icon: Globe,
    title: "Multilingual care",
    body: "Fluent service in English, Punjabi, and Hindi. We meet you in the language you're most comfortable with.",
  },
  {
    icon: Stethoscope,
    title: "Clinical services",
    body: "Minor ailment prescribing, medication reviews, injections, and chronic disease support — all on-site.",
  },
  {
    icon: ShieldCheck,
    title: "Modern, secure tech",
    body: "PIPEDA-aligned digital tools for refills, transfers, and reminders — without compromising your privacy.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-8 lg:py-28">
            <BlurReveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                About iHealth Pharmacy
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Pharmacy care, close to home.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)] md:text-xl">
                Independent, family-run, and rooted in Chilliwack. We treat every patient like a neighbour.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="scroll-mt-24">
          <SectionReveal className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-slate-900">Our story</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                iHealth Pharmacy was opened with a simple idea: a neighbourhood pharmacy should feel
                like an extension of your family. No call-centres, no scripts, no rushing patients out
                the door. Just experienced pharmacists who know your name, your history, and the right
                questions to ask.
              </p>
              <p>
                We are proudly independent. That means we can take the time to explain your medications,
                coordinate with your doctor, and recommend what is actually best for you — not what a
                corporate head office has decided to push this quarter. When you call us, you reach
                someone who works in your community.
              </p>
              <p>
                Beyond prescriptions, we offer a growing range of clinical services: minor ailment
                consultations, vaccinations, compounding, medication reviews, and free local delivery.
                Our goal is to be the most trusted healthcare touchpoint in Chilliwack — the first
                place you think of when something health-related comes up.
              </p>
            </div>
          </SectionReveal>
        </section>

        {/* Mission */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)]">
              Our mission
            </span>
            <p className="mt-5 text-2xl font-medium leading-relaxed text-[var(--foreground)] md:text-3xl">
              To deliver accessible, evidence-based pharmacy care that respects every patient&apos;s
              time, language, and lived experience — and to be a trusted neighbour you can turn to
              for honest, plain-English health advice.
            </p>
          </div>
        </SectionReveal>

        {/* Team — Live synchronized with admin panel and identical to homepage */}
        <div id="team" className="scroll-mt-24">
          <PharmacistTeamSection />
        </div>

        {/* Why us / Multilingual Anchor */}
        <section id="multilingual" className="scroll-mt-24">
          <SectionReveal className="bg-[var(--surface)]">
            <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Why patients choose iHealth
                </h2>
                <p className="mt-4 text-lg text-[var(--muted)]">
                  Six things that make us a little different from the chain down the street.
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
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* BC Fair PharmaCare & Direct Insurance Billing */}
        <section id="billing" className="scroll-mt-24 border-y border-slate-200 bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              
              {/* Left Column: Context Strategy & Patient Education */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block rounded-full bg-blue-50 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
                  Insurance & Direct Billing
                </span>
                
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl leading-tight">
                  Direct Billing & BC Fair PharmaCare Assistance
                </h2>

                <p className="text-base leading-relaxed text-slate-600">
                  Navigating medication coverage shouldn&apos;t be confusing or stressful. At iHealth Pharmacy, we bill your extended health plan directly at the dispensary counter so you never have to submit paper receipts or wait for reimbursement checks.
                </p>

                {/* 3 Pillar Cards based on Content Strategy */}
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Zero Out-of-Pocket Waiting</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        We submit electronically to your insurer in real time. You only pay the remaining copay or deductible, if applicable.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">BC Fair PharmaCare Registration Support</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Our pharmacists help Chilliwack families and seniors verify their provincial deductible thresholds and coordinate Plans C, G (Mental Health), and I.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                      <HeartHandshake size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">NIHB & First Nations Health Authority (FNHA)</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Proudly supporting Indigenous community members with full direct billing for eligible Non-Insured Health Benefits (NIHB) medications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Accepted Insurers Grid & Reassurance */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Accepted Extended Health Plans
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Direct electronic billing at our dispensary counter
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0">
                      Instant Billing
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      "BC Fair PharmaCare",
                      "Pacific Blue Cross",
                      "Sun Life",
                      "Manulife",
                      "Canada Life",
                      "GreenShield Canada",
                      "ClaimSecure",
                      "Desjardins",
                      "NIHB / FNHA",
                      "Veterans Affairs (VAC)",
                      "Medavie Blue Cross",
                      "Equitable Life",
                    ].map((plan) => (
                      <div
                        key={plan}
                        className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-2xs border border-slate-200/80 text-slate-800"
                      >
                        <ShieldCheck size={15} className="shrink-0 text-blue-600" />
                        <span className="text-xs font-semibold leading-tight">{plan}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Don&apos;t see your plan listed?</strong> We work with virtually all Canadian private insurers and student health networks. Simply bring your benefit card or policy details and our staff will verify your coverage in seconds.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <a
                        href="tel:6043928393"
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        Call to verify your plan: (604) 392-8393 &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Accreditation & Privacy Standards */}
        <section id="accreditation" className="scroll-mt-24 bg-slate-50/70 border-b border-slate-200/80 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                Regulatory Standards & Security
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl text-slate-900">
                Accredited Clinical Pharmacy Care
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                iHealth Pharmacy operates in full compliance with the rigorous standards established by the College of Pharmacists of British Columbia and Canadian healthcare data regulations.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 mb-4">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-900">College of Pharmacists of BC</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Fully licensed community practice dispensary meeting all provincial dispensing, sterile and non-sterile compounding, and pharmacist prescribing regulations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 mb-4">
                  <Lock size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-900">PHIPA & PIPEDA Privacy Standard</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  All digital prescriptions, refill requests, and patient health profiles are protected under end-to-end 256-bit SSL encryption adhering strictly to Canadian health privacy legislation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700 mb-4">
                  <HeartHandshake size={22} />
                </div>
                <h3 className="text-base font-bold text-slate-900">BC PharmaNet Integration</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Direct connection with the provincial secure electronic network, ensuring complete medication history checks, duplicate therapy prevention, and allergen safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <SectionReveal className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Come see us in person.
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Walk in any time, or book a free medication review with one of our pharmacists.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Visit us
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services/med-review"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <CalendarCheck size={18} />
              Book a med review
            </Link>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
