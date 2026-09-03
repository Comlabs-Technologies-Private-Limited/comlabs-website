import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { GoogleTag } from "@/components/analytics/google-tag";
import { RootShell } from "@/components/root-shell";
import { indexFollowRobots } from "@/lib/metadata";
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
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Comlabs Technologies | Application Support, AI, AWS & Software",
    template: "%s | Comlabs Technologies",
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
  robots: indexFollowRobots,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GoogleTag />
      </head>
      <RootShell>
        {children}
        <Analytics />
        <SpeedInsights />
      </RootShell>
    </html>
  );
}
