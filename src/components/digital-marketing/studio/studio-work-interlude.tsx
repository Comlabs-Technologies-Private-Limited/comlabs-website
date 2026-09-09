import { DIGITAL_MARKETING_WORK } from "@/lib/digital-marketing";

const TICKS = 84;

/**
 * Interlude before the project stack. The ring is a set of radial ticks drawn
 * with plain elements; it is decorative, hidden from assistive technology, and
 * its rotation is switched off by the reduced-motion rule in `globals.css`.
 */
export function StudioWorkInterlude() {
  return (
    <section
      aria-labelledby="studio-work-interlude-heading"
      className="relative overflow-hidden border-b border-[var(--studio-line)]"
    >
      <div className="studio-shell relative flex flex-col items-center py-24 text-center md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[min(78vw,34rem)] w-[min(78vw,34rem)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="studio-ring relative h-full w-full">
            {Array.from({ length: TICKS }, (_, index) => (
              <span
                key={index}
                // Radius-length bar pinned to the centre; the gradient paints
                // only its outer 12%, which reads as a tick on the ring.
                className="absolute top-1/2 left-1/2 block h-px w-1/2 origin-left bg-[linear-gradient(to_right,transparent_88%,var(--studio-line)_88%)]"
                style={{ transform: `rotate(${(index * 360) / TICKS}deg)` }}
              />
            ))}
          </div>
        </div>

        <p className="studio-eyebrow" data-studio-reveal>
          Selected work
        </p>
        <h2
          id="studio-work-interlude-heading"
          data-studio-reveal
          className="studio-display mt-6 max-w-[16ch] text-[clamp(2.25rem,5.6vw,4.5rem)]"
        >
          Four businesses. One <em className="studio-serif">method</em>.
        </h2>
        <p
          data-studio-reveal
          className="mt-7 max-w-lg text-[0.9375rem] leading-[1.75] text-[#4a4e51]"
        >
          Each of these started with a positioning problem and ended as a digital experience the
          business could actually sell from. Read the full write-ups in our case studies.
        </p>
        <p
          data-studio-reveal
          className="mt-8 font-mono text-[0.6875rem] tracking-widest text-[var(--studio-grey)] uppercase"
        >
          {DIGITAL_MARKETING_WORK.map((item) => item.client).join(" · ")}
        </p>
      </div>
    </section>
  );
}
