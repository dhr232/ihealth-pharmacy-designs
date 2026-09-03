import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — iHealth Pharmacy Abbotsford",
  description:
    "Independent, family-run pharmacy in Abbotsford, BC. Meet our pharmacists, learn our story, and discover what makes iHealth different.",
};

const TEAM = [
  {
    name: "Dr. Amanpreet Kaur, PharmD",
    role: "Lead Pharmacist & Owner",
    years: 12,
    bio: "Amanpreet founded iHealth Pharmacy to bring a more personal, clinically rigorous approach to community pharmacy care in Abbotsford.",
  },
  {
    name: "Dr. Rohan Mehta, PharmD",
    role: "Clinical Pharmacist",
    years: 8,
    bio: "Rohan leads our minor ailments clinic and chronic disease management programs, with a special interest in diabetes care.",
  },
  {
    name: "Dr. Priya Sharma, PharmD",
    role: "Compounding Pharmacist",
    years: 10,
    bio: "Priya runs our compounding lab and works closely with prescribers to design custom formulations for patients of all ages.",
  },
  {
    name: "Dr. James Chen, PharmD",
    role: "Pharmacy Manager",
    years: 6,
    bio: "James keeps the day-to-day running smoothly and leads our vaccinations, travel health, and injection services.",
  },
];

const WHY_US = [
  {
    icon: HeartHandshake,
    title: "Independently owned",
    body: "We're local owners, not a chain. Decisions are made in Abbotsford, for Abbotsford patients.",
  },
  {
    icon: Sparkles,
    title: "Fast refills",
    body: "Most prescriptions are filled the same day. Many in under 30 minutes for in-stock medications.",
  },
  {
    icon: Truck,
    title: "Free local delivery",
    body: "Free same-day delivery across Abbotsford for prescriptions, OTC, and compliance packs.",
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
                Independent, family-run, and rooted in Abbotsford. We treat every patient like a neighbour.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Story */}
        <SectionReveal className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Our story</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[var(--foreground)]">
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
              Our goal is to be the most trusted healthcare touchpoint in Abbotsford — the first
              place you think of when something health-related comes up.
            </p>
          </div>
        </SectionReveal>

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

        {/* Team */}
        <SectionReveal className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Meet the team</h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Licensed pharmacists, real people, and your neighbours in Abbotsford.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-2xl font-semibold text-[var(--brand)]"
                  aria-hidden="true"
                >
                  {member.name
                    .replace(/^Dr\.\s+/, "")
                    .split(" ")
                    .map((part) => part[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm font-medium text-[var(--brand)]">{member.role}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[var(--muted)]">
                  {member.years} years experience
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{member.bio}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Why us */}
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
              href="/ihealth-pharmacy-designs/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Visit us
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/ihealth-pharmacy-designs/services/med-review"
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
