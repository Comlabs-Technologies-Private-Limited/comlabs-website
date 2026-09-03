import type { Metadata } from "next";
import Link from "next/link";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
  MarketingSectionLabel,
} from "@/components/marketing/marketing-section-header";
import { MarketingWorkGrid } from "@/components/marketing/marketing-work-grid";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { primaryServices } from "@/lib/canonical-services";
import { buildPageMetadata } from "@/lib/metadata";
import { getCollectionPageSchema } from "@/lib/schema";
import { CASE_STUDIES_PATH, canonicalPath } from "@/lib/site";

const CASE_STUDIES_TITLE = "Engineering Case Studies | Comlabs Technologies";
const CASE_STUDIES_DESCRIPTION =
  "Explore how Comlabs approaches application support, AI systems, cloud infrastructure, custom software, mobile products and digital experiences.";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: CASE_STUDIES_TITLE,
  description: CASE_STUDIES_DESCRIPTION,
  path: CASE_STUDIES_PATH,
  absoluteTitle: true,
});

export default async function CaseStudiesIndexPage() {
  const summaries = await listPublishedCaseStudySummaries();
  const projects = summaries.map((study) => ({
    title: study.title,
    category: study.category,
    desc: study.description,
    href: study.href,
    image: study.image,
  }));
  const footerCaseStudies = summaries.map((study) => ({
    label: study.title,
    href: study.href,
  }));

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getCollectionPageSchema({
          url: CASE_STUDIES_PATH,
          name: CASE_STUDIES_TITLE,
          description: CASE_STUDIES_DESCRIPTION,
          items: summaries.map((study) => ({
            name: study.title,
            url: study.href,
          })),
        })}
      />

      <FigmaNavLoader />

      <main>
        <MarketingPageHero
          eyebrow="Case Studies"
          title={
            <>
              Case studies across engineering and{" "}
              <MarketingOrangeHighlight>operations</MarketingOrangeHighlight>.
            </>
          }
          description="Published work across application support, automation, AI systems, AWS and infrastructure, custom software, mobile products and digital experiences."
        >
          <PageBreadcrumbs currentPath={CASE_STUDIES_PATH} items={[{ label: "Case Studies" }]} />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              className="mb-10 md:mb-12"
              eyebrow="Case Studies"
              title={
                <>
                  Recent <MarketingOrangeHighlight>engagements</MarketingOrangeHighlight>.
                </>
              }
              description="Each study is a real engagement — kept aligned with the client, scope and outcomes we can actually show."
            />
            <MarketingWorkGrid projects={projects} />
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <MarketingFadeIn>
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <MarketingSectionLabel>Related services</MarketingSectionLabel>
                <h2
                  className="text-xl font-medium tracking-tight md:text-2xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  How these engagements map to the stack.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Case studies sit across the same services we operate in production — from support
                  and infrastructure through software, mobile and digital experience.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {primaryServices.map((service) => (
                    <Link
                      key={service.path}
                      href={canonicalPath(service.path)}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </MarketingFadeIn>
          </div>
        </section>

        <MarketingCtaSection
          title="Have a system that needs the same care?"
          description="Tell us what you are supporting, building or operating. We will share how we would approach it."
          ctaLabel="Contact Comlabs"
        />
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
