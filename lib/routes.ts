export const MAIN_SITE_BASE = "https://ihealthpharmacy.ca";

// Booking lives at ihealthpharmacy.ca/book only. The old booking.ihealthpharmacy.ca subdomain
// was a second copy of the site with its own server settings (it broke photo uploads), so it is
// retired: middleware.ts redirects any request on it to the same page here.

/** Booking wizard URL, e.g. getBookingUrl("?service=routine-vaccination") -> "/book?service=routine-vaccination". */
export function getBookingUrl(path: string = ""): string {
  if (!path || path === "/") return "/book";
  return path.startsWith("?") || path.startsWith("/") ? `/book${path}` : `/book/${path}`;
}

/** Main-site URL. Same site as booking now, so this is just the path. */
export function getMainSiteUrl(path: string = "/"): string {
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Where a request that arrived on the retired booking subdomain should go, or null when the
 * host is not that subdomain. "/" was the wizard there, so it maps to "/book".
 */
export function bookingSubdomainRedirect(
  host: string,
  pathname: string,
  search: string,
  protocol: string = "https:"
): string | null {
  const hostname = host.toLowerCase();
  if (!hostname.startsWith("booking.")) return null;

  let target: string;
  if (hostname.startsWith("booking.localhost")) {
    target = `${protocol}//${hostname.replace(/^booking\./, "")}`; // local dev keeps its port
  } else {
    target = MAIN_SITE_BASE;
  }
  const path = pathname === "/" || pathname === "" ? "/book" : pathname;
  return `${target}${path}${search}`;
}
