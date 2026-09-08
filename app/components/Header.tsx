"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LanguageSwitcher from "./LanguageSwitcher";
import TextSizeAdjuster from "./TextSizeAdjuster";
import { PHARMACY_INFO } from "@/data/pharmacy-info";

const SERVICE_PAGES = [
  { label: "All Services Overview", href: "/services" },
  { label: "Minor Ailments Clinic", href: "/services/minor-ailments" },
  { label: "Custom Compounding", href: "/services/compounding" },
  { label: "Vaccinations & Injections", href: "/services/vaccinations" },
  { label: "MyHealthPack Blister Packs", href: "/services/myhealthpack" },
  { label: "Medication Review", href: "/services/med-review" },
  { label: "Free Prescription Delivery", href: "/services/delivery" },
];

const PATIENT_ACTIONS = [
  { label: "Prescription Refills", href: "/prescription-refills", desc: "Ready in 3 easy steps" },
  { label: "Transfer to iHealth", href: "/transfer", desc: "Switch in one simple request" },
  { label: "Patient Care Program", href: "/care-program", desc: "Free auto-sync & doctor renewals" },
  { label: "Vaccinations & Flu Shots", href: "/vaccinations", desc: "Walk-in or book ahead" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const actionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (actionsTimeoutRef.current) clearTimeout(actionsTimeoutRef.current);
    };
  }, []);

  function openServices() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  }

  function closeServicesSoon() {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  }

  function openActions() {
    if (actionsTimeoutRef.current) clearTimeout(actionsTimeoutRef.current);
    setActionsOpen(true);
  }

  function closeActionsSoon() {
    actionsTimeoutRef.current = setTimeout(() => setActionsOpen(false), 150);
  }

  const navLinkClass =
    "rounded-md px-2.5 py-1 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100/70 hover:text-[var(--brand)]";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-md py-1 transition hover:opacity-90">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ihealth-logo-main.jpeg"
            alt="iHealth Pharmacy logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-contain ring-1 ring-black/5"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              iHealth
            </span>
            <span className="hidden text-[11px] font-medium tracking-wide uppercase text-slate-400 sm:inline">
              Pharmacy
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex" aria-label="Main">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>

          {/* Refills & Booking Dropdown */}
          <div className="relative" onMouseEnter={openActions} onMouseLeave={closeActionsSoon}>
            <button
              onClick={() => setActionsOpen((v) => !v)}
              aria-expanded={actionsOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100/70 hover:text-[var(--brand)]"
            >
              Refills & Care
              <ChevronDown size={14} className={`transition-transform duration-150 ${actionsOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {actionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-1.5 w-76 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
                  role="menu"
                >
                  {PATIENT_ACTIONS.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2 transition hover:bg-slate-50"
                      onClick={() => setActionsOpen(false)}
                    >
                      <span className="block text-xs font-semibold text-slate-900">{s.label}</span>
                      <span className="block text-[11px] text-slate-500">{s.desc}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100/70 hover:text-[var(--brand)]"
            >
              Services
              <ChevronDown size={14} className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-1.5 w-[480px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICE_PAGES.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        role="menuitem"
                        className="rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand)]"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className={navLinkClass}>About Us</Link>
          <Link href="/team" className={navLinkClass}>Pharmacists</Link>
          <Link href="/faq" className={navLinkClass}>FAQ</Link>
          <Link href="/#blog" className={navLinkClass}>Blog</Link>
          <Link href="/#contact" className={navLinkClass}>Contact</Link>
        </nav>

        {/* Right Utilities & Refill Button */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <TextSizeAdjuster />
          <LanguageSwitcher />

          <a
            href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-slate-600 transition hover:text-[var(--brand)] hover:bg-slate-50"
          >
            <Phone size={13} className="text-slate-400" />
            <span>{PHARMACY_INFO.phoneDisplay}</span>
          </a>

          <Link
            href="/prescription-refills"
            className="inline-flex h-8 items-center justify-center rounded-md bg-[var(--brand)] px-3 text-xs font-semibold text-white shadow-xs transition hover:bg-[var(--brand-hover)] active:scale-[0.98]"
          >
            Request Refill
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white px-5 lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Home
              </Link>
              <p className="px-4 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Refills & Care</p>
              {PATIENT_ACTIONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand)]"
                >
                  {s.label}
                </Link>
              ))}

              <div className="my-1 border-t border-slate-100" />
              <p className="px-4 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Services</p>
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[var(--brand)]"
                >
                  {s.label}
                </Link>
              ))}

              <div className="my-1 border-t border-slate-100" />
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">About Us</Link>
              <Link href="/team" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">Our Pharmacists</Link>
              <Link href="/faq" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">FAQ</Link>
              <Link href="/#blog" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">Blog</Link>
              <Link href="/#contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50">Contact</Link>

              <div className="my-2 border-t border-slate-100" />
              <div className="flex items-center justify-between px-4 py-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Text Size
                </span>
                <TextSizeAdjuster />
              </div>
              <div className="px-4 py-1 notranslate" translate="no">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Language
                </p>
                <LanguageSwitcher />
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-800"
                >
                  <Phone size={16} />
                  Call {PHARMACY_INFO.phoneDisplay}
                </a>
                <Link
                  href="/prescription-refills"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] py-2.5 text-center text-sm font-semibold text-white shadow-xs"
                >
                  Request Refill
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
