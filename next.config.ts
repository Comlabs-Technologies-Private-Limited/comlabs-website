import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Allow HMR when opening the dev server from a LAN IP (e.g. phone/tablet on same Wi‑Fi).
  allowedDevOrigins: ["192.168.1.23", "192.168.1.4"],
};

export default nextConfig;
