import type { Metadata } from "next";

import { FigmaHomePage } from "@/components/home/figma-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { buildPageMetadata } from "@/lib/metadata";

const HOME_TITLE = "Comlabs Technologies Pvt Ltd | Website Design Studio";
const HOME_DESCRIPTION =
  "Comlabs Technologies Pvt Ltd is a website design and development studio in Pune creating high-performance websites, CMS platforms, product interfaces and custom web applications.";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
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
