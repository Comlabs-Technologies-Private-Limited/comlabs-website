import type { Metadata } from "next";
import Link from "next/link";

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
import { MarketingWorkGrid } from "@/components/marketing/marketing-work-grid";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { canonicalPath } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Website & Product Development Case Studies",
  description:
    "Case studies from Comlabs Technologies Pvt Ltd — website projects, custom software, and product onboarding for companies that needed clearer positioning and better delivery.",
  path: "/work",
});

const RELATED_SERVICES = [
  { label: "Website design & development", href: "/services/website-design-development" },
  { label: "Custom software development", href: "/services/custom-software-development" },
  { label: "SEO / AEO & copywriting", href: "/services/seo-aeo-copywriting" },
] as const;

export default function WorkIndexPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <MarketingPageHero
          eyebrow="Case studies"
          title={
            <>
              Website and product development in{" "}
              <MarketingOrangeHighlight>practice</MarketingOrangeHighlight>.
            </>
          }
          description="Recent projects from Comlabs Technologies Pvt Ltd — from conversion-focused websites to custom software and product onboarding flows."
        >
          <PageBreadcrumbs currentPath="/work" items={[{ label: "Work" }]} />
        </MarketingPageHero>

        <section className="border-y border-border bg-card px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              className="mb-10 md:mb-12"
              eyebrow="Selected work"
              title={
                <>
                  Recent <MarketingOrangeHighlight>projects</MarketingOrangeHighlight>.
                </>
              }
              description="Explore selected work across digital products, conversion-focused websites, product onboarding and brand-led digital experiences."
            />
            <MarketingWorkGrid />
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <MarketingFadeIn>
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <MarketingSectionLabel>Related services</MarketingSectionLabel>
                <h2
                  className="text-xl font-bold tracking-tight md:text-2xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Explore how we deliver similar work.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Each case study maps to services we offer — explore the pages below for scope,
                  process, and deliverables.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {RELATED_SERVICES.map((service) => (
                    <Link
                      key={service.href}
                      href={canonicalPath(service.href)}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </MarketingFadeIn>
          </div>
        </section>

        <MarketingCtaSection
          title="Have a project in mind?"
          description="Tell us what you're building. We'll share how we'd approach scope, timeline, and delivery."
          ctaLabel="Start a conversation"
        />
      </main>

      <FigmaFooter />
    </div>
  );
}
