"use client";

import { useEffect, useCallback, useSyncExternalStore, useState, useRef } from "react";
import { Type, X, RotateCcw } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  // Close on outside click or escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isScaled = scale !== "normal";

  return (
    <aside
      aria-label="Text Size Accessibility"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none print:hidden"
    >
      {/* Docked Left Edge Floating Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="text-size-panel"
        aria-label="Adjust font size and reading accessibility"
        title="Adjust text size (A / A+ / A++)"
        className={`group flex items-center gap-2 rounded-r-2xl border-y border-r p-2.5 sm:px-3 sm:py-3 shadow-lg transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[var(--brand)] bg-slate-900 text-white shadow-xl"
            : isScaled
            ? "border-red-300 bg-white/95 backdrop-blur-md text-[var(--brand)] shadow-red-900/10 hover:bg-slate-50"
            : "border-slate-300/80 bg-white/95 backdrop-blur-md text-slate-800 shadow-slate-900/10 hover:bg-slate-50 hover:text-[var(--brand)]"
        }`}
      >
        <div className="flex items-center justify-center">
          <Type size={18} className="stroke-[2.2] transition-transform duration-200 group-hover:scale-110" />
        </div>

        <div className="hidden sm:flex flex-col text-left leading-none pr-1">
          <span className="text-[11px] font-extrabold tracking-tight">Aa</span>
          <span className="text-[9px] font-semibold text-slate-400 mt-0.5">
            {scale === "normal" ? "100%" : scale === "large" ? "+15%" : "+25%"}
          </span>
        </div>

        {isScaled && (
          <span
            className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse"
            title="Custom text size is active"
          />
        )}
      </button>

      {/* Floating Flyout Card */}
      {isOpen && (
        <div
          ref={panelRef}
          id="text-size-panel"
          role="dialog"
          aria-labelledby="text-size-title"
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-72 sm:w-80 rounded-3xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-5 shadow-2xl shadow-slate-900/15 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                <Type size={16} />
              </div>
              <div>
                <h3 id="text-size-title" className="text-sm font-bold text-slate-900">
                  Text Size Accessibility
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Adjust for comfortable reading
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close text size settings"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Segmented Option Pills */}
          <div className="mt-4 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Font Scale
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Option: Normal */}
              <button
                type="button"
                onClick={() => changeScale("normal")}
                aria-pressed={scale === "normal"}
                className={`flex flex-col items-center justify-center rounded-2xl py-3.5 px-2 border transition-all duration-150 cursor-pointer ${
                  scale === "normal"
                    ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm shadow-red-700/20 ring-2 ring-red-600/20"
                    : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-base font-bold leading-none">A</span>
                <span className={`text-[11px] font-semibold mt-2 leading-tight ${scale === "normal" ? "text-white" : "text-slate-700"}`}>
                  Default
                </span>
                <span className={`text-[10px] font-mono mt-1 leading-none ${scale === "normal" ? "text-white/80" : "text-slate-400"}`}>
                  100%
                </span>
              </button>

              {/* Option: Large */}
              <button
                type="button"
                onClick={() => changeScale("large")}
                aria-pressed={scale === "large"}
                className={`flex flex-col items-center justify-center rounded-2xl py-3.5 px-2 border transition-all duration-150 cursor-pointer ${
                  scale === "large"
                    ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm shadow-red-700/20 ring-2 ring-red-600/20"
                    : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-lg font-bold leading-none">A+</span>
                <span className={`text-[11px] font-semibold mt-2 leading-tight ${scale === "large" ? "text-white" : "text-slate-700"}`}>
                  Large
                </span>
                <span className={`text-[10px] font-mono mt-1 leading-none ${scale === "large" ? "text-white/80" : "text-slate-400"}`}>
                  115%
                </span>
              </button>

              {/* Option: Extra Large */}
              <button
                type="button"
                onClick={() => changeScale("xlarge")}
                aria-pressed={scale === "xlarge"}
                className={`flex flex-col items-center justify-center rounded-2xl py-3.5 px-2 border transition-all duration-150 cursor-pointer ${
                  scale === "xlarge"
                    ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm shadow-red-700/20 ring-2 ring-red-600/20"
                    : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-xl font-bold leading-none">A++</span>
                <span className={`text-[11px] font-semibold mt-2 leading-tight ${scale === "xlarge" ? "text-white" : "text-slate-700"}`}>
                  Largest
                </span>
                <span className={`text-[10px] font-mono mt-1 leading-none ${scale === "xlarge" ? "text-white/80" : "text-slate-400"}`}>
                  125%
                </span>
              </button>
            </div>
          </div>

          {/* Senior Accessibility Hint */}
          <div className="mt-4 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600 leading-relaxed border border-slate-200/60">
            <span>
              Adjusts typography across the dispensary website, prescription forms, and booking system.
            </span>
          </div>

          {/* Footer Reset Action */}
          {isScaled && (
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => changeScale("normal")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[var(--brand)] transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset to Standard (100%)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
