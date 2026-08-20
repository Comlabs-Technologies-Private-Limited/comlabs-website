import type { Metadata } from "next";

import { GoogleTag } from "@/components/analytics/google-tag";
import { RootShell } from "@/components/root-shell";
import {
  siteAppleIconPath,
  siteDefaultDescription,
  siteFaviconPath,
  siteFaviconPngPath,
  siteName,
  siteOgImage,
  siteUrl,
} from "@/lib/site";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Comlabs Technologies Pvt Ltd | Website Design Studio",
    template: "%s | Comlabs Technologies Pvt Ltd",
  },
  description: siteDefaultDescription,
  icons: {
    icon: [
      { url: siteFaviconPath, type: "image/svg+xml" },
      { url: siteFaviconPngPath, type: "image/png", sizes: "32x32" },
    ],
    shortcut: siteFaviconPath,
    apple: [{ url: siteAppleIconPath, type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    description: siteDefaultDescription,
    url: `${siteUrl}/`,
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    description: siteDefaultDescription,
    images: [siteOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <GoogleTag />
      </head>
      <RootShell>{children}</RootShell>
    </html>
  );
}
