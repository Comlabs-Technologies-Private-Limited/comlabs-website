import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { DigitalMarketingCta } from "@/components/digital-marketing/dm-cta";
import { DigitalMarketingEngagement } from "@/components/digital-marketing/dm-engagement";
import { DigitalMarketingFaq } from "@/components/digital-marketing/dm-faq";
import { DigitalMarketingHero } from "@/components/digital-marketing/dm-hero";
import { DigitalMarketingMeasurement } from "@/components/digital-marketing/dm-measurement";
import { DigitalMarketingOperatingSystem } from "@/components/digital-marketing/dm-operating-system";
import { DigitalMarketingPositioning } from "@/components/digital-marketing/dm-positioning";
import { DigitalMarketingWork } from "@/components/digital-marketing/dm-work";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  DIGITAL_MARKETING_FAQS,
  DIGITAL_MARKETING_META,
  DIGITAL_MARKETING_PATH,
} from "@/lib/digital-marketing";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";

const DigitalMarketingCapabilities = dynamic(() =>
  import("@/components/digital-marketing/dm-capabilities").then(
    (module) => module.DigitalMarketingCapabilities,
  ),
);

export const metadata: Metadata = buildPageMetadata({
  title: DIGITAL_MARKETING_META.title,
  description: DIGITAL_MARKETING_META.description,
  path: DIGITAL_MARKETING_PATH,
  absoluteTitle: true,
});

export default function DigitalMarketingPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getServiceSchema({
          url: DIGITAL_MARKETING_PATH,
          name: "Digital Marketing",
          description: DIGITAL_MARKETING_META.description,
          serviceType: "Digital Marketing",
        })}
      />
      <JsonLdScript data={getFaqPageSchema([...DIGITAL_MARKETING_FAQS])} />

      <FigmaNav />

      <main>
        <DigitalMarketingHero />
        <DigitalMarketingPositioning />
        <DigitalMarketingCapabilities />
        <DigitalMarketingOperatingSystem />
        <DigitalMarketingWork />
        <DigitalMarketingEngagement />
        <DigitalMarketingMeasurement />
        <DigitalMarketingFaq />
        <DigitalMarketingCta />
      </main>

      <FigmaFooter />
    </div>
  );
}
