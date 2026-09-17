import { StudioGlassCard } from "@/components/digital-marketing/studio/studio-glass-card";
import { StudioShaderSlot } from "@/components/digital-marketing/studio/studio-shader-slot";
import {
  DIGITAL_MARKETING_PROOF,
  DIGITAL_MARKETING_WORK,
} from "@/lib/digital-marketing";

/**
 * Single oversized editorial quote. Only genuine testimonials already recorded
 * in the repository are used — this is the Global Services engagement.
 */
export function StudioTestimonial() {
  const proof = DIGITAL_MARKETING_PROOF[0];
  const project = DIGITAL_MARKETING_WORK.find(
    (item) => item.client === "Global Services",
  );
  if (!proof) return null;

  return (
    <section
      aria-labelledby="studio-testimonial-heading"
      className="border-b border-[var(--studio-line)] py-20 md:py-28"
    >
      <div className="studio-shell">
        <h2
          id="studio-testimonial-heading"
          className="studio-eyebrow"
          data-studio-reveal
        >
          Client proof
        </h2>

        <div className="mt-10 grid gap-12 md:mt-14 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end xl:gap-16">
          <figure>
            <blockquote
              data-studio-reveal
              className="studio-display max-w-[22ch] text-[clamp(1.75rem,4.6vw,3.5rem)] md:max-w-[26ch]"
            >
              &ldquo;{proof.quote}&rdquo;
            </blockquote>

            <figcaption
              data-studio-reveal
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--studio-line)] pt-6 text-sm"
            >
              <span className="font-medium">{proof.name}</span>
              <span aria-hidden className="h-3 w-px bg-[var(--studio-line)]" />
              <span className="text-[#4a4e51]">
                {proof.title}, {proof.company}
              </span>
            </figcaption>
          </figure>
          {project ? (
            <StudioShaderSlot
              variant="pixel"
              seed={23}
              className="hidden aspect-[3/4] max-h-[18rem] max-w-[16rem] xl:block"
            >
              <StudioGlassCard
                title={project.client}
                rows={project.discipline
                  .split(" · ")
                  .map((label) => ({ label }))}
              />
            </StudioShaderSlot>
          ) : null}
        </div>
      </div>
    </section>
  );
}
