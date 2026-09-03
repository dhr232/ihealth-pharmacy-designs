"use client";

import { useEffect, useState } from "react";
import { Cookie, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "ihealth-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      // Delay slightly so it doesn't fight the loader
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (next: Consent) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...next, ts: new Date().toISOString() })
    );
    setVisible(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const declineOptional = () =>
    save({ necessary: true, analytics: false, marketing: false });

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-live="polite"
        aria-label="Cookie preferences"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xl sm:p-5"
      >
        {!showSettings ? (
          <div className="flex items-start gap-3">
            <div className="hidden shrink-0 rounded-lg bg-[var(--brand-subtle)] p-2 sm:block">
              <Cookie size={20} className="text-[var(--brand)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                We use cookies
              </h3>
              <p className="mt-1 text-xs text-[var(--muted)]">
                We use essential cookies to keep the site running and optional
                cookies to understand how you use it. You can choose what to
                allow.{" "}
                <a
                  href="/ihealth-pharmacy-designs/cookies"
                  className="font-medium text-[var(--brand)] underline-offset-2 hover:underline"
                >
                  Read our cookie policy
                </a>
                .
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={acceptAll}
                  className="rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--brand-hover)]"
                >
                  Accept all
                </button>
                <button
                  onClick={declineOptional}
                  className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                >
                  Essential only
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  <Settings size={14} />
                  Customize
                </button>
              </div>
            </div>
            <button
              onClick={declineOptional}
              aria-label="Dismiss cookie banner"
              className="shrink-0 rounded p-1 text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                Cookie preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
                className="rounded p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-start gap-3 rounded-lg bg-[var(--surface)] p-2.5">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5"
                  aria-label="Necessary cookies (always on)"
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    Necessary
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Required for the site to function. Always on.
                  </p>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2.5 hover:bg-[var(--surface)]">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent((c) => ({ ...c, analytics: e.target.checked }))
                  }
                  className="mt-0.5"
                  aria-label="Analytics cookies"
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    Analytics
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Help us understand traffic so we can improve the site.
                  </p>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2.5 hover:bg-[var(--surface)]">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent((c) => ({ ...c, marketing: e.target.checked }))
                  }
                  className="mt-0.5"
                  aria-label="Marketing cookies"
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    Marketing
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Personalized content and offers.
                  </p>
                </div>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => save(consent)}
                className="rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--brand-hover)]"
              >
                Save preferences
              </button>
              <button
                onClick={acceptAll}
                className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                Accept all
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}