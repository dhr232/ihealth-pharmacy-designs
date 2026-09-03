import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ihealth-pharmacy-designs",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
