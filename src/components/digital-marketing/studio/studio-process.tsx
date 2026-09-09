import { DIGITAL_MARKETING_STAGES } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";

/** Process — four stages as a numbered horizontal progression. */
export function StudioProcess() {
  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.process}
      aria-labelledby="studio-process-heading"
      className="scroll-mt-16 border-b border-[var(--studio-line)] py-20 md:scroll-mt-20 md:py-28"
    >
      <div className="studio-shell">
        <p className="studio-eyebrow" data-studio-reveal>
          Process
        </p>
        <h2
          id="studio-process-heading"
          data-studio-reveal
          className="studio-display mt-5 max-w-[16ch] text-[clamp(2rem,4.4vw,3.75rem)]"
        >
          Diagnose. Position. Launch. Compound.
        </h2>

        <ol
          className="mt-14 grid gap-px border-t border-[var(--studio-line)] bg-[var(--studio-line)] md:mt-20 md:grid-cols-2 lg:grid-cols-4"
          data-studio-stagger
        >
          {DIGITAL_MARKETING_STAGES.map((stage) => (
            <li
              key={stage.index}
              data-studio-reveal
              className="flex flex-col bg-[var(--studio-paper)] pt-8 pb-10 md:px-7"
            >
              <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-blue)]">
                {stage.index}
              </span>
              <h3 className="studio-display mt-8 text-[1.5rem]">{stage.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-[#4a4e51]">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
