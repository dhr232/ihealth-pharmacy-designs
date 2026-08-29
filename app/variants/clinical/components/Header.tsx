"use client";

import { useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Refills", href: "#refills" },
  { label: "Transfer", href: "#transfer" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Top utility bar */}
      <div className="hidden border-b border-slate-100 bg-slate-50 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5 text-xs text-slate-500">
          <p>
            Accepting new patients &amp; transfers ·{" "}
            <span className="font-medium text-teal-700">Same-day delivery in Abbotsford</span>
          </p>
          <p className="tracking-wide">BC College of Pharmacists Lic. #P-28441</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-700 text-white" aria-hidden="true">
            {/* pill / cross mark */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10.5 3.5h3v6h6v3h-6v6h-3v-6h-6v-3h6z" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-base font-semibold tracking-tight text-slate-900">
              iHealth
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Pharmacy · Abbotsford BC
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+15125550134"
            className="hidden items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 md:flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (604) 555-0199
          </a>
          <a
            href="#refills"
            className="hidden rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 sm:inline-block"
          >
            Refill RX
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-700 lg:hidden"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden" aria-label="Mobile">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <ul className="flex flex-col divide-y divide-slate-100">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 text-sm font-medium text-slate-700"
                  >
                    {item.label}
                    <span className="text-slate-300" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="#refills"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-teal-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Refill RX
              </a>
              <a
                href="tel:+15125550134"
                className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-800"
              >
                Call us
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
