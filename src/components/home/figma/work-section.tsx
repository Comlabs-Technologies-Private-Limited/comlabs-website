"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import {
  AFTER_TITLE_BODY_DELAY,
  RevealCopy,
  RevealStagger,
  afterTitleItemVariants,
  useAfterTitleReveal,
} from "@/components/home/figma/after-title-reveal";
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
  const { revealed, onTitleComplete } = useAfterTitleReveal();

  return (
    <section id="work" className="relative border-y border-border bg-card py-24">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div className="mb-12 flex items-end justify-between gap-6 px-4">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Case Studies
            </p>
            <BlurReveal
              as="h2"
              inView
              speedReveal={BLUR_REVEAL_NORMAL_SPEED}
              onAnimationComplete={onTitleComplete}
              className="text-2xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
              segments={[
                { text: "Proof in" },
                { text: "production", style: { color: "var(--warm-orange)" } },
                { text: "." },
              ]}
            />
            <RevealCopy
              revealed={revealed}
              className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              A selection of engagements across application support, AI systems, infrastructure,
              custom software, mobile products and digital experiences.
            </RevealCopy>
          </div>
          <RevealCopy
            revealed={revealed}
            as="div"
            className="hidden shrink-0 md:block"
          >
            <a
              href={canonicalPath("/case-studies")}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all case studies <ArrowRight size={13} />
            </a>
          </RevealCopy>
        </div>
      </div>

      <RevealStagger
        revealed={revealed}
        delay={AFTER_TITLE_BODY_DELAY}
        className="section-layout"
      >
        {/* Outer hairline, perimeter padding, then the inner frame around the cards. */}
        <div className="border-y border-border p-2 md:p-3">
          <div className="flat-frame grid grid-cols-1 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.a
                key={project.href}
                href={canonicalPath(project.href)}
                variants={afterTitleItemVariants}
                className={cn(
                  "flex min-w-0 flex-col",
                  index > 0 && "border-t border-border",
                  "lg:border-t-0",
                  index >= 3 && "lg:border-t lg:border-border",
                  index % 3 !== 0 && "lg:border-l lg:border-border",
                )}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                  <img
                    src={mediaUrl(project.image)}
                    alt={`${project.title} case study`}
                    className="absolute inset-0 h-full w-full max-w-none object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-border p-7">
                  <div className="mb-1.5 flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold tracking-tight">{project.title}</h3>
                    <ExternalLink size={13} className="mt-0.5 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mb-3 text-xs text-muted-foreground">
                    {project.category}
                    {project.featured ? <span className="ml-3">Featured</span> : null}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
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
            ))}
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
