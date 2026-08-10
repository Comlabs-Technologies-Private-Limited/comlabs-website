type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type ServiceProcessRowProps = {
  steps: ProcessStep[];
};

export function ServiceProcessRow({ steps }: ServiceProcessRowProps) {
  return (
    <>
      <div className="space-y-10 lg:hidden">
        {steps.map((step) => (
          <article key={step.step}>
            <p
              className="mb-3 text-[11px] font-medium tabular-nums text-neutral-400"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {step.step}
            </p>
            <h3 className="mb-2 text-sm font-medium tracking-tight text-neutral-900">{step.title}</h3>
            <p className="text-sm font-normal leading-relaxed text-neutral-600">{step.description}</p>
          </article>
        ))}
      </div>

      <div className="relative hidden lg:grid lg:grid-cols-4 lg:gap-8">
        <div
          className="pointer-events-none absolute top-[0.65rem] right-0 left-0 border-t border-neutral-200"
          aria-hidden
        />
        {steps.map((step) => (
          <article key={step.step} className="relative pt-8">
            <p
              className="mb-4 inline-block bg-secondary/40 pr-2 text-[11px] font-medium tabular-nums text-neutral-400"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {step.step}
            </p>
            <h3 className="mb-2 text-sm font-medium tracking-tight text-neutral-900">{step.title}</h3>
            <p className="text-sm font-normal leading-relaxed text-neutral-600">{step.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
