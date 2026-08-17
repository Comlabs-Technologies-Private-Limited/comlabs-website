"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { PROJECTS } from "@/components/home/figma/home-data";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { canonicalPath } from "@/lib/site";

type MarketingWorkGridProps = {
  showLiveSite?: boolean;
};

export function MarketingWorkGrid({ showLiveSite = true }: MarketingWorkGridProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:gap-6">
      {PROJECTS.map((project, index) => (
        <MarketingFadeIn key={project.href} delay={index * 0.06} className="h-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]">
            <Link href={canonicalPath(project.href)} className="block flex-1">
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={`${project.title} website`}
                  className="absolute inset-0 h-full w-full max-w-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <h2 className="text-sm font-semibold">{project.title}</h2>
                  <ExternalLink
                    size={13}
                    className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{project.category}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform duration-300 group-hover:translate-x-0.5">
                  Read case study <ArrowRight size={14} />
                </span>
              </div>
            </Link>
            {showLiveSite && "liveSiteUrl" in project && project.liveSiteUrl ? (
              <div className="mt-auto border-t border-border px-6 py-3">
                <a
                  href={project.liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-[var(--warm-orange)]"
                >
                  Visit {new URL(project.liveSiteUrl).hostname}
                </a>
              </div>
            ) : null}
          </article>
        </MarketingFadeIn>
      ))}
    </div>
  );
}

type MarketingProjectCardsProps = {
  compact?: boolean;
};

export function MarketingProjectCards({ compact }: MarketingProjectCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {PROJECTS.map((project, index) => (
        <MarketingFadeIn key={project.href} delay={index * 0.06}>
          <Link
            href={canonicalPath(project.href)}
            className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(28,25,23,0.05)]"
          >
            <h3 className="text-sm font-semibold">{project.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{project.category}</p>
            <p className={`mt-3 flex-1 leading-relaxed text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>
              {project.desc}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--warm-orange)] transition-transform group-hover:translate-x-0.5">
              Read case study <ArrowRight size={12} />
            </span>
          </Link>
        </MarketingFadeIn>
      ))}
    </div>
  );
}
