"use client";

import { useEffect } from "react";

/**
 * ThemeApplier — wires the admin's theme + font selection onto every page.
 *
 * Reads:
 *   - `ihealth_admin_theme`  → applied as `data-theme="..."` on <html>
 *   - `ihealth_admin_font`   → applied as `.font-...` class on <body>
 *
 * Also listens for `storage` events so when the admin changes the
 * theme in another tab (or window) on the same device, the public
 * site updates live without a reload.
 *
 * Returns null — no UI.
 */

const THEME_KEY = "ihealth_admin_theme";
const FONT_KEY = "ihealth_admin_font";

// Defaults match the brand-red palette and Inter — i.e. the current
// site. The ThemeApplier only writes to the DOM when the stored value
// actually differs from the default, so an empty / missing localStorage
// leaves the page untouched.
const DEFAULT_THEME = "pharmacy-red";
const DEFAULT_FONT = "font-inter-tight";

// Allowed values — guards against a stray / hand-edited localStorage
// entry injecting an unexpected class onto <body>.
const ALLOWED_THEMES = new Set<string>([
  "pharmacy-red",
  "sage-care",
  "ocean-calm",
  "sunset-wellness",
  "forest-pharmacy",
  "lavender-trust",
  "citrus-vitality",
  "slate-professional",
  "berry-warmth",
  "midnight-modern",
]);

const ALLOWED_FONTS = new Set<string>([
  "font-inter-tight",
  "font-editorial-serif",
  "font-geometric-humanist",
  "font-medical-mono",
  "font-friendly-sans",
  "font-bold-display",
  "font-clean-roboto",
  "font-charcoal-grotesk",
  "font-warm-manrope",
  "font-classic-plus-jakarta",
]);

// Body classes added by App Router / other components — kept so we can
// reapply them after toggling the font class. We don't strip every
// body class, only the .font-* one.
const FONT_CLASS_RE = /^font-[a-z0-9-]+$/;

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // localStorage can throw in private-mode or sandboxed iframes.
    return null;
  }
}

function applyTheme(value: string | null) {
  const root = document.documentElement;
  if (!value || !ALLOWED_THEMES.has(value)) {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", value);
}

function applyFont(value: string | null) {
  const body = document.body;
  if (!body) return;

  // Strip any previous .font-* class so the body carries at most one
  // font pairing at a time.
  for (const cls of Array.from(body.classList)) {
    if (FONT_CLASS_RE.test(cls)) body.classList.remove(cls);
  }

  if (value && ALLOWED_FONTS.has(value)) {
    body.classList.add(value);
  } else {
    body.classList.add(DEFAULT_FONT);
  }
}

export default function ThemeApplier() {
  useEffect(() => {
    // Apply whatever was last persisted by the admin.
    applyTheme(readStored(THEME_KEY) ?? DEFAULT_THEME);
    applyFont(readStored(FONT_KEY) ?? DEFAULT_FONT);

    // Cross-tab / cross-window sync: when the admin saves a new theme
    // in another tab, this page updates without a reload.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY) applyTheme(e.newValue);
      if (e.key === FONT_KEY) applyFont(e.newValue);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}