import {
  customCraftIllustration,
  ServiceIllustrationFrame,
} from "@/components/services/illustrations";

const SPECIALTY_ITEMS = [
  "Application and production support",
  "AWS and DevOps engineering",
  "Agentic AI infrastructure",
  "Custom software development",
] as const;

export function FigmaSpecialtySection() {
  const { Component: CustomCraftVisual, label } = customCraftIllustration;

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
            Engineering{" "}
            <span style={{ color: "var(--warm-orange)" }}>beyond</span> deployment.
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
            We do not separate software from the infrastructure, support and operations required to
            keep it useful. Our teams work across applications, cloud, AI and production operations
            so businesses have one technical partner capable of taking a problem from first report
            to engineering resolution.
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
          label={label}
          background="/services-bg/service-bg-1.png"
          className="shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
        >
          <CustomCraftVisual />
        </ServiceIllustrationFrame>
      </div>
    </section>
  );
}
