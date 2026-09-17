import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Trailing-slash normalisation is performed in `src/middleware.ts` so it can
  // be combined with host and retired-path corrections into a single 308.
  // Without this, Next issued its own slash redirect first and every legacy URL
  // became a two-hop chain.
  skipTrailingSlashRedirect: true,
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
      // Digital marketing studio hero photograph (Vladislav Nahorny, Unsplash).
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
