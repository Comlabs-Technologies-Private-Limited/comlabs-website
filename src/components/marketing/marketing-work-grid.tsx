"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import type { WorkProject } from "@/components/home/figma/work-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { CASE_STUDY_MEDIA_SIZE, mediaUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import { referringAnchorProps } from "@/lib/seo/prepare-html-links";
import { canonicalPath } from "@/lib/site";

type MarketingWorkGridProps = {
  projects: WorkProject[];
  showLiveSite?: boolean;
};

export function MarketingWorkGrid({
  projects,
  showLiveSite = true,
}: MarketingWorkGridProps) {
  return (
    <div className="border-y border-border px-0 py-2 md:p-3">
      <div className="flat-frame grid grid-cols-1 lg:grid-cols-3">
        {projects.map((project, index) => (
          <MarketingFadeIn
            key={project.href}
            delay={index * 0.06}
            className={cn(
              "flex min-w-0 flex-col",
              index > 0 && "border-t border-border",
              "lg:border-t-0",
              index >= 3 && "lg:border-t lg:border-border",
              index % 3 !== 0 && "lg:border-l lg:border-border",
            )}
          >
            <Link href={canonicalPath(project.href)} className="group flex flex-1 flex-col">
              <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16 / 10" }}>
                <img
                  src={mediaUrl(project.image)}
                  alt={`${project.title} case study`}
                  width={CASE_STUDY_MEDIA_SIZE.width}
                  height={CASE_STUDY_MEDIA_SIZE.height}
                  className="absolute inset-0 h-full w-full max-w-none object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-border p-6 lg:p-7">
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <h2 className="text-sm font-semibold">{project.title}</h2>
                  <ExternalLink
                    size={13}
                    className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{project.category}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)]">
                  Read case study <ArrowRight size={14} />
                </span>
              </div>
            </Link>
            {showLiveSite && project.liveSiteUrl ? (
              <div className="mt-auto border-t border-border px-6 py-3 lg:px-7">
                <a
                  {...referringAnchorProps(project.liveSiteUrl)}
                  className="text-xs text-muted-foreground transition-colors hover:text-[var(--warm-orange)]"
                >
                  Visit {new URL(project.liveSiteUrl).hostname}
                </a>
              </div>
            ) : null}
          </MarketingFadeIn>
        ))}
      </div>
    </div>
  );
}

type MarketingProjectCardsProps = {
  projects: WorkProject[];
  compact?: boolean;
};

export function MarketingProjectCards({ projects, compact }: MarketingProjectCardsProps) {
  const columns = 4;

  return (
    <div className="border-y border-border px-0 py-2 md:p-3">
      <div className="flat-frame grid grid-cols-1 lg:grid-cols-4">
        {projects.map((project, index) => (
          <MarketingFadeIn
            key={project.href}
            delay={index * 0.06}
            className={cn(
              "min-w-0",
              index > 0 && "border-t border-border",
              "lg:border-t-0",
              index >= columns && "lg:border-t lg:border-border",
              index % columns !== 0 && "lg:border-l lg:border-border",
            )}
          >
            <Link href={canonicalPath(project.href)} className="group flex h-full flex-col p-6">
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
    </div>
  );
}
