import { PROCESS_STEPS } from "@/components/home/figma/home-data";

export function FigmaProcessSection() {
  return (
    <section id="process" className="border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Process
          </p>
          <h2
            className="text-2xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            How we <span style={{ color: "var(--warm-orange)" }}>work</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="home-fade-up relative"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div
                className="mb-4 text-xs font-medium tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--warm-orange)" }}
              >
                {step.step}
              </div>
              <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
