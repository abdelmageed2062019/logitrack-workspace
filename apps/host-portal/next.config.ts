import type { NextConfig } from "next";

const FLEET_URL = "http://localhost:3001";
const WAREHOUSE_URL = "http://localhost:3002";
const ANALYTICS_URL = "http://localhost:3003";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/fleet-assets/_next/:path*",
        destination: `${FLEET_URL}/fleet-assets/_next/:path*`,
      },
      {
        source: "/warehouse-assets/_next/:path*",
        destination: `${WAREHOUSE_URL}/warehouse-assets/_next/:path*`,
      },
      {
        source: "/analytics-assets/_next/:path*",
        destination: `${ANALYTICS_URL}/analytics-assets/_next/:path*`,
      },
      {
        source: "/fleet/:path*",
        destination: `${FLEET_URL}/fleet/:path*`,
      },
      {
        source: "/warehouse/:path*",
        destination: `${WAREHOUSE_URL}/warehouse/:path*`,
      },
      {
        source: "/analytics/:path*",
        destination: `${ANALYTICS_URL}/analytics/:path*`,
      },
    ];
  },
};

export default nextConfig;
