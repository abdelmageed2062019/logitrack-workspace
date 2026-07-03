import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/warehouse-assets",
  async rewrites() {
    return [
      {
        source: "/warehouse-assets/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
};

export default nextConfig;
