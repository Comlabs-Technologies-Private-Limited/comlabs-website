import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { RootShell } from "@/components/root-shell";
import { siteUrl } from "@/lib/site";
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

const DEFAULT_TITLE =
  "Comlabs Technologies — Startup Website Design, Product UI & Development";
const DEFAULT_DESCRIPTION =
  "Comlabs is a design and development studio that creates high-performance websites and web applications for ambitious companies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Comlabs Technologies",
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Comlabs Technologies",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "startup website design",
    "website rebuilds for startups",
    "SaaS website design",
    "product UI/UX for startups",
    "AI automation for startups",
    "conversion-focused websites",
    "frontend development for startups",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Comlabs Technologies",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
