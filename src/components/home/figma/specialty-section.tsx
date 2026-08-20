import dynamic from "next/dynamic";

import { ServiceIllustrationFrame } from "@/components/services/illustrations";

const CustomCraftVisual = dynamic(() =>
  import("@/components/services/illustrations/custom-craft-illustration").then(
    (mod) => mod.CustomCraftIllustration,
  ),
);

const SPECIALTY_ITEMS = [
  "React, Next.js, and TypeScript by default",
  "Performance budgets enforced from day one",
  "Accessibility baked in, not bolted on",
  "Full code handoff with documentation",
] as const;

const SPECIALTY_LABEL =
  "Custom development illustration: a TypeScript component being written in an editor alongside quality gates for type safety, performance budget and accessibility that each pass, ending in a handoff-ready state.";

export function FigmaSpecialtySection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Our specialty
          </p>
          <h2
            className="mb-6 text-2xl leading-tight font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            We specialize in{" "}
            <span style={{ color: "var(--warm-orange)" }}>custom</span> development.
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
            No templates, no page builders, no compromises. Every project starts from a blank canvas
            and is built to your exact specifications using modern, maintainable code.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {SPECIALTY_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--warm-orange)" }}>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ServiceIllustrationFrame
          label={SPECIALTY_LABEL}
          background="/services-bg/service-bg-1.png"
          className="shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
        >
          <CustomCraftVisual />
        </ServiceIllustrationFrame>
      </div>
    </section>
  );
}
