"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  X,
  Camera,
  Pill,
  Package,
  HelpCircle,
  Phone,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key press for keyboard accessibility
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const PRESETS = [
    {
      id: "photo",
      title: "Send Photo of Pill Bottle / Rx",
      desc: "Fastest for refills — no typing needed",
      icon: Camera,
      url: getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.photoRefill),
    },
    {
      id: "refill",
      title: "Order Prescription Refill",
      desc: "Ready for pickup or free delivery",
      icon: Pill,
      url: getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.refill),
    },
    {
      id: "status",
      title: "Check Order or Delivery",
      desc: "Find out if your meds are on their way",
      icon: Package,
      url: getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.delivery),
    },
    {
      id: "question",
      title: "Ask a Pharmacist",
      desc: "Advice on dosages, interactions, minor ailments",
      icon: HelpCircle,
      url: getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.question),
    },
  ];

  return (
    <aside
      aria-label="WhatsApp Pharmacist Assistance"
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-dialog-title"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.95 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, scale: 0.95 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl"
          >
            {/* Header with Pharmacist Info */}
            <div className="bg-[#128C7E] p-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/avatar1.webp"
                      alt="Licensed Pharmacist"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border-2 border-white object-cover bg-white"
                    />
                    <span
                      aria-label="Online"
                      className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"
                    />
                  </div>
                  <div>
                    <h2
                      id="whatsapp-dialog-title"
                      className="text-base font-semibold leading-tight text-white"
                    >
                      iHealth Pharmacy Team
                    </h2>
                    <p className="text-xs text-white/90">
                      Pharmacist on Duty • Abbotsford
                    </p>
                    <span className="mt-1 inline-block rounded bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white">
                      English • ਪੰਜਾਬੀ • Hindi
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close WhatsApp chat"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/20 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/95">
                Have a question or prescription? Chat with our Abbotsford pharmacy team on WhatsApp. You can also send a voice message or photo of your pill bottle if typing is difficult.
              </p>
            </div>

            {/* Quick Actions (Large Touch Targets for Seniors) */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Choose an option:
              </p>

              {PRESETS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 transition hover:border-[#25D366] hover:bg-green-50/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#128C7E] shadow-sm transition group-hover:bg-[#25D366] group-hover:text-white">
                      <item.icon size={20} />
                    </span>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[var(--muted)]">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[var(--muted)] transition group-hover:text-[#128C7E]"
                  />
                </a>
              ))}

              {/* Direct Call Fallback for Seniors who prefer talking */}
              <div className="mt-3 rounded-xl border border-dashed border-[var(--border)] bg-white p-3 text-center">
                <p className="text-xs text-[var(--muted)]">
                  Prefer speaking to someone right now?
                </p>
                <a
                  href={`tel:+1${PHARMACY_INFO.phoneRaw}`}
                  className="mt-1.5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"
                >
                  <Phone size={15} />
                  Call {PHARMACY_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Footer Assurance */}
            <div className="border-t border-[var(--border)] bg-gray-50 px-4 py-2.5 text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
                <ShieldCheck size={13} className="text-green-600" />
                Licensed BC Pharmacy • Confidential Care
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button: Large, Accessible, Clear Text for Seniors */}
      <div className="flex items-center gap-2">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open WhatsApp chat with pharmacist"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2.5 text-xs font-semibold text-[#128C7E] shadow-lg transition hover:bg-green-50"
          >
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
            Chat with Pharmacist
          </button>
        )}

        <motion.button
          type="button"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition hover:bg-[#1ea952] focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          {open ? <X size={24} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </aside>
  );
}