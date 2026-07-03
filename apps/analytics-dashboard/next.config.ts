import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/analytics-assets",
  async rewrites() {
    return [
      {
        source: "/analytics-assets/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
};

export default nextConfig;
