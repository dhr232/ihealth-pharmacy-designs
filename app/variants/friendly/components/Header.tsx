"use client";

import { useState } from "react";
import Icon from "./Icon";

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
        <a
          href="#top"
          className="flex items-center gap-2 rounded-lg px-1 py-1 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_4px_0_#15803d]">
            <Icon name="pill" size={22} />
          </span>
          <span className="text-xl font-bold text-[#14532d]" style={{ fontFamily: "Quicksand, 'Atkinson Hyperlegible', sans-serif", fontWeight: 700 }}>
            iHealth<span className="text-[#16a34a]"> Pharmacy</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-[#3f6212]/80 transition hover:-translate-y-0.5 hover:text-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+16045550199"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#d1fae5] px-4 py-2 text-sm font-bold text-[#166534] transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
          >
            <Icon name="phone" size={16} />
            (604) 555-0199
          </a>
          <a
            href="#refill"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_#15803d] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_0_#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 active:translate-y-0 active:shadow-[0_2px_0_#15803d]"
          >
            Refill RX
            <Icon name="sparkle" size={16} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d1fae5] text-[#14532d] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2 lg:hidden"
        >
          <Icon name={open ? "x" : "menu"} size={24} ariaHidden={false} ariaLabel={open ? "Close menu" : "Open menu"} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t-2 border-[#ffedd5] bg-[#fffdf8] px-5 pb-5 pt-3 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-semibold text-[#14532d] transition hover:bg-[#d1fae5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+16045550199"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#d1fae5] px-4 py-3 text-center font-bold text-[#166534] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
            >
              <Icon name="phone" size={18} />
              (604) 555-0199
            </a>
            <a
              href="#refill"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-4 py-3 text-center font-bold text-white shadow-[0_4px_0_#15803d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
            >
              Refill RX
              <Icon name="sparkle" size={18} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
