import type { ReactNode } from "react";

import { DM } from "@/lib/digital-marketing-media";
import type { DmArtefactId } from "@/lib/digital-marketing-media";
import { cn } from "@/lib/utils";

type ArtefactProps = {
  id: DmArtefactId;
  className?: string;
};

const LABEL = "text-[9px] tracking-[0.16em] uppercase";

export function DmArtefact({ id, className }: ArtefactProps) {
  return (
    <div
      className={cn("relative h-full min-h-[160px] w-full overflow-hidden", className)}
      style={{
        background: DM.elevated,
        borderRadius: 12,
        boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
        color: DM.text,
      }}
    >
      {ARTEFACTS[id]}
    </div>
  );
}

const meta = (text: string) => (
  <p className={LABEL} style={{ color: DM.muted }}>
    {text}
  </p>
);

function Frame({
  children,
  pad = true,
}: {
  children: ReactNode;
  pad?: boolean;
}) {
  return <div className={pad ? "flex h-full flex-col justify-between p-4" : "h-full"}>{children}</div>;
}

function PositioningMap() {
  const nodes = [
    { label: "Market", x: "8%", y: "22%" },
    { label: "Customer tension", x: "38%", y: "14%" },
    { label: "Brand promise", x: "62%", y: "42%" },
    { label: "Proof", x: "18%", y: "68%" },
    { label: "Message", x: "70%", y: "78%" },
  ] as const;

  return (
    <Frame pad={false}>
      <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
        <line x1="50" y1="55" x2="130" y2="42" stroke={DM.hairline} strokeWidth="1" />
        <line x1="155" y1="50" x2="210" y2="95" stroke={DM.hairline} strokeWidth="1" />
        <line x1="70" y1="155" x2="210" y2="100" stroke={DM.hairline} strokeWidth="1" />
        <line x1="80" y1="160" x2="230" y2="175" stroke={DM.hairline} strokeWidth="1" />
        <circle cx="210" cy="100" r="3.5" fill={DM.accent} />
      </svg>
      {nodes.map((node) => (
        <span
          key={node.label}
          className="absolute text-[10px] tracking-tight"
          style={{ left: node.x, top: node.y, color: DM.text }}
        >
          {node.label}
        </span>
      ))}
      <span className={`absolute top-3 left-3 ${LABEL}`} style={{ color: DM.muted }}>
        CUST-01 · Positioning
      </span>
    </Frame>
  );
}

function CampaignPoster() {
  return (
    <div className="flex h-full flex-col justify-between p-5" style={{ background: DM.accent }}>
      <div className="flex items-start justify-between">
        {meta("Comlabs · Campaign")}
        <span className="text-[10px]" style={{ color: DM.warm }}>
          01
        </span>
      </div>
      <p
        className="max-w-[8ch] text-[clamp(1.6rem,3vw,2.4rem)] leading-[0.95] font-medium tracking-tight"
        style={{ color: DM.warm, letterSpacing: "-0.04em" }}
      >
        Signal, not noise.
      </p>
      <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: "rgba(233,228,218,0.7)" }}>
        Growth system
      </p>
    </div>
  );
}

function PerformancePanel() {
  const rows = [
    { label: "Search", width: "72%" },
    { label: "Paid social", width: "54%" },
    { label: "Organic", width: "63%" },
    { label: "Direct", width: "41%" },
    { label: "Qualified action", width: "48%", accent: true },
  ] as const;

  return (
    <Frame>
      <div>
        {meta("Illustrative interface")}
        <p className="mt-2 text-sm font-medium tracking-tight">Performance mix</p>
      </div>
      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="mb-1 flex justify-between text-[10px]" style={{ color: DM.muted }}>
              <span>{row.label}</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: "rgba(244,242,237,0.08)" }}>
              <div
                className="h-1 rounded-full"
                style={{
                  width: row.width,
                  background: "accent" in row && row.accent ? DM.accent : DM.warm,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function ChannelAttribution() {
  const sources = ["Search", "Social", "Direct", "Referral"] as const;
  return (
    <Frame>
      {meta("Illustrative interface")}
      <p className="mt-2 text-sm font-medium tracking-tight">Channel to enquiry</p>
      <div className="relative mt-6 h-[108px]">
        {sources.map((source, index) => (
          <div key={source} className="absolute" style={{ top: index * 22, left: 0 }}>
            <span className="text-[10px]" style={{ color: DM.muted }}>
              {source}
            </span>
            <span
              className="absolute top-1.5 left-[72px] h-px w-[42%] origin-left"
              style={{
                background: `linear-gradient(90deg, ${DM.hairline}, ${DM.accent})`,
              }}
              aria-hidden
            />
          </div>
        ))}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full px-2.5 py-1 text-[10px]"
          style={{ background: DM.accent, color: DM.warm }}
        >
          Qualified enquiry
        </div>
      </div>
    </Frame>
  );
}

function LandingExperiment({ compact = false }: { compact?: boolean }) {
  const variants = [
    { name: "Variant A", notes: ["Message clarity", "Form completion"] },
    { name: "Variant B", notes: ["CTA engagement", "Message clarity"] },
  ] as const;

  return (
    <Frame>
      {meta("Illustrative experiment")}
      <p className="mt-2 text-sm font-medium tracking-tight">
        {compact ? "Landing preview" : "Page experiment"}
      </p>
      <div className={`mt-4 grid ${compact ? "grid-cols-1 gap-2" : "grid-cols-2 gap-3"}`}>
        {variants.map((variant) => (
          <div
            key={variant.name}
            className="rounded-[10px] p-3"
            style={{ background: DM.black, boxShadow: `inset 0 0 0 1px ${DM.hairline}` }}
          >
            <p className="text-[10px] tracking-tight" style={{ color: DM.warm }}>
              {variant.name}
            </p>
            <div className="mt-3 h-1.5 w-2/3 rounded-full" style={{ background: DM.accent }} />
            <div className="mt-2 h-1 w-1/2 rounded-full" style={{ background: DM.hairline }} />
            {!compact
              ? variant.notes.map((note) => (
                  <p key={note} className="mt-2 text-[9px]" style={{ color: DM.muted }}>
                    {note}
                  </p>
                ))
              : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function SearchCluster() {
  const clusters = [
    { label: "Primary topic", x: "36%", y: "38%", accent: true },
    { label: "Comparison", x: "8%", y: "16%" },
    { label: "Problem", x: "68%", y: "14%" },
    { label: "Process", x: "70%", y: "62%" },
    { label: "FAQ", x: "12%", y: "68%" },
    { label: "Local intent", x: "40%", y: "78%" },
  ] as const;

  return (
    <Frame pad={false}>
      <span className={`absolute top-3 left-3 ${LABEL}`} style={{ color: DM.muted }}>
        Query cluster
      </span>
      {clusters.map((item) => (
        <span
          key={item.label}
          className="absolute rounded-full px-2 py-1 text-[10px] tracking-tight"
          style={{
            left: item.x,
            top: item.y,
            background: "accent" in item && item.accent ? DM.accent : "rgba(244,242,237,0.06)",
            color: "accent" in item && item.accent ? DM.warm : DM.text,
            boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
          }}
        >
          {item.label}
        </span>
      ))}
    </Frame>
  );
}

function AiVisibility() {
  const rows = [
    "Structured coverage",
    "Citation readiness",
    "Entity clarity",
    "Service relevance",
    "Supporting evidence",
  ] as const;

  return (
    <Frame>
      {meta("AI-search readiness")}
      <p className="mt-2 text-sm font-medium tracking-tight">Visibility panel</p>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li key={row} className="flex items-center gap-2 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: DM.accent }} />
            <span style={{ color: DM.text }}>{row}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function ContentArchitecture() {
  const nodes = ["Service page", "Process guide", "Case study", "FAQ", "Supporting article"] as const;
  return (
    <Frame>
      {meta("Content architecture")}
      <p className="mt-2 text-sm font-medium tracking-tight">Topic tree</p>
      <div className="mt-4 flex flex-col items-start gap-2">
        <span
          className="rounded-full px-2.5 py-1 text-[10px]"
          style={{ background: DM.accent, color: DM.warm }}
        >
          {nodes[0]}
        </span>
        <div className="ml-4 flex flex-col gap-1.5 border-l pl-3" style={{ borderColor: DM.hairline }}>
          {nodes.slice(1).map((node) => (
            <span key={node} className="text-[10px]" style={{ color: DM.muted }}>
              {node}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SocialSystem() {
  return (
    <Frame>
      {meta("Content system")}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-[10px] p-2" style={{ background: DM.black }}>
          <p className="text-[9px] tracking-[0.14em] uppercase" style={{ color: DM.muted }}>
            LinkedIn
          </p>
          <div className="mt-3 h-8 rounded" style={{ background: DM.hairline }} />
          <div className="mt-2 h-1.5 w-3/4 rounded" style={{ background: DM.warm }} />
        </div>
        <div className="rounded-[10px] p-2" style={{ background: DM.black }}>
          <p className="text-[9px] tracking-[0.14em] uppercase" style={{ color: DM.muted }}>
            Instagram
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="aspect-square rounded" style={{ background: DM.accent }} />
            <div className="aspect-square rounded" style={{ background: DM.hairline }} />
            <div className="aspect-square rounded" style={{ background: DM.hairline }} />
            <div className="aspect-square rounded" style={{ background: DM.warm }} />
          </div>
        </div>
        <div className="rounded-[10px] p-2" style={{ background: DM.black }}>
          <p className="text-[9px] tracking-[0.14em] uppercase" style={{ color: DM.muted }}>
            X
          </p>
          <p className="mt-3 text-[10px] leading-snug" style={{ color: DM.text }}>
            One idea. Three posts. Same argument.
          </p>
        </div>
      </div>
    </Frame>
  );
}

function CustomerJourney() {
  const stages = [
    { name: "Discover", note: "How they find you" },
    { name: "Understand", note: "What the offer is" },
    { name: "Trust", note: "Why it holds" },
    { name: "Compare", note: "Against alternatives" },
    { name: "Act", note: "Qualified next step" },
  ] as const;

  return (
    <Frame>
      {meta("Customer journey")}
      <ol className="mt-3 space-y-2">
        {stages.map((stage, index) => (
          <li key={stage.name} className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] font-medium tracking-tight">
              <span style={{ color: DM.muted }}>0{index + 1} </span>
              {stage.name}
            </span>
            <span className="text-[10px]" style={{ color: DM.muted }}>
              {stage.note}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function ConversionFunnel() {
  const stages = [
    "Qualified visit",
    "Service engagement",
    "Proof viewed",
    "Contact intent",
    "Enquiry",
  ] as const;

  return (
    <Frame>
      {meta("Illustrative interface")}
      <p className="mt-2 text-sm font-medium tracking-tight">Conversion path</p>
      <div className="mt-4 flex flex-col items-center gap-1.5">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className="flex h-7 items-center justify-center text-[10px] tracking-tight"
            style={{
              width: `${100 - index * 12}%`,
              background: index === stages.length - 1 ? DM.accent : "rgba(244,242,237,0.06)",
              color: index === stages.length - 1 ? DM.warm : DM.text,
              borderRadius: 8,
            }}
          >
            {stage}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ContentCalendar() {
  const days = [
    ["Mon", "Insight"],
    ["Tue", "Case study"],
    ["Wed", "Founder"],
    ["Thu", "Explainer"],
    ["Fri", "Distribution"],
    ["Sat", "Follow-up"],
  ] as const;

  return (
    <Frame>
      {meta("Weekly editorial")}
      <p className="mt-2 text-sm font-medium tracking-tight">Content calendar</p>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {days.map(([day, type]) => (
          <div
            key={day}
            className="rounded-[8px] px-2 py-2"
            style={{ background: DM.black, boxShadow: `inset 0 0 0 1px ${DM.hairline}` }}
          >
            <p className="text-[9px] tracking-[0.14em] uppercase" style={{ color: DM.muted }}>
              {day}
            </p>
            <p className="mt-1 text-[10px] tracking-tight">{type}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const ARTEFACTS: Record<DmArtefactId, ReactNode> = {
  "positioning-map": <PositioningMap />,
  "campaign-poster": <CampaignPoster />,
  "performance-panel": <PerformancePanel />,
  "channel-attribution": <ChannelAttribution />,
  "landing-experiment": <LandingExperiment />,
  "landing-preview": <LandingExperiment compact />,
  "search-cluster": <SearchCluster />,
  "ai-visibility": <AiVisibility />,
  "content-architecture": <ContentArchitecture />,
  "social-system": <SocialSystem />,
  "customer-journey": <CustomerJourney />,
  "conversion-funnel": <ConversionFunnel />,
  "content-calendar": <ContentCalendar />,
};
