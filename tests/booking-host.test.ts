import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { bookingSubdomainRedirect, getBookingUrl, getMainSiteUrl } from "../lib/routes";
import { middleware } from "../middleware";

// Booking lives at ihealthpharmacy.ca/book only; booking.ihealthpharmacy.ca redirects there.
describe("booking URLs", () => {
  it("always point at /book on the main site", () => {
    expect(getBookingUrl()).toBe("/book");
    expect(getBookingUrl("?service=routine-vaccination")).toBe("/book?service=routine-vaccination");
    expect(getMainSiteUrl("/")).toBe("/");
    expect(getMainSiteUrl("contact")).toBe("/contact");
  });

  it("never link to the retired subdomain", () => {
    expect(getBookingUrl("?category=vaccines")).not.toContain("booking.");
  });
});

describe("retired booking subdomain", () => {
  it("maps the old wizard root to /book and keeps other paths and the query", () => {
    expect(bookingSubdomainRedirect("booking.ihealthpharmacy.ca", "/", "")).toBe("https://ihealthpharmacy.ca/book");
    expect(bookingSubdomainRedirect("booking.ihealthpharmacy.ca", "/", "?service=rsv-immunization")).toBe(
      "https://ihealthpharmacy.ca/book?service=rsv-immunization"
    );
    expect(bookingSubdomainRedirect("booking.ihealthpharmacy.ca", "/prescription-refills", "")).toBe(
      "https://ihealthpharmacy.ca/prescription-refills"
    );
    expect(bookingSubdomainRedirect("Booking.IhealthPharmacy.ca", "/transfer", "")).toBe("https://ihealthpharmacy.ca/transfer");
  });

  it("keeps the port in local dev", () => {
    expect(bookingSubdomainRedirect("booking.localhost:3000", "/", "", "http:")).toBe("http://localhost:3000/book");
  });

  it("leaves the main site alone", () => {
    expect(bookingSubdomainRedirect("ihealthpharmacy.ca", "/", "")).toBeNull();
    expect(bookingSubdomainRedirect("www.ihealthpharmacy.ca", "/book", "")).toBeNull();
  });

  it("middleware sends a permanent redirect from the subdomain", () => {
    const res = middleware(
      new NextRequest("https://booking.ihealthpharmacy.ca/?service=uti", {
        headers: { host: "booking.ihealthpharmacy.ca" },
      })
    );
    expect(res.status).toBe(308);
    expect(res.headers.get("location")).toBe("https://ihealthpharmacy.ca/book?service=uti");
  });

  it("middleware serves the main site normally", () => {
    const res = middleware(
      new NextRequest("https://ihealthpharmacy.ca/book", { headers: { host: "ihealthpharmacy.ca" } })
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });
});
