import { StudioGlassCard } from "@/components/digital-marketing/studio/studio-glass-card";
import { StudioShaderSlot } from "@/components/digital-marketing/studio/studio-shader-slot";
import { DIGITAL_MARKETING_CAPABILITIES } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_OPENING } from "@/lib/digital-marketing-studio";

/** Opening proof split — the two commitments the rest of the page evidences. */
export function StudioOpening() {
  return (
    <section
      aria-labelledby="studio-opening-heading"
      className="border-b border-[var(--studio-line)]"
    >
      <div className="studio-shell grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-20">
        <div>
          <p className="studio-eyebrow" data-studio-reveal>
            The studio
          </p>
          <h2
            id="studio-opening-heading"
            data-studio-reveal
            className="studio-display mt-5 text-[clamp(1.75rem,3vw,2.5rem)]"
          >
            Strategy, creative and performance under one roof.
          </h2>
          <StudioShaderSlot
            variant="flow"
            seed={7}
            className="mt-10 hidden aspect-[4/5] max-w-sm lg:block"
          >
            <StudioGlassCard
              title="One connected system"
              rows={DIGITAL_MARKETING_CAPABILITIES.map((capability) => ({
                label: capability.title,
                meta: capability.index,
              }))}
            />
          </StudioShaderSlot>
        </div>

        <div
          className="grid gap-px bg-[var(--studio-line)] sm:grid-cols-2"
          data-studio-stagger
        >
          {DIGITAL_STUDIO_OPENING.map((point) => (
            <div
              key={point.title}
              data-studio-reveal
              className="bg-[var(--studio-paper)] p-7 md:p-9"
            >
              <h3 className="studio-display text-[clamp(1.5rem,2.4vw,2.125rem)]">
                {point.title}
              </h3>
              <p className="mt-5 text-[0.9375rem] leading-[1.75] text-[#4a4e51]">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
