"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";
import { mediaUrl } from "@/lib/cloudinary";

export type WorkProject = {
  title: string;
  category: string;
  desc: string;
  href: string;
  image: string;
  featured?: boolean;
  liveSiteUrl?: string;
};

type FigmaWorkSectionProps = {
  projects: WorkProject[];
};

export function FigmaWorkSection({ projects }: FigmaWorkSectionProps) {
  return (
    <section id="work" className="border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Case Studies
            </p>
            <h2
              className="text-2xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Proof in <span style={{ color: "var(--warm-orange)" }}>production</span>.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A selection of engagements across application support, AI systems, infrastructure,
              custom software, mobile products and digital experiences.
            </p>
          </div>
          <a
            href={canonicalPath("/case-studies")}
            className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            View all case studies <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const featured = Boolean(project.featured);

            return (
              <motion.a
                key={project.href}
                href={canonicalPath(project.href)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "group block overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/20",
                  featured && "md:col-span-2 md:grid md:grid-cols-2 md:items-stretch",
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden bg-secondary",
                    featured ? "aspect-[16/10] md:aspect-auto md:min-h-[320px]" : "aspect-video",
                  )}
                >
                  <img
                    src={mediaUrl(project.image)}
                    alt={`${project.title} case study`}
                    className="absolute inset-0 h-full w-full max-w-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {featured ? (
                    <span
                      className="absolute top-4 left-4 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-tight"
                      style={{
                        background: "var(--warm-orange-light)",
                        color: "var(--warm-orange)",
                      }}
                    >
                      Featured
                    </span>
                  ) : null}
                </div>
                <div className={cn("flex flex-col justify-center p-6", featured && "md:p-10")}>
                  <div className="mb-1.5 flex items-start justify-between gap-3">
                    <h3
                      className={cn(
                        "font-semibold tracking-tight",
                        featured ? "text-base md:text-lg" : "text-sm",
                      )}
                    >
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={13}
                      className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">{project.category}</p>
                  <p
                    className={cn(
                      "leading-relaxed text-muted-foreground",
                      featured ? "text-sm md:text-base" : "text-sm",
                    )}
                  >
                    {project.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)]">
                    Read case study <ArrowRight size={14} />
                  </span>
                  {project.liveSiteUrl ? (
                    <span className="mt-4 block text-xs text-[var(--warm-orange)]">
                      {new URL(project.liveSiteUrl).hostname}
                    </span>
                  ) : null}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
