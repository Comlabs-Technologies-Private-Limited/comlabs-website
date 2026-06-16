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
  return (
    <RootShell fontClassName={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      {children}
    </RootShell>
  );
}
