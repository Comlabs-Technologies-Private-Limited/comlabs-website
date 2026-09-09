import type { Metadata } from "next";

import { StudioCapabilities } from "@/components/digital-marketing/studio/studio-capabilities";
import { StudioCta } from "@/components/digital-marketing/studio/studio-cta";
import { StudioEngagements } from "@/components/digital-marketing/studio/studio-engagements";
import { StudioFaq } from "@/components/digital-marketing/studio/studio-faq";
import { StudioFooter } from "@/components/digital-marketing/studio/studio-footer";
import { StudioHero } from "@/components/digital-marketing/studio/studio-hero";
import { StudioLab } from "@/components/digital-marketing/studio/studio-lab";
import { StudioMotion } from "@/components/digital-marketing/studio/studio-motion";
import { StudioNav } from "@/components/digital-marketing/studio/studio-nav";
import { StudioOpening } from "@/components/digital-marketing/studio/studio-opening";
import { StudioPrinciples } from "@/components/digital-marketing/studio/studio-principles";
import { StudioProcess } from "@/components/digital-marketing/studio/studio-process";
import { StudioTestimonial } from "@/components/digital-marketing/studio/studio-testimonial";
import { StudioWorkInterlude } from "@/components/digital-marketing/studio/studio-work-interlude";
import { StudioWorkStack } from "@/components/digital-marketing/studio/studio-work-stack";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  DIGITAL_MARKETING_FAQS,
  DIGITAL_MARKETING_META,
  DIGITAL_MARKETING_PATH,
} from "@/lib/digital-marketing";
import { buildPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFaqPageSchema, getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: DIGITAL_MARKETING_META.title,
  description: DIGITAL_MARKETING_META.description,
  path: DIGITAL_MARKETING_PATH,
  absoluteTitle: true,
});

export default function DigitalMarketingPage() {
  return (
    <div className="dm-studio min-h-screen antialiased">
      <JsonLdScript
        data={getServiceSchema({
          url: DIGITAL_MARKETING_PATH,
          name: "Digital Marketing",
          description: DIGITAL_MARKETING_META.description,
          serviceType: "Digital Marketing",
        })}
      />
      <JsonLdScript data={getFaqPageSchema([...DIGITAL_MARKETING_FAQS])} />
      <JsonLdScript
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Digital Marketing", url: DIGITAL_MARKETING_PATH },
        ])}
      />

      <StudioNav />

      <main>
        <StudioHero />
        <StudioOpening />
        <StudioPrinciples />
        <StudioWorkInterlude />
        <StudioWorkStack />
        <StudioCapabilities />
        <StudioLab />
        <StudioProcess />
        <StudioEngagements />
        <StudioTestimonial />
        <StudioFaq />
        <StudioCta />
      </main>

      <StudioFooter />
      <StudioMotion />
    </div>
  );
}
