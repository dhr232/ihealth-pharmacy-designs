/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slashes only matter for the (legacy) static export. On the Node server they made the
  // server render "/contact" while the browser rebuilt "/contact/", a hydration mismatch on every Link.
  ...(process.env.STATIC_EXPORT === 'true' ? { output: 'export', trailingSlash: true } : {}),
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },
  // Dev Patel's photo moved. The live pharmacist record in the database may still point at the
  // old files, so keep these paths working until it is re-saved in /admin.
  async redirects() {
    return [
      { source: "/pharmacists/dev-patel.png", destination: "/pharmacist-dev-patel-ihealth.jpg", permanent: false },
      { source: "/pharmacists/dev-patel.jpg", destination: "/pharmacist-dev-patel-ihealth.jpg", permanent: false },
    ];
  },
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/:path*",
          headers: [
            { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          ],
        },
      ];
    }
    return [
      {
        // Every redeploy replaces /_next/static with freshly content-hashed
        // files. If page HTML gets cached by the browser or an intermediary
        // proxy, a visitor can end up with old HTML pointing at JS/CSS
        // chunks that no longer exist on the server -- an unstyled,
        // unhydrated page. Forcing document responses to revalidate on every
        // request keeps the HTML always in sync with whatever build is
        // currently deployed.
        source: "/((?!_next/static|_next/image|media/).*)",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        // Hashed build assets are safe to cache forever in production -- a new build
        // always ships under a new filename.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

