"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export type ToastKind = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  kind: ToastKind;
  message: string;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ICONS: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const STYLES: Record<ToastKind, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-neutral-200 bg-white text-neutral-900",
};

const ICON_STYLES: Record<ToastKind, string> = {
  success: "text-emerald-600",
  error: "text-[var(--brand)]",
  info: "text-neutral-600",
};

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  // Each toast auto-dismisses after 3s
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      window.setTimeout(() => onDismiss(t.id), 3000),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [toasts, onDismiss]);

  return (
    <div
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.kind];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 ${STYLES[t.kind]}`}
              role="status"
            >
              <Icon size={18} className={`mt-0.5 shrink-0 ${ICON_STYLES[t.kind]}`} />
              <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
              <button
                type="button"
                onClick={() => onDismiss(t.id)}
                className="rounded-md p-1 text-current/60 hover:bg-black/5"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}