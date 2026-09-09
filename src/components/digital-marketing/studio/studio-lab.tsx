import { StudioPhoto } from "@/components/digital-marketing/studio/studio-photo";
import {
  DIGITAL_STUDIO_LAB,
  DIGITAL_STUDIO_LAB_PHOTOS,
} from "@/lib/digital-marketing-studio";

/**
 * Marketing lab. A horizontally scrollable rail on every breakpoint: it is a
 * native scroll container with snap points, so touch, trackpad, keyboard arrows
 * and screen-reader focus all move it without a scroll-jacking script.
 */
export function StudioLab() {
  return (
    <section
      aria-labelledby="studio-lab-heading"
      className="border-b border-[var(--studio-line)] bg-[var(--studio-white)] py-20 md:py-28"
    >
      <div className="studio-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="studio-eyebrow" data-studio-reveal>
            Marketing lab
          </p>
          <h2
            id="studio-lab-heading"
            data-studio-reveal
            className="studio-display mt-5 max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)]"
          >
            The artefacts an engagement actually produces.
          </h2>
        </div>
        <p
          data-studio-reveal
          className="max-w-sm text-[0.9375rem] leading-[1.75] text-[#4a4e51]"
        >
          Not deliverables for their own sake — these are the working documents
          the decisions get made from.
        </p>
      </div>

      <ul
        className="studio-rail mt-12 flex snap-x snap-mandatory gap-px overflow-x-auto bg-[var(--studio-line)] md:mt-16"
        // The rail bleeds to both edges, so the first and last cards get the
        // page gutter as padding instead of the shell doing it.
        style={{
          paddingInline: "var(--studio-gutter)",
          scrollPaddingInline: "var(--studio-gutter)",
        }}
        tabIndex={0}
        aria-label="Marketing lab artefacts, scroll horizontally"
      >
        {DIGITAL_STUDIO_LAB.map((item, index) => (
          <li
            key={item.id}
            className="studio-cell group flex w-[17rem] shrink-0 snap-start flex-col bg-[var(--studio-white)] hover:bg-[rgba(78,114,242,0.04)] sm:w-[19rem] md:w-[21rem]"
          >
            {DIGITAL_STUDIO_LAB_PHOTOS[item.id] ? (
              <StudioPhoto
                id={DIGITAL_STUDIO_LAB_PHOTOS[item.id]!}
                sizes="(min-width: 768px) 21rem, 17rem"
                className="aspect-[4/3] w-full border-b border-[var(--studio-line)]"
              />
            ) : null}
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-grey)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--studio-blue)] uppercase">
                  {item.label}
                </span>
              </div>
              <h3 className="studio-cell__title studio-display mt-10 flex items-baseline gap-2.5 text-[1.375rem]">
                {item.title}
                <span
                  aria-hidden
                  className="studio-cell__marker text-[var(--studio-blue)]"
                >
                  →
                </span>
              </h3>
              <p className="mt-4 text-[0.875rem] leading-[1.75] text-[#4a4e51]">
                {item.note}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
