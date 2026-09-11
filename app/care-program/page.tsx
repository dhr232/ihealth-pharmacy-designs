"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PatientCareProgramSection from "../components/PatientCareProgramSection";
import FAQSection from "../components/FAQSection";
import { BlurReveal } from "../components/MotionKit";

export default function CareProgramPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-slate-50/70 py-16 lg:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <BlurReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
                Community Health Initiative
              </span>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                The iHealth Patient Care Program
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-3">
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Personalized medication management, automatic refill coordination, and free doorstep delivery in Abbotsford. 100% free with no membership fees.
              </p>
            </BlurReveal>
          </div>
        </section>

        <PatientCareProgramSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
