import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.23", "192.168.1.4"],
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*"],
    "/admin/**": ["./node_modules/.prisma/client/**/*"],
    "/api/**": ["./node_modules/.prisma/client/**/*"],
    "/blog/**": ["./node_modules/.prisma/client/**/*"],
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
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
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
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
