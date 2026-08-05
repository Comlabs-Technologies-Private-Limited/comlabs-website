import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.23", "192.168.1.4"],
  async redirects() {
    return [
      {
        source: "/work/formula-lab",
        destination: "/work/formial-labs/",
        permanent: true,
      },
      {
        source: "/work/with-hub",
        destination: "/work/vithub/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
