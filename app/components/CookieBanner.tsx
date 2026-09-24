"use client";

import { useEffect, useState, useRef } from "react";
import { Cookie, X, Settings } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "ihealth-cookie-consent";

export default function CookieBanner() {
  const [hasStoredConsent, setHasStoredConsent] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check stored preferences after a brief delay
    const t = setTimeout(() => {
      const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (!stored) {
        setHasStoredConsent(false);
        setShowPanel(true);
      } else {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === "object") {
            setConsent({
              necessary: true,
              analytics: !!parsed.analytics,
              marketing: !!parsed.marketing,
            });
          }
        } catch {
          /* ignore invalid storage format */
        }
      }
    }, 1500);

    return () => clearTimeout(t);
  }, []);

  // Close on Escape or click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && showPanel) {
        setShowPanel(false);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        showPanel
      ) {
        setShowPanel(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  const save = (next: Consent) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, ts: new Date().toISOString() })
      );
    }
    setHasStoredConsent(true);
    setShowPanel(false);
    setShowSettings(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const declineOptional = () =>
    save({ necessary: true, analytics: false, marketing: false });

  return (
    <div ref={containerRef} className="fixed bottom-4 left-4 z-40">
      {/* Floating Popover Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie preferences"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-14 left-0 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xl shadow-slate-900/15"
          >
            {!showSettings ? (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EDF3FF] text-[#3D5FE0]">
                      <Cookie size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        Cookie Preferences
                      </h3>
                      <p className="text-[10px] text-slate-500">iHealth Privacy Control</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPanel(false)}
                    aria-label="Close cookie popup"
                    className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="text-xs leading-relaxed text-slate-600">
                  We use essential cookies to operate our pharmacy site and optional analytics to understand how you interact with our services.{" "}
                  <a
                    href="/privacy"
                    className="font-semibold text-[#3D5FE0] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="flex-1 rounded-lg bg-[#3D5FE0] py-2 px-3 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#2F4BC4]"
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      onClick={declineOptional}
                      className="flex-1 rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Essential Only
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="inline-flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition"
                  >
                    <Settings size={13} />
                    <span>Customize Choices</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Settings size={16} className="text-[#3D5FE0]" />
                    <h3 className="text-sm font-bold text-slate-900">Customize Cookies</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    aria-label="Back to overview"
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="mt-0.5 accent-[#3D5FE0]"
                      aria-label="Necessary cookies"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800">Essential (Always Active)</div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Required for secure login, cart, and appointment bookings.
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 rounded-lg p-2.5 border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) =>
                        setConsent((c) => ({ ...c, analytics: e.target.checked }))
                      }
                      className="mt-0.5 accent-[#3D5FE0]"
                      aria-label="Analytics cookies"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800">Analytics & Performance</div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Anonymous insights to help us optimize navigation.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 rounded-lg p-2.5 border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) =>
                        setConsent((c) => ({ ...c, marketing: e.target.checked }))
                      }
                      className="mt-0.5 accent-[#3D5FE0]"
                      aria-label="Marketing cookies"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800">Marketing & Guidance</div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Relevant health updates and clinic announcements.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => save(consent)}
                    className="flex-1 rounded-lg bg-[#3D5FE0] py-2 px-3 text-xs font-semibold text-white shadow-2xs hover:bg-[#2F4BC4] transition"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Small Cookie Icon on Bottom-Left */}
      <motion.button
        type="button"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        onClick={() => setShowPanel((p) => !p)}
        aria-label="Manage cookie preferences"
        aria-expanded={showPanel}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200/90 text-[#3D5FE0] shadow-lg shadow-slate-900/10 hover:border-[#3D5FE0] hover:bg-[#EDF3FF] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3D5FE0]/40 group cursor-pointer"
        title="Cookie Settings"
      >
        <Cookie size={19} className="transition-transform duration-200 group-hover:rotate-12" />

        {/* Pulse indicator when consent has not been set yet */}
        {!hasStoredConsent && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D5FE0] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3D5FE0]" />
          </span>
        )}
      </motion.button>
    </div>
  );
}