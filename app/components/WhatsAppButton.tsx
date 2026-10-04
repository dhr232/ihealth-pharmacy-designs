"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  Camera,
  Pill,
  FilePlus,
  Package,
  HelpCircle,
  Phone,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { PHARMACY_INFO, getWhatsAppUrl } from "@/data/pharmacy-info";

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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

  // Hidden on the booking wizard: its sticky Continue/Confirm bar sits in the same
  // bottom-right corner, and the widget would cover (and swallow clicks on) that button.
  // booking.ihealthpharmacy.ca serves the wizard at "/", so check the host as well.
  const pathname = usePathname();
  const onBookingHost = useSyncExternalStore(
    () => () => {},
    () => window.location.hostname.startsWith("booking."),
    () => false
  );
  if (pathname?.startsWith("/book") || onBookingHost) return null;

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
      id: "new-prescription",
      title: "Submit New Prescription",
      desc: "From your doctor, clinic, or hospital",
      icon: FilePlus,
      url: getWhatsAppUrl(PHARMACY_INFO.whatsapp.presets.newPrescription),
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
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6"
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
            className="fixed inset-x-3 bottom-[4.75rem] z-50 flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl sm:static sm:inset-auto sm:mb-3 sm:max-h-[min(40rem,calc(100dvh-8rem))] sm:w-[24rem]"
          >
            {/* Header with Pharmacist Info */}
            <div className="shrink-0 bg-[#128C7E] p-4 text-white">
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
                      Pharmacist on Duty • Chilliwack
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

              <p className="mt-3 hidden text-xs leading-relaxed text-white/95 sm:block">
                Have a question or prescription? Chat with our Chilliwack pharmacy team on WhatsApp. You can also send a voice message or photo of your pill bottle if typing is difficult.
              </p>
            </div>

            {/* Quick Actions (Large Touch Targets for Seniors) */}
            <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain p-3 sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Choose an option:
              </p>

              {PRESETS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 transition hover:border-[#25D366] hover:bg-green-50/50 sm:p-3.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#128C7E] shadow-sm transition group-hover:bg-[#25D366] group-hover:text-white">
                      <item.icon size={20} />
                    </span>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-semibold leading-snug text-[var(--foreground)]">
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
            <div className="shrink-0 border-t border-[var(--border)] bg-gray-50 px-4 py-2.5 text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
                <ShieldCheck size={13} className="text-green-600" />
                Licensed BC Pharmacy • Confidential Care
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phones: tap outside the sheet to close it */}
      {open && (
        <button
          type="button"
          aria-label="Close WhatsApp chat"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/25 sm:hidden"
        />
      )}

      {/* Floating trigger: just the WhatsApp logo, with a gentle wiggle every few seconds */}
      <motion.button
        type="button"
        animate={
          shouldReduceMotion || open
            ? { rotate: 0 }
            : { rotate: [0, -14, 12, -10, 8, -4, 0] }
        }
        transition={
          shouldReduceMotion || open
            ? { duration: 0 }
            : { duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.5 }
        }
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Message us on WhatsApp"}
        aria-expanded={open}
        className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-colors hover:bg-[#1ea952] focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        {open ? <X size={22} /> : <WhatsAppLogo className="h-7 w-7" />}
      </motion.button>
    </aside>
  );
}