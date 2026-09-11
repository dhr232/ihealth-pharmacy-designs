"use client";

import { Pill, Clock, Stethoscope, ShieldCheck } from "lucide-react";
import CountUp from "./CountUp";
import { SectionReveal } from "./MotionKit";

const METRICS = [
  {
    icon: Pill,
    value: 10000,
    suffix: "+",
    label: "Prescriptions Filled",
    description: "Trusted by Abbotsford families for safe, accurate dispensing.",
  },
  {
    icon: Clock,
    value: 7,
    suffix: " Days",
    label: "Open Extended Hours",
    description: "Open 7 days a week with clinical pharmacist on duty.",
  },
  {
    icon: Stethoscope,
    value: 21,
    suffix: " Ailments",
    label: "Pharmacist Prescribing",
    description: "Walk-in assessment and treatment for common minor conditions.",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Direct Insurance Billing",
    description: "BC Fair PharmaCare, Blue Cross, Sun Life, Manulife, & NIHB.",
  },
];

export default function TrustMetricsBar() {
  return (
    <section className="relative z-10 -mt-8 mx-auto max-w-7xl px-5 lg:px-8">
      <SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-900/5">
          {METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={`flex flex-col p-4 rounded-xl transition hover:bg-slate-50/80 ${
                  idx !== 0 ? "lg:border-l lg:border-slate-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                      <CountUp value={m.value} suffix={m.suffix} duration={1.5} />
                    </span>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{m.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.description}</p>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
