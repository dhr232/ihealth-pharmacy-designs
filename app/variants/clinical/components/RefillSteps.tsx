"use client";

import { useState } from "react";

type Step = {
  key: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  time: string;
};

const steps: Step[] = [
  {
    key: "01",
    label: "Send it in",
    title: "Send your refill in under 60 seconds",
    body: "Use our online form, the iHealth app, or a quick phone call. All we need is your name, date of birth, and the prescription number printed on the label.",
    points: [
      "Online form, app, or phone — your choice",
      "No account setup required for refills",
      "Attach a note for the pharmacist if anything changed",
    ],
    time: "~1 min",
  },
  {
    key: "02",
    label: "We prepare it",
    title: "A pharmacist verifies and fills it",
    body: "Your pharmacist checks the drug, dose, and your insurance, then contacts your prescriber if a renewal is needed. Medications you sync with us are filled together, so everything is ready on one date.",
    points: [
      "Drug-interaction and insurance check on every fill",
      "Automatic prescriber outreach for renewals",
      "Med sync: all your scripts ready the same day each month",
    ],
    time: "2–4 hrs",
  },
  {
    key: "03",
    label: "Pick up or get it",
    title: "Pick it up today, or we deliver today",
    body: "You'll get a text when your order is ready. Collect it at the counter (no line for refills) or choose free same-day delivery anywhere in the Abbotsford area.",
    points: [
      "Text alerts — no waiting around the store",
      "Free same-day delivery in Abbotsford, by 6pm",
      "Flu or travel vaccine add-ons available at pickup",
    ],
    time: "Same day",
  },
];

export function RefillSteps() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div>
      {/* Step tabs */}
      <div
        role="tablist"
        aria-label="How refills work"
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {steps.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={isActive}
              aria-controls={`refill-panel-${s.key}`}
              id={`refill-tab-${s.key}`}
              onClick={() => setActive(i)}
              className={[
                "group flex items-center gap-4 rounded-md border px-4 py-4 text-left transition-colors",
                isActive
                  ? "border-teal-700 bg-teal-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-600 hover:bg-teal-50/50",
              ].join(" ")}
            >
              <span
                className={[
                  "font-heading text-2xl font-semibold tabular-nums",
                  isActive ? "text-white" : "text-teal-700",
                ].join(" ")}
              >
                {s.key}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug">{s.label}</span>
                <span
                  className={[
                    "block text-xs",
                    isActive ? "text-teal-100" : "text-slate-500",
                  ].join(" ")}
                >
                  {s.time}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Step panel */}
      <div
        key={step.key}
        role="tabpanel"
        id={`refill-panel-${step.key}`}
        aria-labelledby={`refill-tab-${step.key}`}
        className="mt-6 rounded-md border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 className="font-heading max-w-md text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {step.title}
          </h3>
          <span className="rounded-full bg-[#ccfbf1] px-3 py-1 text-xs font-semibold text-teal-800">
            {step.time}
          </span>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{step.body}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {step.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2.5 text-sm text-slate-700"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-teal-700"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          <a
            href="#visit"
            className="rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Start a refill
          </a>
          <p className="text-xs text-slate-500">
            Refills accepted 8am–7pm Mon–Fri, 9am–2pm Sat
          </p>
        </div>
      </div>
    </div>
  );
}
