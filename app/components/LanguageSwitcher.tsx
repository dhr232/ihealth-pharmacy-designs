"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Languages spoken in British Columbia (per most recent census / community data).
// Order: English first (default), then ranked roughly by speaker population.
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "zh-CN", label: "Mandarin", native: "中文 (简体)" },
  { code: "zh-TW", label: "Cantonese", native: "中文 (繁體)" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "fr", label: "French", native: "Français" },
  { code: "tl", label: "Tagalog", native: "Tagalog" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "fa", label: "Persian", native: "فارسی" },
  { code: "es", label: "Spanish", native: "Español" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "ihealth_lang";

// Augment window with the bits of the Google Translate API we touch.
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          InlineLayout: { SIMPLE: number };
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              layout: number;
              autoDisplay: boolean;
            },
            elementId: string
          ): unknown;
        };
      };
    };
    googleTranslateElementInit?: () => void;
    __iHealthGTEInitialized?: boolean;
  }
}

export default function LanguageSwitcher() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LangCode>("en");
  const [scriptReady, setScriptReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement | null>(null);

  // Inject the Google Translate script exactly once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__iHealthGTEInitialized) {
      setScriptReady(true);
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      window.__iHealthGTEInitialized = true;
      setScriptReady(true);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-ihealth-gtranslate="1"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-ihealth-gtranslate", "1");
    document.head.appendChild(script);

    return () => {
      // Don't remove on unmount — the script must survive across navigations
      // because we share the translate element across the static pages.
    };
  }, []);

  // Restore last-selected language from storage on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) {
        setActive(stored);
      }
    } catch {
      /* ignore — storage may be blocked */
    }
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Apply a language: update the hidden Google select + dispatch change so the
  // widget actually translates, then mirror to storage.
  const applyLanguage = useCallback(
    (code: LangCode) => {
      setActive(code);
      setOpen(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }

      // Prefer Google's own hidden <select> if it's already mounted — that's
      // what the widget listens to internally.
      const select =
        hiddenSelectRef.current ??
        (document.querySelector<HTMLSelectElement>(
          ".goog-te-combo"
        ) as HTMLSelectElement | null);

      if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }

      // Fallback: poll briefly for the widget to finish bootstrapping.
      const start = Date.now();
      const poll = window.setInterval(() => {
        const s = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (s) {
          s.value = code;
          s.dispatchEvent(new Event("change", { bubbles: true }));
          window.clearInterval(poll);
        } else if (Date.now() - start > 4000) {
          window.clearInterval(poll);
        }
      }, 120);
    },
    []
  );

  const activeLanguage =
    LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative notranslate" translate="no">
      {/* Hidden host element Google Translate replaces with its widget chrome.
          Kept off-screen so users never see the native banner. */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />
      {/* Fallback mirror of the hidden Google select so applyLanguage() can
          find a target even before the widget bootstraps. */}
      <select
        ref={hiddenSelectRef}
        defaultValue={active}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(e) => applyLanguage(e.target.value as LangCode)}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change language. Current: ${activeLanguage.label}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-1 sm:px-3"
      >
        <Globe size={16} aria-hidden="true" />
        <span className="hidden sm:inline">{activeLanguage.label}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Select language"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl ring-1 ring-black/5"
          >
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Choose language
              </p>
            </div>
            <ul className="max-h-80 overflow-y-auto py-1">
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === active;
                return (
                  <li key={lang.code}>
                    <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => applyLanguage(lang.code)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition ${
                        isActive
                          ? "bg-[var(--brand-subtle)] text-[var(--brand)]"
                          : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium">{lang.label}</span>
                        {lang.native !== lang.label && (
                          <span className="text-xs text-[var(--muted)]">
                            {lang.native}
                          </span>
                        )}
                      </span>
                      {isActive && (
                        <Check
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-[var(--brand)]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            {!scriptReady && (
              <div className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[11px] text-[var(--muted)]">
                Translation loads on first use — your choice will appear after.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
