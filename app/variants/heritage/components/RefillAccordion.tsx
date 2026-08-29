"use client";

import { useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "Call, click, or walk in",
    body: "Phone us at (604) 555-0199, use our online refill form, or just say hello at the counter. If we know you, we probably already have it ready.",
  },
  {
    n: "02",
    title: "We fill it while you live your life",
    body: "Most refills are ready within the hour. On multiple medications? We'll sync them to one pickup date so you make one trip, not four.",
  },
  {
    n: "03",
    title: "Pick up — or let us come to you",
    body: "Grab it on your way home, or take advantage of free same-day delivery anywhere in the Abbotsford and Abbotsford zip codes.",
  },
];

export default function RefillAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="divide-y divide-dashed divide-[#1f3d2b]/20 border-y border-dashed border-[#1f3d2b]/20">
      {STEPS.map((step, i) => {
        const open = openIndex === i;
        return (
          <div key={step.n}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="group flex w-full items-center gap-5 py-6 text-left"
            >
              <span className="font-serif text-2xl italic text-[#c96f4a] transition-transform group-hover:-translate-y-0.5">
                {step.n}
              </span>
              <span className="flex-1 font-serif text-xl sm:text-2xl text-[#1f3d2b]">{step.title}</span>
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1f3d2b]/30 text-[#1f3d2b] transition-all duration-300 ${
                  open ? "rotate-45 bg-[#1f3d2b] text-[#faf7f2]" : "group-hover:bg-[#1f3d2b]/5"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-xl pl-14 text-[15px] leading-relaxed text-[#1f3d2b]/75 sm:pl-16">{step.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
