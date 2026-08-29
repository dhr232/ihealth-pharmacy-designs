"use client";

import { useState } from "react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Refills", href: "#refills" },
  { label: "Transfer", href: "#transfer" },
  { label: "Our Story", href: "#pharmacist" },
  { label: "Visit Us", href: "#visit" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1f3d2b]/25 text-[#1f3d2b] transition-colors hover:bg-[#1f3d2b] hover:text-[#faf7f2]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full border-b border-[#1f3d2b]/15 bg-[#faf7f2] shadow-[0_18px_40px_-20px_rgba(31,61,43,0.35)]">
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-dashed border-[#1f3d2b]/15 last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-serif text-lg text-[#1f3d2b] transition-colors hover:text-[#c96f4a]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a
                href="tel:+15125550194"
                className="flex items-center justify-center gap-2 rounded-full bg-[#1f3d2b] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#faf7f2]"
              >
                Call (604) 555-0199
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
