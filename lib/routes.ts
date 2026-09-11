export const MAIN_SITE_BASE = "https://ihealthpharmacy.ca";
export const BOOKING_SUBDOMAIN_BASE = "https://booking.ihealthpharmacy.ca";

export function getBookingUrl(path: string = ""): string {
  const formattedPath = path.startsWith("?") || path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      return `/book${formattedPath === "/" ? "" : formattedPath}`;
    }
    if (hostname.startsWith("booking.")) {
      return formattedPath;
    }
  }

  if (process.env.NEXT_PUBLIC_BOOKING_URL) {
    const base = process.env.NEXT_PUBLIC_BOOKING_URL.replace(/\/$/, "");
    return `${base}${formattedPath === "/" ? "" : formattedPath}`;
  }

  return `${BOOKING_SUBDOMAIN_BASE}${formattedPath === "/" ? "" : formattedPath}`;
}

export function getMainSiteUrl(path: string = "/"): string {
  const formattedPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      if (hostname.startsWith("booking.")) {
        const hostWithoutBooking = window.location.host.replace(/^booking\./, "");
        return `${window.location.protocol}//${hostWithoutBooking}${formattedPath}`;
      }
      return formattedPath;
    }

    if (hostname.startsWith("booking.")) {
      return `${MAIN_SITE_BASE}${formattedPath}`;
    }
  }

  if (process.env.NEXT_PUBLIC_MAIN_SITE_URL) {
    const base = process.env.NEXT_PUBLIC_MAIN_SITE_URL.replace(/\/$/, "");
    return `${base}${formattedPath}`;
  }

  return formattedPath;
}
