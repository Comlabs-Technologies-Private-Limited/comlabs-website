import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { ServicesIndexGrid } from "@/components/services/service-card";
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

      <FigmaNav />

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
            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div
                className="pointer-events-none absolute top-[0.65rem] right-0 left-0 hidden border-t border-neutral-200 lg:block"
                aria-hidden
              />
              {servicesIndex.pillars.map((pillar, index) => (
                <article key={pillar.title} className="relative lg:pt-8">
                  <p
                    className="mb-3 inline-block bg-background pr-2 text-[11px] font-medium tabular-nums text-neutral-400 lg:mb-4"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mb-2 text-sm font-medium tracking-tight text-neutral-900">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-neutral-600">
                    {pillar.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MarketingCtaSection
          eyebrow=""
          title={servicesIndex.ctaTitle}
          description={servicesIndex.ctaDescription}
          ctaLabel={servicesIndex.ctaLabel}
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
