"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LanguageSwitcher from "./LanguageSwitcher";
import TextSizeAdjuster from "./TextSizeAdjuster";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

const SERVICE_PAGES = [
  { label: "Minor Ailments Clinic", href: "/services/minor-ailments" },
  { label: "Compounding", href: "/services/compounding" },
  { label: "Vaccinations", href: "/services/vaccinations" },
  { label: "MyHealthPack", href: "/services/myhealthpack" },
  { label: "Medication Review & Injections", href: "/services/med-review" },
  { label: "Prescription Delivery", href: "/services/delivery" },
];

const PATIENT_ACTIONS = [
  { label: "Prescription Refills", href: "/prescription-refills", desc: "Ready in 3 easy steps" },
  { label: "Transfer to iHealth", href: "/transfer", desc: "Switch in one request" },
  { label: "Vaccinations", href: "/vaccinations", desc: "Walk in or book ahead" },
];

const HOME_ANCHORS = [
  { label: "Contact", href: "/#contact" },
];
void HOME_ANCHORS;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/" || pathname === "/";
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

        <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex" aria-label="Main">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>

          <div className="relative" onMouseEnter={openActions} onMouseLeave={closeActionsSoon}>
            <button
              onClick={() => setActionsOpen((v) => !v)}
              aria-expanded={actionsOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100/70 hover:text-[var(--brand)]"
            >
              Refills & Booking
              <ChevronDown size={14} className={`transition-transform duration-150 ${actionsOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {actionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5"
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
                  {isHome && (
                    <>
                      <div className="my-1.5 border-t border-slate-100" />
                      <div className="grid grid-cols-2 gap-1">
                        {HOME_ANCHORS.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            role="menuitem"
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[var(--brand)]"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#about" className={navLinkClass}>About Us</Link>
          <Link href="/#blog" className={navLinkClass}>Blog</Link>
          <Link href="/#contact" className={navLinkClass}>Contact</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <TextSizeAdjuster />
          <LanguageSwitcher />

          <div className="h-4 w-px bg-slate-200 mx-0.5" aria-hidden="true" />

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with pharmacist on WhatsApp"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50/80 px-2.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 hover:border-emerald-300"
          >
            <MessageCircle size={14} className="text-emerald-600" />
            <span>WhatsApp</span>
          </a>

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

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[var(--border)] bg-white px-5 lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">
                Home
              </Link>
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Refills & Booking</p>
              {PATIENT_ACTIONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)]"
                >
                  {s.label}
                </Link>
              ))}
              <div className="my-2 border-t border-[var(--border)]" />
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Services</p>
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)]"
                >
                  {s.label}
                </Link>
              ))}
              <div className="my-2 border-t border-[var(--border)]" />
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Text Size
                </span>
                <TextSizeAdjuster />
              </div>
              <div className="px-4 py-2 notranslate" translate="no">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Language
                </p>
                <LanguageSwitcher />
              </div>
              <Link href="/#about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">About Us</Link>
              <Link href="/#blog" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">Blog</Link>
              <Link href="/#contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">Contact</Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1ea952]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-medium text-[var(--foreground)]"
              >
                <Phone size={18} />
                Call {PHARMACY_INFO.phoneDisplay}
              </a>
              <Link
                href="/prescription-refills"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Request Refill
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
