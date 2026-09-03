import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { MarketingCtaSection } from "@/components/marketing/marketing-cta-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { MarketingProjectCards } from "@/components/marketing/marketing-work-grid";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import { editorialImages } from "@/lib/editorial-images";
import { getAboutPageSchema } from "@/lib/schema";
import { CASE_STUDIES_PATH, canonicalPath, siteLocation, siteName } from "@/lib/site";

const ABOUT_TITLE = "About Comlabs Technologies | Engineering & Operations";
const ABOUT_DESCRIPTION =
  "Learn how Comlabs combines software engineering, cloud infrastructure, AI systems and application support to take responsibility beyond deployment.";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  absoluteTitle: true,
});

export default async function AboutPage() {
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
        data={getAboutPageSchema({
          url: "/about",
          name: ABOUT_TITLE,
          description: ABOUT_DESCRIPTION,
        })}
      />
      <FigmaNavLoader />

      <main>
        <MarketingPageHero
          eyebrow="About"
          title={siteName}
          description={`An engineering and technology operations company in ${siteLocation}. We support production applications, AI systems, cloud infrastructure and digital products from build through operation.`}
          backgroundImage={editorialImages.aboutDesert}
        >
          <PageBreadcrumbs currentPath="/about" tone="dark" items={[{ label: "About" }]} />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20">
            <MarketingFadeIn>
              <MarketingSectionHeader
                className="mb-0"
                eyebrow="What we do"
                title={
                  <>
                    Engineering that stays responsible{" "}
                    <MarketingOrangeHighlight>after launch</MarketingOrangeHighlight>.
                  </>
                }
              />
              <p className="mt-5 text-base leading-[1.7] text-muted-foreground">
                Comlabs builds, operates and supports the systems businesses depend on — L1–L4
                application support, agentic infrastructure, AWS cloud and DevOps, custom software,
                mobile products and digital experiences. The work does not stop at deployment.
              </p>
            </MarketingFadeIn>
            <MarketingFadeIn delay={0.08}>
              <MarketingSectionHeader
                className="mb-0"
                eyebrow="How we work"
                title={
                  <>
                    Direct collaboration,{" "}
                    <MarketingOrangeHighlight>real delivery</MarketingOrangeHighlight>.
                  </>
                }
              />
              <p className="mt-5 text-base leading-[1.7] text-muted-foreground">
                Engagements are direct and scope-aware. You work with the team building and operating
                the system — short feedback loops, clear milestones, and production-ready delivery
                rather than slide decks that never ship.
              </p>
            </MarketingFadeIn>
          </div>
        </section>

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Case Studies"
              title={
                <>
                  Recent <MarketingOrangeHighlight>engagements</MarketingOrangeHighlight>.
                </>
              }
              description="Explore case studies across software, infrastructure, AI systems, mobile products and digital experiences."
            />
            <MarketingProjectCards projects={projects} />
            <Link
              href={canonicalPath(CASE_STUDIES_PATH)}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
            >
              View all case studies <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <MarketingCtaSection
          title="Start a conversation."
          description={`Based in ${siteLocation}. Available for local and remote engagements.`}
          ctaLabel="Contact Comlabs"
        />
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
