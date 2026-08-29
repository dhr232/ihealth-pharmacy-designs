"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Services", "#services"],
    ["Refill", "#refill"],
    ["Transfer", "#transfer"],
    ["Pharmacist", "#pharmacist"],
    ["Visit", "#visit"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#c9a35f22] bg-[#0e0e10]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-baseline gap-2">
          <span
            className="text-2xl font-light tracking-wide text-[#ece9e4]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Med<span className="text-[#c9a35f]">Corner</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.4em] text-[#ece9e4]/50 sm:inline">
            Pharmacy · Abbotsford
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[12px] uppercase tracking-[0.25em] text-[#ece9e4]/70 transition-colors hover:text-[#c9a35f]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="tel:+15125550134"
            className="text-sm text-[#ece9e4]/80 transition-colors hover:text-[#c9a35f]"
          >
            (604) 555-0199
          </a>
          <a
            href="#refill"
            className="border border-[#c9a35f66] px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#c9a35f] transition-colors hover:bg-[#c9a35f] hover:text-[#0e0e10]"
          >
            Refill RX
          </a>
        </div>

        <button
          className="text-2xl text-[#ece9e4] md:hidden"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-[#c9a35f22] bg-[#0e0e10] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="text-[13px] uppercase tracking-[0.3em] text-[#ece9e4]/80 hover:text-[#c9a35f]"
              >
                {label}
              </a>
            ))}
            <a
              href="tel:+15125550134"
              className="mt-2 text-sm text-[#c9a35f]"
            >
              Call (604) 555-0199
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
