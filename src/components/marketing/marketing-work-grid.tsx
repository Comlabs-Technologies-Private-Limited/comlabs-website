"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { WorkProject } from "@/components/home/figma/work-section";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type MarketingWorkGridProps = {
  projects: WorkProject[];
};

type CaseStudyCardProps = {
  project: WorkProject;
  featured?: boolean;
  className?: string;
};

function CaseStudyCard({ project, featured = false, className }: CaseStudyCardProps) {
  const href = canonicalPath(project.href);

  if (featured) {
    return (
      <article className={className}>
        <Link href={href} className="group grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary lg:aspect-auto lg:min-h-[360px] lg:border-r lg:border-b-0">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} case study`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full min-h-[240px] items-center justify-center bg-[var(--warm-orange-light)]">
                <span className="text-4xl font-medium tracking-tight text-[var(--warm-orange)]">
                  {project.title.slice(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-4 text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Featured
            </p>
            <p
              className="mb-3 text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--warm-orange)" }}
            >
              {project.category}
            </p>
            <h2
              className="text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h2>
            {project.desc ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.desc}
              </p>
            ) : null}
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform duration-300 group-hover:translate-x-0.5">
              Read case study
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("h-full", className)}>
      <Link href={href} className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} case study`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--warm-orange-light)]">
              <span className="text-3xl font-medium tracking-tight text-[var(--warm-orange)]">
                {project.title.slice(0, 1)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p
            className="mb-3 text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--warm-orange)" }}
          >
            {project.category}
          </p>
          <h2
            className="mb-3 text-xl font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground/80 md:text-[1.35rem]"
            style={{ letterSpacing: "-0.025em" }}
          >
            {project.title}
          </h2>
          {project.desc ? (
            <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {project.desc}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export function MarketingWorkGrid({ projects }: MarketingWorkGridProps) {
  const featured = projects[0];
  const remaining = projects.slice(1);

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        No case studies yet — check back soon.
      </p>
    );
  }

  return (
    <div className="border-y border-border px-0 py-2 md:p-3">
      <div className="flat-frame">
        {featured ? (
          <div className={remaining.length > 0 ? "border-b border-border" : undefined}>
            <CaseStudyCard project={featured} featured />
          </div>
        ) : null}
        {remaining.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {remaining.map((project, index) => (
              <CaseStudyCard
                key={project.href}
                project={project}
                className={cn(
                  index > 0 && "border-t border-border",
                  "md:border-t-0",
                  index >= 2 && "md:border-t md:border-border",
                  index % 2 !== 0 && "md:border-l md:border-border",
                )}
              />
            ))}
          </div>
        ) : null}
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
