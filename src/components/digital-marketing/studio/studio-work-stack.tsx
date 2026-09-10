import Image from "next/image";
import Link from "next/link";

import { DIGITAL_MARKETING_WORK } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";
import { canonicalPath } from "@/lib/site";

/**
 * Sticky project stack. Each panel sticks under the header and the next one
 * slides over it — pure CSS `position: sticky`, so it behaves identically with
 * JavaScript disabled and needs no scroll listener.
 */
export function StudioWorkStack() {
  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.work}
      aria-label="Selected projects"
      className="scroll-mt-16 bg-[var(--studio-ink)] text-[var(--studio-white)] md:scroll-mt-20"
    >
      {DIGITAL_MARKETING_WORK.map((project, index) => (
        <article
          key={project.client}
          // Sticky only from `lg`, where a panel is reliably shorter than the
          // viewport. Below that the panels stack in normal flow instead of
          // pinning something too tall to fully read.
          className="studio-work border-t border-[var(--studio-line-dark)] bg-[var(--studio-ink)] shadow-[0_-1px_0_rgba(250,250,247,0.06)] lg:sticky lg:top-20"
        >
          <div className="studio-shell grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
            <div className="studio-work__body order-2 lg:order-1">
              <div className="studio-work__meta flex items-center gap-4">
                <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-cyan)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-[rgba(250,250,247,0.56)] uppercase">
                  {project.discipline}
                </span>
              </div>
              <h3 className="studio-work__title studio-display mt-5 text-[clamp(2rem,4.6vw,3.5rem)]">
                {project.client}
              </h3>
              <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.75] text-[rgba(250,250,247,0.68)]">
                {project.outcome}
              </p>
              <Link
                href={canonicalPath(project.href)}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium"
              >
                <span className="studio-slide">
                  <span>Read the case study</span>
                  <span aria-hidden>Read the case study</span>
                </span>
                <span
                  aria-hidden
                  className="block h-px w-8 bg-[var(--studio-white)] transition-[width] duration-400 group-hover:w-12"
                />
                <span
                  aria-hidden
                  className="studio-cta__marker text-[var(--studio-cyan)]"
                >
                  ↗
                </span>
                <span className="sr-only">: {project.client}</span>
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div
                data-studio-media
                className="studio-work__frame relative aspect-[4/3] border border-[var(--studio-line-dark)]"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="studio-work__image object-cover object-top"
                />
                <span
                  aria-hidden
                  className="studio-work__veil absolute inset-0"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
