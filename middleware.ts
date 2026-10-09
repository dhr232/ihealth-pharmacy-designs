import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bookingSubdomainRedirect } from "./lib/routes";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;

  // The booking.ihealthpharmacy.ca subdomain is retired: send every page request to the same page
  // on the main site ("/" was the wizard, so it goes to /book). Permanent, so search engines and
  // browsers update. API calls are not matched (see config below) so open tabs can still submit.
  const redirectTo = bookingSubdomainRedirect(hostname, url.pathname, url.search, url.protocol);
  if (redirectTo) {
    return NextResponse.redirect(redirectTo, 308);
  }

  // Server-side guard for /admin
  if (url.pathname === "/admin") {
    const sessionCookie = request.cookies.get("ihealth_staff_session");
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const response = NextResponse.next();
  // Uploaded media has unique filenames and sets its own long-lived cache header.
  if (!url.pathname.startsWith("/media/")) {
    response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }
  return response;
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
