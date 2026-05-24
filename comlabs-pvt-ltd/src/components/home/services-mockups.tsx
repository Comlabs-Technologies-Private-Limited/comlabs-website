"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

import { cn } from "@/lib/utils";

/** Design tokens — SF Pro stack, premium mockup palette */
const mock = {
  subtle: "#7F7F7F",
  default: "#5D5D5D",
  strong: "#292929",
  bgSelected: "#F5F5F5",
  border: "#F2F2F2",
} as const;

const mockFont =
  "font-[system-ui,-apple-system,'SF_Pro_Text','SF_Pro_Display',BlinkMacSystemFont,sans-serif]";

const ease = [0.25, 0.1, 0, 1] as const;

/** Shared viewport trigger — passed from services-section when card enters view */
export type MockupProps = { active?: boolean };

const MOCK_VIEWPORT = { once: true, amount: 0.35 } as const;

const frame = cn(
  mockFont,
  "overflow-hidden rounded-xl bg-white p-3.5",
  "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.06)]",
);

function MockFrame({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div className={cn(frame, className)} {...(interactive ? {} : { "aria-hidden": true })}>
      {children}
    </div>
  );
}

const miniPrimaryCtaClass = cn(
  "group relative z-10 inline-flex items-center gap-1 rounded-full border border-gray-400/20 py-0 pl-2 pr-0.5",
  "text-[6px] font-medium leading-none tracking-tight text-black",
  "bg-gray-100/90 shadow-[0_1px_2px_rgba(37,99,235,0.35)]",
  "transition-[background-color,box-shadow,transform] duration-150",
  "hover:bg-gray-100 active:scale-[0.98]",
);

const miniPrimaryCtaIconClass =
  "flex size-3.5 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-150 group-hover:translate-x-px";

const miniGhostCtaClass = cn(
  "relative z-10 inline-flex items-center justify-center rounded-full border border-neutral-200/90 px-2 py-0.5",
  "text-[7px] font-normal leading-none tracking-tight text-neutral-700",
  "bg-white/80 shadow-sm shadow-black/5 backdrop-blur-sm",
  "transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.98]",
);

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="size-2 rounded-full bg-[#FF5F57]" />
      <span className="size-2 rounded-full bg-[#FEBC2E]" />
      <span className="size-2 rounded-full bg-[#28C840]" />
    </div>
  );
}

type NucleoProps = SVGProps<SVGSVGElement> & { size?: number };

function nucleoBase(size: number, props: NucleoProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function IconNode({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V5M12 19v-4.5M9.5 12H5M19 12h-4.5" />
    </svg>
  );
}

function IconTerminal({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 10l2 2-2 2M12 14h4" />
    </svg>
  );
}

function IconCompass({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function IconGlobe({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" />
    </svg>
  );
}

function IconSend({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M4 12l16-7-7 16-2-7-7-2z" />
    </svg>
  );
}

function IconSearch({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

function IconPlus({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}

function IconCheck({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M6 12.5l3.5 3.5L18 8" />
    </svg>
  );
}

function IconChart({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M5 19V9M10 19V5M15 19v-7M20 19V11" />
    </svg>
  );
}

function IconVerified({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)} fill="currentColor" stroke="none">
      <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 7.7l5.4-.8L12 2z" />
    </svg>
  );
}

function useMockMotion(active: boolean) {
  const reduce = !!useReducedMotion();
  const playing = active || reduce;

  return {
    reduce,
    playing,
    reveal: {
      initial: "hidden" as const,
      animate: playing ? ("show" as const) : ("hidden" as const),
    },
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.07,
          delayChildren: reduce ? 0 : 0.12,
        },
      },
    },
    item: {
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 5 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.32, ease },
      },
    },
    fade: {
      initial: { opacity: reduce ? 1 : 0 },
      animate: { opacity: playing ? 1 : reduce ? 1 : 0 },
      transition: { duration: reduce ? 0 : 0.4, ease },
    },
  };
}

export { MOCK_VIEWPORT };

/** website-rebuild — investor profile card (commented out — using mockup_before.png in services-section) */
/*
export function SaaSMockup({ active = false }: MockupProps) {
  const { container, item, reduce, reveal } = useMockMotion(active);

  return (
    <MockFrame className="mt-28">
      <p className="text-[12px] font-medium" style={{ color: mock.subtle }}>
        Investor profile
      </p>

      <motion.div
        className="mt-3 flex items-center gap-2.5"
        variants={container}
        {...reveal}
      >
        <motion.div
          variants={item}
          className="flex size-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #6ee7b7 0%, #3b82f6 100%)" }}
        />
        <motion.div variants={item} className="min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-medium tracking-tight" style={{ color: mock.strong }}>
              Sam Altman
            </span>
            <IconVerified size={12} className="text-blue-500" />
          </div>
          <p className="text-[12px] font-normal" style={{ color: mock.default }}>
            CEO & Co-Founder · OpenAI
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-lg p-2.5"
        style={{ backgroundColor: mock.bgSelected, border: `1px solid ${mock.border}` }}
        variants={container}
        {...reveal}
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Past company", value: "Y Combinator" },
            { label: "School", value: "Stanford" },
          ].map((row) => (
            <motion.div key={row.label} variants={item}>
              <p className="text-[12px] font-normal" style={{ color: mock.subtle }}>
                {row.label}
              </p>
              <p className="mt-0.5 text-[13px] font-medium" style={{ color: mock.strong }}>
                {row.value}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-2.5 border-t pt-2.5" style={{ borderColor: mock.border }} variants={item}>
          <p className="text-[12px] font-normal" style={{ color: mock.subtle }}>
            AI summary
          </p>
          <p className="mt-1 text-[13px] font-normal leading-relaxed" style={{ color: mock.default }}>
            Visionary entrepreneur advancing AI. Former Y Combinator president…
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-3 flex gap-2"
        variants={container}
        {...reveal}
      >
        <motion.button
          type="button"
          variants={item}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="flex-1 rounded-full px-3 py-1.5 text-[12px] font-medium text-white"
          style={{ backgroundColor: mock.strong }}
        >
          Explore profile
        </motion.button>
        <motion.button
          type="button"
          variants={item}
          whileHover={reduce ? undefined : { scale: 1.02 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="flex-1 rounded-full border px-3 py-1.5 text-[12px] font-medium"
          style={{ borderColor: mock.border, color: mock.default }}
        >
          Get email
        </motion.button>
      </motion.div>
    </MockFrame>
  );
}
*/

/** ai-automation — setup pipeline terminal */
export function SapMockup({ active = false }: MockupProps) {
  const { container, item, reduce, playing, reveal } = useMockMotion(active);

  const steps = [
    { icon: IconNode, label: "alpaca launch openclaw", done: true },
    { icon: IconTerminal, label: "installing openclaw…", active: true },
    { icon: IconCompass, label: "configuring model…", pending: true },
    { icon: IconGlobe, label: "adding web tools…", pending: true },
    { icon: IconSend, label: "openclaw is running", pending: true },
  ] as const;

  return (
    <MockFrame className="p-3">
      <WindowDots />

      <motion.ul
        className="mt-3 space-y-2.5"
        variants={container}
        {...reveal}
      >
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = "active" in step && step.active;
          const isDone = "done" in step && step.done;

          return (
            <motion.li key={step.label} variants={item} className="flex items-center gap-2.5">
              <span
                className="flex size-4 shrink-0 items-center justify-center"
                style={{ color: isDone || isActive ? mock.strong : mock.subtle }}
              >
                {isDone ? (
                  <motion.span
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    animate={playing ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    <IconCheck size={13} />
                  </motion.span>
                ) : (
                  <Icon size={13} />
                )}
              </span>
              <span
                className="text-[13px] font-normal"
                style={{ color: isActive || isDone ? mock.strong : mock.subtle }}
              >
                {step.label}
                {isActive ? (
                  <motion.span
                    className="inline-flex w-4"
                    animate={playing && !reduce ? { opacity: [0.2, 1, 0.2] } : { opacity: 1 }}
                    transition={{ duration: 1.4, repeat: playing && !reduce ? Infinity : 0, ease: "easeInOut" }}
                  >
                    …
                  </motion.span>
                ) : null}
              </span>
              {isActive ? (
                <motion.span
                  className="ml-auto size-1.5 rounded-full bg-emerald-500"
                  animate={
                    playing && !reduce
                      ? { opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 1.6, repeat: playing && !reduce ? Infinity : 0, ease: "easeInOut" }}
                />
              ) : null}
            </motion.li>
          );
        })}
      </motion.ul>
    </MockFrame>
  );
}

/** product-ui — models & capability bars */
export function MvpMockup({ active = false }: MockupProps) {
  const { container, item, reduce, playing, reveal } = useMockMotion(active);

  const models = [
    { name: "Opus 4.7", bars: 6, color: "#F97316" },
    { name: "GPT 5.5", bars: 8, color: mock.strong },
    { name: "Meta", bars: 4, color: "#3B82F6" },
    { name: "BrainMAX", bars: 5, color: "#EC4899" },
  ];

  return (
    <MockFrame>
      <p className="text-[12px] font-normal" style={{ color: mock.subtle }}>
        Models
      </p>

      <motion.ul
        className="mt-3 space-y-2.5"
        variants={container}
        {...reveal}
      >
        {models.map((model, rowIndex) => (
          <motion.li key={model.name} variants={item} className="flex items-center gap-2">
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-md text-[10px] font-medium"
              style={{ backgroundColor: mock.bgSelected, color: model.color }}
            >
              {model.name.charAt(0)}
            </span>
            <span className="w-14 shrink-0 text-[13px] font-medium" style={{ color: mock.strong }}>
              {model.name}
            </span>
            <div className="flex flex-1 items-end gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3.5 flex-1 rounded-sm"
                  style={{
                    backgroundColor: i < model.bars ? model.color : mock.border,
                    opacity: i < model.bars ? 1 : 0.55,
                    transformOrigin: "bottom",
                  }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={playing ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: playing ? rowIndex * 0.08 + i * 0.03 : 0,
                    ease,
                  }}
                />
              ))}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </MockFrame>
  );
}

/** landing-sprint — mini ComLabs hero landing page (Aceternity-style viewport) */
export function LandingMockup({ active = false }: MockupProps) {
  const { container, item, reduce, reveal } = useMockMotion(active);

  const navLinks = ["Services", "Case Studies", "About"] as const;

  return (
    <MockFrame className="relative overflow-hidden p-0" interactive>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-50/90 via-white to-blue-50/50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(148,163,184,0.18) 0%, transparent 42%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.1) 0%, transparent 38%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-[10%] border-l border-dashed border-zinc-200/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-[10%] border-r border-dashed border-zinc-200/70"
        aria-hidden
      />

      <div className="relative z-[1]">
        <motion.nav
          className="flex items-center justify-between gap-2 border-b px-2.5 py-1"
          style={{ borderColor: mock.border }}
          variants={container}
          {...reveal}
        >
          <motion.span
            variants={item}
            className="shrink-0 text-[9px] font-medium tracking-tighter"
            style={{ color: mock.strong }}
          >
            Comlabs
          </motion.span>

          <motion.div variants={item} className="hidden min-w-0 items-center gap-1 sm:flex">
            {navLinks.map((link, index) => (
              <span key={link} className="flex items-center gap-1">
                {index > 0 ? (
                  <span className="size-0.5 rounded-full bg-blue-600/70" aria-hidden />
                ) : null}
                <span className="text-[6.5px] font-normal" style={{ color: mock.default }}>
                  {link}
                </span>
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="-mt-2">
            <Link href="/#contact" className={miniPrimaryCtaClass}>
              <span className="text-[6px] font-medium leading-none tracking-tight text-black">Book call</span>
              <span className={miniPrimaryCtaIconClass} aria-hidden>
                <ArrowRight className="size-2 -rotate-45 text-black" strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </motion.nav>

        <motion.div className="px-2.5 pt-2 pb-1.5" variants={container} {...reveal}>
          <motion.span
            variants={item}
            className="inline-flex items-center rounded-full border border-neutral-200/90 px-1.5 py-0.5"
          >
            <span
              className="text-[5.5px] font-normal uppercase leading-none tracking-[0.12em]"
              style={{ color: mock.strong }}
            >
              Websites · Product UI · Automation
            </span>
          </motion.span>

          <motion.h3
            variants={item}
            className="mt-1.5 max-w-[26ch] text-[9px] font-medium leading-[1.15] tracking-tighter"
            style={{ color: mock.strong }}
          >
            We build Websites that look{" "}
            <span className="text-blue-950">Credible</span> and{" "}
            <span className="text-blue-950">Convert</span>
          </motion.h3>

          <motion.p
            variants={item}
            className="mt-1 max-w-[34ch] text-[6.5px] font-normal leading-relaxed"
            style={{ color: mock.default }}
          >
            Clean, fast, conversion-focused digital experiences with end-to-end product design,
            development, and automation.
          </motion.p>

          <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-1">
            <Link href="/#contact" className={miniPrimaryCtaClass}>
              <span>Book a strategy call</span>
              <span className={miniPrimaryCtaIconClass} aria-hidden>
                <ArrowRight className="size-2 -rotate-45 text-black" strokeWidth={2.5} />
              </span>
            </Link>
            <Link href="/case-studies" className={miniGhostCtaClass}>
              See what we ship
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-1 px-2 pb-2"
          variants={container}
          {...reveal}
        >
          {[
            { bars: 2, accent: "#3B82F6" },
            { bars: 3, accent: mock.strong },
            { bars: 2, accent: "#6366F1" },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={reduce ? undefined : { y: -1 }}
              className="overflow-hidden rounded-md border p-1"
              style={{ borderColor: mock.border, backgroundColor: "rgba(255,255,255,0.72)" }}
            >
              <div
                className="h-1 rounded-sm"
                style={{ backgroundColor: mock.border }}
              />
              <div className="mt-1 space-y-0.5">
                {Array.from({ length: card.bars }).map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 rounded-full"
                    style={{
                      backgroundColor: mock.border,
                      width: i === card.bars - 1 ? "55%" : "80%",
                    }}
                  />
                ))}
              </div>
              <div
                className="mt-1 h-1.5 rounded-sm"
                style={{ backgroundColor: card.accent, opacity: 0.85 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MockFrame>
  );
}

/** maintenance — JSON task completion */
export function MobileMockup({ active = false }: MockupProps) {
  const { container, item, reduce, playing, reveal } = useMockMotion(active);

  return (
    <MockFrame>
      <p className="text-[12px] font-normal" style={{ color: mock.subtle }}>
        JSON
      </p>

      <motion.pre
        className="mt-2 text-[13px] font-normal leading-relaxed"
        style={{ color: mock.default }}
        variants={container}
        {...reveal}
      >
        <motion.code variants={item}>
          {"{"}
          {"\n"}
          {'  "taskId": '}
          <span style={{ color: "#059669" }}>&quot;11&quot;</span>,{"\n"}
          {'  "status": '}
          <motion.span
            style={{ color: "#059669" }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: playing ? 1 : 0 }}
            transition={{ delay: playing ? 0.45 : 0, duration: 0.3, ease }}
          >
            &quot;completed&quot;
          </motion.span>
          {"\n"}
          {"}"}
        </motion.code>
      </motion.pre>

      <motion.div
        className="mt-3 flex items-center gap-1.5 border-t pt-3"
        style={{ borderColor: mock.border }}
        variants={item}
        initial="hidden"
        animate={playing ? "show" : "hidden"}
      >
        <motion.span
          className="flex size-4 items-center justify-center rounded-full"
          style={{ backgroundColor: mock.bgSelected, color: mock.strong }}
          initial={reduce ? false : { scale: 0.8 }}
          animate={playing ? { scale: 1 } : { scale: 0.8 }}
          transition={{ delay: playing ? 0.55 : 0, type: "spring", stiffness: 420, damping: 22 }}
        >
          <IconCheck size={10} />
        </motion.span>
        <span className="text-[13px] font-medium" style={{ color: mock.strong }}>
          Done
        </span>
      </motion.div>
    </MockFrame>
  );
}

/** growth-cro — experiment lift + animated bars */
export function GrowthCroMockup({ active = false }: MockupProps) {
  const { container, item, reduce, playing, reveal } = useMockMotion(active);
  const bars = [38, 52, 46, 68, 61, 84, 92];

  return (
    <MockFrame>
      <motion.div variants={container} {...reveal}>
        <motion.div variants={item} className="flex items-center gap-1.5">
          <IconChart size={13} style={{ color: mock.subtle }} />
          <p className="text-[12px] font-normal" style={{ color: mock.subtle }}>
            Experiment · Hero headline
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-2 flex items-baseline gap-2">
          <motion.span
            className="text-[24px] font-medium tabular-nums tracking-tight"
            style={{ color: mock.strong }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={playing ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ delay: playing ? 0.25 : 0, duration: 0.4, ease }}
          >
            +4.2%
          </motion.span>
          <span className="text-[12px] font-medium" style={{ color: "#059669" }}>
            lift
          </span>
        </motion.div>

        <motion.p variants={item} className="mt-1.5 text-[13px] font-normal" style={{ color: mock.default }}>
          Signup CTA clicks vs. control · last 9 days
        </motion.p>

        <motion.div
          variants={item}
          className="mt-3 flex h-8 items-end gap-0.5 rounded-lg border px-1.5 py-1"
          style={{ borderColor: mock.border, backgroundColor: mock.bgSelected }}
        >
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-blue-500/45"
              initial={reduce ? false : { scaleY: 0 }}
              animate={playing ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.38, delay: playing ? 0.35 + i * 0.05 : 0, ease }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
            />
          ))}
        </motion.div>
      </motion.div>
    </MockFrame>
  );
}

export function ServiceMockup({ id, active = false }: { id: string; active?: boolean }) {
  switch (id) {
    case "website-rebuild":
      // return <SaaSMockup active={active} />;
      return null;
    case "landing-sprint":
      return <LandingMockup active={active} />;
    case "product-ui":
      return <MvpMockup active={active} />;
    case "ai-automation":
      return <SapMockup active={active} />;
    case "maintenance":
      return <MobileMockup active={active} />;
    case "growth-cro":
      return <GrowthCroMockup active={active} />;
    case "saas":
      // return <SaaSMockup active={active} />;
      return null;
    case "sap":
      return <SapMockup active={active} />;
    case "mvp":
      return <MvpMockup active={active} />;
    case "landing":
      return <LandingMockup active={active} />;
    case "mobile":
      return <MobileMockup active={active} />;
    default:
      return null;
  }
}
