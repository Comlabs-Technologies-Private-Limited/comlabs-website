import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import type { CaseStudyHeadline } from "@/lib/case-studies";
import { canonicalPath } from "@/lib/site";

type CaseStudyHeroProps = {
  slug: string;
  client: string;
  year: string;
  headline: CaseStudyHeadline;
  standfirst: string;
  /** Replaces the default `Case study · {year}` line. */
  eyebrow?: string;
  /** Adds a primary link to the published work alongside a contact action. */
  liveSite?: { label: string; href: string };
};

export function CaseStudyHero({
  slug,
  client,
  year,
  headline,
  standfirst,
  eyebrow,
  liveSite,
}: CaseStudyHeroProps) {
  return (
    <header className="px-6 pt-12 pb-8 md:pt-16 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <PageBreadcrumbs
          className="mb-10"
          currentPath={`/work/${slug}`}
          items={[{ label: "Case Studies", href: "/work" }, { label: client }]}
        />

        <MarketingFadeIn>
          <p className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
            {eyebrow ?? `Case study · ${year}`}
          </p>
          <p className="mb-4 text-sm text-muted-foreground">{client}</p>
          <h1
            className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {headline.before}
            <MarketingOrangeHighlight>{headline.highlight}</MarketingOrangeHighlight>
            {headline.after}
          </h1>
          <p className="mt-6 max-w-[42rem] text-base leading-[1.7] text-muted-foreground md:text-[17px] md:leading-[1.75]">
            {standfirst}
          </p>

          {liveSite ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={liveSite.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                {liveSite.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <Link
                href={canonicalPath("/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/25"
              >
                Start a similar project
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </MarketingFadeIn>
      </div>
    </header>
  );
}
