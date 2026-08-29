"use client";

import { useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#refill", label: "Refill" },
  { href: "#transfer", label: "Transfer" },
  { href: "#pharmacist", label: "Pharmacist" },
  { href: "#visit", label: "Visit" },
];

export function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="border-2 border-[#0f0f0e] bg-[#f6f4ef] px-3 py-2 font-display text-xs font-black uppercase tracking-widest"
      >
        {open ? "Close ✕" : "Menu ☰"}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-b-2 border-[#0f0f0e] bg-[#f6f4ef]">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-t border-[#0f0f0e]/20">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-4 font-display text-2xl font-black uppercase tracking-tight hover:bg-[#c8f04a]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="border-t-2 border-[#0f0f0e]">
              <a
                href="#refill"
                onClick={() => setOpen(false)}
                className="block bg-[#0f0f0e] px-6 py-4 font-display text-2xl font-black uppercase tracking-tight text-[#c8f04a]"
              >
                Refill RX →
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
