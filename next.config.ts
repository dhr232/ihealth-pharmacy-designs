import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "true" ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
