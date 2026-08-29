"use client";

import { useState } from "react";

const services = [
  {
    num: "01",
    title: "Immunizations",
    tag: "Walk-ins welcome",
    body: "Flu, COVID-19, shingles, pneumonia, Tdap, and travel vaccines — administered by certified immunizing pharmacists, no appointment needed. Most insurance plans cover vaccines at $0 out of pocket.",
    meta: ["7 days a week", "Ages 3+", "Travel consults available"],
  },
  {
    num: "02",
    title: "Home Delivery",
    tag: "Same-day in Abbotsford",
    body: "Order by 2 PM and your medications arrive at your door the same day — free within our Abbotsford delivery zone, anywhere in Abbotsford. Discreet packaging, signature optional, refrigerated items in insulated totes.",
    meta: ["Free over $25", "Order by 2 PM", "Mon–Sat"],
  },
  {
    num: "03",
    title: "Compounding",
    tag: "Made for you",
    body: "Our lab prepares custom strengths, dye-free and allergen-free formulas, flavored pediatric liquids, topical pain gels, and veterinary preparations. When the commercial version doesn't fit, we make the one that does.",
    meta: ["PCAB-trained staff", "48-hr turnaround", "Vet formulas too"],
  },
  {
    num: "04",
    title: "Med Sync",
    tag: "One pickup, every month",
    body: "We align all your maintenance medications to a single refill date. One call, one trip, zero gaps. We'll even phone your prescriber when renewals come due — you just show up once a month.",
    meta: ["Free to enroll", "Auto prescriber renewals", "Monthly check-in call"],
  },
];

export function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t-2 border-[#0f0f0e]">
      {services.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={s.num} className="border-b-2 border-[#0f0f0e]">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 px-2 py-6 text-left transition-colors hover:bg-[#c8f04a] sm:grid-cols-[5rem_1fr_auto_auto] sm:gap-8 sm:px-4"
            >
              <span className="font-mono text-sm tracking-widest text-[#0f0f0e]/60">
                {s.num}
              </span>
              <span className="font-display text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">
                {s.title}
              </span>
              <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-[#0f0f0e]/60 sm:block">
                {s.tag}
              </span>
              <span
                aria-hidden
                className={`font-display text-3xl leading-none transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "group-hover:rotate-90"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 px-2 pb-8 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:px-4">
                  <div className="hidden sm:block" />
                  <div>
                    <p className="max-w-2xl text-lg leading-relaxed">
                      {s.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {s.meta.map((m) => (
                        <li
                          key={m}
                          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]"
                        >
                          <span className="inline-block h-2 w-2 bg-[#c8f04a] ring-1 ring-[#0f0f0e]" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
