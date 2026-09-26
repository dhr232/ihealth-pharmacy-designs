"use client";

import { useSyncExternalStore } from "react";
import { getBookingUrl } from "./routes";

const subscribe = () => () => {};
const getHostname = () => window.location.hostname;
const getServerHostname = () => null;

/**
 * Hydration-safe hostname: `null` during SSR and the first client render, then the real
 * hostname. Pass it to `getBookingUrl(path, hostname)` when building several URLs (e.g. in a loop).
 */
export function useClientHostname(): string | null {
  return useSyncExternalStore(subscribe, getHostname, getServerHostname);
}

/**
 * Hydration-safe booking URL. The server render and first client render both use the
 * env-based URL; the client then switches to the host-aware URL (e.g. `/book` on localhost).
 */
export function useBookingUrl(path: string = ""): string {
  return getBookingUrl(path, useClientHostname());
}
