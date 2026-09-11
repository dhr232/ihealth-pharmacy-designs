import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Check if request matches booking.ihealthpharmacy.ca or booking.localhost (with any port)
  const isBookingSubdomain =
    hostname.startsWith("booking.ihealthpharmacy.ca") ||
    hostname.startsWith("booking.localhost");

  if (isBookingSubdomain) {
    // Rewrite root / to /book
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/book", request.url));
    }
  }

  // Server-side guard for /admin
  if (url.pathname === "/admin") {
    const sessionCookie = request.cookies.get("ihealth_staff_session");
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - static files with extensions (.png, .jpg, .jpeg, .svg, .webp, .css, .js)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
