import type { ReactNode } from "react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { ServiceFaqList } from "@/components/services/service-faq-list";
import { ServicePageHero } from "@/components/services/service-page-hero";
import { ServiceProcessRow } from "@/components/services/service-process-row";
import { ServiceProofModule } from "@/components/services/service-proof-module";
import {
  ServiceRelatedServices,
  ServiceRelatedWork,
} from "@/components/services/service-related-sections";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicePageLayout({ service }: { service: ServicePageData }) {
  const pageUrl = canonicalUrl(service.path);
  const triggers = service.buyerTriggers ?? [];
  const ownershipItems =
    service.deliverables.length > 0 ? service.deliverables : (service.outcomes ?? []);
  const hasScope = service.problems.length > 0 || ownershipItems.length > 0;

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

      <FigmaNavLoader />

      <main>
        <ServicePageHero service={service} />

        {triggers.length > 0 ? (
          <section className="relative border-b border-border bg-card py-24 md:py-28">
            <span aria-hidden className="gutter-hatch" />
            <div className="section-layout">
              <MarketingSectionHeader
                className="mb-12 px-3 md:mb-14 md:px-4"
                eyebrow="Fit"
                title={
                  <>
                    When this service is the{" "}
                    <MarketingOrangeHighlight>right move</MarketingOrangeHighlight>.
                  </>
                }
              />
              <div className="flat-frame grid grid-cols-1 md:grid-cols-2">
                {triggers.map((item, index) => (
                  <article
                    key={item.title}
                    className={cn(
                      "bg-background px-6 py-8 md:px-8 md:py-10",
                      index > 0 && "border-t border-border",
                      "md:border-t-0",
                      index >= 2 && "md:border-t md:border-border",
                      index % 2 !== 0 && "md:border-l md:border-border",
                    )}
                  >
                    <h3
                      className="text-[15px] font-medium tracking-tight md:text-base"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {service.proofTitle && service.proofCaption ? (
          <ServiceProofModule
            slug={service.slug}
            title={service.proofTitle}
            caption={service.proofCaption}
          />
        ) : null}

        {hasScope ? (
          <section className="relative border-b border-border py-24 md:py-28">
            <span aria-hidden className="gutter-hatch" />
            <div className="section-layout">
              <MarketingSectionHeader
                className="mb-12 px-3 md:mb-14 md:px-4"
                eyebrow="Scope"
                title={
                  <>
                    Problems on one side.{" "}
                    <MarketingOrangeHighlight>Responsibility</MarketingOrangeHighlight> on the other.
                  </>
                }
              />
              <div
                className={cn(
                  "flat-frame grid",
                  service.problems.length > 0 && ownershipItems.length > 0
                    ? "lg:grid-cols-2"
                    : "grid-cols-1",
                )}
              >
                {service.problems.length > 0 ? (
                  <ScopePanel
                    eyebrow={service.problemsEyebrow ?? "Failure modes"}
                    heading={service.problemsHeading ?? "Where this work starts."}
                    items={service.problems}
                  />
                ) : null}
                {ownershipItems.length > 0 ? (
                  <ScopePanel
                    eyebrow={service.deliverablesEyebrow ?? service.outcomesEyebrow ?? "Ownership"}
                    heading={
                      service.deliverablesHeading ??
                      service.outcomesHeading ??
                      "What Comlabs can take responsibility for."
                    }
                    items={ownershipItems}
                    className={
                      service.problems.length > 0
                        ? "border-t border-border lg:border-t-0 lg:border-l"
                        : undefined
                    }
                  />
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {service.process.length > 0 ? (
          <section
            id="engagement"
            className="relative border-b border-border bg-secondary/40 py-24 md:py-28"
          >
            <span aria-hidden className="gutter-hatch" />
            <div className="section-layout">
              <MarketingSectionHeader
                className="px-3 md:px-4"
                eyebrow={service.processEyebrow ?? "Engagement"}
                title={service.processHeading ?? "How the engagement works"}
                description={service.processIntro}
              />
              <div className="mt-12 px-3 md:px-4">
                <ServiceProcessRow steps={service.process} />
              </div>
            </div>
          </section>
        ) : null}

        {service.relatedCaseStudy ? (
          <ServiceRelatedWork caseStudy={service.relatedCaseStudy} />
        ) : service.representativeEngagement ? (
          <section className="relative border-b border-border py-24 md:py-28">
            <span aria-hidden className="gutter-hatch" />
            <div className="section-layout px-3 md:px-4">
              <MarketingSectionHeader
                eyebrow="Engagement"
                title={service.representativeEngagement.title}
              />
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {service.representativeEngagement.summary}
              </p>
            </div>
          </section>
        ) : null}

        {service.faqs.length > 0 ? (
          <section className="relative py-24 md:py-28">
            <span aria-hidden className="gutter-hatch" />
            <div className="section-layout px-3 md:px-4">
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
          title={service.ctaTitle}
          description={service.ctaDescription}
          ctaLabel={service.ctaLabel}
        />
      </main>

      <FigmaFooter />
    </div>
  );
}

function ScopePanel({
  eyebrow,
  heading,
  items,
  className,
}: {
  eyebrow: string;
  heading: ReactNode;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("bg-background px-6 py-8 md:px-10 md:py-10", className)}>
      <p className="mb-3 text-[11px] tracking-widest text-muted-foreground uppercase">{eyebrow}</p>
      <h2
        className="mb-8 max-w-sm text-lg font-medium tracking-tight text-foreground md:text-xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {heading}
      </h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0"
          >
            <span
              className="w-7 shrink-0 pt-0.5 text-[11px] tabular-nums text-muted-foreground"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-[15px] leading-relaxed text-foreground/85">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
