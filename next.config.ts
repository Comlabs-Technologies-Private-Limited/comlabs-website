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
    "/case-studies/**": ["./node_modules/.prisma/client/**/*"],
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
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/work/formula-lab",
        destination: "/case-studies/formial-labs/",
        permanent: true,
      },
      {
        source: "/work/with-hub",
        destination: "/case-studies/vithub/",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/case-studies/",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/case-studies/:slug/",
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
