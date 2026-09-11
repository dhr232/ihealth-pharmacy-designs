"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";

export type TextScale = "normal" | "large" | "xlarge";

const STORAGE_KEY = "ihealth_text_scale";
const SCALE_CHANGE_EVENT = "ihealth_text_scale_change";

function isValidScale(val: string | null): val is TextScale {
  return val === "normal" || val === "large" || val === "xlarge";
}

function getStoredScale(): TextScale {
  if (typeof window === "undefined") return "normal";
  try {
    const val = window.localStorage.getItem(STORAGE_KEY);
    if (isValidScale(val)) return val;
  } catch {
    /* ignore */
  }
  return "normal";
}

function subscribe(callback: () => void) {
  window.addEventListener(SCALE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(SCALE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): TextScale {
  return "normal";
}

function applyScaleToDOM(scale: TextScale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (scale === "normal") {
    root.removeAttribute("data-text-scale");
  } else {
    root.setAttribute("data-text-scale", scale);
  }
}

export default function TextSizeAdjuster() {
  const scale = useSyncExternalStore(subscribe, getStoredScale, getServerSnapshot);

  useEffect(() => {
    applyScaleToDOM(scale);
  }, [scale]);

  const changeScale = useCallback((newScale: TextScale) => {
    applyScaleToDOM(newScale);
    try {
      window.localStorage.setItem(STORAGE_KEY, newScale);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(
      new CustomEvent<TextScale>(SCALE_CHANGE_EVENT, { detail: newScale })
    );
  }, []);

  return (
    <div
      role="group"
      aria-label="Text size accessibility options"
      suppressHydrationWarning
      className="inline-flex h-8 items-center rounded-md border border-[var(--border)] bg-slate-50/70 p-0.5 shadow-xs"
    >
      <span className="sr-only">Adjust text size:</span>
      <button
        type="button"
        onClick={() => changeScale("normal")}
        aria-pressed={scale === "normal"}
        aria-label="Standard text size"
        title="Standard text size (100%)"
        suppressHydrationWarning
        className={`h-6.5 rounded px-1.5 text-[11px] font-semibold transition ${
          scale === "normal"
            ? "bg-[var(--brand)] text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-white"
        }`}
      >
        A
      </button>
      <button
        type="button"
        onClick={() => changeScale("large")}
        aria-pressed={scale === "large"}
        aria-label="Large text size (+15%)"
        title="Large text size (+15%)"
        suppressHydrationWarning
        className={`h-6.5 rounded px-1.5 text-[11px] font-semibold transition ${
          scale === "large"
            ? "bg-[var(--brand)] text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-white"
        }`}
      >
        A+
      </button>
      <button
        type="button"
        onClick={() => changeScale("xlarge")}
        aria-pressed={scale === "xlarge"}
        aria-label="Extra large text size (+25%)"
        title="Extra large text size (+25%)"
        suppressHydrationWarning
        className={`h-6.5 rounded px-1.5 text-[11px] font-semibold transition ${
          scale === "xlarge"
            ? "bg-[var(--brand)] text-white shadow-xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-white"
        }`}
      >
        A++
      </button>
    </div>
  );
}
