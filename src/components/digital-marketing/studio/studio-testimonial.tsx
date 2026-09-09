import { DIGITAL_MARKETING_PROOF } from "@/lib/digital-marketing";

/**
 * Single oversized editorial quote. Only genuine testimonials already recorded
 * in the repository are used — this is the Global Services engagement.
 */
export function StudioTestimonial() {
  const proof = DIGITAL_MARKETING_PROOF[0];
  if (!proof) return null;

  return (
    <section
      aria-labelledby="studio-testimonial-heading"
      className="border-b border-[var(--studio-line)] py-20 md:py-28"
    >
      <div className="studio-shell">
        <h2 id="studio-testimonial-heading" className="studio-eyebrow" data-studio-reveal>
          Client proof
        </h2>

        <figure className="mt-10 md:mt-14">
          <blockquote
            data-studio-reveal
            className="studio-display max-w-[22ch] text-[clamp(1.75rem,4.6vw,3.5rem)] md:max-w-[26ch]"
          >
            <span aria-hidden>“</span>
            {proof.quote}
            <span aria-hidden>”</span>
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
      </div>
    </section>
  );
}
