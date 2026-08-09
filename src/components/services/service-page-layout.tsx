import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { EditorialPhotoSection } from "@/components/marketing/editorial-photo";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingProcessGrid } from "@/components/marketing/marketing-process-grid";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
  MarketingSectionLabel,
} from "@/components/marketing/marketing-section-header";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath, canonicalUrl } from "@/lib/site";

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
      {service.faqs.length > 0 ? (
        <JsonLdScript data={getFaqPageSchema(service.faqs)} />
      ) : null}

      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow={service.eyebrow}
          title={service.headline}
          description={service.subheadline}
        >
          <PageBreadcrumbs
            currentPath={service.path}
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </MarketingPageHero>

        {service.editorialImage ? (
          <EditorialPhotoSection image={service.editorialImage} />
        ) : null}

        <section className="border-y border-border bg-card px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20">
            <MarketingFadeIn>
              <MarketingSectionLabel>What we do</MarketingSectionLabel>
              <div className="space-y-5">
                {service.proposition.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-[1.7] text-foreground md:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </MarketingFadeIn>
            <MarketingFadeIn delay={0.08}>
              <MarketingSectionLabel>Problems we address</MarketingSectionLabel>
              <ul className="space-y-4">
                {service.problems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3.5 text-base leading-[1.65] text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--warm-orange)" }}
                      aria-hidden
                    />
                    {problem}
                  </li>
                ))}
              </ul>
            </MarketingFadeIn>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Deliverables"
              title={
                <>
                  What you get at <MarketingOrangeHighlight>delivery</MarketingOrangeHighlight>.
                </>
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              {service.deliverables.map((item, index) => (
                <MarketingFadeIn key={item} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/15 md:p-7">
                    <span
                      className="mb-3 inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
                      style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
                    >
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed text-foreground md:text-base">{item}</p>
                  </div>
                </MarketingFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Process"
              title={
                <>
                  How we <MarketingOrangeHighlight>work</MarketingOrangeHighlight>.
                </>
              }
            />
            <MarketingProcessGrid steps={service.process} />
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20">
            <MarketingFadeIn>
              <MarketingSectionLabel>Capabilities</MarketingSectionLabel>
              <ul className="space-y-3">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground transition-colors hover:border-foreground/15"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </MarketingFadeIn>
            <MarketingFadeIn delay={0.08}>
              <MarketingSectionLabel>Who this is for</MarketingSectionLabel>
              <ul className="space-y-4">
                {service.suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-base leading-relaxed text-muted-foreground">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--warm-orange)" }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                Comlabs Technologies Pvt Ltd is based in Pune, Maharashtra, India and works with
                local and remote clients worldwide.
              </p>
            </MarketingFadeIn>
          </div>
        </section>

        {service.relatedCaseStudy ? (
          <section className="border-y border-border bg-card px-6 py-16 md:py-20">
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

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="FAQ"
              title={
                <>
                  Common <MarketingOrangeHighlight>questions</MarketingOrangeHighlight>.
                </>
              }
            />
            <div className="space-y-3">
              {service.faqs.map((faq, index) => (
                <MarketingFadeIn key={faq.question} delay={index * 0.04}>
                  <details className="group rounded-2xl border border-border bg-background px-6 py-5 transition-colors open:border-foreground/15 open:bg-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                </MarketingFadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-8">
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
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
