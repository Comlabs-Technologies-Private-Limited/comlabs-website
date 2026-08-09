import type { Metadata } from "next";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { MarketingServiceCards } from "@/components/marketing/marketing-service-cards";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { servicePages, servicesIndex } from "@/lib/services-data";

export const metadata: Metadata = buildPageMetadata({
  title: servicesIndex.metaTitle,
  description: servicesIndex.metaDescription,
  path: servicesIndex.path,
});

export default function ServicesIndexPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow={servicesIndex.eyebrow}
          title={
            <>
              Design and engineering for products that need to{" "}
              <MarketingOrangeHighlight>ship</MarketingOrangeHighlight>.
            </>
          }
          description={servicesIndex.subheadline}
        >
          <PageBreadcrumbs currentPath="/services" items={[{ label: "Services" }]} />
        </MarketingPageHero>

        <section className="border-t border-border px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              className="mb-10 md:mb-12"
              eyebrow="Our services"
              title={
                <>
                  Focused expertise for every{" "}
                  <MarketingOrangeHighlight>stage</MarketingOrangeHighlight>.
                </>
              }
              description="Websites, custom software, mobile apps, SEO/AEO, and cloud infrastructure — each service page covers scope, process, and deliverables."
            />
            <MarketingServiceCards services={servicePages} />
          </div>
        </section>

        <MarketingCtaSection
          title="Not sure where to start?"
          description="Share your goal — website, custom software, mobile app, SEO/AEO, or cloud infrastructure — and we will recommend the right starting point."
          ctaLabel="Contact us"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
