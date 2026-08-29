"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Services", href: "#services" },
    { label: "Refill", href: "#refill" },
    { label: "Transfer", href: "#transfer" },
    { label: "Our Pharmacist", href: "#pharmacist" },
    { label: "Visit Us", href: "#visit" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#ffedd5] bg-[#fffdf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-xl shadow-[0_4px_0_#15803d]">
            💊
          </span>
          <span className="font-[Quicksand] text-xl font-bold text-[#14532d]">
            iHealth<span className="text-[#16a34a]"> Pharmacy</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-[#3f6212]/70 transition hover:-translate-y-0.5 hover:text-[#16a34a]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+15125550194"
            className="rounded-full bg-[#ede9fe] px-4 py-2 text-sm font-bold text-[#5b21b6] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            📞 (604) 555-0199
          </a>
          <a
            href="#refill"
            className="rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_#15803d] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#15803d] active:translate-y-0 active:shadow-[0_2px_0_#15803d]"
          >
            Refill RX ✨
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d1fae5] text-xl text-[#14532d] transition hover:-translate-y-0.5 lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t-2 border-[#ffedd5] bg-[#fffdf8] px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-semibold text-[#14532d] transition hover:bg-[#d1fae5]"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+15125550194"
              className="mt-2 rounded-full bg-[#ede9fe] px-4 py-3 text-center font-bold text-[#5b21b6]"
            >
              📞 (604) 555-0199
            </a>
            <a
              href="#refill"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#16a34a] px-4 py-3 text-center font-bold text-white shadow-[0_4px_0_#15803d]"
            >
              Refill RX ✨
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
