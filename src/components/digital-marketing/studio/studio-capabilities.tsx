import { DIGITAL_MARKETING_CAPABILITIES } from "@/lib/digital-marketing";
import { DIGITAL_STUDIO_SECTIONS } from "@/lib/digital-marketing-studio";

/** Dark capabilities environment — the six disciplines the studio runs. */
export function StudioCapabilities() {
  return (
    <section
      id={DIGITAL_STUDIO_SECTIONS.capabilities}
      aria-labelledby="studio-capabilities-heading"
      className="relative scroll-mt-16 overflow-hidden bg-[var(--studio-black)] text-[var(--studio-white)] md:scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(78,114,242,0.16)_0%,transparent_68%)]"
      />
      <div className="studio-shell relative py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="studio-eyebrow" data-studio-reveal>
              Capabilities
            </p>
            <h2
              id="studio-capabilities-heading"
              data-studio-reveal
              className="studio-display mt-5 max-w-[17ch] text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              Six disciplines, planned as one brief.
            </h2>
          </div>
          <p
            data-studio-reveal
            className="max-w-sm text-[0.9375rem] leading-[1.75] text-[rgba(250,250,247,0.62)]"
          >
            You can start anywhere on this list. What you cannot do is run one
            of them in isolation and expect the rest of the funnel to hold.
          </p>
        </div>

        <div
          className="mt-14 grid gap-px border border-[var(--studio-line-dark)] bg-[var(--studio-line-dark)] md:mt-20 md:grid-cols-2 lg:grid-cols-3"
          data-studio-stagger
        >
          {DIGITAL_MARKETING_CAPABILITIES.map((capability) => (
            <article
              key={capability.id}
              data-studio-reveal
              className="studio-cell flex flex-col bg-[var(--studio-black)] p-7 hover:bg-[rgba(78,114,242,0.05)] md:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-cyan)]">
                  {capability.index}
                </span>
                <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-[rgba(250,250,247,0.44)] uppercase">
                  {capability.category}
                </span>
              </div>

              <h3 className="studio-cell__title studio-display mt-7 flex items-baseline gap-2.5 text-[1.375rem] md:text-[1.5rem]">
                {capability.title}
                <span
                  aria-hidden
                  className="studio-cell__marker text-[var(--studio-blue)]"
                >
                  →
                </span>
              </h3>
              <p className="mt-4 flex-1 text-[0.875rem] leading-[1.75] text-[rgba(250,250,247,0.62)]">
                {capability.description}
              </p>

              <ul className="mt-7 flex flex-col gap-2 border-t border-[var(--studio-line-dark)] pt-5">
                {capability.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-3 text-[0.8125rem] text-[rgba(250,250,247,0.72)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5em] block size-1 shrink-0 bg-[var(--studio-blue)]"
                    />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
