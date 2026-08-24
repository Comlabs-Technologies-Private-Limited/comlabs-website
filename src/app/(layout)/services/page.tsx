import type { Metadata } from "next";
import Link from "next/link";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { ServicesGrid } from "@/components/services/service-card";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { servicePages, servicesIndex } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

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

        <section className="border-y border-border bg-card px-6 py-24 md:py-32">
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
            />
            <Link
              href={canonicalPath("/digital-marketing")}
              className="mb-10 flex flex-col justify-between gap-4 rounded-[16px] border border-border bg-background p-6 transition-colors hover:border-foreground/20 md:mb-12 md:flex-row md:items-end md:p-8"
            >
              <div>
                <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                  Digital Marketing
                </p>
                <p className="mt-3 max-w-xl text-xl font-medium tracking-tight md:text-2xl" style={{ letterSpacing: "-0.03em" }}>
                  Strategy, creative and performance as one system.
                </p>
              </div>
              <span className="text-sm text-[var(--warm-orange)]">View the growth practice →</span>
            </Link>
            <ServicesGrid services={servicePages} />
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
