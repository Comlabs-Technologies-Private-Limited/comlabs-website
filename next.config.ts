import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.23", "192.168.1.4"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/p8osc4y4/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "formial.in",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "vithub.in",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
    ],
  },
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
      {
        source: "/services/website-redesign",
        destination: "/services/website-design-development/",
        permanent: true,
      },
      {
        source: "/services/cms-development",
        destination: "/services/custom-software-development/",
        permanent: true,
      },
      {
        source: "/services/erp-development",
        destination: "/services/custom-software-development/",
        permanent: true,
      },
      {
        source: "/services/product-ui-development",
        destination: "/services/custom-software-development/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
