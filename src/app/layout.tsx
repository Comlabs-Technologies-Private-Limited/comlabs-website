import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

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

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});


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
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GoogleTag />
      </head>
      <RootShell>{children}</RootShell>
    </html>
  );
}
