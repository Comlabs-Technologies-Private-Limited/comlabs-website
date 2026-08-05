import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { RootShell } from "@/components/root-shell";
import { siteFaviconPath, siteName, siteOgImage, siteUrl } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const DEFAULT_DESCRIPTION =
  "Comlabs Technologies Pvt Ltd is a website design and software development studio in Pune creating high-performance websites, CMS platforms, product interfaces and custom web applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Comlabs Technologies Pvt Ltd | Website Design Studio",
    template: "%s | Comlabs Technologies Pvt Ltd",
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [{ url: siteFaviconPath, type: "image/png" }],
    shortcut: siteFaviconPath,
    apple: [{ url: siteFaviconPath, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    description: DEFAULT_DESCRIPTION,
    url: `${siteUrl}/`,
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    description: DEFAULT_DESCRIPTION,
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
    <RootShell fontClassName={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      {children}
    </RootShell>
  );
}
