import type { Metadata } from "next";

import { FigmaHomePage } from "@/components/home/figma-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { siteUrl } from "@/lib/site";

const HOME_TITLE =
  "Comlabs Technologies — Startup Website Design, Product UI & Development";
const HOME_DESCRIPTION =
  "Comlabs is a design and development studio that creates high-performance websites and web applications for ambitious companies.";
const HOME_URL = `${siteUrl}/`;

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: HOME_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Comlabs Technologies",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: HOME_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export function MarketingHomePage() {
  return (
    <>
      <HomeJsonLd />
      <FigmaHomePage />
    </>
  );
}

export default MarketingHomePage;
