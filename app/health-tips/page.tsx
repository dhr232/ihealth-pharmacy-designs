import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  Syringe,
  Heart,
  ShieldCheck,
  BookOpen,
  Stethoscope,
  FlaskConical,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Health Tips — iHealth Pharmacy Abbotsford",
  description:
    "Practical health advice from your local Abbotsford pharmacists. New patients, vaccinations, seniors, coverage, minor ailments, and compounding.",
};

type Article = {
  title: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  snippet: string;
  href: string;
};

const ARTICLES: Article[] = [
  {
    title: "5 questions to ask your pharmacist on your first visit",
    category: "New Patients",
    icon: BookOpen,
    snippet:
      "Your pharmacist is one of the most accessible healthcare professionals you'll ever meet. Here are five questions worth bringing to your first visit.",
    href: "#",
  },
  {
    title: "Flu shot season: what you need to know for BC 2026",
    category: "Vaccinations",
    icon: Syringe,
    snippet:
      "When does flu season peak in BC, who should get vaccinated, and what's new this year. A practical guide for Abbotsford families.",
    href: "#",
  },
  {
    title: "How compliance packaging helps seniors stay independent",
    category: "Seniors",
    icon: Heart,
    snippet:
      "Managing multiple medications is hard. Compliance packaging like MyHealthPack sorts your pills by day and time so you never miss a dose.",
    href: "#",
  },
  {
    title: "Understanding your BC Pharmacare coverage",
    category: "Coverage",
    icon: ShieldCheck,
    snippet:
      "BC Pharmacare, Fair PharmaCare, and private insurance can all work together. Here's how to maximize your coverage and lower your out-of-pocket costs.",
    href: "#",
  },
  {
    title: "When to use the minor ailments clinic vs. a doctor",
    category: "Minor Ailments",
    icon: Stethoscope,
    snippet:
      "BC pharmacists can now assess and prescribe for many common conditions. Here's when the minor ailments clinic is the right call — and when to see your doctor.",
    href: "#",
  },
  {
    title: "Compounding 101: when a custom medication makes sense",
    category: "Compounding",
    icon: FlaskConical,
    snippet:
      "If a standard prescription isn't working for you or your child, a custom-compounded medication might. Here's what compounding can — and can't — do.",
    href: "#",
  },
];

export default function HealthTipsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                Health Tips
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Health tips from your local pharmacist.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                Practical, evidence-based advice from the iHealth Pharmacy team. New articles every
                month.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Article grid */}
        <SectionReveal className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => {
              const Icon = article.icon;
              return (
                <article
                  key={article.title}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:border-[var(--brand)]/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                      <Icon size={16} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)] transition group-hover:text-[var(--brand)]">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {article.snippet}
                  </p>
                  <Link
                    href={article.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)]"
                    aria-label={`Read more: ${article.title}`}
                  >
                    Read more
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </SectionReveal>

        {/* Subscribe CTA */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Get new tips in your inbox.
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              We publish a short, useful email once a month. No spam, ever.
            </p>
            <Link
              href="/ihealth-pharmacy-designs/subscribe"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Subscribe to the newsletter
              <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}
