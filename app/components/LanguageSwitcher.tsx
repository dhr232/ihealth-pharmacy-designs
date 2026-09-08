"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Globe, Check, ChevronDown, Loader2 } from "lucide-react";
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
  { code: "fa", label: "Persian", native: "فਾਰسی" },
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
          InlineLayout: { SIMPLE: number; HORIZONTAL: number };
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              layout?: number;
              autoDisplay?: boolean;
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

function isValidLang(code: string | null): code is LangCode {
  if (!code) return false;
  return LANGUAGES.some((l) => l.code === code);
}

function getStoredLang(): LangCode {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLang(stored)) return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "en";
}

/**
 * Clear all Google Translate cookies across all possible domain and path variations
 */
function clearGoogleTranslateCookies() {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  const paths = ["/", window.location.pathname];
  const domains = ["", hostname, `.${hostname}`];

  const parts = hostname.split(".");
  while (parts.length > 1) {
    domains.push(`.${parts.join(".")}`);
    parts.shift();
  }

  paths.forEach((path) => {
    domains.forEach((domain) => {
      const domainAttr = domain ? `; domain=${domain}` : "";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainAttr}`;
      document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainAttr}`;
      document.cookie = `googtrans=/auto/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainAttr}`;
      document.cookie = `googtrans=; max-age=0; path=${path}${domainAttr}`;
    });
  });
}

/**
 * Set Google Translate cookie for the specified language
 */
function setGoogleTranslateCookie(code: LangCode) {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  const cookieVal = `/en/${code}`;

  document.cookie = `googtrans=${cookieVal}; path=/`;

  if (
    hostname &&
    !hostname.includes("localhost") &&
    !hostname.includes("127.0.0.1")
  ) {
    document.cookie = `googtrans=${cookieVal}; domain=.${hostname}; path=/`;
  }
}

export default function LanguageSwitcher() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LangCode>("en");
  const [translating, setTranslating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  /* ------------------------------------------------------------------ */
  /* Apply a language to Google Translate                               */
  /* ------------------------------------------------------------------ */
  const applyGTranslate = useCallback((code: LangCode) => {
    if (typeof window === "undefined") return;

    if (code === "en") {
      clearGoogleTranslateCookies();
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        const enOption = select.querySelector<HTMLOptionElement>(
          'option[value="en"]'
        );
        const defaultOption = select.querySelector<HTMLOptionElement>(
          'option[value=""]'
        );
        if (enOption) {
          select.value = "en";
        } else if (defaultOption) {
          select.value = "";
        } else {
          select.selectedIndex = 0;
        }
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } else {
      setGoogleTranslateCookie(code);
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /* Mount: load Google Translate script once, restore persisted lang   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = getStoredLang();
    if (stored !== "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(stored);
    }

    if (window.__iHealthGTEInitialized) {
      if (stored !== "en") {
        applyGTranslate(stored);
      }
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
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

      const currentStored = getStoredLang();
      if (currentStored !== "en") {
        applyGTranslate(currentStored);
      }
    };

    if (document.querySelector('script[data-ihealth-gtranslate="1"]')) return;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-ihealth-gtranslate", "1");
    document.head.appendChild(script);
  }, [applyGTranslate]);

  /* ------------------------------------------------------------------ */
  /* User clicks a language in the menu                                 */
  /* ------------------------------------------------------------------ */
  const applyLanguage = useCallback(
    (code: LangCode) => {
      const prev = active;
      setActive(code);
      setOpen(false);
      setTranslating(true);

      if (code === "en") {
        // Switching back to English
        clearGoogleTranslateCookies();
        try {
          window.localStorage.removeItem(STORAGE_KEY);
          window.localStorage.setItem(STORAGE_KEY, "en");
        } catch {
          /* ignore */
        }

        applyGTranslate("en");

        // If previously translated, reload to cleanly restore original English DOM nodes
        if (prev !== "en") {
          setTimeout(() => {
            window.location.reload();
          }, 150);
          return;
        }
      } else {
        // Switching to a non-English language
        try {
          window.localStorage.setItem(STORAGE_KEY, code);
        } catch {
          /* ignore */
        }

        applyGTranslate(code);
      }

      window.setTimeout(() => setTranslating(false), 1200);
    },
    [active, applyGTranslate]
  );

  /* ------------------------------------------------------------------ */
  /* Outside click + Escape close                                       */
  /* ------------------------------------------------------------------ */
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

  const activeLanguage =
    LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative notranslate" translate="no">
      {/* Hidden host element Google Translate replaces with its widget chrome.
          Off-screen + height 0 so users never see Google's native banner. */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      />

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change language. Current: ${activeLanguage.label}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-2.5 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--brand)] hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-1 sm:px-3"
      >
        {translating ? (
          <Loader2 size={16} aria-hidden="true" className="animate-spin" />
        ) : (
          <Globe size={16} aria-hidden="true" />
        )}
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
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl ring-1 ring-black/5"
          >
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Choose language
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                Page translates automatically.
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
