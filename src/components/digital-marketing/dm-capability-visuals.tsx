import { DIGITAL_MARKETING_ORANGE } from "@/lib/digital-marketing";

type VisualProps = {
  className?: string;
};

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-full min-h-[320px] overflow-hidden rounded-[16px] border border-black/[0.08] bg-[#f3f1ec] md:min-h-[420px] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function CapabilityVisualBrand({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Position</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">For</p>
            <p
              className="mt-3 text-2xl leading-tight font-medium tracking-tight md:text-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Teams who need to be chosen with certainty.
            </p>
          </div>
          <div className="border-t border-black/[0.08] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Not for</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Generic category noise. Volume without a point of view. Campaigns that cannot explain
              themselves.
            </p>
          </div>
        </div>
        <div className="h-px w-16" style={{ background: DIGITAL_MARKETING_ORANGE }} />
      </div>
    </Frame>
  );
}

export function CapabilityVisualContent({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="grid h-full grid-rows-3">
        {[
          { kicker: "01 · Film still", title: "The offer, in one frame." },
          { kicker: "02 · Essay", title: "Why this category is stuck." },
          { kicker: "03 · Founder note", title: "What we will not build next." },
        ].map((item, index) => (
          <div
            key={item.kicker}
            className={`flex items-end justify-between px-6 py-5 md:px-8 ${
              index < 2 ? "border-b border-black/[0.08]" : ""
            }`}
          >
            <div>
              <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {item.kicker}
              </p>
              <p className="mt-2 text-lg font-medium tracking-tight md:text-xl">{item.title}</p>
            </div>
            <span className="hidden text-[11px] tracking-tight text-muted-foreground sm:block">
              Series
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function CapabilityVisualPerformance({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full flex-col p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Flight plan
          </p>
          <p className="text-[11px] text-muted-foreground">Audience · Offer · Page</p>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div key={`${day}-${index}`} className="flex flex-col gap-1.5">
              <span className="text-center text-[10px] text-muted-foreground">{day}</span>
              <div
                className="rounded-[8px] bg-white"
                style={{
                  height: `${36 + ((index * 17) % 48)}%`,
                  border: "1px solid rgba(28,25,23,0.08)",
                  background: index === 2 || index === 4 ? DIGITAL_MARKETING_ORANGE : "#fff",
                  opacity: index === 2 || index === 4 ? 0.9 : 1,
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Media follows the landing page—not the other way around.
        </p>
      </div>
    </Frame>
  );
}

export function CapabilityVisualSearch({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        <div className="rounded-[12px] border border-black/[0.08] bg-white p-5">
          <p className="text-[11px] text-muted-foreground">Search</p>
          <p className="mt-2 text-lg font-medium tracking-tight">digital marketing studio pune</p>
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-[92%] rounded-full bg-black/[0.07]" />
            <div className="h-1.5 w-[70%] rounded-full bg-black/[0.07]" />
          </div>
        </div>
        <div
          className="mt-4 rounded-[12px] border px-5 py-4"
          style={{ borderColor: "rgba(217,96,61,0.35)", background: "rgba(217,96,61,0.06)" }}
        >
          <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: DIGITAL_MARKETING_ORANGE }}>
            Answer engines
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Structured pages, useful writing, and a clear information architecture so the studio can
            be cited—not just ranked.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function CapabilityVisualSocial({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full flex-col p-6 md:p-8">
        <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Editorial week</p>
        <div className="mt-6 grid flex-1 gap-3">
          {[
            { day: "Tue", title: "Point of view", note: "Category tension" },
            { day: "Thu", title: "Proof", note: "Work, not slogans" },
            { day: "Sat", title: "Founder", note: "A decision, explained" },
          ].map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between rounded-[12px] border border-black/[0.08] bg-white px-4 py-3"
            >
              <div>
                <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  {item.day}
                </p>
                <p className="mt-1 text-sm font-medium tracking-tight">{item.title}</p>
              </div>
              <p className="text-[12px] text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function CapabilityVisualAnalytics({ className }: VisualProps) {
  return (
    <Frame className={className}>
      <div className="flex h-full flex-col justify-center p-6 md:p-8">
        <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Journey</p>
        <ol className="mt-8 space-y-0">
          {[
            { label: "Discover", active: false },
            { label: "Engage", active: false },
            { label: "Act", active: true },
          ].map((step, index) => (
            <li key={step.label} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span
                  className="flex h-3 w-3 rounded-full"
                  style={{
                    background: step.active ? DIGITAL_MARKETING_ORANGE : "transparent",
                    boxShadow: step.active ? `0 0 0 6px rgba(217,96,61,0.12)` : undefined,
                    border: step.active ? "none" : "1px solid rgba(28,25,23,0.25)",
                  }}
                />
                {index < 2 ? <span className="h-10 w-px bg-black/[0.12]" /> : null}
              </div>
              <div className="pb-6 last:pb-0">
                <p
                  className={`text-xl font-medium tracking-tight ${
                    step.active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                {step.active ? (
                  <p className="mt-1 text-sm text-muted-foreground">The qualified action.</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

export const CAPABILITY_VISUALS = [
  CapabilityVisualBrand,
  CapabilityVisualContent,
  CapabilityVisualPerformance,
  CapabilityVisualSearch,
  CapabilityVisualSocial,
  CapabilityVisualAnalytics,
] as const;
