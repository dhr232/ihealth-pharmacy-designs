"use client";

import { useState, useEffect, useCallback } from "react";

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
  const [scale, setScale] = useState<TextScale>(() => getStoredScale());

  useEffect(() => {
    applyScaleToDOM(scale);
  }, [scale]);

  useEffect(() => {
    function handleScaleChange(e: Event) {
      const customEvent = e as CustomEvent<TextScale>;
      if (customEvent.detail && isValidScale(customEvent.detail)) {
        setScale(customEvent.detail);
      }
    }

    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && isValidScale(e.newValue)) {
        setScale(e.newValue);
      }
    }

    window.addEventListener(SCALE_CHANGE_EVENT, handleScaleChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(SCALE_CHANGE_EVENT, handleScaleChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const changeScale = useCallback((newScale: TextScale) => {
    setScale(newScale);
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
      className="inline-flex items-center rounded-lg border border-[var(--border)] bg-white p-0.5 shadow-sm"
    >
      <span className="sr-only">Adjust text size:</span>
      <button
        type="button"
        onClick={() => changeScale("normal")}
        aria-pressed={scale === "normal"}
        aria-label="Standard text size"
        title="Standard text size (100%)"
        className={`rounded px-2 py-1 text-xs font-semibold transition ${
          scale === "normal"
            ? "bg-[var(--brand)] text-white"
            : "text-[var(--foreground)] hover:bg-[var(--surface)]"
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
        className={`rounded px-2 py-1 text-xs font-semibold transition ${
          scale === "large"
            ? "bg-[var(--brand)] text-white"
            : "text-[var(--foreground)] hover:bg-[var(--surface)]"
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
        className={`rounded px-2 py-1 text-xs font-semibold transition ${
          scale === "xlarge"
            ? "bg-[var(--brand)] text-white"
            : "text-[var(--foreground)] hover:bg-[var(--surface)]"
        }`}
      >
        A++
      </button>
    </div>
  );
}
