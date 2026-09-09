import { StudioGlassCard } from "@/components/digital-marketing/studio/studio-glass-card";
import { StudioShaderSlot } from "@/components/digital-marketing/studio/studio-shader-slot";
import { DIGITAL_MARKETING_ENGAGEMENTS } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";

/** Engagement models — how a working relationship is actually shaped. */
export function StudioEngagements() {
  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.engagements}
      aria-labelledby="studio-engagements-heading"
      className="scroll-mt-16 border-b border-[var(--studio-line)] bg-[var(--studio-white)] py-20 md:scroll-mt-20 md:py-28"
    >
      <div className="studio-shell grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
        <div>
          <p className="studio-eyebrow" data-studio-reveal>
            Engagement models
          </p>
          <h2
            id="studio-engagements-heading"
            data-studio-reveal
            className="studio-display mt-5 text-[clamp(1.75rem,3vw,2.5rem)]"
          >
            Three ways to work with the studio.
          </h2>
          <p
            data-studio-reveal
            className="mt-6 max-w-sm text-[0.9375rem] leading-[1.75] text-[#4a4e51]"
          >
            Every engagement is shaped around the problem in front of us, not a
            fixed roster of deliverables.
          </p>
          <StudioShaderSlot
            variant="scan"
            seed={11}
            className="mt-10 hidden aspect-[4/5] max-w-sm lg:block"
          >
            <StudioGlassCard
              title="How should we work together?"
              numbered
              rows={DIGITAL_MARKETING_ENGAGEMENTS.map((engagement) => ({
                label: engagement.title,
              }))}
            />
          </StudioShaderSlot>
        </div>

        <div data-studio-stagger>
          {DIGITAL_MARKETING_ENGAGEMENTS.map((engagement) => (
            <article
              key={engagement.index}
              data-studio-reveal
              className="studio-row grid gap-4 border-t border-[var(--studio-line)] py-8 transition-colors duration-400 last:border-b hover:border-[rgba(17,19,21,0.34)] hover:bg-[rgba(78,114,242,0.035)] md:grid-cols-[4rem_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <span className="studio-row__index font-mono text-[0.6875rem] tracking-widest text-[var(--studio-grey)]">
                {engagement.index}
              </span>
              <div>
                <h3 className="studio-row__title studio-display text-[clamp(1.5rem,2.6vw,2.125rem)]">
                  {engagement.title}
                </h3>
                <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.75] text-[#4a4e51]">
                  {engagement.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
