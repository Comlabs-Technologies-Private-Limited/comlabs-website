import type { ReactNode } from "react";

import type { CanonicalServiceSlug } from "@/lib/canonical-services";
import { cn } from "@/lib/utils";

type SignalProps = {
  className?: string;
};

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-[#F7F7F4]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ApplicationSupportSignal({ className }: SignalProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full min-h-[9.5rem] flex-col justify-between p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            INC-2481 · Payments API
          </p>
          <span className="rounded-full bg-[var(--warm-orange-light)] px-2 py-0.5 text-[10px] text-[var(--warm-orange)]">
            P1
          </span>
        </div>
        <ol className="mt-4 grid grid-cols-4 gap-1">
          {["Report", "Diagnose", "Escalate", "Resolved"].map((step, index) => (
            <li key={step} className="min-w-0">
              <span
                className={cn(
                  "mb-2 block h-1 rounded-full bg-neutral-200",
                  index < 3 && "bg-[var(--warm-orange)]",
                  index === 3 &&
                    "bg-neutral-200 motion-safe:group-hover:bg-emerald-600/70 motion-reduce:bg-emerald-600/70",
                )}
              />
              <span className="block truncate text-[10px] text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[11px] text-muted-foreground">
          L3 in progress
          <span className="ml-2 text-foreground/80 opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
            · 5xx 8.2% → 0.3%
          </span>
        </p>
      </div>
    </Frame>
  );
}

export function AgentWorkflowSignal({ className }: SignalProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full min-h-[9.5rem] flex-col justify-between p-4">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          Renewal packet
        </p>
        <ol className="mt-4 space-y-2">
          {[
            { label: "Context", state: "Ready" },
            { label: "Tool call", state: "CRM" },
            { label: "Approval", state: "Waiting" },
            { label: "Outcome", state: "Queued" },
          ].map((row, index) => (
            <li key={row.label} className="flex items-center justify-between gap-3 text-[12px]">
              <span className="text-foreground/85">{row.label}</span>
              <span
                className={cn(
                  "text-[10px] tracking-wide text-muted-foreground",
                  index === 2 &&
                    "text-[var(--warm-orange)] motion-safe:group-hover:hidden motion-reduce:hidden",
                )}
              >
                {row.state}
              </span>
              {index === 2 ? (
                <span className="hidden text-[10px] text-emerald-700 motion-safe:group-hover:inline motion-reduce:inline">
                  Approved
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

export function CloudHealthSignal({ className }: SignalProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full min-h-[9.5rem] flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Production · ap-south-1
          </p>
          <span className="text-[10px] text-emerald-700">Healthy</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <p className="rounded-lg bg-white px-2.5 py-2 text-muted-foreground">
            p95
            <span className="mt-0.5 block text-foreground">128ms</span>
          </p>
          <p className="rounded-lg bg-white px-2.5 py-2 text-muted-foreground">
            Targets
            <span className="mt-0.5 block text-foreground">3/3</span>
          </p>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Deploy v2.8.4
          <span className="ml-2 text-foreground/80 opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
            · ECS 3 → 5
          </span>
        </p>
      </div>
    </Frame>
  );
}

export function WorkflowRequestSignal({ className }: SignalProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full min-h-[9.5rem] flex-col justify-between p-4">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          Helio Growth · workspace
        </p>
        <ol className="mt-4 flex items-center gap-1">
          {["Request", "Approval", "Provision", "Done"].map((step, index) => (
            <li key={step} className="flex min-w-0 flex-1 items-center gap-1">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full bg-neutral-300",
                  index < 3 && "bg-[var(--warm-orange)]",
                  index === 3 &&
                    "bg-neutral-300 motion-safe:group-hover:bg-emerald-600 motion-reduce:bg-emerald-600",
                )}
              />
              <span className="truncate text-[10px] text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[11px] text-muted-foreground">
          CRM record created
          <span className="ml-2 text-foreground/80 opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
            · Invite sent
          </span>
        </p>
      </div>
    </Frame>
  );
}

export function PagePerformanceSignal({ className }: SignalProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full min-h-[9.5rem] gap-3 p-4">
        <div className="flex flex-1 flex-col justify-between rounded-lg bg-white p-3">
          <span className="h-1.5 w-10 rounded-full bg-neutral-200" />
          <div className="space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-neutral-100" />
            <span className="block h-1.5 w-3/4 rounded-full bg-neutral-100" />
            <span className="block h-8 rounded-md bg-[var(--warm-orange-light)]" />
          </div>
        </div>
        <div className="flex w-[5.5rem] flex-col justify-between">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Perf</p>
          <p className="text-2xl font-medium tracking-tight text-foreground">94</p>
          <p className="text-[11px] text-muted-foreground">
            LCP 1.8s
            <span className="mt-1 block text-foreground/80 opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
              98 on hover
            </span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function MobileTaskSignal({ className }: SignalProps) {
  return (
    <Frame className={cn("flex items-center justify-center p-4", className)}>
      <div
        className="flex h-[9.5rem] w-[5.25rem] flex-col overflow-hidden rounded-[1.35rem] border border-neutral-300 bg-[#1C1917] p-[3px]"
      >
        <div className="flex h-full flex-col rounded-[1.15rem] bg-[#F7F7F4] px-2 pt-3 pb-2">
          <span className="mx-auto mb-2 h-1 w-6 rounded-full bg-neutral-300" />
          <p className="text-[8px] tracking-tight text-muted-foreground">Production deploy</p>
          <p className="mt-1 text-[10px] font-medium tracking-tight">Live</p>
          <span className="mt-auto h-1.5 rounded-full bg-[var(--warm-orange)]" />
          <p className="mt-1 text-[8px] text-muted-foreground">
            Auth ok
            <span className="ml-1 opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
              · Synced
            </span>
          </p>
        </div>
      </div>
    </Frame>
  );
}

const SIGNALS: Record<CanonicalServiceSlug, (props: SignalProps) => ReactNode> = {
  "application-support": ApplicationSupportSignal,
  "ai-agent-development": AgentWorkflowSignal,
  "cloud-infrastructure-scaling": CloudHealthSignal,
  "custom-software-development": WorkflowRequestSignal,
  "website-design-development": PagePerformanceSignal,
  "mobile-app-development": MobileTaskSignal,
  "seo-aeo-copywriting": PagePerformanceSignal,
};

export function ServiceCompactSignal({
  slug,
  className,
}: {
  slug: CanonicalServiceSlug;
  className?: string;
}) {
  const Signal = SIGNALS[slug];
  return <Signal className={className} />;
}
