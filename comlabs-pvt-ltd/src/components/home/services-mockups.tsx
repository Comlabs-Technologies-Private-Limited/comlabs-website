"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ComponentType, ReactNode, SVGProps } from "react";

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
  "overflow-y-auto rounded-xl bg-white p-3.5 h-100vh",
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

function IconEdit({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4 11.5-11.5z" />
    </svg>
  );
}

function IconSparkle({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)} fill="currentColor" stroke="none">
      <path d="M12 2l1.2 4.2L17.5 7.5 13.2 8.7 12 13l-1.2-4.3L6.5 7.5l4.3-1.3L12 2z" />
    </svg>
  );
}

function GoogleMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

type PlatformMark = ComponentType<{ size?: number }>;

type SeoPlatform = {
  name: string;
  status: string;
  bg: string;
  icon?: string;
  mark?: PlatformMark;
};

function PlatformBrandIcon({ platform, size = 11 }: { platform: SeoPlatform; size?: number }) {
  if (platform.icon) {
    return (
      <Image
        src={platform.icon}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-[3px] object-contain"
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  const Mark = platform.mark;
  return Mark ? <Mark size={size} /> : null;
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

/** product-ui — models & capability bars (commented out — using product-ui-mockup.png in services-section) */
/*
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
*/

const LANDING_EYEBROW = "Websites · Product UI · Automation";
const LANDING_HEADLINE = "We build Websites that look Credible and Convert";
const LANDING_SUBTEXT =
  "Clean, fast, conversion-focused digital experiences with end-to-end product design, development, and automation.";

type LandingSequencePhase =
  | "idle"
  | "eyebrow"
  | "loading"
  | "headline"
  | "subtext"
  | "sections"
  | "done";

function TypingCaret({
  visible,
  className,
}: {
  visible: boolean;
  className?: string;
}) {
  if (!visible) return null;

  return (
    <motion.span
      className={cn("ml-px inline-block h-2 w-px align-middle bg-zinc-400", className)}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

function useLandingMockupSequence(active: boolean, reduce: boolean) {
  const [phase, setPhase] = useState<LandingSequencePhase>("idle");
  const [eyebrowText, setEyebrowText] = useState("");
  const [headlineText, setHeadlineText] = useState("");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setEyebrowText("");
      setHeadlineText("");
      return;
    }

    if (reduce) {
      setPhase("done");
      setEyebrowText(LANDING_EYEBROW);
      setHeadlineText(LANDING_HEADLINE);
      return;
    }

    setPhase("eyebrow");
    setEyebrowText("");
    setHeadlineText("");

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const intervals = new Set<ReturnType<typeof setInterval>>();

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const typeText = (
      text: string,
      setText: (value: string) => void,
      intervalMs: number,
      onComplete: () => void,
    ) => {
      let index = 0;
      const id = setInterval(() => {
        if (cancelled) return;
        index += 1;
        setText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(id);
          intervals.delete(id);
          onComplete();
        }
      }, intervalMs);
      intervals.add(id);
    };

    typeText(LANDING_EYEBROW, setEyebrowText, 28, () => {
      later(() => {
        setPhase("loading");
        later(() => {
          setPhase("headline");
          typeText(LANDING_HEADLINE, setHeadlineText, 22, () => {
            later(() => {
              setPhase("subtext");
              later(() => {
                setPhase("sections");
                later(() => setPhase("done"), 640);
              }, 380);
            }, 160);
          });
        }, 2000);
      }, 200);
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [active, reduce]);

  return {
    eyebrowText,
    headlineText,
    showNav: active && phase !== "idle",
    showHeroBlock: phase !== "idle" && phase !== "eyebrow",
    showSubtext: ["subtext", "sections", "done"].includes(phase),
    showCtas: ["subtext", "sections", "done"].includes(phase),
    showSections: ["sections", "done"].includes(phase),
    isLoading: phase === "loading",
    isTypingEyebrow: phase === "eyebrow",
    isTypingHeadline: phase === "headline",
    headlineComplete: headlineText.length >= LANDING_HEADLINE.length,
  };
}

function LandingHeadlineText({
  text,
  complete,
  typing,
}: {
  text: string;
  complete: boolean;
  typing: boolean;
}) {
  if (complete) {
    return (
      <>
        We build Websites that look{" "}
        <span className="text-blue-950">Credible</span> and{" "}
        <span className="text-blue-950">Convert</span>
      </>
    );
  }

  return (
    <>
      {text}
      <TypingCaret visible={typing} className="h-1.5" />
    </>
  );
}

/** landing-sprint — mini ComLabs hero landing page (Aceternity-style viewport) */
export function LandingMockup({ active = false }: MockupProps) {
  const { reduce, playing } = useMockMotion(active);
  const sequence = useLandingMockupSequence(playing, reduce);
  const {
    eyebrowText,
    headlineText,
    showNav,
    showHeroBlock,
    showSubtext,
    showCtas,
    showSections,
    isLoading,
    isTypingEyebrow,
    isTypingHeadline,
    headlineComplete,
  } = sequence;

  const navLinks = ["Services", "Case Studies", "About"] as const;
  const serviceCards = [
    { title: "Websites", bars: 2, accent: "#3B82F6" },
    { title: "Product UI", bars: 3, accent: mock.strong },
    { title: "Automation", bars: 2, accent: "#6366F1" },
  ] as const;
  const trustedLogos = ["Northline", "Apexian", "Stackly", "Pulse"] as const;
  const processSteps = ["Diagnose", "Structure", "Design", "Launch"] as const;
  const stats = [
    { label: "Projects", value: "12+" },
    { label: "Avg launch", value: "2 wks" },
    { label: "Satisfaction", value: "98%" },
  ] as const;

  const sectionStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.04,
      },
    },
  };

  const sectionItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.3, ease },
    },
  };

  return (
    <MockFrame
      className="relative flex h-full overflow-y-auto flex-col md:px-8 px-4 scrollbar-hide"
      interactive
    >
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
        className="pointer-events-none absolute inset-y-0 left-[5%] border-l border-dashed border-zinc-200/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-[5%] border-r border-dashed border-zinc-200/70"
        aria-hidden
      />

      <div className="comlabs-scrollbar relative z-[1] flex flex-1 flex-col overflow-auto">
        <style>
          {`
            /* Custom sleek, light scrollbar */
            .comlabs-scrollbar::-webkit-scrollbar {
                width: 6px;
                background: #fff;
            }
            .comlabs-scrollbar::-webkit-scrollbar-thumb {
                background: #ececef;
                border-radius: 8px;
            }
            .comlabs-scrollbar::-webkit-scrollbar-corner {
                background: #fff;
            }
            /* Hide horizontal for extra sleekness */
            .comlabs-scrollbar::-webkit-scrollbar:horizontal { height: 0; }
            /* Firefox */
            .comlabs-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #ececef #fff;
            }
          `}
        </style>
        <div className="flex flex-1 flex-col">
          <AnimatePresence>
            {showNav ? (
              <motion.nav
                key="nav"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease }}
                className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-1"
                style={{ borderColor: mock.border }}
              >
                <span
                  className="shrink-0 text-[9px] font-medium tracking-tighter"
                  style={{ color: mock.strong }}
                >
                  Comlabs
                </span>

                <div className="hidden min-w-0 items-center gap-1 sm:flex">
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
                </div>

                <div className="-mt-2">
                  <Link href="/#contact" className={miniPrimaryCtaClass}>
                    <span className="text-[6px] font-medium leading-none tracking-tight text-black">
                      Book call
                    </span>
                    <span className={miniPrimaryCtaIconClass} aria-hidden>
                      <ArrowRight className="size-2 -rotate-45 text-black" strokeWidth={2.5} />
                    </span>
                  </Link>
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>

          <div className="shrink-0 px-2.5 pt-1.5 pb-1">
            <span className="inline-flex items-center rounded-full border border-neutral-200/90 px-1.5 py-0.5">
              <span
                className="text-[5.5px] font-normal uppercase leading-none tracking-[0.12em]"
                style={{ color: mock.strong }}
              >
                {eyebrowText}
                <TypingCaret visible={isTypingEyebrow} className="h-1.5" />
              </span>
            </span>

            <AnimatePresence mode="wait">
              {showHeroBlock ? (
                <motion.div
                  key="hero-block"
                  initial={reduce ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.3, ease }}
                  className="mt-1"
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 py-1"
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="size-1 rounded-full bg-zinc-300"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: dot * 0.14,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                      <span className="text-[6px] font-normal" style={{ color: mock.subtle }}>
                        Composing hero…
                      </span>
                    </motion.div>
                  ) : (
                    <>
                      <h3
                        className="max-w-[26ch] text-[8.5px] font-medium leading-[1.12] tracking-tighter"
                        style={{ color: mock.strong }}
                      >
                        <LandingHeadlineText
                          text={headlineText}
                          complete={headlineComplete}
                          typing={isTypingHeadline}
                        />
                      </h3>

                      <AnimatePresence>
                        {showSubtext ? (
                          <motion.p
                            key="subtext"
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.34, ease }}
                            className="mt-0.5 max-w-[34ch] text-[6px] font-normal leading-relaxed"
                            style={{ color: mock.default }}
                          >
                            {LANDING_SUBTEXT}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>

                      <AnimatePresence>
                        {showCtas ? (
                          <motion.div
                            key="ctas"
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.32, ease, delay: reduce ? 0 : 0.06 }}
                            className="mt-1.5 flex flex-wrap items-center gap-1"
                          >
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
                        ) : null}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showSections ? (
              <motion.div
                key="sections"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.34, ease }}
                className="flex flex-1 flex-col"
              >
                <motion.div
                  className="shrink-0 px-2 pt-1"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  <motion.p
                    variants={sectionItem}
                    className="text-[5px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: mock.subtle }}
                  >
                    What we ship
                  </motion.p>
                </motion.div>

                <motion.div
                  className="grid shrink-0 grid-cols-3 gap-1 px-2 pt-0.5"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  {serviceCards.map((card) => (
                    <motion.div
                      key={card.title}
                      variants={sectionItem}
                      whileHover={reduce ? undefined : { y: -1 }}
                      className="overflow-hidden rounded-md border p-1"
                      style={{ borderColor: mock.border, backgroundColor: "rgba(255,255,255,0.72)" }}
                    >
                      <div className="h-0.5 rounded-sm" style={{ backgroundColor: mock.border }} />
                      <p
                        className="mt-0.5 text-[5.5px] font-medium leading-none"
                        style={{ color: mock.strong }}
                      >
                        {card.title}
                      </p>
                      <div className="mt-0.5 space-y-0.5">
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
                        className="mt-0.5 h-1 rounded-sm"
                        style={{ backgroundColor: card.accent, opacity: 0.85 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="shrink-0 px-2 pt-1.5"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  <motion.p
                    variants={sectionItem}
                    className="text-[5px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: mock.subtle }}
                  >
                    Trusted by founders
                  </motion.p>
                  <motion.div variants={sectionItem} className="mt-0.5 flex flex-wrap gap-0.5">
                    {trustedLogos.map((logo) => (
                      <span
                        key={logo}
                        className="rounded-full border px-1 py-0.5 text-[5px] font-medium"
                        style={{
                          borderColor: mock.border,
                          color: mock.default,
                          backgroundColor: "#fff",
                        }}
                      >
                        {logo}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-1 grid shrink-0 grid-cols-4 gap-0.5 px-2"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step}
                      variants={sectionItem}
                      className="rounded border px-0.5 py-0.5 text-center"
                      style={{ borderColor: mock.border, backgroundColor: mock.bgSelected }}
                    >
                      <p className="text-[4.5px] font-medium tabular-nums" style={{ color: mock.subtle }}>
                        0{index + 1}
                      </p>
                      <p className="text-[5px] font-medium leading-tight" style={{ color: mock.strong }}>
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-1 grid shrink-0 grid-cols-3 gap-0.5 px-2"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={sectionItem}
                      className="rounded border px-1 py-0.5"
                      style={{ borderColor: mock.border, backgroundColor: "rgba(255,255,255,0.85)" }}
                    >
                      <p
                        className="text-[6px] font-medium tabular-nums leading-none"
                        style={{ color: mock.strong }}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[4.5px] leading-none" style={{ color: mock.subtle }}>
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-auto shrink-0 px-2 pt-1.5 pb-1"
                  variants={sectionStagger}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div
                    variants={sectionItem}
                    className="rounded-md border px-1.5 py-1"
                    style={{
                      borderColor: "#DBEAFE",
                      background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)",
                    }}
                  >
                    <p className="text-[5.5px] font-medium leading-tight" style={{ color: mock.strong }}>
                      Ready to launch faster?
                    </p>
                    <p className="mt-0.5 text-[5px] leading-relaxed" style={{ color: mock.default }}>
                      Ship a credible landing page in focused sprints.
                    </p>
                    <Link
                      href="/#contact"
                      className={cn(miniPrimaryCtaClass, "mt-1 inline-flex py-0.5")}
                    >
                      <span>Start a project</span>
                      <span className={miniPrimaryCtaIconClass} aria-hidden>
                        <ArrowRight className="size-2 -rotate-45 text-black" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={sectionItem}
                    className="mt-1 flex items-center justify-between border-t pt-1"
                    style={{ borderColor: mock.border }}
                  >
                    <span className="text-[4.5px] font-medium" style={{ color: mock.subtle }}>
                      Comlabs
                    </span>
                    <span className="text-[4.5px]" style={{ color: mock.subtle }}>
                      Privacy · Contact
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </MockFrame>
  );
}

const SEO_QUERY = "AI content strategy for SaaS brands";
const SEO_HEADLINE = "How SaaS Brands Win with AI Content";
const SEO_EXCERPT =
  "A practical playbook for SaaS teams to plan, create, and optimize content that ranks on Google and gets cited by AI answer engines.";

type SeoSequencePhase =
  | "idle"
  | "query"
  | "loading"
  | "headline"
  | "excerpt"
  | "visibility"
  | "done";

function useSeoMockupSequence(active: boolean, reduce: boolean) {
  const [phase, setPhase] = useState<SeoSequencePhase>("idle");
  const [queryText, setQueryText] = useState("");
  const [headlineText, setHeadlineText] = useState("");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setQueryText("");
      setHeadlineText("");
      return;
    }

    if (reduce) {
      setPhase("done");
      setQueryText(SEO_QUERY);
      setHeadlineText(SEO_HEADLINE);
      return;
    }

    setPhase("query");
    setQueryText("");
    setHeadlineText("");

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const intervals = new Set<ReturnType<typeof setInterval>>();

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const typeText = (
      text: string,
      setText: (value: string) => void,
      intervalMs: number,
      onComplete: () => void,
    ) => {
      let index = 0;
      const id = setInterval(() => {
        if (cancelled) return;
        index += 1;
        setText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(id);
          intervals.delete(id);
          onComplete();
        }
      }, intervalMs);
      intervals.add(id);
    };

    typeText(SEO_QUERY, setQueryText, 34, () => {
      later(() => {
        setPhase("loading");
        later(() => {
          setPhase("headline");
          typeText(SEO_HEADLINE, setHeadlineText, 26, () => {
            later(() => {
              setPhase("excerpt");
              later(() => {
                setPhase("visibility");
                later(() => setPhase("done"), 520);
              }, 420);
            }, 180);
          });
        }, 2000);
      }, 220);
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [active, reduce]);

  return {
    phase,
    queryText,
    headlineText,
    showDraft: phase !== "idle" && phase !== "query",
    showExcerpt: ["excerpt", "visibility", "done"].includes(phase),
    showVisibility: ["visibility", "done"].includes(phase),
    showOptimized: phase === "done",
    isLoading: phase === "loading",
    isTypingQuery: phase === "query",
    isTypingHeadline: phase === "headline",
  };
}

/** maintenance — copywriting & SEO content optimizer */
export function CopywritingSeoMockup({ active = false }: MockupProps) {
  const { item, reduce, playing } = useMockMotion(active);
  const sequence = useSeoMockupSequence(playing, reduce);
  const {
    queryText,
    headlineText,
    showDraft,
    showExcerpt,
    showVisibility,
    showOptimized,
    isLoading,
    isTypingQuery,
    isTypingHeadline,
  } = sequence;

  const platforms: SeoPlatform[] = [
    { name: "Google", mark: GoogleMark, status: "Indexed", bg: "#F8FAFC" },
    { name: "ChatGPT", icon: "/icons/brands/chatgpt.png", status: "Cited", bg: "#F0FDF4" },
    { name: "Claude", icon: "/icons/brands/claude-ai.png", status: "Cited", bg: "#FFF7ED" },
    { name: "Perplexity", icon: "/icons/brands/perplexity-ai.png", status: "Cited", bg: "#F0FDFA" },
  ];

  const platformGrid = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 0.06,
      },
    },
  };

  const platformCard = {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 7,
      scale: reduce ? 1 : 0.97,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduce ? 0 : 0.34,
        ease,
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.06,
      },
    },
  };

  const platformBrandRow = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -4 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 0.28, ease },
    },
  };

  const platformIconPop = {
    hidden: { scale: reduce ? 1 : 0.65, opacity: reduce ? 1 : 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 520, damping: 22 },
    },
  };

  const platformStatusRow = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.3, ease },
    },
  };

  const platformCheckPop = {
    hidden: { scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 580, damping: 17, delay: reduce ? 0 : 0.05 },
    },
  };

  const platformStatusText = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -3 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 0.24, ease, delay: reduce ? 0 : 0.08 },
    },
  };

  return (
    <MockFrame className="p-3">
      <motion.div initial="hidden" animate={playing ? "show" : "hidden"} variants={{ hidden: {}, show: {} }}>
        <motion.div
          variants={item}
          initial="hidden"
          animate={playing ? "show" : "hidden"}
          className="flex items-start justify-between gap-2"
        >
          <div className="flex min-w-0 items-start gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#F3E8FF] text-[#9333EA]">
              <IconEdit size={13} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium leading-snug tracking-tight" style={{ color: mock.strong }}>
                Your content, found everywhere
              </p>
              <p className="mt-0.5 text-[9px] font-normal leading-relaxed" style={{ color: mock.subtle }}>
                Optimized copy that ranks and gets cited.
              </p>
            </div>
          </div>

          <motion.span
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#ECFDF5] px-2 py-0.5 text-[8px] font-medium text-[#059669]"
            initial={reduce ? false : { scale: 0.92, opacity: 0 }}
            animate={
              showOptimized ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 440, damping: 26 }}
          >
            <IconCheck size={9} />
            Optimized
          </motion.span>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate={playing ? "show" : "hidden"}
          className="mt-2.5"
        >
          <p className="text-[8px] font-normal" style={{ color: mock.subtle }}>
            Topic / Query
          </p>
          <div
            className="mt-1 flex items-center gap-1.5 rounded-lg border px-2 py-1.5"
            style={{ borderColor: mock.border, backgroundColor: "#FAFAFA" }}
          >
            <IconSearch size={11} style={{ color: mock.subtle }} />
            <span className="truncate text-[9px] font-normal" style={{ color: mock.strong }}>
              {queryText}
              <TypingCaret visible={isTypingQuery} />
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {showDraft ? (
            <motion.div
              key="draft"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.32, ease }}
              className="mt-2.5"
            >
              <p className="text-[8px] font-normal" style={{ color: mock.subtle }}>
                Headline (Draft)
              </p>
              <div
                className="mt-1 rounded-xl border p-2"
                style={{ borderColor: mock.border, backgroundColor: "#FAFAFA" }}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 py-1"
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1 rounded-full bg-zinc-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: dot * 0.14,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                    <span className="text-[8px] font-normal" style={{ color: mock.subtle }}>
                      Drafting headline…
                    </span>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] font-medium leading-snug tracking-tight" style={{ color: mock.strong }}>
                        {headlineText}
                        <TypingCaret visible={isTypingHeadline} />
                      </p>
                      <motion.span
                        className="shrink-0 text-[8px] tabular-nums"
                        style={{ color: mock.subtle }}
                        animate={{ opacity: headlineText.length > 0 ? 1 : 0.4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {headlineText.length} / 60
                      </motion.span>
                    </div>

                    <div className="relative my-1.5 flex items-center">
                      <div className="h-px flex-1" style={{ backgroundColor: mock.border }} />
                      {headlineText.length >= SEO_HEADLINE.length ? (
                        <motion.span
                          className="ml-1 text-[#9333EA]"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 480, damping: 22 }}
                        >
                          <IconSparkle size={10} />
                        </motion.span>
                      ) : null}
                    </div>

                    <AnimatePresence>
                      {showExcerpt ? (
                        <motion.div
                          key="excerpt"
                          initial={reduce ? false : { opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.38, ease }}
                        >
                          <p className="text-[8px] font-medium" style={{ color: mock.strong }}>
                            Excerpt
                          </p>
                          <p
                            className="mt-0.5 text-[8px] font-normal leading-relaxed"
                            style={{ color: mock.default }}
                          >
                            {SEO_EXCERPT}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showVisibility ? (
            <motion.div
              key="visibility"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.36, ease }}
              className="mt-2.5"
            >
              <p className="text-[9px] font-medium" style={{ color: mock.strong }}>
                Visibility across search &amp; AI
              </p>

              <motion.div
                className="mt-1.5 grid grid-cols-2 gap-1 sm:grid-cols-4"
                variants={platformGrid}
                initial="hidden"
                animate="show"
              >
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.name}
                    variants={platformCard}
                    whileHover={reduce ? undefined : { y: -1, transition: { duration: 0.18 } }}
                    className="rounded-lg border px-1.5 py-1.5 transition-shadow duration-300"
                    style={{ borderColor: mock.border, backgroundColor: platform.bg }}
                  >
                    <motion.div variants={platformBrandRow} className="flex items-center gap-1">
                      <motion.span variants={platformIconPop} className="flex shrink-0">
                        <PlatformBrandIcon platform={platform} size={11} />
                      </motion.span>
                      <span className="text-[8px] font-medium" style={{ color: mock.strong }}>
                        {platform.name}
                      </span>
                    </motion.div>

                    <motion.div
                      variants={platformStatusRow}
                      className="mt-1 flex items-center gap-0.5 text-[7px] font-medium text-[#059669]"
                    >
                      <motion.span variants={platformCheckPop} className="flex shrink-0">
                        <IconCheck size={8} />
                      </motion.span>
                      <motion.span variants={platformStatusText}>{platform.status}</motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </MockFrame>
  );
}

/** maintenance — JSON task completion (commented out — using CopywritingSeoMockup) */
/*
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
*/

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
      // return <MvpMockup active={active} />;
      return null;
    case "ai-automation":
      return <SapMockup active={active} />;
    case "maintenance":
      return <CopywritingSeoMockup active={active} />;
    case "growth-cro":
      return <GrowthCroMockup active={active} />;
    case "saas":
      // return <SaaSMockup active={active} />;
      return null;
    case "sap":
      return <SapMockup active={active} />;
    case "mvp":
      // return <MvpMockup active={active} />;
      return null;
    case "landing":
      return <LandingMockup active={active} />;
    case "mobile":
      // return <MobileMockup active={active} />;
      return null;
    default:
      return null;
  }
}
