"use client";

const APPLIED_AI_CAPABILITIES = [
  "AI Search",
  "Internal Copilots",
  "Workflow Automation",
  "Model Integrations",
] as const;

export function FigmaAppliedAiSection() {
  return (
    <section id="applied-ai" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Applied AI
          </p>
          <h2
            className="mb-6 text-2xl leading-tight font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            AI, applied where it actually{" "}
            <span style={{ color: "var(--warm-orange)" }}>changes</span> the product.
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
            From intelligent search and internal copilots to workflow automation and model-powered
            product features, we build AI around real business workflows — not demos for the sake of
            it.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {APPLIED_AI_CAPABILITIES.map((item) => (
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
            src="/editorial/applied-ai.jpg"
            alt="Empty road through desert mountains at sunset"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
