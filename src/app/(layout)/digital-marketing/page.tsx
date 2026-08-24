import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { preload } from "react-dom";

import { DigitalMarketingAbout } from "@/components/digital-marketing/dm-about";
import { DigitalMarketingEngagement } from "@/components/digital-marketing/dm-engagement";
import { DigitalMarketingFooter } from "@/components/digital-marketing/dm-footer";
import { DigitalMarketingHero } from "@/components/digital-marketing/dm-hero";
import { DigitalMarketingInsights } from "@/components/digital-marketing/dm-insights";
import { DigitalMarketingMosaic } from "@/components/digital-marketing/dm-mosaic";
import { DigitalMarketingNav } from "@/components/digital-marketing/dm-nav";
import { DigitalMarketingPositioning } from "@/components/digital-marketing/dm-positioning";
import { DigitalMarketingProof } from "@/components/digital-marketing/dm-proof";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  DIGITAL_MARKETING_FAQS,
  DIGITAL_MARKETING_INSIGHTS,
  DIGITAL_MARKETING_META,
  DIGITAL_MARKETING_PATH,
} from "@/lib/digital-marketing";
import { DM, DM_PHOTOS, HERO_PRELOAD_PHOTOS } from "@/lib/digital-marketing-media";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";

const DigitalMarketingCapabilities = dynamic(() =>
  import("@/components/digital-marketing/dm-capabilities").then(
    (module) => module.DigitalMarketingCapabilities,
  ),
);
const DigitalMarketingWork = dynamic(() =>
  import("@/components/digital-marketing/dm-work").then((module) => module.DigitalMarketingWork),
);
const DigitalMarketingLab = dynamic(() =>
  import("@/components/digital-marketing/dm-lab").then((module) => module.DigitalMarketingLab),
);
const DigitalMarketingOperatingSystem = dynamic(() =>
  import("@/components/digital-marketing/dm-operating-system").then(
    (module) => module.DigitalMarketingOperatingSystem,
  ),
);
const DigitalMarketingMeasurement = dynamic(() =>
  import("@/components/digital-marketing/dm-measurement").then(
    (module) => module.DigitalMarketingMeasurement,
  ),
);
const DigitalMarketingFaq = dynamic(() =>
  import("@/components/digital-marketing/dm-faq").then((module) => module.DigitalMarketingFaq),
);
const DigitalMarketingCta = dynamic(() =>
  import("@/components/digital-marketing/dm-cta").then((module) => module.DigitalMarketingCta),
);

export const metadata: Metadata = buildPageMetadata({
  title: DIGITAL_MARKETING_META.title,
  description: DIGITAL_MARKETING_META.description,
  path: DIGITAL_MARKETING_PATH,
  absoluteTitle: true,
});

export default async function DigitalMarketingPage() {
  for (const id of HERO_PRELOAD_PHOTOS) {
    const photo = DM_PHOTOS[id];
    preload(photo.srcSm, { as: "image", type: "image/avif" });
  }

  return (
    <div className="dm-page min-h-screen antialiased" style={{ background: DM.bg, color: DM.text }}>
      <JsonLdScript
        data={getServiceSchema({
          url: DIGITAL_MARKETING_PATH,
          name: "Digital Marketing",
          description: DIGITAL_MARKETING_META.description,
          serviceType: "Digital Marketing",
        })}
      />
      <JsonLdScript data={getFaqPageSchema([...DIGITAL_MARKETING_FAQS])} />

      <DigitalMarketingNav />

      <main>
        <DigitalMarketingHero />
        <section id="posts" className="mt-12 scroll-mt-24 pb-8 md:mt-16 lg:mt-20">
          <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-5 md:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.25fr)] lg:items-start lg:gap-4 lg:px-12 xl:px-16">
            <DigitalMarketingMosaic />
            <DigitalMarketingInsights insights={DIGITAL_MARKETING_INSIGHTS} />
          </div>
        </section>
        <DigitalMarketingPositioning />
        <DigitalMarketingCapabilities />
        <DigitalMarketingWork />
        <DigitalMarketingProof />
        <DigitalMarketingLab />
        <DigitalMarketingOperatingSystem />
        <DigitalMarketingEngagement />
        <DigitalMarketingMeasurement />
        <DigitalMarketingFaq />
        <DigitalMarketingAbout />
        <DigitalMarketingCta />
      </main>

      <DigitalMarketingFooter />
    </div>
  );
}
