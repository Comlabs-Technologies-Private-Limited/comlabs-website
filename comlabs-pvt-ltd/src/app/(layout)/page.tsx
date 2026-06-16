import { FigmaHomePage } from "@/components/home/figma-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export function MarketingHomePage() {
  return (
    <>
      <HomeJsonLd />
      <FigmaHomePage />
    </>
  );
}

export default MarketingHomePage;
