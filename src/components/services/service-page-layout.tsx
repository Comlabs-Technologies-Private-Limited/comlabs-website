import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
  MarketingSectionLabel,
} from "@/components/marketing/marketing-section-header";
import { ServiceFaqList } from "@/components/services/service-faq-list";
import { ServiceProcessRow } from "@/components/services/service-process-row";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath, canonicalUrl, siteLocation } from "@/lib/site";

function formatDeliverableCounter(index: number): string {
  return `(${String(index + 1).padStart(2, "0")})`;
}

export function ServicePageLayout({ service }: { service: ServicePageData }) {
  const pageUrl = canonicalUrl(service.path);
  const proofItems = [
    service.serviceType,
    `${service.process[0].title} → ${service.process[service.process.length - 1].title}`,
    siteLocation,
  ];

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getServiceSchema({
          url: pageUrl,
          name: service.title,
          description: service.schemaDescription,
          serviceType: service.serviceType,
        })}
      />
      {service.faqs.length > 0 ? (
        <JsonLdScript data={getFaqPageSchema(service.faqs)} />
      ) : null}

      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow={service.eyebrow}
          title={service.headline}
          description={service.subheadline}
          backgroundImage={service.editorialImage}
          compactSpacing
          proofItems={proofItems}
        >
          <PageBreadcrumbs
            currentPath={service.path}
            tone={service.editorialImage ? "dark" : "light"}
            className="mb-3 md:mb-4"
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,12.5rem)_1fr] xl:gap-20">
            <div className="mb-8 lg:sticky lg:top-32 lg:mb-0 lg:self-start">
              <MarketingSectionLabel>What we do</MarketingSectionLabel>
            </div>
            <div className="max-w-[60ch] space-y-5">
              {service.proposition.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base font-normal leading-[1.7] text-foreground md:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionLabel>Problems we address</MarketingSectionLabel>
            <div>
              {service.problems.map((problem) => (
                <div
                  key={problem}
                  className="border-t border-neutral-200 py-5 text-[17px] font-normal leading-relaxed text-neutral-800"
                >
                  {problem}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Deliverables"
              title={
                <>
                  What you get at <MarketingOrangeHighlight>delivery</MarketingOrangeHighlight>.
                </>
              }
            />
            <div className="grid gap-x-12 md:grid-cols-2">
              {service.deliverables.map((item, index) => (
                <div
                  key={item}
                  className={`flex gap-4 border-t border-neutral-200 py-5 ${index === 0 ? "border-t-0" : ""} md:[&:nth-child(-n+2)]:border-t-0`}
                >
                  <span
                    className="shrink-0 pt-0.5 text-[11px] tabular-nums text-neutral-400"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {formatDeliverableCounter(index)}
                  </span>
                  <p className="text-base font-normal leading-relaxed text-neutral-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/40 px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Process"
              title={
                <>
                  How we <MarketingOrangeHighlight>work</MarketingOrangeHighlight>.
                </>
              }
            />
            <ServiceProcessRow steps={service.process} />
          </div>
        </section>

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionLabel>Capabilities</MarketingSectionLabel>
            <div className="flex flex-wrap gap-2">
              {service.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-[13px] font-light text-neutral-700"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </section>

        {service.relatedCaseStudy ? (
          <section className="border-y border-border bg-card px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <MarketingSectionLabel>Related work</MarketingSectionLabel>
              <MarketingFadeIn>
                <Link
                  href={canonicalPath(service.relatedCaseStudy.href)}
                  className="group flex max-w-2xl flex-col gap-3 rounded-3xl border border-border bg-background p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {service.relatedCaseStudy.client}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.relatedCaseStudy.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform group-hover:translate-x-0.5">
                    Read case study <ArrowRight size={14} />
                  </span>
                </Link>
              </MarketingFadeIn>
            </div>
          </section>
        ) : null}

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="FAQ"
              title={
                <>
                  Common <MarketingOrangeHighlight>questions</MarketingOrangeHighlight>.
                </>
              }
            />
            <ServiceFaqList faqs={service.faqs} />
          </div>
        </section>

        <section className="border-t border-border bg-card px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionLabel>Related services</MarketingSectionLabel>
            <div className="flex flex-wrap gap-3">
              {service.relatedServices.map((related) => (
                <Link
                  key={related.href}
                  href={canonicalPath(related.href)}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:bg-card hover:text-foreground"
                >
                  {related.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <MarketingCtaSection
          title="Discuss this service."
          description="Tell us what you are building. We will outline how we would approach scope, timeline, and delivery."
          ctaLabel="Contact Comlabs"
          audienceItems={service.suitableFor}
          footerNote="Comlabs Technologies Pvt Ltd is based in Pune, Maharashtra, India and works with local and remote clients worldwide."
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
