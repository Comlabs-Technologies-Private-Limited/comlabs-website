import { DIGITAL_MARKETING_CONTACT_EMAIL } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";
import { siteLocation } from "@/lib/site";

/** Closing call to action on near-black. */
export function StudioCta() {
  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.contact}
      aria-labelledby="studio-cta-heading"
      className="scroll-mt-16 bg-[var(--studio-black)] text-[var(--studio-white)] md:scroll-mt-20"
    >
      <div className="studio-shell py-24 md:py-32">
        <p className="studio-eyebrow" data-studio-reveal>
          Start here
        </p>
        <h2
          id="studio-cta-heading"
          data-studio-reveal
          className="studio-display mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,6rem)]"
        >
          Let&rsquo;s find the <em className="studio-serif">signal</em>.
        </h2>
        <p
          data-studio-reveal
          className="mt-8 max-w-xl text-[0.9375rem] leading-[1.75] text-[rgba(250,250,247,0.68)] md:text-base"
        >
          Tell us what you are trying to grow and what has not worked yet. We will come back with how
          we would approach it — positioning first, channels after.
        </p>

        <div
          data-studio-reveal
          className="mt-12 flex flex-col gap-6 border-t border-[var(--studio-line-dark)] pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
            className="studio-display text-[clamp(1.25rem,3.4vw,2.25rem)] break-all transition-colors duration-300 hover:text-[var(--studio-blue)]"
          >
            {DIGITAL_MARKETING_CONTACT_EMAIL}
          </a>
          <p className="text-sm text-[rgba(250,250,247,0.56)]">{siteLocation}</p>
        </div>
      </div>
    </section>
  );
}
