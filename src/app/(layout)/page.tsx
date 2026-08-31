import type { Metadata } from "next";

import { FigmaHomePage } from "@/components/home/figma-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { siteDefaultDescription } from "@/lib/site";

const HOME_TITLE = "Comlabs Technologies | Application Support, AI, Cloud & Engineering";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: siteDefaultDescription,
  path: "/",
  absoluteTitle: true,
});

export function MarketingHomePage() {
  return (
    <>
      <HomeJsonLd />
      <FigmaHomePage />
    </>
  );
}

export default MarketingHomePage;
