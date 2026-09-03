import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { ServicesIndexGrid } from "@/components/services/service-card";
import { ServicesOperatingModel } from "@/components/services/services-operating-model";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { primaryServices } from "@/lib/canonical-services";
import { buildPageMetadata } from "@/lib/metadata";
import { getServiceCollectionSchema } from "@/lib/schema";
import { servicesIndex } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: servicesIndex.metaTitle,
  description: servicesIndex.metaDescription,
  path: servicesIndex.path,
  absoluteTitle: true,
});

export default function ServicesIndexPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getServiceCollectionSchema({
          url: servicesIndex.path,
          name: servicesIndex.metaTitle,
          description: servicesIndex.metaDescription,
          services: primaryServices.map((service) => ({
            name: service.title,
            url: service.path,
          })),
        })}
      />

      <FigmaNavLoader />

      <main>
        <MarketingPageHero
          eyebrow={servicesIndex.eyebrow}
          title={
            <>
              Technology that stays{" "}
              <MarketingOrangeHighlight>responsible</MarketingOrangeHighlight> after launch.
            </>
          }
          description={
            <>
              {servicesIndex.heroCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </>
          }
          action={
            <Link
              href={canonicalPath("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            >
              {servicesIndex.heroCtaLabel}
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        >
          <PageBreadcrumbs currentPath="/services" items={[{ label: "Services" }]} />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              className="mb-10 md:mb-12"
              eyebrow={servicesIndex.sectionEyebrow}
              title={servicesIndex.sectionHeading}
              description={
                <>
                  {servicesIndex.sectionCopy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </>
              }
            />
            <ServicesIndexGrid services={primaryServices} />
          </div>
        </section>

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Operating model"
              title={servicesIndex.pillarsHeading}
            />
            <ServicesOperatingModel />
          </div>
        </section>

        <MarketingCtaSection
          title={servicesIndex.ctaTitle}
          description={servicesIndex.ctaDescription}
          ctaLabel={servicesIndex.ctaLabel}
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
