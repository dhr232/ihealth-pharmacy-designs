"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SERVICE_PAGES = [
  { label: "Minor Ailments Clinic", href: "/variants/friendly/services/minor-ailments" },
  { label: "Compounding", href: "/variants/friendly/services/compounding" },
  { label: "Vaccinations", href: "/variants/friendly/services/vaccinations" },
  { label: "MyHealthPack", href: "/variants/friendly/services/myhealthpack" },
  { label: "Medication Review & Injections", href: "/variants/friendly/services/med-review" },
  { label: "Prescription Delivery", href: "/variants/friendly/services/delivery" },
];

const HOME_ANCHORS = [
  { label: "Prescription Refills", href: "/variants/friendly#refill" },
  { label: "Transfer to iHealth", href: "/variants/friendly#transfer" },
  { label: "Virtual Doctor", href: "/variants/friendly#virtual-doctor" },
  { label: "Contact", href: "/variants/friendly#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/variants/friendly" || pathname === "/variants/friendly/";
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function openServices() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  }

  function closeServicesSoon() {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  }

  const navLinkClass =
    "rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--brand)]";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/variants/friendly" className="flex items-center gap-2 rounded-lg px-1 py-1 transition hover:opacity-90">
          <img
            src="/ihealth-pharmacy-designs/ihealth-logo-main.jpeg"
            alt="iHealth Pharmacy logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            iHealth
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          <Link href="/variants/friendly" className={navLinkClass}>
            Home
          </Link>

          <div className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--brand)]"
            >
              Services
              <ChevronDown size={16} className={`transition ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full z-50 w-[520px] rounded-xl border border-[var(--border)] bg-white p-4 shadow-lg"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICE_PAGES.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        role="menuitem"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)]"
                        onClick={() => setServicesOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                  {isHome && (
                    <>
                      <div className="my-2 border-t border-[var(--border)]" />
                      <div className="grid grid-cols-2 gap-1">
                        {HOME_ANCHORS.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            role="menuitem"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--brand)]"
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

          <a href="/variants/friendly#about" className={navLinkClass}>About Us</a>
          <a href="/variants/friendly#blog" className={navLinkClass}>Blog</a>
          <a href="/variants/friendly#contact" className={navLinkClass}>Contact</a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+16045550199"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--brand)]"
          >
            <Phone size={16} />
            (604) 555-0199
          </a>
          <a
            href="/variants/friendly#refill"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-hover)]"
          >
            Request Refill
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--foreground)] transition hover:bg-[var(--surface)] lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
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
              <Link href="/variants/friendly" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">
                Home
              </Link>
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
              <a href="/variants/friendly#about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">About Us</a>
              <a href="/variants/friendly#blog" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">Blog</a>
              <a href="/variants/friendly#contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]">Contact</a>
              <a
                href="tel:+16045550199"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm font-medium text-[var(--foreground)]"
              >
                <Phone size={18} />
                (604) 555-0199
              </a>
              <a
                href="/variants/friendly#refill"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Request Refill
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
