import type { ReactNode } from "react";

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
import type { ServiceNamedItem, ServicePageData } from "@/lib/services-data";
import { canonicalUrl } from "@/lib/site";

export function ServicePageLayout({ service }: { service: ServicePageData }) {
  const pageUrl = canonicalUrl(service.path);

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
      {service.faqs.length > 0 ? <JsonLdScript data={getFaqPageSchema(service.faqs)} /> : null}

      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow={service.eyebrow}
          title={service.headline}
          description={
            <>
              {service.heroCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </>
          }
          backgroundImage={service.editorialImage}
          proofItems={service.proofItems}
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
          eyebrow={service.overviewEyebrow}
          proposition={service.proposition}
          problemsEyebrow={service.problemsEyebrow}
          problemsHeading={service.problemsHeading}
          problems={service.problems}
          deliverablesEyebrow={service.deliverablesEyebrow}
          deliverablesHeading={service.deliverablesHeading}
          deliverables={service.deliverables}
        />

        {service.detailItems && service.detailItems.length > 0 ? (
          <NamedItemsSection
            eyebrow={service.detailEyebrow ?? "Capabilities"}
            heading={service.detailHeading ?? "How the work is structured."}
            items={service.detailItems}
          />
        ) : null}

        {service.process.length > 0 ? (
          <section className="border-b border-border bg-secondary/40 px-6 py-24 md:py-28">
            <div className="mx-auto max-w-6xl">
              <MarketingSectionHeader
                eyebrow={service.processEyebrow ?? "Process"}
                title={
                  service.processHeading ?? (
                    <>
                      How we <MarketingOrangeHighlight>work</MarketingOrangeHighlight>.
                    </>
                  )
                }
                description={service.processIntro}
              />
              <ServiceProcessRow steps={service.process} />
            </div>
          </section>
        ) : null}

        {service.capabilities.length > 0 ? (
          <section className="px-6 py-12 md:py-16">
            <div className="mx-auto max-w-6xl">
              <MarketingSectionLabel>
                {service.capabilitiesEyebrow ?? "Capabilities"}
              </MarketingSectionLabel>
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
        ) : null}

        {service.outcomes && service.outcomes.length > 0 ? (
          <ListSection
            eyebrow={service.outcomesEyebrow ?? "Outcome"}
            heading={service.outcomesHeading ?? "What changes."}
            items={service.outcomes}
          />
        ) : null}

        {service.suitableFor.length > 0 ? (
          <ListSection
            eyebrow="Fit"
            heading={service.suitableForHeading ?? "Who this is for."}
            items={service.suitableFor}
          />
        ) : null}

        {service.relatedCaseStudy ? (
          <ServiceRelatedWork caseStudy={service.relatedCaseStudy} />
        ) : null}

        {service.faqs.length > 0 ? (
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
        ) : null}

        <ServiceRelatedServices services={service.relatedServices} />

        <MarketingCtaSection
          eyebrow=""
          title={service.ctaTitle}
          description={service.ctaDescription}
          ctaLabel={service.ctaLabel}
        />
      </main>

      <FigmaFooter />
    </div>
  );
}

function NamedItemsSection({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: readonly ServiceNamedItem[];
}) {
  return (
    <section className="border-b border-border px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MarketingSectionHeader eyebrow={eyebrow} title={heading} />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="bg-background px-6 py-8 md:px-8 md:py-10">
              <h3
                className="text-[15px] font-medium tracking-tight md:text-base"
                style={{ letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ListSection({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  items: readonly string[];
}) {
  return (
    <section className="border-b border-border px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MarketingSectionHeader eyebrow={eyebrow} title={heading} />
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-[15px] leading-relaxed text-foreground/85"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--warm-orange)]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
