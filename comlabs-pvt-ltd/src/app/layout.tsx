import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { RootShell } from "@/components/root-shell";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Comlabs Technologies — Startup Website Design, Product UI & AI Automation",
    template: "%s — Comlabs Technologies",
  },
  description:
    "Comlabs builds premium startup websites, product interfaces, and automation layers for founders who need credibility, speed, and conversion-focused execution.",
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
    title: "Comlabs Technologies — Websites that make startups look ready to scale",
    description:
      "Premium website rebuilds, product UI, frontend development, and AI automation for startups.",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell interClassName={inter.variable}>{children}</RootShell>;
}
