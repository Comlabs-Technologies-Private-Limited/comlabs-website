import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.23", "192.168.1.4"],
  serverExternalPackages: ["@prisma/client", "prisma"],
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion"],
    inlineCss: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*"],
    "/admin/**": ["./node_modules/.prisma/client/**/*"],
    "/api/**": ["./node_modules/.prisma/client/**/*"],
    "/blog/**": ["./node_modules/.prisma/client/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/hero/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/work/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/editorial/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/services-bg/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/logo.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },
    ];
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
