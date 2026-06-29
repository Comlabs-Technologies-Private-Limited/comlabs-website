import { SHOWCASE_IMAGES } from "@/components/home/figma/home-data";

const SPECIALTY_ITEMS = [
  "React, Next.js, and TypeScript by default",
  "Performance budgets enforced from day one",
  "Accessibility baked in, not bolted on",
  "Full code handoff with documentation",
] as const;

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

        <div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card"
          style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
        >
          <img
            src={SHOWCASE_IMAGES.primary}
            alt="Custom development showcase"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
