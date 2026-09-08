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
import {
  EDITORIAL_SHELL_CLASS,
  editorialImageSrc,
  editorialImages,
} from "@/lib/home-editorial-images";
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

const HAIRLINE = "var(--border)";

/**
 * Editorial visuals for studies that ship without a hero image, in order:
 * `productScenes` first, `motion` second — each used at most once.
 */
const EDITORIAL_FALLBACKS = [editorialImages.productScenes, editorialImages.motion] as const;

function resolveVisuals(projects: WorkProject[]): string[] {
  let fallbackIndex = 0;
  return projects.map((project) => {
    if (project.image) return mediaUrl(project.image);
    const fallback = EDITORIAL_FALLBACKS[fallbackIndex];
    fallbackIndex += 1;
    return fallback ? editorialImageSrc(fallback, 1600) : "";
  });
}

export function FigmaWorkSection({ projects }: FigmaWorkSectionProps) {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  const visuals = resolveVisuals(projects);
  const lastSpansTablet = projects.length % 2 === 1;

  return (
    <section id="work" className="border-y border-border bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
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

      <RevealStagger revealed={revealed} delay={AFTER_TITLE_BODY_DELAY} className={EDITORIAL_SHELL_CLASS}>
        <div
          className="grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: HAIRLINE, background: HAIRLINE, borderRadius: 0 }}
        >
          {projects.map((project, index) => {
            const featured = Boolean(project.featured);
            const isLast = index === projects.length - 1;
            const visual = visuals[index];

            return (
              <motion.a
                key={project.href}
                href={canonicalPath(project.href)}
                variants={afterTitleItemVariants}
                className={cn(
                  "group flex min-w-0 flex-col bg-background",
                  lastSpansTablet && isLast && "md:col-span-2 lg:col-span-1",
                )}
                style={{ borderRadius: 0 }}
              >
                <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16 / 10" }}>
                  {visual ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={visual}
                      alt={`${project.title} case study`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full max-w-none object-cover object-top"
                    />
                  ) : null}
                </div>
                <div
                  className="flex flex-1 flex-col p-6 lg:p-7"
                  style={{ borderTop: `1px solid ${HAIRLINE}` }}
                >
                  <p className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{project.category}</span>
                    {featured ? (
                      <span className="font-medium tracking-tight text-[var(--warm-orange)]">
                        Featured
                      </span>
                    ) : null}
                  </p>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3
                      className="text-base font-semibold tracking-tight md:text-lg"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={13}
                      className="mt-1 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)]">
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
      </RevealStagger>
    </section>
  );
}
