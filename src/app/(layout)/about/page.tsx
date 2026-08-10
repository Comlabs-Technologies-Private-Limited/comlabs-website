import type { Metadata } from "next";
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
} from "@/components/marketing/marketing-section-header";
import { MarketingProjectCards } from "@/components/marketing/marketing-work-grid";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { editorialImages } from "@/lib/editorial-images";
import { canonicalPath, siteLocation, siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About Comlabs Technologies Pvt Ltd",
  description:
    "Learn about Comlabs Technologies Pvt Ltd — a Pune-based design and engineering studio building websites, custom software, mobile products, and scalable digital infrastructure.",
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow="About"
          title={siteName}
          description={`A design and engineering studio in ${siteLocation}. We help companies ship high-performance websites, custom software, mobile products, and scalable digital infrastructure.`}
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
                    Design and engineering,{" "}
                    <MarketingOrangeHighlight>together</MarketingOrangeHighlight>.
                  </>
                }
              />
              <p className="mt-5 text-base leading-[1.7] text-muted-foreground">
                Comlabs combines UX structure, interface design, and production engineering. Projects
                range from marketing websites and redesigns to custom software, mobile apps, and
                cloud infrastructure for growing product teams.
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
                Engagements are direct and scope-aware. You work with the team building the work —
                short feedback loops, clear milestones, and production-ready delivery rather than
                slide decks that never ship.
              </p>
            </MarketingFadeIn>
          </div>
        </section>

        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              eyebrow="Selected work"
              title={
                <>
                  Recent <MarketingOrangeHighlight>projects</MarketingOrangeHighlight>.
                </>
              }
              description="Explore case studies across website projects, product onboarding, and brand-led marketing sites."
            />
            <MarketingProjectCards />
            <Link
              href={canonicalPath("/work")}
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
            >
              View all case studies <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <MarketingCtaSection
          title="Start a conversation."
          description={`Based in ${siteLocation}. Available for local and remote projects.`}
          ctaLabel="Contact us"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
