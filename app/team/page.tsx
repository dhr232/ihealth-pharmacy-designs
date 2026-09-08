"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PharmacistTeamSection from "../components/PharmacistTeamSection";
import { BlurReveal } from "../components/MotionKit";
import { ShieldCheck, Heart, Award } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-slate-50/70 py-16 lg:py-20 border-b border-slate-200/60">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <BlurReveal>
              <span className="inline-block rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
                Our Pharmacy Staff
              </span>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Meet Our Caring Experts
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-3">
              <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
                Independent, licensed BC pharmacists with deep roots in Abbotsford. We provide patient-first consultations in English, Punjabi, and Hindi.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Team Grid */}
        <PharmacistTeamSection />

        {/* Clinical Philosophy */}
        <section className="py-20 max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-4">
                <Heart size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Personalized Consultations</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                You are never a prescription number to us. We take the time to review drug interactions, side effects, and optimize your dosing schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-4">
                <Award size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Advanced Prescribing Authority</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Our pharmacists hold full BC certification for Minor Ailment prescribing (PPRAC), contraceptive management, and injection administration.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)] mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">CPBC Regulated Excellence</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Fully licensed and in good standing with the College of Pharmacists of British Columbia (CPBC), adhering to the highest patient safety standards.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
