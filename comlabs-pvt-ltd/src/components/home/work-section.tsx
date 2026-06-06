import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { bodyText, servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const principles = [
  {
    number: "01",
    title: "Strategy before screens",
    body: "We start with the message, the audience, and the conversion goal — so the design solves the right problem.",
  },
  {
    number: "02",
    title: "Real content from day one",
    body: "No lorem ipsum, no fake structure. Every page is shaped around actual offers, proof, and decision-making context.",
  },
  {
    number: "03",
    title: "Tight scopes. Faster decisions.",
    body: "Work moves in focused slices so feedback stays clear, momentum stays high, and nothing gets buried in noise.",
  },
  {
    number: "04",
    title: "Built to be launch-ready",
    body: "From responsive behavior to interaction polish, the work is designed to feel complete — not just concept-level good.",
  },
] as const;

export function WorkSection() {
  return (
    <section id="work" className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <SectionContainer>
        <SectionHeader>
          <p className={servicesEyebrow}>How we work</p>
          <h2 className={servicesTitle}>Work that ships.</h2>
          <p className={servicesSubtitle}>
            Structured for clarity, built for momentum, and refined to go live without unnecessary
            drag.
          </p>
        </SectionHeader>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-[var(--bg-surface)] p-6 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-50/80"
            >
              <p className="text-[11px] font-normal tabular-nums tracking-[0.14em] text-[var(--fg-tertiary)]">
                {principle.number}
              </p>
              <h3 className="mt-3 text-[15px] font-medium leading-snug text-[var(--fg-primary)] md:text-base">
                {principle.title}
              </h3>
              <p className={cn(bodyText, "mt-2")}>{principle.body}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
