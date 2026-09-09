import { DIGITAL_STUDIO_PRINCIPLES } from "@/lib/digital-marketing-studio";

/** “Why Comlabs” — three principles as full-width editorial rows. */
export function StudioPrinciples() {
  return (
    <section
      aria-labelledby="studio-principles-heading"
      className="border-b border-[var(--studio-line)] bg-[var(--studio-white)]"
    >
      <div className="studio-shell py-20 md:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="studio-eyebrow" data-studio-reveal>
              Why Comlabs
            </p>
            <h2
              id="studio-principles-heading"
              data-studio-reveal
              className="studio-display mt-5 max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              Three things we refuse to compromise.
            </h2>
          </div>
          <p
            data-studio-reveal
            className="max-w-sm text-[0.9375rem] leading-[1.75] text-[#4a4e51]"
          >
            We are an engineering company that does marketing, which changes what we are willing to
            ship and what we are willing to claim.
          </p>
        </div>

        <div className="mt-14 md:mt-20" data-studio-stagger>
          {DIGITAL_STUDIO_PRINCIPLES.map((principle) => (
            <article
              key={principle.index}
              data-studio-reveal
              className="grid gap-6 border-t border-[var(--studio-line)] py-9 md:grid-cols-[6rem_minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-10 md:py-12 last:border-b"
            >
              <span className="font-mono text-[0.6875rem] tracking-widest text-[var(--studio-grey)]">
                {principle.index}
              </span>
              <div>
                <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-[var(--studio-blue)] uppercase">
                  {principle.label}
                </p>
                <h3 className="studio-display mt-3 text-[clamp(1.375rem,2.2vw,1.875rem)]">
                  {principle.title}
                </h3>
              </div>
              <p className="text-[0.9375rem] leading-[1.75] text-[#4a4e51]">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
