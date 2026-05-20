import { cn } from "@/lib/utils";

const frame = cn(
  "rounded-lg border border-neutral-200/95 bg-white p-3",
  "dark:border-white/[0.12] dark:bg-neutral-950",
);

const labelMuted = "text-[10px] font-normal text-neutral-500 dark:text-neutral-500";
const labelStrong = "text-[11px] font-medium text-neutral-900 dark:text-neutral-100";

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
        "bg-neutral-200 text-[9px] font-medium text-neutral-700",
        "dark:bg-neutral-800 dark:text-neutral-300",
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/** SaaS: dashboard revenue + activity — primary: KPI, secondary: activity rows, tertiary: timestamp */
export function SaaSMockup() {
  return (
    <div className={frame} aria-hidden>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={labelMuted}>Revenue (rolling 30d)</p>
          <p className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums tracking-tight text-neutral-950 dark:text-neutral-50">
            $48,920
          </p>
          <p className="mt-0.5 text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
            +12.4% vs prior month
          </p>
        </div>
        <span className="shrink-0 rounded border border-neutral-200/90 bg-neutral-50 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-neutral-500 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-400">
          Production
        </span>
      </div>
      <div className="mt-3 border-t border-neutral-100 pt-3 dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Avatar initials="MC" />
          <div className="min-w-0 flex-1">
            <p className={cn(labelStrong, "truncate")}>New seat · Atlas Freight</p>
            <p className={labelMuted}>Stripe invoice paid · $2,400/yr</p>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[9px] font-normal tabular-nums text-neutral-400 dark:text-neutral-500">
        Refreshed Today at 2:34 PM
      </p>
    </div>
  );
}

/** SAP: integration status — primary: connection, secondary: last job, tertiary: system id */
export function SapMockup() {
  return (
    <div className={frame} aria-hidden>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className={labelMuted}>SAP ECC · RFC destination</p>
          <p className={cn(labelStrong, "mt-0.5 truncate")}>COM_PROD_GATEWAY</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="mt-3 rounded-md border border-neutral-100 bg-neutral-50 px-2.5 py-2 dark:border-white/[0.08] dark:bg-neutral-900/80">
        <p className={labelMuted}>Last IDoc batch</p>
        <p className={cn(labelStrong, "mt-0.5")}>ORDERS05 · 214 postings</p>
        <p className="mt-1 text-[10px] font-normal text-neutral-500 dark:text-neutral-500">
          Finished Today at 1:07 PM · 2.4 MB
        </p>
      </div>
      <p className="mt-2.5 text-[9px] font-normal text-neutral-400 dark:text-neutral-500">
        Client · NB_UTIL · session 88421-s4
      </p>
    </div>
  );
}

/** MVP: launch scope — primary: product name + phase, secondary: checklist, tertiary: teammate */
export function MvpMockup() {
  return (
    <div className={frame} aria-hidden>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={labelMuted}>Build scope</p>
          <p className={cn(labelStrong, "text-[12px]")}>FieldNotes</p>
          <p className="mt-0.5 text-[10px] font-normal text-neutral-500">v0.3 · invite-only beta</p>
        </div>
        <span className="shrink-0 rounded bg-blue-600/10 px-1.5 py-0.5 text-[9px] font-medium text-blue-700 dark:text-blue-400">
          Week 6
        </span>
      </div>
      <ul className="mt-3 space-y-1">
        <li className="flex items-center gap-2 text-[10px] text-neutral-700 dark:text-neutral-300">
          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
          Magic-link auth
        </li>
        <li className="flex items-center gap-2 text-[10px] text-neutral-400 dark:text-neutral-500">
          <span className="text-neutral-400">○</span>
          Billing · Stripe Checkout
        </li>
      </ul>
      <div className="mt-2.5 flex items-center gap-2 border-t border-neutral-100 pt-2.5 dark:border-white/[0.08]">
        <Avatar initials="EB" />
        <p className="text-[9px] font-normal text-neutral-500 dark:text-neutral-500">
          Elena Byrne pushed build #184 · 38 min ago
        </p>
      </div>
    </div>
  );
}

/** Landing: experiment result — primary: lift metric, secondary: period, tertiary: page */
export function LandingMockup() {
  return (
    <div className={frame} aria-hidden>
      <p className={labelMuted}>Experiment · Hero headline</p>
      <div className="mt-1 flex items-baseline gap-2">
        <p className="font-mono text-[18px] font-semibold tabular-nums tracking-tight text-neutral-950 dark:text-neutral-50">
          +4.2%
        </p>
        <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">lift</span>
      </div>
      <p className="mt-2 text-[10px] font-normal leading-snug text-neutral-600 dark:text-neutral-400">
        Signup CTA clicks vs. control · last 9 days
      </p>
      <div className="mt-3 flex h-7 items-end gap-0.5 rounded border border-neutral-100 bg-neutral-50 px-1.5 py-1 dark:border-white/[0.08] dark:bg-neutral-900/80">
        {[40, 55, 48, 72, 65, 88, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-blue-600/35 dark:bg-blue-500/40"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-2.5 text-[9px] font-normal tabular-nums text-neutral-400 dark:text-neutral-500">
        /launch/northwind-q2 · 6.8k sessions
      </p>
    </div>
  );
}

/** Mobile: payment push — primary: title, secondary: amount + merchant, tertiary: time */
export function MobileMockup() {
  return (
    <div className={cn(frame, "px-2.5 py-3")} aria-hidden>
      <div className="mx-auto max-w-[200px] rounded-[14px] border border-neutral-200 bg-neutral-50 p-2.5 dark:border-white/10 dark:bg-neutral-900">
        <div className="rounded-lg bg-white p-2.5 shadow-sm dark:bg-neutral-950">
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-[10px] font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900">
              CL
            </div>
            <div className="min-w-0">
              <p className={cn(labelStrong, "text-[10px]")}>Careline</p>
              <p className="mt-0.5 text-[10px] font-normal leading-snug text-neutral-600 dark:text-neutral-400">
                Payment received · Invoice #INV-4418
              </p>
              <p className="mt-1 font-mono text-[13px] font-semibold tabular-nums text-neutral-950 dark:text-neutral-50">
                $1,240.00
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-[9px] font-normal tabular-nums text-neutral-400 dark:text-neutral-500">
          Today at 9:41 AM
        </p>
      </div>
    </div>
  );
}

export function ServiceMockup({ id }: { id: string }) {
  switch (id) {
    case "website-rebuild":
      return <SaaSMockup />;
    case "landing-sprint":
      return <LandingMockup />;
    case "product-ui":
      return <MvpMockup />;
    case "ai-automation":
      return <SapMockup />;
    case "maintenance":
      return <MobileMockup />;
    case "saas":
      return <SaaSMockup />;
    case "sap":
      return <SapMockup />;
    case "mvp":
      return <MvpMockup />;
    case "landing":
      return <LandingMockup />;
    case "mobile":
      return <MobileMockup />;
    default:
      return null;
  }
}
