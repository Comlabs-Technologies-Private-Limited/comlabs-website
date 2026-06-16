"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { easeOut, GPU, motionFor } from "@/lib/product-motion";
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

/** @deprecated use easeOut — kept as alias for existing transitions */
const ease = easeOut;

/** Static transitions when `reduce` is not in scope */
const T_FEEDBACK = { type: "tween" as const, duration: 0.22, ease: easeOut };
const T_ENTER = { type: "tween" as const, duration: 0.38, ease: easeOut };
const T_EXPAND = { type: "tween" as const, duration: 0.42, ease: easeOut };
const T_LOOP = { type: "tween" as const, duration: 0.2, ease: easeOut };
const T_FADE = { type: "tween" as const, duration: 0.26, ease: easeOut };

/** Shared viewport trigger — passed from services-section when card enters view */
export type MockupProps = { active?: boolean };

const MOCK_VIEWPORT = { once: true, amount: 0.2 } as const;

const T_CARD_ENTER = { duration: 0.28, ease: easeOut };
const SPRING_CHECK = { type: "spring" as const, stiffness: 320, damping: 20 };
const SPRING_BADGE = { type: "spring" as const, stiffness: 280, damping: 18 };
const SPRING_CHECK_SM = { type: "spring" as const, stiffness: 400, damping: 22 };
const SPRING_PRESS = { type: "spring" as const, stiffness: 300, damping: 22 };
const DEMO_LOOP_PAUSE_MS = 2500;

function MockupDemoShell({
  active,
  reduce,
  children,
  className,
}: {
  active: boolean;
  reduce: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        GPU,
        "transition-shadow duration-[120ms] ease-out",
        active && !reduce && "hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.14)]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : reduce
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 12, scale: 0.97 }
      }
      transition={reduce ? { duration: 0 } : T_CARD_ENTER}
      whileHover={reduce ? undefined : { scale: 1.015, transition: { duration: 0.12, ease: easeOut } }}
      whileTap={
        reduce
          ? undefined
          : { scale: 0.985, transition: SPRING_PRESS }
      }
    >
      {children}
    </motion.div>
  );
}

function useDemoLoop(active: boolean, reduce: boolean, sequenceMs: number) {
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bump = useCallback(() => setCycle((c) => c + 1), []);

  useEffect(() => {
    if (!active || reduce) return;

    timerRef.current = setTimeout(bump, sequenceMs + DEMO_LOOP_PAUSE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, reduce, sequenceMs, cycle, bump]);

  useEffect(() => {
    if (!active) setCycle(0);
  }, [active]);

  return { cycle, playing: active };
}

function ClipReveal({
  show,
  reduce,
  children,
  className,
  duration = 0.22,
}: {
  show: boolean;
  reduce: boolean;
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={false}
      animate={{
        clipPath: show ? "inset(0 0% 0 0 round 12px)" : "inset(0 100% 0 0 round 12px)",
        opacity: show || reduce ? 1 : 0,
      }}
      transition={{ duration: reduce ? 0 : duration, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

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

const LANDING_SEQUENCE_MS = 4200;

const landingPageStagger = (reduce: boolean) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduce ? 0 : 0.055,
      delayChildren: reduce ? 0 : 0.28,
    },
  },
});

const landingBlock = (reduce: boolean) => ({
  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.22, ease: easeOut },
  },
});

const landingShowcaseGrid = (reduce: boolean) => ({
  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduce ? 0 : 0.22,
      ease: easeOut,
      staggerChildren: reduce ? 0 : 0.07,
    },
  },
});

/** landing-sprint — mini landing page built in Comlabs style */
export function LandingMockup({ active = false }: MockupProps) {
  const reduce = !!useReducedMotion();
  const { cycle, playing } = useDemoLoop(active, reduce, LANDING_SEQUENCE_MS);

  const block = landingBlock(reduce);
  const container = landingPageStagger(reduce);
  const showcaseGrid = landingShowcaseGrid(reduce);

  return (
    <MockupDemoShell active={playing} reduce={reduce} className="h-full w-full">
      <MockFrame
        className="flex h-full flex-col overflow-hidden bg-[#f7f7f4] p-0"
        interactive
      >
        {/* Browser chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-stone-200/80 bg-white/90 px-2.5 py-1.5">
          <WindowDots />
          <div className="flex min-w-0 flex-1 items-center rounded-md border border-stone-200/90 bg-white px-2 py-0.5">
            <span className="truncate text-[8px] text-stone-400">launch.yourstartup.com</span>
          </div>
        </div>

        {/* Mini landing page */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 85% 10%, rgba(201,100,66,0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(201,100,66,0.08) 0%, transparent 40%)",
            }}
          />

          <motion.div
            key={`landing-page-${cycle}`}
            className="relative flex h-full flex-col"
            variants={container}
            initial="hidden"
            animate={playing ? "show" : "hidden"}
          >
            {/* Nav */}
            <motion.div
              variants={block}
              className="flex shrink-0 items-center justify-between border-b border-stone-200/60 bg-[#f7f7f4]/90 px-2.5 py-1.5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1">
                <span
                  className="flex size-4 items-center justify-center rounded-[3px] text-[5px] font-bold text-white"
                  style={{ background: "#1c1917" }}
                >
                  C
                </span>
                <span className="text-[7px] font-semibold tracking-tight text-stone-900">COMLABS</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {["Work", "Services"].map((link) => (
                  <span key={link} className="text-[6px] text-stone-500">
                    {link}
                  </span>
                ))}
              </div>
              <span
                className="rounded-full px-1.5 py-0.5 text-[6px] font-semibold text-[#f7f7f4]"
                style={{ background: "#1c1917" }}
              >
                Get Started
              </span>
            </motion.div>

            {/* Hero */}
            <div className="flex flex-1 flex-col px-2.5 pt-2 pb-1.5 text-center">
              <motion.div
                variants={block}
                className="mx-auto inline-flex items-center gap-1 rounded-full border border-stone-200/80 px-1.5 py-0.5"
                style={{ background: "#f5e6df", color: "#c96442" }}
              >
                <span className="size-1 rounded-full bg-[#c96442]" aria-hidden />
                <span className="text-[6px] font-medium">Now accepting projects</span>
              </motion.div>

              <motion.h1
                variants={block}
                className="mx-auto mt-1.5 max-w-[92%] text-[11px] leading-[1.12] font-bold tracking-tight text-stone-900"
                style={{ letterSpacing: "-0.03em" }}
              >
                We Turn Ambitious Ideas Into{" "}
                <span style={{ color: "#c96442" }}>Products</span> People Use
              </motion.h1>

              <motion.p
                variants={block}
                className="mx-auto mt-1 max-w-[88%] text-[6.5px] leading-relaxed text-stone-500"
              >
                High-performance websites and web apps for ambitious companies.
              </motion.p>

              <motion.div
                variants={block}
                className="mt-1.5 flex items-center justify-center gap-1"
              >
                <span
                  className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[6px] font-semibold text-[#f7f7f4]"
                  style={{ background: "#1c1917" }}
                >
                  View our work
                  <ArrowRight size={7} aria-hidden />
                </span>
                <span className="rounded-full border border-stone-200/90 px-2 py-0.5 text-[6px] font-medium text-stone-700">
                  Talk to us
                </span>
              </motion.div>

              {/* Showcase cards */}
              <motion.div variants={showcaseGrid} className="mt-2 grid flex-1 grid-cols-2 gap-1">
                {["/imports/image.png", "/imports/image-1.png"].map((src) => (
                  <motion.div
                    key={src}
                    variants={block}
                    className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone-200/80 bg-white shadow-[0_2px_8px_rgba(28,25,23,0.06)]"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover object-top"
                      aria-hidden
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Client logos */}
              <motion.div
                variants={block}
                className="mt-1.5 flex shrink-0 items-center justify-center gap-1 border-t border-stone-200/60 pt-1.5"
              >
                {["Vodafone", "JIO", "Formial", "Vithub"].map((name) => (
                  <span
                    key={name}
                    className="rounded border border-stone-200/70 bg-white/80 px-1.5 py-0.5 text-[5px] font-semibold tracking-tight text-stone-400"
                  >
                    {name}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </MockFrame>
    </MockupDemoShell>
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
  const playing = active;
  const t = motionFor(reduce);

  return {
    reduce,
    playing,
    t,
    reveal: {
      initial: "hidden" as const,
      animate: playing ? ("show" as const) : ("hidden" as const),
    },
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.06,
          delayChildren: reduce ? 0 : 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 4 },
      show: {
        opacity: 1,
        y: 0,
        transition: t.enter,
      },
    },
    fade: {
      initial: { opacity: reduce ? 1 : 0 },
      animate: { opacity: playing ? 1 : reduce ? 1 : 0 },
      transition: t.fade,
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

function ComlabsMark({ size = 13 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[4px] text-white shadow-[0_1px_4px_rgba(192,132,252,0.35)]"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(145deg, #C084FC 0%, #F472B6 100%)",
      }}
    >
      <IconSparkle size={Math.round(size * 0.62)} />
    </span>
  );
}

type PipelineStep = {
  label: string;
  comlabs?: boolean;
  mark?: PlatformMark;
  icon?: string;
  nucleo?: ComponentType<NucleoProps>;
};

const COMLABS_PIPELINE_STEPS: PipelineStep[] = [
  { label: "comlabs launch flow", comlabs: true },
  { label: "connecting Gmail", icon: "/icons/brands/gmail.png" },
  { label: "configuring Claude", icon: "/icons/brands/claude-ai.png" },
  { label: "adding ChatGPT tools", icon: "/icons/brands/chatgpt.png" },
  { label: "comlabs model is running", nucleo: IconSend },
];

function PipelineStepIcon({ step, size = 13 }: { step: PipelineStep; size?: number }) {
  if (step.comlabs) return <ComlabsMark size={size} />;
  if (step.icon) {
    return (
      <Image
        src={step.icon}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-[3px] object-contain"
        style={{ width: size, height: size }}
      aria-hidden
      />
    );
  }
  if (step.mark) {
    const Mark = step.mark;
    return <Mark size={size} />;
  }
  if (step.nucleo) {
    const Icon = step.nucleo;
    return (
      <span className="flex shrink-0 items-center justify-center" style={{ color: mock.strong }}>
        <Icon size={size} strokeWidth={1.1} />
      </span>
    );
  }
  return null;
}

const LIVE_ACTIVITY = [
  { icon: "/icons/brands/gmail.png", text: "Lead captured from form" },
  { icon: "/icons/brands/claude-ai.png", text: "Follow-up drafted" },
  { icon: "/icons/brands/chatgpt.png", text: "FAQ answer generated" },
] as const;

const LIVE_INTEGRATIONS = [
  { name: "Gmail", icon: "/icons/brands/gmail.png", bg: "#FEF2F2" },
  { name: "Claude", icon: "/icons/brands/claude-ai.png", bg: "#FFF7ED" },
  { name: "ChatGPT", icon: "/icons/brands/chatgpt.png", bg: "#F0FDF4" },
] as const;

function useComlabsPipelineSequence(active: boolean, reduce: boolean, cycle: number) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [showLiveBar, setShowLiveBar] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisibleRows(0);
      setShowLiveBar(false);
      setShowBadges(false);
      setVisibleEvents(0);
      return;
    }

    if (reduce) {
      setVisibleRows(COMLABS_PIPELINE_STEPS.length);
      setShowLiveBar(true);
      setShowBadges(true);
      setVisibleEvents(LIVE_ACTIVITY.length);
      return;
    }

    setVisibleRows(0);
    setShowLiveBar(false);
    setShowBadges(false);
    setVisibleEvents(0);

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      timers.add(setTimeout(fn, ms));
    };

    const rowCount = COMLABS_PIPELINE_STEPS.length;
    const rowsDoneMs = (rowCount - 1) * 40 + 200;
    const barMs = rowsDoneMs + 80;
    const badgesMs = barMs + 300;
    const eventStartMs = badgesMs + 120;

    for (let i = 0; i < rowCount; i += 1) {
      later(() => setVisibleRows(i + 1), i * 40);
    }

    later(() => setShowLiveBar(true), barMs);
    later(() => setShowBadges(true), badgesMs);

    LIVE_ACTIVITY.forEach((_, index) => {
      later(() => setVisibleEvents(index + 1), eventStartMs + index * 600);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, reduce, cycle]);

  return { visibleRows, showLiveBar, showBadges, visibleEvents };
}

/** ai-automation — Comlabs Flow card prototype (replaced by terminal pipeline) */
/*
function IconFlowSparkle({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)} fill="currentColor" stroke="none">
      <path d="M12 2l1.4 4.8L18 8l-4.6 1.2L12 14l-1.4-4.8L6 8l4.6-1.2L12 2z" />
      <path d="M18 14l.8 2.8 2.8.8-2.8.8L18 21l-.8-2.8-2.8-.8 2.8-.8L18 14z" opacity="0.85" />
    </svg>
  );
}

function IconCalendarEdit({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16M11 14h2" />
    </svg>
  );
}

function IconCalendar({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function IconFileLines({ size = 14, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M8 4h8l4 4v12H8z" />
      <path d="M16 4v4h4M10 13h6M10 16h4" />
    </svg>
  );
}

function IconChevronDown({ size = 10, ...props }: NucleoProps) {
  return (
    <svg {...nucleoBase(size, props)}>
      <path d="M6 8l6 6 6-6" />
    </svg>
  );
}

type FlowTaskStatus = "hidden" | "scheduled" | "running" | "completed";

type FlowTask = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<NucleoProps>;
  iconBg: string;
  iconColor: string;
};

const FLOW_TASKS: FlowTask[] = [
  {
    id: "draft",
    title: "Draft follow-up",
    description: "Create personalized follow-up email",
    icon: IconCalendarEdit,
    iconBg: "#FFF7ED",
    iconColor: "#EA580C",
  },
  {
    id: "schedule",
    title: "Schedule call",
    description: "Find best time and send invite",
    icon: IconCalendar,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
  },
  {
    id: "summarize",
    title: "Summarize meeting",
    description: "Extract key points and next steps",
    icon: IconFileLines,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    id: "send",
    title: "Send update",
    description: "Send summary to stakeholders",
    icon: IconSend,
    iconBg: "#ECFDF5",
    iconColor: "#059669",
  },
];

const FLOW_TIMELINE = [
  { label: "Scheduled", time: "9:00 AM" },
  { label: "Running", time: "9:02 AM" },
  { label: "Review", time: "9:10 AM" },
  { label: "Completed", time: "9:15 AM" },
] as const;

function useAutomationFlowSequence(active: boolean, reduce: boolean) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState<FlowTaskStatus[]>(
    () => FLOW_TASKS.map(() => "hidden" as FlowTaskStatus),
  );
  const [timelineStep, setTimelineStep] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      setTaskStatuses(FLOW_TASKS.map(() => "hidden"));
      setTimelineStep(0);
      setShowHeader(false);
      setShowTimeline(false);
      return;
    }

    if (reduce) {
      setShowHeader(true);
      setVisibleCount(FLOW_TASKS.length);
      setTaskStatuses(FLOW_TASKS.map(() => "completed"));
      setTimelineStep(FLOW_TIMELINE.length);
      setShowTimeline(true);
      return;
    }

    setShowHeader(true);
    setVisibleCount(0);
    setTaskStatuses(FLOW_TASKS.map(() => "hidden"));
    setTimelineStep(0);
    setShowTimeline(false);

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    let dropIndex = 0;
    const dropNext = () => {
      if (dropIndex >= FLOW_TASKS.length) {
        later(runTask, 420);
        return;
      }

      const index = dropIndex;
      dropIndex += 1;

      setVisibleCount(dropIndex);
      setTaskStatuses((prev) => {
        const next = [...prev];
        next[index] = "scheduled";
        return next;
      });

      later(dropNext, 220);
    };

    let taskIndex = 0;

    const runTask = () => {
      if (taskIndex >= FLOW_TASKS.length) return;

      const index = taskIndex;
      setTimelineStep(index + 1);
      setShowTimeline(true);

      setTaskStatuses((prev) => {
        const next = [...prev];
        next[index] = "running";
        return next;
      });

      later(() => {
        setTaskStatuses((prev) => {
          const next = [...prev];
          next[index] = "completed";
          return next;
        });
        setTimelineStep(index + 2);

        taskIndex += 1;
        later(runTask, 340);
      }, 2000);
    };

    later(dropNext, 280);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active, reduce]);

  return { visibleCount, taskStatuses, timelineStep, showHeader, showTimeline };
}

function FlowStatusBadge({
  status,
  reduce,
  isRunning,
}: {
  status: Exclude<FlowTaskStatus, "hidden">;
  reduce: boolean;
  isRunning: boolean;
}) {
  const styles = {
    scheduled: {
      label: "Scheduled",
      bg: "#FFF7ED",
      color: "#C2410C",
      dot: "#F97316",
      border: "#FFEDD5",
    },
    running: {
      label: "Running",
      bg: "#FEF9C3",
      color: "#A16207",
      dot: "#EAB308",
      border: "#FEF08A",
    },
    completed: {
      label: "Completed",
      bg: "#ECFDF5",
      color: "#047857",
      dot: "#10B981",
      border: "#D1FAE5",
    },
  } as const;

  const style = styles[status];

  return (
    <motion.span
      layout
      className="inline-flex h-[18px] min-w-[58px] items-center justify-center gap-1 rounded-full border px-1.5 text-[7px] font-medium leading-none tracking-tight"
      style={{
        backgroundColor: style.bg,
        color: style.color,
        borderColor: style.border,
      }}
      animate={
        isRunning && !reduce
          ? {
              boxShadow: [
                "0 0 0 0 rgba(234,179,8,0)",
                "0 0 0 3px rgba(234,179,8,0.14)",
                "0 0 0 0 rgba(234,179,8,0)",
              ],
            }
          : { boxShadow: "0 0 0 0 transparent" }
      }
      transition={{ duration: 1.4, repeat: isRunning && !reduce ? Infinity : 0, ease: "easeInOut" }}
    >
      {status === "completed" ? (
        <span className="flex size-2.5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white">
          <IconCheck size={6} strokeWidth={2.75} />
    </span>
      ) : (
        <span className="size-1 shrink-0 rounded-full" style={{ backgroundColor: style.dot }} aria-hidden />
      )}
      {style.label}
    </motion.span>
  );
}

function FlowConnector({ visible }: { visible: boolean }) {
  if (!visible) return <div className="h-2" aria-hidden />;

  return (
    <div className="flex flex-col items-center py-px" aria-hidden>
      <div className="h-1 w-px bg-zinc-200/80" />
      <IconChevronDown size={6} className="text-zinc-300/90" />
    </div>
  );
}

function WorkflowFlank({
  src,
  alt,
  side,
  visible,
  reduce,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
  visible: boolean;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: side === "left" ? -6 : 6 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -6 : 6 }}
      transition={{ duration: 0.42, ease, delay: visible && !reduce ? 0.12 : 0 }}
      className={cn(
        "pointer-events-none relative z-0 hidden w-[26%] max-w-[88px] shrink-0 self-center sm:block",
        side === "left" ? "-mr-4" : "-ml-4",
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={280}
        height={320}
        className="h-auto w-full object-contain object-center drop-shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
        aria-hidden
      />
    </motion.div>
  );
}

function FlowPrototypeCard({
  reduce,
  playing,
}: {
  reduce: boolean;
  playing: boolean;
}) {
  const { taskStatuses, timelineStep, showHeader, showTimeline } = useAutomationFlowSequence(
    playing,
    reduce,
  );

  const timelineProgress = Math.min(Math.max(timelineStep - 1, 0), FLOW_TIMELINE.length - 1);

  return (
    <MockFrame className="relative z-[1] min-w-0 flex-1 p-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <AnimatePresence>
        {showHeader ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease }}
            className="flex items-center justify-between gap-2.5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-[9px] text-white shadow-[0_2px_6px_rgba(192,132,252,0.32)]"
                style={{
                  background: "linear-gradient(145deg, #C084FC 0%, #F472B6 100%)",
                }}
              >
                <IconFlowSparkle size={12} />
              </span>
        <div className="min-w-0">
                <p
                  className="text-[10px] font-medium leading-none tracking-tight"
                  style={{ color: mock.strong }}
                >
                  Comlabs Flow
                </p>
                <p className="mt-0.5 text-[7px] font-normal leading-none" style={{ color: mock.subtle }}>
                  AI automation run
          </p>
        </div>
            </div>

            <span className="inline-flex h-[16px] shrink-0 items-center gap-1 rounded-full border border-[#D1FAE5] bg-[#ECFDF5] px-1.5 text-[6.5px] font-medium leading-none tracking-tight text-[#047857]">
              <span className="size-1 rounded-full bg-[#10B981]" aria-hidden />
              Active
        </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-2.5">
        {FLOW_TASKS.map((task, index) => {
          const status = taskStatuses[index];
          const visible = status !== "hidden";
          const Icon = task.icon;
          const isRunning = status === "running";
          const showConnector =
            index < FLOW_TASKS.length - 1 && visible && taskStatuses[index + 1] !== "hidden";

          return (
            <div key={task.id}>
              <AnimatePresence>
                {visible ? (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={T_ENTER}
                    className={cn(
                      "relative grid grid-cols-[24px_minmax(0,1fr)_56px] items-center gap-2 rounded-[10px] border bg-white px-2 py-1.5",
                      "shadow-[0_1px_1px_rgba(0,0,0,0.02)]",
                    )}
                    style={{
                      borderColor: isRunning ? "#FDE68A" : mock.border,
                    }}
                  >
                    {isRunning && !reduce ? (
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-[10px]"
                        animate={{ opacity: [0.08, 0.18, 0.08] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ backgroundColor: "#FEF9C3" }}
                        aria-hidden
                      />
                    ) : null}

                    <span
                      className="relative flex size-6 shrink-0 items-center justify-center rounded-[8px] border border-white/80"
                      style={{ backgroundColor: task.iconBg, color: task.iconColor }}
                    >
                      <Icon size={11} strokeWidth={1.15} />
                    </span>

                    <div className="relative min-w-0">
                      <p
                        className="truncate text-[8.5px] font-medium leading-tight tracking-tight"
                        style={{ color: mock.strong }}
                      >
                        {task.title}
                      </p>
                      <p
                        className="mt-px line-clamp-2 text-[6.5px] font-normal leading-[1.3]"
                        style={{ color: mock.subtle }}
                      >
                        {task.description}
                      </p>
      </div>

                    <div className="relative flex items-center justify-end">
                      <FlowStatusBadge status={status} reduce={reduce} isRunning={isRunning} />
          </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <FlowConnector visible={showConnector} />
        </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showTimeline ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease }}
            className="mt-3 border-t pt-2.5"
            style={{ borderColor: mock.border }}
          >
            <div className="relative">
              <div
                className="absolute top-[9px] right-[12.5%] left-[12.5%] h-px bg-zinc-100"
                aria-hidden
              />
              <motion.div
                className="absolute top-[9px] left-[12.5%] h-px origin-left bg-gradient-to-r from-[#FDBA74] via-[#60A5FA] to-[#34D399]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: timelineProgress / (FLOW_TIMELINE.length - 1) }}
                transition={{ duration: 0.45, ease }}
                style={{ width: "75%" }}
                aria-hidden
              />

              <div className="grid grid-cols-4">
                {FLOW_TIMELINE.map((step, index) => {
                  const stepNumber = index + 1;
                  const isComplete = timelineStep > stepNumber;
                  const isActive = timelineStep === stepNumber;

                  const circleBg = isComplete
                    ? "#FFEDD5"
                    : isActive
                      ? "#2563EB"
                      : "#F4F4F5";
                  const circleColor = isComplete
                    ? "#EA580C"
                    : isActive
                      ? "#FFFFFF"
                      : "#A1A1AA";
                  const labelColor = isComplete || isActive ? mock.strong : mock.subtle;

                  return (
                    <div key={step.label} className="flex flex-col items-center px-0.5 text-center">
                      <motion.span
                        className="relative z-[1] flex size-[18px] items-center justify-center rounded-full text-[7px] font-medium tabular-nums"
                        style={{ backgroundColor: circleBg, color: circleColor }}
                        animate={
                          isActive && !reduce
                            ? {
                                boxShadow: [
                                  "0 0 0 0 rgba(37,99,235,0.35)",
                                  "0 0 0 4px rgba(37,99,235,0.1)",
                                  "0 0 0 0 rgba(37,99,235,0.35)",
                                ],
                              }
                            : { boxShadow: "0 0 0 0 transparent" }
                        }
                        transition={{
                          duration: 1.5,
                          repeat: isActive && !reduce ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      >
                        {isComplete ? (
                          <IconCheck size={8} strokeWidth={2.5} style={{ color: "#EA580C" }} />
                        ) : (
                          stepNumber
                        )}
                      </motion.span>
                      <p
                        className="mt-1.5 w-full truncate text-[6.5px] font-medium leading-none tracking-tight"
                        style={{ color: labelColor }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="mt-0.5 text-[6px] font-normal leading-none tabular-nums"
                        style={{ color: mock.subtle }}
                      >
                        {step.time}
      </p>
    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </MockFrame>
  );
}
*/

/** ai-automation — Comlabs model pipeline terminal */
export function AutomationFlowMockup({ active = false }: MockupProps) {
  const reduce = !!useReducedMotion();
  const { cycle, playing } = useDemoLoop(active, reduce, 4200);
  const { visibleRows, showLiveBar, showBadges, visibleEvents } = useComlabsPipelineSequence(
    playing,
    reduce,
    cycle,
  );

  const taskRow = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 0.2, ease: easeOut },
    },
  };

  const eventItem = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.16, ease: easeOut },
    },
  };

  return (
    <MockupDemoShell active={playing} reduce={reduce} className="w-full self-start">
      <div
        className={cn(
          mockFont,
          "flex w-full flex-col rounded-xl bg-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="relative z-[100] shrink-0 rounded-t-xl border-b border-zinc-200/70 bg-[#F2F2F2] px-3.5 py-2.5 md:px-4">
          <WindowDots />
        </div>

        <div className="flex flex-col px-3.5 pb-3.5 pt-3 md:px-4 md:pb-4">
          <ul className="space-y-3.5">
            {COMLABS_PIPELINE_STEPS.map((step, index) => {
              const visible = index < visibleRows;
              const showDot = visible;

              return (
                <motion.li
                  key={`${step.label}-${cycle}`}
                  variants={taskRow}
                  initial="hidden"
                  animate={visible ? "show" : "hidden"}
                  className="mb-2 flex items-center gap-3"
                >
                  <span className="flex size-[18px] shrink-0 items-center justify-center">
                    <PipelineStepIcon step={step} size={15} />
                  </span>

                  <span
                    className="text-[12px] font-normal leading-none tracking-tight md:text-[13px]"
                    style={{ color: visible ? mock.strong : mock.subtle }}
                  >
                    {step.label}
                  </span>

                  {showDot ? (
                    <motion.span
                      className={cn("ml-auto size-1.5 shrink-0 rounded-full bg-emerald-500", GPU)}
                      initial={reduce ? false : { scale: 1, opacity: 1 }}
                      animate={
                        playing && !reduce
                          ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{
                        duration: 1.4,
                        repeat: playing && !reduce ? Infinity : 0,
                        ease: "linear",
                        delay: reduce ? 0 : index * 0.22,
                      }}
                    />
                  ) : null}
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-4 shrink-0 border-t pt-3" style={{ borderColor: mock.border }}>
            <ClipReveal show={showLiveBar} reduce={reduce} duration={0.3}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D1FAE5] bg-[#ECFDF5] px-2 py-1 text-[9px] font-medium leading-none tracking-tight text-[#047857] md:text-[10px]">
                <motion.span
                  className="size-1.5 rounded-full bg-emerald-500"
                  animate={
                    playing && !reduce ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }
                  }
                  transition={{ duration: 1.6, repeat: playing && !reduce ? Infinity : 0, ease: "easeInOut" }}
                />
                Automation live
              </span>
            </ClipReveal>

            {showBadges ? (
              <div className="mt-2 flex items-center gap-1">
                {LIVE_INTEGRATIONS.map((tool, index) => (
                  <motion.span
                    key={`${tool.name}-${cycle}`}
                    className="flex items-center gap-1 rounded-full border px-1.5 py-0.5"
                    style={{ borderColor: mock.border, backgroundColor: tool.bg }}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : index * 0.02, ease: easeOut }}
                  >
                    <Image
                      src={tool.icon}
                      alt=""
                      width={11}
                      height={11}
                      className="size-[11px] shrink-0 object-contain"
                      aria-hidden
                    />
                    <span
                      className="text-[8px] font-medium leading-none tracking-tight"
                      style={{ color: mock.default }}
                    >
                      {tool.name}
                    </span>
                  </motion.span>
                ))}
              </div>
            ) : null}

            <ul className="mb-2 mt-2.5 space-y-1.5">
              {LIVE_ACTIVITY.map((entry, index) => {
                const visible = index < visibleEvents;
                return (
                  <motion.li
                    key={`${entry.text}-${cycle}`}
                    variants={eventItem}
                    initial="hidden"
                    animate={visible ? "show" : "hidden"}
                    className="flex items-center gap-2 rounded-md px-1 py-1.5"
                    style={{ backgroundColor: mock.bgSelected }}
                  >
                    <Image
                      src={entry.icon}
                      alt=""
                      width={12}
                      height={12}
                      className="size-3 shrink-0 object-contain"
                      aria-hidden
                    />
                    <span
                      className="min-w-0 flex-1 truncate text-[9px] font-normal leading-none tracking-tight md:text-[10px]"
                      style={{ color: mock.default }}
                    >
                      {entry.text}
                    </span>
                    <span
                      className="shrink-0 text-[8px] font-normal tabular-nums"
                      style={{ color: mock.subtle }}
                    >
                      just now
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </MockupDemoShell>
  );
}

/** ai-automation — openclaw setup terminal (reference) */
/*
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
*/

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

function TypingCaret({
  visible,
  reduce,
  className,
}: {
  visible: boolean;
  reduce: boolean;
  className?: string;
}) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (!visible) {
      setShow(false);
      return;
    }
    if (reduce) {
      setShow(false);
      return;
    }
    setShow(true);
    const timer = setTimeout(() => setShow(false), 530 * 3);
    return () => clearTimeout(timer);
  }, [visible, reduce]);

  if (!show) return null;

  return (
    <motion.span
      className={cn("ml-px inline-block h-2 w-px align-middle bg-zinc-400", className)}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.53, repeat: 2, ease: "linear" }}
      aria-hidden
    />
  );
}

const SEO_QUERY = "AI content strategy for SaaS brands";
const SEO_HEADLINE = "How SaaS Brands Win with AI Content";
const SEO_EXCERPT =
  "A practical playbook for SaaS teams to plan, create, and optimize content that ranks on Google and gets cited by AI answer engines.";

const SEO_SEQUENCE_MS = 5600;
const SEO_HEADLINE_MAX = 60;

type SeoSequencePhase = "idle" | "headline" | "excerpt" | "visibility" | "done";

function useSeoMockupSequence(active: boolean, reduce: boolean, cycle: number) {
  const [phase, setPhase] = useState<SeoSequencePhase>("idle");
  const [showOptimizedBadge, setShowOptimizedBadge] = useState(false);
  const [headlineText, setHeadlineText] = useState("");
  const [isTypingHeadline, setIsTypingHeadline] = useState(false);

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setShowOptimizedBadge(false);
      setHeadlineText("");
      setIsTypingHeadline(false);
      return;
    }

    if (reduce) {
      setPhase("done");
      setShowOptimizedBadge(true);
      setHeadlineText(SEO_HEADLINE);
      setIsTypingHeadline(false);
      return;
    }

    setPhase("idle");
    setShowOptimizedBadge(false);
    setHeadlineText("");
    setIsTypingHeadline(false);

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

    later(() => {
      setShowOptimizedBadge(true);
      setPhase("headline");
      setIsTypingHeadline(true);
      typeText(SEO_HEADLINE, setHeadlineText, 28, () => {
        setIsTypingHeadline(false);
        later(() => {
          setPhase("excerpt");
          later(() => {
            setPhase("visibility");
            later(() => setPhase("done"), 400);
          }, 200);
        }, 80);
      });
    }, 400);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [active, reduce, cycle]);

  return {
    phase,
    headlineText,
    showOptimizedBadge,
    showExcerpt: ["excerpt", "visibility", "done"].includes(phase),
    showVisibility: ["visibility", "done"].includes(phase),
    isTypingHeadline,
    showHeadline: phase !== "idle",
  };
}

/** maintenance — copywriting & SEO content optimizer */
export function CopywritingSeoMockup({ active = false }: MockupProps) {
  const reduce = !!useReducedMotion();
  const { cycle, playing } = useDemoLoop(active, reduce, SEO_SEQUENCE_MS);
  const {
    headlineText,
    showOptimizedBadge,
    showExcerpt,
    showVisibility,
    isTypingHeadline,
    showHeadline,
  } = useSeoMockupSequence(playing, reduce, cycle);

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
        staggerChildren: reduce ? 0 : 0.03,
      },
    },
  };

  const platformCard = {
    hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduce ? { duration: 0 } : SPRING_BADGE,
    },
  };

  return (
    <MockupDemoShell active={playing} reduce={reduce} className="w-full">
      <MockFrame className="-mt-5 min-h-96 p-3">
        <div key={`seo-${cycle}`}>
          <div className="flex items-start justify-between gap-2">
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

            <ClipReveal show={showOptimizedBadge} reduce={reduce} duration={0.24}>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-medium transition-colors duration-200",
                  showOptimizedBadge
                    ? "bg-[#ECFDF5] text-[#059669]"
                    : "bg-zinc-100 text-zinc-500",
                )}
              >
                <IconCheck size={9} />
                Optimized
              </span>
            </ClipReveal>
          </div>

          <div className="mt-2.5">
            <p className="text-[8px] font-normal" style={{ color: mock.subtle }}>
              Topic / Query
            </p>
            <div
              className="mt-1 flex items-center gap-1.5 rounded-lg border px-2 py-1.5"
              style={{ borderColor: mock.border, backgroundColor: "#FAFAFA" }}
            >
              <IconSearch size={11} style={{ color: mock.subtle }} />
              <span className="truncate text-[9px] font-normal" style={{ color: mock.strong }}>
                {playing ? SEO_QUERY : ""}
              </span>
            </div>
          </div>

          {showHeadline ? (
            <div className="mt-2.5">
              <p className="text-[8px] font-normal" style={{ color: mock.subtle }}>
                Headline
              </p>
              <div
                className="mt-1 rounded-xl border p-2"
                style={{ borderColor: mock.border, backgroundColor: "#FAFAFA" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[10px] font-medium leading-snug tracking-tight" style={{ color: mock.strong }}>
                    {headlineText}
                    <TypingCaret visible={isTypingHeadline} reduce={reduce} />
                  </p>
                  <span className="shrink-0 text-[8px] tabular-nums" style={{ color: mock.subtle }}>
                    {headlineText.length} / {SEO_HEADLINE_MAX}
                  </span>
                </div>

                {showExcerpt ? (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.2, ease: easeOut }}
                    className="mt-2"
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
              </div>
            </div>
          ) : null}

          {showVisibility ? (
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: easeOut }}
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
                    key={`${platform.name}-${cycle}`}
                    variants={platformCard}
                    className="rounded-lg border px-1.5 py-1.5"
                    style={{ borderColor: mock.border, backgroundColor: platform.bg }}
                  >
                    <div className="flex items-center gap-1">
                      <PlatformBrandIcon platform={platform} size={11} />
                      <span className="text-[8px] font-medium" style={{ color: mock.strong }}>
                        {platform.name}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-0.5 text-[7px] font-medium text-[#059669]">
                      <motion.span
                        className={GPU}
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={reduce ? { duration: 0 } : SPRING_CHECK_SM}
                      >
                        <IconCheck size={8} />
                      </motion.span>
                      <span>{platform.status}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </MockFrame>
    </MockupDemoShell>
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
  const { container, item, reduce, playing, reveal, t } = useMockMotion(active);
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
            className={cn("text-[24px] font-medium tabular-nums tracking-tight", GPU)}
            style={{ color: mock.strong }}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={playing ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ ...t.enter, delay: playing && !reduce ? 0.2 : 0 }}
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
              transition={{ ...T_ENTER, delay: playing && !reduce ? 0.3 + i * 0.05 : 0 }}
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
      return <AutomationFlowMockup active={active} />;
    case "maintenance":
      return <CopywritingSeoMockup active={active} />;
    case "growth-cro":
      return <GrowthCroMockup active={active} />;
    case "saas":
      // return <SaaSMockup active={active} />;
      return null;
    case "sap":
      // return <SapMockup active={active} />;
      return <AutomationFlowMockup active={active} />;
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
