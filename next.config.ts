import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ihealth-pharmacy-designs",
  images: { unoptimized: true },
};

export default nextConfig;
