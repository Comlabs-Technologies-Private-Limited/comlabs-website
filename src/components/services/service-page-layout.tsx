import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
  MarketingSectionLabel,
} from "@/components/marketing/marketing-section-header";
import { ServiceFaqList } from "@/components/services/service-faq-list";
import { ServiceOverviewSection } from "@/components/services/service-overview-section";
import { ServiceProcessRow } from "@/components/services/service-process-row";
import {
  ServiceRelatedServices,
  ServiceRelatedWork,
} from "@/components/services/service-related-sections";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalUrl, siteLocation } from "@/lib/site";

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
          title={service.title}
          description={service.subheadline}
          backgroundImage={service.editorialImage}
          proofItems={proofItems}
        >
          <PageBreadcrumbs
            currentPath={service.path}
            tone={service.editorialImage ? "dark" : "light"}
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </MarketingPageHero>

        <ServiceOverviewSection
          proposition={service.proposition}
          problems={service.problems}
          deliverables={service.deliverables}
        />

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

        <section className="px-6 py-12 md:py-16">
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
          <ServiceRelatedWork caseStudy={service.relatedCaseStudy} />
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

        <ServiceRelatedServices services={service.relatedServices} />

        <MarketingCtaSection
          title="Discuss this service."
          description="Tell us what you are building. We will outline how we would approach scope, timeline, and delivery."
          ctaLabel="Contact Comlabs"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
