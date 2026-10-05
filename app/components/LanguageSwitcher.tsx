"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Globe, Check, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Languages offered to patients; each is shown in its own script.
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "zh-CN", label: "Mandarin", native: "中文 (简体)" },
  { code: "fr", label: "French", native: "Français" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "ihealth_lang";
const LANG_CHANGE_EVENT = "ihealth_lang_change";

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
 * Remove all Google Translate cookies across all path and domain variations
 */
function clearAllGoogleTranslateCookies() {
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
 * Set Google Translate cookie for the chosen language
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

// How long to wait for Google's widget to load and finish translating before giving up.
const TRANSLATE_TIMEOUT_MS = 30000;
// Google's <select> appears before the widget is wired up. A language change fired in that gap
// leaves the widget wedged (it claims to be translated but never translates) until the page is
// reloaded, so the first apply waits until the page is at least this old.
const WIDGET_READY_MS = 4000;
const RELOAD_FLAG_KEY = "ihealth_lang_reload";
/** Google wraps every translated text node in <font style="vertical-align: inherit">. */
function isPageTranslated() {
  return document.querySelector('font[style*="vertical-align"]') !== null;
}

/** Visible page text, used to confirm a language switch actually changed the content. */
function pageTextSnapshot() {
  const root = document.querySelector("main") ?? document.body;
  return (root as HTMLElement).innerText.slice(0, 2000);
}

export default function LanguageSwitcher() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LangCode>("en");
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // Incremented per attempt so a newer choice cancels an older, still-polling one.
  const attemptRef = useRef(0);

  /* ------------------------------------------------------------------ */
  /* Direct Google Translate driver                                     */
  /* ------------------------------------------------------------------ */
  const applyGTranslate = useCallback((code: LangCode) => {
    if (typeof window === "undefined") return;

    if (code === "en") {
      clearAllGoogleTranslateCookies();
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = "";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (document.documentElement) {
        document.documentElement.classList.remove("translated-ltr", "translated-rtl");
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

  /** Drop back to English without a reload (used when translation cannot complete). */
  const revertToEnglish = useCallback(() => {
    clearAllGoogleTranslateCookies();
    try {
      window.localStorage.setItem(STORAGE_KEY, "en");
    } catch {
      /* ignore */
    }
    applyGTranslate("en");
    document.documentElement.lang = "en";
    setActive("en");
    window.dispatchEvent(new CustomEvent<LangCode>(LANG_CHANGE_EVENT, { detail: "en" }));
  }, [applyGTranslate]);

  /**
   * Drive Google's hidden <select> and confirm the page really translated.
   * `force` = a user choice: always apply, and require the page text to change.
   * Otherwise (page load) Google usually translates from the cookie by itself.
   */
  const translateTo = useCallback(
    (code: LangCode, force: boolean, onDone: (ok: boolean) => void) => {
      const attempt = ++attemptRef.current;
      const startedAt = Date.now();
      let applied = false;
      let applyCount = 0;
      let nextApplyAt = 0;
      let before = "";

      const tick = () => {
        if (attempt !== attemptRef.current) return;
        const elapsed = Date.now() - startedAt;
        const combo = document.querySelector(".goog-te-combo");

        // Apply once the widget is ready, and retry once if Google has not responded.
        if (
          combo &&
          window.performance.now() >= WIDGET_READY_MS &&
          applyCount < 2 &&
          elapsed >= nextApplyAt &&
          (force || !isPageTranslated())
        ) {
          if (!applied) before = pageTextSnapshot();
          applied = true;
          applyCount++;
          nextApplyAt = elapsed + 5000;
          applyGTranslate(code);
        }

        const translated = isPageTranslated();
        const done = force ? applied && translated && pageTextSnapshot() !== before : translated;
        if (done) {
          // Google does not always update the page language; keep it correct for screen readers.
          document.documentElement.lang = code;
          onDone(true);
          return;
        }
        if (elapsed > TRANSLATE_TIMEOUT_MS) {
          onDone(false);
          return;
        }
        window.setTimeout(tick, 250);
      };
      window.setTimeout(tick, 0);
    },
    [applyGTranslate]
  );

  /* ------------------------------------------------------------------ */
  /* Sync state across all instances (desktop & mobile) via events      */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Google's widget mishandles a language cookie that already exists when it starts: it flags the
    // page as translated without translating it, then ignores a repeat of the same language. So the
    // cookie is always cleared before the widget loads, and the saved language is applied through
    // the select afterwards, exactly like a fresh choice.
    clearAllGoogleTranslateCookies();

    const initialLang = getStoredLang();
    if (initialLang !== "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(initialLang);
      // Returning visitor: make sure their saved language is really applied to this page.
      // If Google is slow or unreachable, show the truthful English state but KEEP the saved
      // choice, so the next page the visitor opens tries again.
      translateTo(initialLang, false, (ok) => {
        let alreadyRetried = false;
        try {
          alreadyRetried = window.sessionStorage.getItem(RELOAD_FLAG_KEY) === initialLang;
          if (ok) window.sessionStorage.removeItem(RELOAD_FLAG_KEY);
        } catch {
          /* sessionStorage unavailable */
        }
        if (ok) return;
        if (!alreadyRetried) {
          // A wedged widget only recovers on a fresh page load. Try that once per language.
          try {
            window.sessionStorage.setItem(RELOAD_FLAG_KEY, initialLang);
            window.location.reload();
            return;
          } catch {
            /* fall through to the English state */
          }
        }
        document.documentElement.lang = "en";
        setActive("en");
      });
    } else {
      clearAllGoogleTranslateCookies();
    }

    function handleLangChange(e: Event) {
      const customEvent = e as CustomEvent<LangCode>;
      if (customEvent.detail && isValidLang(customEvent.detail)) {
        setActive(customEvent.detail);
      }
    }

    function handleStorage() {
      const stored = getStoredLang();
      setActive(stored);
    }

    window.addEventListener(LANG_CHANGE_EVENT, handleLangChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(LANG_CHANGE_EVENT, handleLangChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [translateTo, revertToEnglish]);

  /* ------------------------------------------------------------------ */
  /* Load Google Translate script once                                  */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.__iHealthGTEInitialized) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          // HORIZONTAL renders the hidden <select class="goog-te-combo"> that applyGTranslate
          // drives. SIMPLE renders only a link + iframe menu and never creates the select.
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      window.__iHealthGTEInitialized = true;
    };

    if (document.querySelector('script[data-ihealth-gtranslate="1"]')) return;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-ihealth-gtranslate", "1");
    document.head.appendChild(script);
  }, []);

  /* ------------------------------------------------------------------ */
  /* User selects a language from the menu                              */
  /* ------------------------------------------------------------------ */
  const applyLanguage = useCallback(
    (code: LangCode) => {
      setOpen(false);
      setError(null);
      setTranslating(true);
      setActive(code);

      // Notify other LanguageSwitcher instances on the page
      window.dispatchEvent(
        new CustomEvent<LangCode>(LANG_CHANGE_EVENT, { detail: code })
      );

      if (code === "en") {
        attemptRef.current++; // cancel any translation still in flight
        clearAllGoogleTranslateCookies();
        try {
          window.localStorage.removeItem(STORAGE_KEY);
          window.localStorage.setItem(STORAGE_KEY, "en");
        } catch {
          /* ignore */
        }

        applyGTranslate("en");

        // Force a clean reload so the browser drops all translated text nodes
        setTimeout(() => {
          window.location.reload();
        }, 100);
        return;
      }

      // Switching to another language
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* ignore */
      }

      translateTo(code, true, (ok) => {
        setTranslating(false);
        if (!ok) {
          // Google did not respond (blocked, offline, or rate limited): be honest and
          // leave the page in English instead of claiming a language that is not applied.
          revertToEnglish();
          setError("Translation is unavailable right now. Please try again, or call us.");
          setOpen(true);
        }
      });
    },
    [applyGTranslate, translateTo, revertToEnglish]
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
    <div ref={containerRef} className="notranslate sm:relative" translate="no">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change language. Current: ${activeLanguage.label}`}
        className="inline-flex h-11 w-11 items-center justify-center gap-1.5 rounded-full border border-[var(--border)] bg-slate-50/70 text-sm font-medium text-slate-700 shadow-xs transition hover:border-[var(--brand)] hover:bg-white hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-1 sm:w-auto sm:px-3"
      >
        {translating ? (
          <Loader2 size={18} aria-hidden="true" className="animate-spin text-[var(--brand)]" />
        ) : (
          <Globe size={18} aria-hidden="true" className="text-slate-500" />
        )}
        <span className="hidden sm:inline">{activeLanguage.label}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className={`hidden transition-transform sm:block ${open ? "rotate-180" : ""}`}
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
            className="absolute left-4 right-4 top-full z-50 mt-2 overflow-hidden sm:left-auto sm:right-0 sm:w-72 rounded-xl border border-[var(--border)] bg-white shadow-xl ring-1 ring-black/5"
          >
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Choose language
              </p>
              {error ? (
                <p role="alert" className="mt-0.5 text-xs font-medium text-[#B45309]">
                  {error}
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  Automatic translation. Please confirm medication details with your pharmacist.
                </p>
              )}
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
                      className={`flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-base transition ${
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
