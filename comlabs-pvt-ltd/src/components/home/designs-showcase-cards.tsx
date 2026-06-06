"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { easeOut, GPU, motionFor } from "@/lib/product-motion";
import { cn } from "@/lib/utils";

/** Shared selection surface — spatial consistency via layoutId */
function SharedSelectionPill({
  layoutId,
  className,
  reduce,
}: {
  layoutId: string;
  className: string;
  reduce: boolean;
}) {
  return (
    <motion.span
      layoutId={layoutId}
      className={cn(className, GPU)}
      style={{ backgroundColor: ui.highlight }}
      transition={motionFor(reduce).shared}
    />
  );
}

/** Crossfade with directional anticipation + follow-through drift */
function CrossfadeSlot({
  id,
  direction,
  reduce,
  children,
  className,
}: {
  id: string;
  direction: number;
  reduce: boolean;
  children: ReactNode;
  className?: string;
}) {
  const t = motionFor(reduce);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className={cn(className, GPU)}
        initial={reduce ? false : { opacity: 0, y: direction * 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: direction * -2 }}
        transition={t.fade}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
const SATOSHI_STACK = "\"Satoshi\", \"Inter\", system-ui, sans-serif";
const CARD_RADIUS = "rounded-[20px]";
const INNER_RADIUS = "rounded-2xl";
/** Uniform height for all four showcase cards */
export const SHOWCASE_CARD_HEIGHT = 340;

const showcaseSurface = cn(
  "flex h-full min-h-0 flex-col overflow-hidden border shadow-sm",
  INNER_RADIUS,
);

const ui = {
  canvas: "#f3f4f6",
  surface: "#ffffff",
  border: "#e5e7eb",
  divider: "#eef0f3",
  dividerSubtle: "rgba(238, 240, 243, 0.38)",
  text: "#111827",
  muted: "#64748b",
  faint: "#94a3b8",
  accent: "#2563eb",
  highlight: "#f1f1f1",
  badgeBg: "#ede9fe",
  badgeText: "#6d28d9",
} as const;

function useShowcasePlayback(active: boolean) {
  const reduce = !!useReducedMotion();
  return { reduce, playing: active && !reduce };
}

function useCyclicIndex(
  length: number,
  active: boolean,
  intervalMs: number,
  reduce: boolean,
) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!active || reduce || length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % length;
        setDirection(next === 0 && prev === length - 1 ? 1 : next > prev ? 1 : -1);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [active, reduce, length, intervalMs]);

  return { index, direction };
}

function ShowcaseFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex w-full flex-col", CARD_RADIUS, className)}
      style={{
        fontFamily: SATOSHI_STACK,
        backgroundColor: ui.canvas,
        height: SHOWCASE_CARD_HEIGHT,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedSegmentedBars({
  filled,
  total = 10,
  active,
  delay = 0,
  fillColor = "#2563eb",
}: {
  filled: number;
  total?: number;
  active: boolean;
  delay?: number;
  fillColor?: string;
}) {
  const reduce = !!useReducedMotion();
  const t = motionFor(reduce);

  return (
    <div className="flex shrink-0 gap-[3px]" aria-hidden>
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <span
            key={i}
            className="relative h-[6px] w-[9px] overflow-hidden rounded-[2px] bg-[#e8eaed]"
          >
            <motion.span
              className={cn("absolute inset-0 origin-left", GPU)}
              style={{ backgroundColor: fillColor }}
              initial={false}
              animate={{
                scaleX: isFilled ? 1 : 0,
                opacity: active || reduce ? 1 : 0.5,
              }}
              transition={{
                ...t.loop,
                delay: reduce ? 0 : delay + i * 0.015,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-[#64748b]" fill="none" aria-hidden>
      <circle cx="8" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 10L5 14L8 12.5L11 14L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <span className="relative inline-flex h-3 w-5 shrink-0" aria-hidden>
      <span className="absolute left-0 size-3 rounded-full bg-[#eb001b]/90" />
      <span className="absolute right-0 size-3 rounded-full bg-[#f79e1b]/90" />
    </span>
  );
}

function ProfileAvatarPattern() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
      <rect width="48" height="48" fill="#e9d5ff" />
      <path d="M24 0L48 24L24 48L0 24Z" fill="#c4b5fd" />
      <circle cx="24" cy="24" r="10" fill="#a78bfa" />
      <path d="M24 14v20M14 24h20" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const usagePresets = {
  basic: [
    { title: "5 hour usage limit", sub: "Resets daily at midnight UTC", filled: 8 },
    { title: "Image generations", sub: "Resets daily at midnight UTC", filled: 5 },
    { title: "File uploads", sub: "Resets daily at midnight UTC", filled: 3 },
    { title: "Search queries", sub: "Resets daily at midnight UTC", filled: 9 },
  ],
  pro: [
    { title: "5 hour usage limit", sub: "Resets daily at midnight UTC", filled: 4 },
    { title: "Image generations", sub: "Resets daily at midnight UTC", filled: 7 },
    { title: "File uploads", sub: "Resets daily at midnight UTC", filled: 6 },
    { title: "Search queries", sub: "Resets daily at midnight UTC", filled: 5 },
  ],
} as const;

const planViews = [
  { key: "basic", plan: "Basic", price: "$100/mo", billing: "Mastercard 1234", expiry: "06/27" },
  { key: "pro", plan: "Pro", price: "$250/mo", billing: "Visa 8821", expiry: "09/28" },
] as const;

export function MetricsCard({ active = false }: { active?: boolean }) {
  const { reduce, playing } = useShowcasePlayback(active);
  const { index: planIndex, direction } = useCyclicIndex(
    planViews.length,
    playing,
    6000,
    reduce,
  );
  const plan = planViews[planIndex];
  const rows = usagePresets[plan.key];

  return (
    <ShowcaseFrame className="p-2">
      <div
        className={showcaseSurface}
        style={{ backgroundColor: ui.surface, borderColor: ui.border }}
      >
        <div className="flex shrink-0 border-b" style={{ borderColor: ui.divider }}>
          <div className="flex min-h-[88px] flex-1 flex-col border-r px-3.5 py-3" style={{ borderColor: ui.divider }}>
            <p className="text-[10px] font-medium" style={{ color: ui.muted }}>
              Plan
            </p>
            <div className="relative mt-1 h-5">
              <CrossfadeSlot id={plan.plan} direction={direction} reduce={reduce} className="absolute inset-0 flex items-center gap-1.5">
                <span className="text-[13px] font-medium tracking-tight" style={{ color: ui.text }}>
                  {plan.plan}
                </span>
                <MedalIcon />
              </CrossfadeSlot>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2.5 text-[9px]" style={{ color: ui.muted }}>
              <span>{plan.price}</span>
              <span>Next billing on Apr 16</span>
            </div>
          </div>
          <div className="flex min-h-[88px] flex-1 flex-col px-3.5 py-3">
            <p className="text-[10px] font-medium" style={{ color: ui.muted }}>
              Billing
            </p>
            <div className="relative mt-1 h-5">
              <CrossfadeSlot id={plan.billing} direction={direction} reduce={reduce} className="absolute inset-0 flex items-center gap-1.5">
                <span className="text-[13px] font-medium tracking-tight" style={{ color: ui.text }}>
                  {plan.billing}
                </span>
                <MastercardIcon />
              </CrossfadeSlot>
            </div>
            <p className="mt-auto pt-2.5 text-[9px]" style={{ color: ui.muted }}>
              Expires on {plan.expiry}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {rows.map((row, i) => (
            <div
              key={row.title}
              className={cn(
                "flex flex-1 items-center justify-between gap-3 px-3.5",
                i > 0 && "border-t",
              )}
              style={i > 0 ? { borderColor: ui.dividerSubtle } : undefined}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-medium tracking-tight" style={{ color: ui.text }}>
                  {row.title}
                </p>
                <p className="mt-0.5 text-[9px] text-[#64748b]/55">{row.sub}</p>
              </div>
              <AnimatedSegmentedBars
                filled={row.filled}
                active={active}
                delay={0.08 + i * 0.04}
              />
            </div>
          ))}
        </div>
      </div>
    </ShowcaseFrame>
  );
}

type NavItem = { id: string; label: string; section: string };

const settingsNav: NavItem[] = [
  { id: "profile", label: "Profile", section: "Account" },
  { id: "password", label: "Password", section: "Account" },
  { id: "wallet", label: "Wallet", section: "Billing" },
  { id: "usage", label: "Usage", section: "Billing" },
  { id: "referral", label: "Referral", section: "Billing" },
  { id: "appearance", label: "Appearance", section: "Preferences" },
  { id: "notifications", label: "Notifications", section: "Preferences" },
  { id: "deliverability", label: "Deliverability", section: "Email" },
];

const dashboardNavCycle = ["profile", "wallet", "usage", "deliverability"] as const;
type DashboardTab = (typeof dashboardNavCycle)[number];

/** Mini dashboard — minimal architecture + restrained green / neutral-200 accents */
const dash = {
  bg: "#fafafa",
  surface: "#ffffff",
  border: "#e5e5e5",
  rule: "#e5e5e5",
  ruleStrong: "#e5e5e5",
  ink: "#171717",
  text: "#262626",
  muted: "#737373",
  faint: "#a3a3a3",
  line: "#525252",
  green: "#059669",
  greenSoft: "rgba(16, 185, 129, 0.07)",
  greenMuted: "#6ee7b7",
} as const;

const USAGE_CHART = [42, 68, 55, 82, 48, 74, 90, 61, 78, 52];
const WALLET_CHART = [2100, 2180, 2050, 2240, 2310, 2280, 2360, 2410, 2380, 2450];
const DELIVERY_CHART = [97.2, 98.1, 97.8, 98.4, 98.9, 98.2, 99.1, 98.6, 99.0, 99.2];

function archPointsToPath(points: number[], width: number, height: number) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const pad = 4;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - pad - ((point - min) / range) * (height - pad * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function dashMotion(reduce: boolean) {
  const t = motionFor(reduce);
  return {
    t,
    stagger: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.055,
          delayChildren: reduce ? 0 : 0.06,
        },
      },
    },
    item: {
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 5 },
      show: { opacity: 1, y: 0, transition: t.feedback },
    },
  };
}

function DashHeader({
  index,
  title,
  status,
  statusAccent = false,
  reduce,
}: {
  index: string;
  title: string;
  status?: string;
  statusAccent?: boolean;
  reduce: boolean;
}) {
  const { item } = dashMotion(reduce);
  return (
    <motion.div
      variants={item}
      className="flex items-end justify-between gap-3 border-b pb-3"
      style={{ borderColor: dash.border }}
    >
      <div>
        <p
          className="text-[7px] font-medium uppercase tracking-[0.18em]"
          style={{ color: dash.faint }}
        >
          <span style={{ color: statusAccent ? dash.green : dash.faint }}>{index.split(" ")[0]}</span>
          {index.slice(index.indexOf(" "))}
        </p>
        <p className="mt-1 text-[12px] font-medium tracking-[-0.02em]" style={{ color: dash.ink }}>
          {title}
        </p>
      </div>
      {status ? (
        <span className="inline-flex items-center gap-1.5">
          {statusAccent ? (
            <span
              className="size-1 shrink-0 rounded-full"
              style={{ backgroundColor: dash.green }}
              aria-hidden
            />
          ) : null}
          <span
            className="text-[8px] uppercase tracking-[0.12em]"
            style={{ color: statusAccent ? dash.green : dash.muted }}
          >
            {status}
          </span>
        </span>
      ) : null}
    </motion.div>
  );
}

function DashPanelShell({
  children,
  playing,
  reduce,
  className,
}: {
  children: ReactNode;
  playing: boolean;
  reduce: boolean;
  className?: string;
}) {
  const { stagger } = dashMotion(reduce);
  return (
    <div className={cn("relative min-h-[420px] w-[108%] max-w-none", className)}>
      <motion.div
        className="px-4 pb-8 pt-4"
        variants={stagger}
        initial="hidden"
        animate={playing ? "show" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ArchSpecRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-[1fr_auto] gap-4 border-b py-2.5 last:border-b-0"
      style={{ borderColor: dash.border }}
    >
      <span className="text-[9px]" style={{ color: dash.muted }}>
        {label}
      </span>
      <span
        className="text-right text-[9px] font-medium tabular-nums"
        style={{ color: accent ? dash.green : dash.ink }}
      >
        {value}
      </span>
    </div>
  );
}

function ArchAvatar() {
  return (
    <div className="relative shrink-0">
      <div
        className="flex size-11 items-center justify-center border"
        style={{ borderColor: dash.border, backgroundColor: dash.surface }}
      >
        <span className="text-[11px] font-medium tracking-tight" style={{ color: dash.ink }}>
          JD
        </span>
      </div>
      <span
        className="absolute -bottom-px -right-px size-2 border border-white"
        style={{ backgroundColor: dash.green }}
        aria-hidden
      />
    </div>
  );
}

function DashRow({
  left,
  right,
  border = true,
  reduce,
}: {
  left: ReactNode;
  right?: ReactNode;
  border?: boolean;
  reduce: boolean;
}) {
  const { item } = dashMotion(reduce);
  return (
    <motion.div
      variants={item}
      className={cn("flex items-center justify-between gap-3 py-2.5", border && "border-b")}
      style={border ? { borderColor: dash.border } : undefined}
    >
      <div className="min-w-0">{left}</div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </motion.div>
  );
}

function ArchLineChart({
  label,
  caption,
  points,
  playing,
  reduce,
  captionAccent = false,
  width = 220,
  height = 52,
}: {
  label: string;
  caption: string;
  points: number[];
  playing: boolean;
  reduce: boolean;
  captionAccent?: boolean;
  width?: number;
  height?: number;
}) {
  const { item, t } = dashMotion(reduce);
  const path = archPointsToPath(points, width, height);
  const last = points[points.length - 1] ?? 0;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const pad = 4;
  const endX = width;
  const endY = height - pad - ((last - min) / range) * (height - pad * 2);

  return (
    <motion.div variants={item} className="mt-5 border-t pt-4" style={{ borderColor: dash.border }}>
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <span
          className="text-[7px] font-medium uppercase tracking-[0.16em]"
          style={{ color: dash.faint }}
        >
          {label}
        </span>
        <span
          className="text-[9px] tabular-nums"
          style={{ color: captionAccent ? dash.green : dash.ink }}
        >
          {caption}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        aria-hidden
      >
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            y1={height * ratio}
            x2={width}
            y2={height * ratio}
            stroke={dash.border}
            strokeWidth="0.5"
          />
        ))}
        <motion.path
          d={path}
          fill="none"
          stroke={dash.line}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{
            pathLength: playing ? 1 : 0.12,
            opacity: playing ? 1 : 0.45,
          }}
          transition={{ duration: reduce ? 0 : 1.1, ease: easeOut }}
        />
        <motion.circle
          r="2"
          fill={dash.green}
          cx={endX}
          cy={endY}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: playing ? 1 : 0.35 }}
          transition={{ ...t.feedback, delay: reduce ? 0 : 0.65 }}
        />
      </svg>
    </motion.div>
  );
}

function ArchQuota({ used, total }: { used: number; total: number }) {
  const pct = Math.round((used / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-right text-[9px] tabular-nums" style={{ color: dash.ink }}>
        {used}
        <span style={{ color: dash.faint }}>/{total}</span>
      </span>
      <span
        className="relative h-px w-10 overflow-hidden"
        style={{ backgroundColor: dash.border }}
        aria-hidden
      >
        <span
          className="absolute inset-y-0 left-0"
          style={{ width: `${pct}%`, backgroundColor: `${dash.green}8c` }}
        />
      </span>
    </div>
  );
}

function MiniDashboardPanel({
  tab,
  playing,
  reduce,
}: {
  tab: DashboardTab;
  playing: boolean;
  reduce: boolean;
}) {
  const { item, t } = dashMotion(reduce);
  const usageRows = usagePresets.basic.map((row) => ({
    ...row,
    used: row.filled,
    total: 10,
  }));

  if (tab === "profile") {
    return (
      <DashPanelShell playing={playing} reduce={reduce}>
        <DashHeader
          index="01 / Account"
          title="Profile"
          status="Active"
          statusAccent
          reduce={reduce}
        />
        <motion.div variants={item} className="mt-5 flex items-start gap-4">
          <ArchAvatar />
          <div className="min-w-0 flex-1 border-l pl-4" style={{ borderColor: dash.border }}>
            <p className="text-[11px] font-medium tracking-tight" style={{ color: dash.ink }}>
              John Doe
            </p>
            <p className="mt-0.5 text-[9px]" style={{ color: dash.muted }}>
              john.doe@comlabs.com
            </p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.14em]" style={{ color: dash.faint }}>
              Comlabs · Founder
            </p>
          </div>
        </motion.div>
        <motion.div variants={item} className="mt-6">
          <ArchSpecRow label="Display name" value="John Doe" />
          <ArchSpecRow label="Username" value="@johndoe" />
          <ArchSpecRow label="Timezone" value="Asia/Jakarta (GMT+7)" />
          <ArchSpecRow label="Completion" value="94%" accent />
        </motion.div>
        <motion.div variants={item} className="mt-6 border-t pt-4" style={{ borderColor: dash.border }}>
          <p
            className="mb-2 text-[7px] font-medium uppercase tracking-[0.16em]"
            style={{ color: dash.faint }}
          >
            Connections
          </p>
          <ArchSpecRow label="Google" value="Linked" accent />
          <ArchSpecRow label="GitHub" value="Linked" accent />
          <ArchSpecRow label="Slack" value="Linked" accent />
        </motion.div>
        <motion.button
          type="button"
          variants={item}
          className={cn(
            "mt-8 w-full border py-2.5 text-[9px] font-medium uppercase tracking-[0.14em]",
            GPU,
          )}
          style={{ borderColor: dash.border, color: dash.ink, backgroundColor: dash.surface }}
          whileHover={reduce ? undefined : { borderColor: dash.green }}
          transition={t.feedback}
        >
          Save changes
        </motion.button>
      </DashPanelShell>
    );
  }

  if (tab === "wallet") {
    return (
      <DashPanelShell playing={playing} reduce={reduce} className="w-[112%]">
        <DashHeader
          index="02 / Billing"
          title="Wallet"
          status="Synced"
          statusAccent
          reduce={reduce}
        />
        <motion.div variants={item} className="mt-5">
          <p
            className="text-[7px] font-medium uppercase tracking-[0.16em]"
            style={{ color: dash.faint }}
          >
            Available balance
          </p>
          <motion.p
            className="mt-1 text-[24px] font-medium tabular-nums tracking-[-0.03em]"
            style={{ color: dash.ink }}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enter, delay: reduce ? 0 : 0.08 }}
          >
            $2,450.00
          </motion.p>
          <p className="mt-1 text-[9px] tabular-nums" style={{ color: dash.green }}>
            +$320 this month
          </p>
        </motion.div>
        <ArchLineChart
          label="Balance trend"
          caption="10d"
          points={WALLET_CHART}
          playing={playing}
          reduce={reduce}
          captionAccent
        />
        <motion.div variants={item} className="mt-6 border-t pt-4" style={{ borderColor: dash.border }}>
          <p
            className="mb-2 text-[7px] font-medium uppercase tracking-[0.16em]"
            style={{ color: dash.faint }}
          >
            Ledger
          </p>
          {[
            { when: "Apr 2", label: "Pro plan renewal", amount: "-$250.00" },
            { when: "Mar 28", label: "Referral credit", amount: "+$40.00" },
            { when: "Mar 24", label: "Usage overage", amount: "-$18.40" },
            { when: "Mar 18", label: "Top-up", amount: "+$500.00" },
            { when: "Mar 12", label: "API credits", amount: "-$62.00" },
            { when: "Mar 8", label: "Refund", amount: "+$12.00" },
          ].map((row) => (
            <DashRow
              key={row.label}
              reduce={reduce}
              left={
                <div className="grid w-full grid-cols-[2.5rem_1fr] gap-2">
                  <span className="text-[8px] tabular-nums" style={{ color: dash.faint }}>
                    {row.when}
                  </span>
                  <span className="text-[9px]" style={{ color: dash.text }}>
                    {row.label}
                  </span>
                </div>
              }
              right={
                <span
                  className="text-[9px] font-medium tabular-nums"
                  style={{ color: row.amount.startsWith("+") ? dash.green : dash.ink }}
                >
                  {row.amount}
                </span>
              }
            />
          ))}
        </motion.div>
      </DashPanelShell>
    );
  }

  if (tab === "usage") {
    return (
      <DashPanelShell playing={playing} reduce={reduce} className="w-[110%]">
        <DashHeader index="03 / Limits" title="Usage" status="Daily reset" reduce={reduce} />
        <motion.div variants={item} className="mt-5 flex items-baseline justify-between">
          <span className="text-[10px] font-medium" style={{ color: dash.ink }}>
            Basic plan
          </span>
          <span className="text-[9px] tabular-nums" style={{ color: dash.muted }}>
            $100 / mo
          </span>
        </motion.div>
        <ArchLineChart
          label="Consumption"
          caption="+18%"
          points={USAGE_CHART}
          playing={playing}
          reduce={reduce}
          captionAccent
        />
        <motion.div variants={item} className="mt-6 border-t pt-4" style={{ borderColor: dash.border }}>
          {usageRows.map((row) => (
            <DashRow
              key={row.title}
              reduce={reduce}
              left={
                <div>
                  <p className="text-[9px] font-medium" style={{ color: dash.ink }}>
                    {row.title}
                  </p>
                  <p className="text-[8px]" style={{ color: dash.faint }}>
                    Resets midnight UTC
                  </p>
                </div>
              }
              right={<ArchQuota used={row.used} total={row.total} />}
            />
          ))}
          <DashRow
            border={false}
            reduce={reduce}
            left={
              <p className="text-[9px] font-medium" style={{ color: dash.ink }}>
                API tokens
              </p>
            }
            right={<ArchQuota used={6} total={10} />}
          />
        </motion.div>
      </DashPanelShell>
    );
  }

  return (
    <DashPanelShell playing={playing} reduce={reduce} className="w-[115%] min-h-[450px]">
      <DashHeader
        index="04 / Email"
        title="Deliverability"
        status="Monitoring"
        statusAccent
        reduce={reduce}
      />
      <motion.div variants={item} className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium" style={{ color: dash.ink }}>
            comlabs.com
          </p>
          <p className="mt-0.5 text-[8px]" style={{ color: dash.muted }}>
            Domain reputation
          </p>
        </div>
        <p className="text-[22px] font-medium tabular-nums tracking-[-0.03em]" style={{ color: dash.green }}>
          98
        </p>
      </motion.div>
      <ArchLineChart
        label="Inbox rate"
        caption="99.2%"
        points={DELIVERY_CHART}
        playing={playing}
        reduce={reduce}
        captionAccent
      />
      <motion.div variants={item} className="mt-6">
        <ArchSpecRow label="SPF" value="Valid" accent />
        <ArchSpecRow label="DKIM" value="Valid" accent />
        <ArchSpecRow label="DMARC" value="Valid" accent />
        <ArchSpecRow label="BIMI" value="Pending" />
      </motion.div>
      <motion.div variants={item} className="mt-6 border-t pt-4" style={{ borderColor: dash.border }}>
        <p
          className="mb-2 text-[7px] font-medium uppercase tracking-[0.16em]"
          style={{ color: dash.faint }}
        >
          Send log
        </p>
        {Array.from({ length: 7 }).map((_, i) => (
          <DashRow
            key={i}
            reduce={reduce}
            left={
              <div className="grid w-full grid-cols-[3.5rem_1fr] gap-2">
                <span className="text-[8px] tabular-nums" style={{ color: dash.faint }}>
                  14:{10 + i}
                </span>
                <span className="text-[9px]" style={{ color: dash.text }}>
                  launch-{i + 1}@comlabs.com
                </span>
              </div>
            }
            right={
              <span className="text-[8px] tabular-nums" style={{ color: dash.green }}>
                99.{i + 1}%
              </span>
            }
          />
        ))}
      </motion.div>
    </DashPanelShell>
  );
}

export function FeatureListCard({ active = false }: { active?: boolean }) {
  const { reduce, playing } = useShowcasePlayback(active);
  const { index, direction } = useCyclicIndex(
    dashboardNavCycle.length,
    playing,
    5600,
    reduce,
  );
  const activeId = dashboardNavCycle[index];

  const sections = ["Account", "Billing", "Preferences", "Email"] as const;

  return (
    <ShowcaseFrame className="p-2">
      <div
        className={cn(showcaseSurface, "flex min-h-0 flex-row")}
        style={{ backgroundColor: ui.surface, borderColor: dash.border }}
      >
        <aside
          className="flex h-full w-[34%] min-w-[108px] shrink-0 flex-col border-r border-neutral-200 px-3 py-3"
        >
          <button
            type="button"
            className="text-left text-[8px] uppercase tracking-[0.12em] text-neutral-400"
          >
            ← Comlabs
          </button>
          {sections.map((section) => (
            <div key={section} className="mt-4 border-t border-neutral-200 pt-4 first:mt-5 first:border-t-0 first:pt-0">
              <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                {section}
              </p>
              <div className="mt-2 space-y-0.5">
                {settingsNav
                  .filter((item) => item.section === section)
                  .map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="relative flex w-full items-center rounded-sm py-1 pl-2.5 text-left"
                        style={isActive ? { backgroundColor: dash.greenSoft } : undefined}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="settings-nav-rule"
                            className="absolute bottom-1 left-0 top-1 w-px"
                            style={{ backgroundColor: dash.green }}
                            transition={motionFor(reduce).shared}
                          />
                        ) : null}
                        <motion.span
                          className={cn(
                            "truncate text-[9px]",
                            isActive ? "font-medium" : "font-normal",
                          )}
                          style={{ color: isActive ? dash.ink : dash.muted }}
                          animate={{ opacity: isActive ? 1 : 0.72 }}
                          transition={motionFor(reduce).loop}
                        >
                          {item.label}
                        </motion.span>
                        {isActive ? (
                          <span
                            className="ml-auto mr-1 size-1 shrink-0 rounded-full"
                            style={{ backgroundColor: dash.green }}
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </aside>

        <div
          className="relative min-h-0 min-w-0 flex-1 overflow-hidden border-l border-t border-neutral-200"
          style={{ backgroundColor: dash.bg, borderTopColor: `${dash.green}22` }}
        >
          <CrossfadeSlot
            id={activeId}
            direction={direction}
            reduce={reduce}
            className="absolute inset-0 overflow-hidden"
          >
            <MiniDashboardPanel tab={activeId} playing={playing} reduce={reduce} />
          </CrossfadeSlot>
        </div>
      </div>
    </ShowcaseFrame>
  );
}

const commandOptions = [
  "Run again",
  "Make changes to this email",
  "Adjust schedule or trigger",
  "Type it your own",
] as const;

type SubmitPhase = "idle" | "loading" | "done";

export function ActionCard({ active = false }: { active?: boolean }) {
  const { reduce, playing } = useShowcasePlayback(active);
  const { index: selected, direction } = useCyclicIndex(
    commandOptions.length,
    playing,
    3800,
    reduce,
  );
  const [phase, setPhase] = useState<SubmitPhase>("idle");
  const t = motionFor(reduce);

  useEffect(() => {
    if (!playing) {
      setPhase("idle");
      return;
    }
    if (phase !== "idle" || selected !== 0) return;
    const id = window.setTimeout(() => setPhase("loading"), 1000);
    return () => window.clearTimeout(id);
  }, [playing, phase, selected]);

  useEffect(() => {
    if (phase !== "loading") return;
    const id = window.setTimeout(() => setPhase("done"), 1200);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const id = window.setTimeout(() => setPhase("idle"), 1000);
    return () => window.clearTimeout(id);
  }, [phase]);

  const submitScale =
    phase === "loading"
      ? { scaleX: 0.96, scaleY: 0.94 }
      : phase === "done" && !reduce
        ? { scaleX: 1, scaleY: [1.03, 1] }
        : { scaleX: 1, scaleY: 1 };

  return (
    <ShowcaseFrame className="p-2">
      <div
        className={cn(showcaseSurface, "p-4")}
        style={{ backgroundColor: ui.surface, borderColor: ui.border }}
      >
        <div className="flex shrink-0 items-start justify-between gap-3">
          <p className="text-[14px] font-medium tracking-tight" style={{ color: ui.text }}>
            What would you like to do?
          </p>
          <svg
            viewBox="0 0 16 16"
            className="size-4 shrink-0"
            style={{ color: ui.text }}
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 1.5l1.1 3.9L13 6.5l-3.9 1.1L8 11.5 6.9 7.6 3 6.5l3.9-1.1L8 1.5z" />
          </svg>
        </div>

        <ul className="relative mt-3 flex min-h-0 flex-1 flex-col justify-center space-y-0.5">
          <LayoutGroup id="command-list">
            {commandOptions.map((option, i) => {
              const isSelected = i === selected;
              return (
                <li key={option} className="relative">
                  {isSelected && (
                    <SharedSelectionPill
                      layoutId="command-highlight"
                      reduce={reduce}
                      className={cn("absolute inset-0", INNER_RADIUS)}
                    />
                  )}
                  <motion.span
                    className={cn("relative z-[1] flex items-center rounded-2xl px-3 py-2.5 text-[11px]", GPU)}
                    animate={{
                      opacity: isSelected ? 1 : 0.78,
                      x: isSelected && !reduce ? direction * -1.5 : 0,
                    }}
                    transition={t.loop}
                    style={{ color: isSelected ? ui.text : ui.muted }}
                  >
                    <span className="mr-3 tabular-nums" style={{ color: ui.faint }}>
                      {i + 1}
                    </span>
                    {option}
                  </motion.span>
                </li>
              );
            })}
          </LayoutGroup>
        </ul>

        <div
          className="mt-4 flex shrink-0 items-center justify-between border-t pt-3"
          style={{ borderColor: ui.divider }}
        >
          <div className="flex items-center gap-1.5 text-[9px]" style={{ color: ui.faint }}>
            <span>↑</span>
            <span>↓</span>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px]" style={{ color: ui.faint }}>
              Dismiss{" "}
              <kbd
                className="ml-1 rounded border px-1.5 py-0.5 text-[8px]"
                style={{ borderColor: ui.border }}
              >
                ESC
              </kbd>
            </span>
            <motion.button
              type="button"
              className={cn(
                "inline-flex min-w-[72px] origin-center items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[9px] font-medium text-white",
                GPU,
              )}
              style={{ backgroundColor: ui.text }}
              animate={submitScale}
              transition={
                phase === "done" && !reduce
                  ? { scaleY: { duration: 0.32, ease: easeOut }, scaleX: t.feedback }
                  : t.feedback
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {phase === "loading" ? (
                  <motion.span
                    key="load"
                    initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={t.feedback}
                    className="flex items-center gap-1"
                  >
                    <Loader2 className="size-3 animate-spin" strokeWidth={2} />
                  </motion.span>
                ) : phase === "done" ? (
                  <motion.span
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={t.feedback}
                  >
                    Done
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={t.fade}
                    className="flex items-center gap-1"
                  >
                    Submit <span aria-hidden>↵</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </ShowcaseFrame>
  );
}

export function IconAccentCard({ active = false }: { active?: boolean }) {
  const { reduce, playing } = useShowcasePlayback(active);
  const [editing, setEditing] = useState(false);
  const t = motionFor(reduce);

  useEffect(() => {
    if (!playing) {
      setEditing(false);
      return;
    }
    const open = window.setTimeout(() => setEditing(true), 4000);
    const close = window.setTimeout(() => setEditing(false), 7800);
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(close);
    };
  }, [playing, active]);

  return (
    <ShowcaseFrame className="p-2">
      <div
        className={cn(showcaseSurface, "p-4")}
        style={{ backgroundColor: ui.surface, borderColor: ui.border }}
      >
        <div className="flex shrink-0 items-start justify-between">
          <div className="size-11 overflow-hidden rounded-full">
            <ProfileAvatarPattern />
          </div>
          <motion.button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className={cn("origin-center rounded-full border px-3 py-1 text-[10px] font-medium", GPU)}
            style={{ borderColor: ui.border, color: ui.text }}
            animate={
              editing && !reduce
                ? { scaleX: 1.02, scaleY: 0.97 }
                : { scaleX: 1, scaleY: 1 }
            }
            transition={t.feedback}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={editing ? "save" : "update"}
                initial={reduce ? false : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -1 }}
                transition={t.fade}
              >
                {editing ? "Save" : "Update"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="mt-4 shrink-0">
          <p className="text-[15px] font-medium tracking-tight" style={{ color: ui.text }}>
            John Doe
          </p>
          <p className="mt-0.5 text-[10px]" style={{ color: ui.muted }}>
            (john.doe@comlabs.com)
          </p>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <AnimatePresence initial={false}>
            {editing && (
              <motion.div
                key="edit-fields"
                initial={reduce ? false : { opacity: 0, scaleY: 0.94 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={reduce ? undefined : { opacity: 0, scaleY: 0.97 }}
                transition={t.expand}
                style={{ transformOrigin: "top" }}
                className={cn("overflow-hidden", GPU)}
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.fade, delay: reduce ? 0 : 0.06 }}
                  className="space-y-2 pb-4 pt-3"
                >
                  <label className="block text-[9px]" style={{ color: ui.muted }}>
                    Display name
                  </label>
                  <div
                    className="rounded-lg border px-2.5 py-2 text-[10px]"
                    style={{ borderColor: ui.border, color: ui.text }}
                  >
                    John Doe
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout={!reduce}
            transition={t.expand}
            className="mt-auto space-y-3 border-t pt-4"
            style={{ borderColor: ui.dividerSubtle }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px]" style={{ color: ui.muted }}>
                Company
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="flex size-5 items-center justify-center rounded-md bg-lime-400 text-[8px] font-medium"
                  style={{ color: ui.text }}
                >
                  C
                </span>
                <span className="text-[10px] font-medium" style={{ color: ui.text }}>
                  Comlabs
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px]" style={{ color: ui.muted }}>
                Website
              </span>
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 16 16" className="size-3.5" style={{ color: ui.muted }} fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                  <path
                    d="M2.5 8H13.5M8 2.5C6.5 4.5 6.5 11.5 8 13.5C9.5 11.5 9.5 4.5 8 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="text-[10px] font-medium" style={{ color: ui.text }}>
                  Comlabs
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ShowcaseFrame>
  );
}

const showcaseLayout = [
  { id: "metrics", Component: MetricsCard, className: "sm:col-start-1 sm:row-start-1" },
  { id: "action", Component: ActionCard, className: "sm:col-start-2 sm:row-start-1" },
  { id: "features", Component: FeatureListCard, className: "sm:col-start-1 sm:row-start-2" },
  { id: "icon", Component: IconAccentCard, className: "sm:col-start-2 sm:row-start-2" },
] as const;

export function ShowcaseCardsGrid({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="mt-12 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(0,1.24fr)_minmax(0,0.76fr)] md:mt-16 md:gap-3.5">
      {showcaseLayout.map(({ id, Component, className }, index) => (
        <motion.div
          key={id}
          className={cn("flex min-w-0 flex-col", className, GPU)}
          style={{ height: SHOWCASE_CARD_HEIGHT }}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            delay: reduceMotion ? 0 : 0.08 + index * 0.08,
            ...motionFor(reduceMotion).enter,
          }}
        >
          <div className="h-full">
            <Component active={inView} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
