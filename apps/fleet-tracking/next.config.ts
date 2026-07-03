import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/fleet-assets",
  async rewrites() {
    return [
      {
        source: "/fleet-assets/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
};

export default nextConfig;
