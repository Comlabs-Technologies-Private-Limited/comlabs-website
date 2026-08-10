import type { Metadata } from "next";
import Link from "next/link";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import {
  MarketingOrangeHighlight,
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

        <section className="border-t border-border px-6 pb-24 md:pb-32">
          <MarketingWorkGrid />
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <MarketingFadeIn>
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
                <MarketingSectionLabel>Related services</MarketingSectionLabel>
                <h2 className="text-xl font-bold tracking-tight md:text-2xl" style={{ letterSpacing: "-0.03em" }}>
                  Explore how we deliver similar work.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Each case study maps to services we offer — explore the pages below for scope,
                  process, and deliverables.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={canonicalPath("/services/website-design-development")}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:bg-background hover:text-foreground"
                  >
                    Website design & development
                  </Link>
                  <Link
                    href={canonicalPath("/services/custom-software-development")}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:bg-background hover:text-foreground"
                  >
                    Custom software development
                  </Link>
                  <Link
                    href={canonicalPath("/services/seo-aeo-copywriting")}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/20 hover:bg-background hover:text-foreground"
                  >
                    SEO / AEO & copywriting
                  </Link>
                </div>
              </div>
            </MarketingFadeIn>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
