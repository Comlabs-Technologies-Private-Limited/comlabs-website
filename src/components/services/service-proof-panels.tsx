import { cn } from "@/lib/utils";

export function WebDigitalProof() {
  return (
    <div className="flex h-full min-h-[22rem] flex-col overflow-hidden bg-[#F7F7F4] md:min-h-[34rem] md:flex-row">
      <div className="flex flex-1 flex-col border-b border-border p-5 md:border-r md:border-b-0 md:p-8">
        <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Page preview</p>
        <div className="mt-4 flex-1 rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-neutral-200" />
            <span className="h-1.5 w-24 rounded-full bg-neutral-100" />
          </div>
          <div className="mt-5 h-8 w-2/3 rounded-md bg-neutral-100" />
          <div className="mt-3 space-y-2">
            <span className="block h-1.5 w-full rounded-full bg-neutral-100" />
            <span className="block h-1.5 w-5/6 rounded-full bg-neutral-100" />
          </div>
          <div className="mt-6 h-16 rounded-lg bg-[var(--warm-orange-light)]" />
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-6 p-5 md:w-[17rem] md:p-8">
        <div>
          <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Workflow</p>
          <ol className="mt-4 space-y-3">
            {["Position", "Interface", "Performance", "Production"].map((step, index) => (
              <li key={step} className="flex items-center justify-between text-[13px]">
                <span className="text-foreground/85">{step}</span>
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-neutral-300",
                    index < 3 && "bg-[var(--warm-orange)]",
                    index === 3 && "bg-emerald-600/80",
                  )}
                />
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-border bg-white px-4 py-3">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Lighthouse</p>
          <p className="mt-1 text-3xl font-medium tracking-tight">96</p>
          <p className="mt-1 text-[12px] text-muted-foreground">LCP 1.8s · CLS 0.01</p>
        </div>
      </div>
    </div>
  );
}

export function MobileOpsProof() {
  return (
    <div className="flex h-full min-h-[22rem] flex-col items-stretch gap-6 bg-[#F7F7F4] p-6 md:min-h-[34rem] md:flex-row md:items-center md:justify-center md:gap-10 md:p-10">
      <div className="mx-auto h-[20rem] w-[11rem] overflow-hidden rounded-[2rem] border border-neutral-300 bg-[#1C1917] p-[4px] md:mx-0 md:h-[24rem] md:w-[12.5rem]">
        <div className="flex h-full flex-col rounded-[1.7rem] bg-white px-3 pt-4 pb-3">
          <span className="mx-auto h-1.5 w-10 rounded-full bg-neutral-200" />
          <p className="mt-4 text-[10px] tracking-wide text-muted-foreground uppercase">Deploy</p>
          <p className="mt-1 text-[15px] font-medium tracking-tight">Production live</p>
          <div className="mt-4 flex-1 rounded-xl bg-[#F7F7F4] p-3">
            <p className="text-[11px] text-muted-foreground">billing-service</p>
            <p className="mt-2 text-[12px] text-foreground">3/3 targets healthy</p>
            <span className="mt-4 block h-1.5 rounded-full bg-[var(--warm-orange)]" />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Signed in · session ok</p>
        </div>
      </div>
      <ul className="w-full max-w-xs space-y-3">
        {[
          { label: "Authentication", state: "Verified" },
          { label: "API", state: "billing-service" },
          { label: "Status sync", state: "Live" },
          { label: "Completion", state: "Deployed" },
        ].map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-[13px]"
          >
            <span className="text-foreground/85">{row.label}</span>
            <span className="text-[11px] text-[var(--warm-orange)]">{row.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
