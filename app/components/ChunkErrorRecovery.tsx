"use client";

import { useEffect } from "react";

const RELOAD_FLAG_KEY = "ihealth_chunk_reload_at";
const RELOAD_COOLDOWN_MS = 10_000;

function isChunkLoadFailure(message: string) {
  return (
    /ChunkLoadError/i.test(message) ||
    /Loading chunk [\d\w-]+ failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    (/\/_next\/static\//.test(message) && /(404|failed to fetch)/i.test(message))
  );
}

function recoverOnce() {
  const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG_KEY) || 0);
  if (Date.now() - lastReload < RELOAD_COOLDOWN_MS) return;
  sessionStorage.setItem(RELOAD_FLAG_KEY, String(Date.now()));
  window.location.reload();
}

/**
 * A new deploy replaces /_next/static with freshly hashed files, so a browser
 * tab holding HTML from a previous build can request JS/CSS chunks that no
 * longer exist. Detect that failure and self-heal with a single reload
 * instead of leaving the visitor on an unstyled, unhydrated page.
 */
export default function ChunkErrorRecovery() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const target = event.target as (HTMLScriptElement | HTMLLinkElement | null);
      if (target && target !== (window as unknown)) {
        const url = (target as HTMLScriptElement).src || (target as HTMLLinkElement).href || "";
        if (url.includes("/_next/static/")) {
          recoverOnce();
          return;
        }
      }
      if (isChunkLoadFailure(event.message || String(event.error || ""))) {
        recoverOnce();
      }
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === "string" ? reason : reason?.message || String(reason);
      if (isChunkLoadFailure(message)) {
        recoverOnce();
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
