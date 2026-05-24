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

type PipelineStepState = "pending" | "active" | "completed";

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

function useComlabsPipelineSequence(active: boolean, reduce: boolean) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showChecks, setShowChecks] = useState(false);
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    if (!active) {
      setActiveIndex(-1);
      setShowChecks(false);
      setShowLive(false);
      return;
    }

    if (reduce) {
      setActiveIndex(COMLABS_PIPELINE_STEPS.length - 1);
      setShowChecks(true);
      setShowLive(true);
      return;
    }

    setActiveIndex(-1);
    setShowChecks(false);
    setShowLive(false);

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      timers.add(setTimeout(fn, ms));
    };

    const START_MS = 500;
    const STEP_MS = 500;
    const FINAL_MS = 900;
    const LIVE_MS = 900;

    let step = 0;

    const advance = () => {
      setActiveIndex(step);

      if (step >= COMLABS_PIPELINE_STEPS.length - 1) {
        later(() => {
          setShowChecks(true);
          later(() => setShowLive(true), LIVE_MS);
        }, FINAL_MS);
        return;
      }

      step += 1;
      later(advance, STEP_MS);
    };

    later(advance, START_MS);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, reduce]);

  const getStepState = (index: number): PipelineStepState => {
    if (activeIndex < 0) return "pending";
    if (showChecks) return "completed";
    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "active";
    return "pending";
  };

  return { getStepState, showChecks, showLive };
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
                    transition={{ type: "spring", stiffness: 480, damping: 30 }}
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
  const { container, item, reduce, playing } = useMockMotion(active);
  const { getStepState, showChecks, showLive } = useComlabsPipelineSequence(playing, reduce);

  const activityContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.22,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const activityItem = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 0.36, ease },
    },
  };

  return (
    <motion.div
      aria-hidden
      className={cn(
        mockFont,
        "flex w-full flex-col self-start mt-2 min-h-84 rounded-xl bg-white",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.06)]",
      )}
      initial={false}
      animate={{
        height: playing ? "100%" : "auto",
        maxHeight: playing ? "100%" : "12.75rem",
      }}
      transition={{ duration: reduce ? 0 : 0.62, ease }}
    >
      <div className="relative rounded-t-xl z-[100] shrink-0 border-b border-zinc-200/70 bg-[#F2F2F2] px-3.5 py-2.5 md:px-4">
        <WindowDots />
        </div>

      <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-3 md:px-4 md:pb-4">
        <div className={cn("shrink-0", playing && "flex flex-1 flex-col")}>
          <motion.ul
            className="space-y-3.5"
            variants={container}
            initial="hidden"
            animate={playing ? "show" : "hidden"}
          >
          {COMLABS_PIPELINE_STEPS.map((step, index) => {
            const state = getStepState(index);
            const isActive = state === "active";
            const isPending = state === "pending";

            return (
              <motion.li key={step.label} variants={item} className="flex items-center gap-3 mb-2">
                <span className="relative flex size-[18px] shrink-0 items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {showChecks ? (
                      <motion.span
                        key="check"
                        initial={reduce ? false : { scale: 0.55, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 24,
                          delay: reduce ? 0 : index * 0.14,
                        }}
                        style={{ color: mock.strong }}
                      >
                        <IconCheck size={14} strokeWidth={2.25} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={false}
                        animate={{
                          opacity: isPending ? 0.42 : 1,
                          scale: isActive && !reduce ? [1, 1.06, 1] : 1,
                        }}
                        transition={{
                          opacity: { duration: 0.28, ease },
                          scale: {
                            duration: 1.6,
                            repeat: isActive && !reduce ? Infinity : 0,
                            ease: "easeInOut",
                          },
                        }}
                        className="flex items-center justify-center"
                      >
                        <PipelineStepIcon step={step} size={15} />
                      </motion.span>
                    )}
                  </AnimatePresence>
        </span>

                <span
                  className="text-[12px] font-normal leading-none tracking-tight md:text-[13px]"
                  style={{ color: isPending ? mock.subtle : mock.strong }}
                >
                  {step.label}
                  {isActive ? (
                    <motion.span
                      className="inline-flex w-4"
                      animate={playing && !reduce ? { opacity: [0.25, 1, 0.25] } : { opacity: 1 }}
                      transition={{
                        duration: 1.35,
                        repeat: playing && !reduce ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    >
                      …
                    </motion.span>
                  ) : null}
                </span>

                {isActive ? (
                  <motion.span
                    className="ml-auto size-1.5 shrink-0 rounded-full bg-emerald-500"
                    animate={
                      playing && !reduce
                        ? { opacity: [0.35, 1, 0.35], scale: [0.9, 1.12, 0.9] }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: playing && !reduce ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                ) : showChecks ? (
                  <motion.span
                    className="ml-auto size-1.5 shrink-0 rounded-full bg-emerald-500/80"
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 22,
                      delay: reduce ? 0 : index * 0.14 + 0.08,
                    }}
                  />
                ) : null}
              </motion.li>
            );
          })}
          </motion.ul>
      </div>

      <AnimatePresence>
        {showLive ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.42, ease }}
            className="mt-auto shrink-0 border-t pt-3"
            style={{ borderColor: mock.border }}
          >
            <div className="flex items-center justify-between gap-2">
              <motion.span
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D1FAE5] bg-[#ECFDF5] px-2 py-1 text-[9px] font-medium leading-none tracking-tight text-[#047857] md:text-[10px]"
                initial={reduce ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 440, damping: 26, delay: reduce ? 0 : 0.05 }}
              >
                <motion.span
                  className="size-1.5 rounded-full bg-emerald-500"
                  animate={
                    playing && !reduce
                      ? { opacity: [0.45, 1, 0.45], scale: [0.92, 1.08, 0.92] }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 1.6, repeat: playing && !reduce ? Infinity : 0, ease: "easeInOut" }}
                />
                Automation live
              </motion.span>

              <div className="flex items-center gap-1">
                {LIVE_INTEGRATIONS.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className="flex items-center gap-1 rounded-full border px-1.5 py-0.5"
                    style={{ borderColor: mock.border, backgroundColor: tool.bg }}
                    initial={reduce ? false : { scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 24,
                      delay: reduce ? 0 : 0.12 + index * 0.1,
                    }}
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
    </div>

            <motion.ul
              className="mt-2.5 mb-2 space-y-1.5"
              variants={activityContainer}
              initial="hidden"
              animate="show"
            >
              {LIVE_ACTIVITY.map((entry) => (
                <motion.li
                  key={entry.text}
                  variants={activityItem}
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
                  <motion.span
                    className="shrink-0 text-[8px] font-normal tabular-nums"
                    style={{ color: mock.subtle }}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.28, delay: reduce ? 0 : 0.18 }}
                  >
                    just now
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="relative mt-2.5 h-1 overflow-hidden rounded-full"
              style={{ backgroundColor: mock.border }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: reduce ? 0 : 0.35 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#C084FC] via-[#60A5FA] to-[#34D399]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0 : 1.1, ease, delay: reduce ? 0 : 0.45 }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </motion.div>
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

const LANDING_BLUEPRINT_SECTIONS = [
  { title: "Hero", label: "Clear offer + CTA" },
  { title: "Problem", label: "Pain and urgency" },
  { title: "Proof", label: "Logos, testimonials, results" },
  { title: "Pricing", label: "Simple package decision" },
  { title: "FAQ", label: "Objections answered" },
  { title: "Final CTA", label: "Book consultation" },
] as const;

const LANDING_READINESS_ITEMS = [
  "Offer clarity",
  "CTA path",
  "Trust proof",
  "Pricing logic",
  "FAQ coverage",
  "Form connected",
] as const;

const LANDING_START_MS = 180;
const READINESS_SCAN_MS = 340;
const LANDING_STEP_GAP_MS = 70;
const SCANNED_HOLD_MS = 520;

type ReadinessFooterPhase = "idle" | "scanning" | "scanned" | "ready";

function useLandingBlueprintSequence(active: boolean, reduce: boolean) {
  const [activeSection, setActiveSection] = useState(-1);
  const [checkedCount, setCheckedCount] = useState(0);
  const [scanningIndex, setScanningIndex] = useState(-1);
  const [footerPhase, setFooterPhase] = useState<ReadinessFooterPhase>("idle");

  useEffect(() => {
    if (!active) {
      setActiveSection(-1);
      setCheckedCount(0);
      setScanningIndex(-1);
      setFooterPhase("idle");
      return;
    }

    if (reduce) {
      setActiveSection(LANDING_BLUEPRINT_SECTIONS.length - 1);
      setCheckedCount(LANDING_READINESS_ITEMS.length);
      setScanningIndex(-1);
      setFooterPhase("ready");
      return;
    }

    setActiveSection(-1);
    setCheckedCount(0);
    setScanningIndex(-1);
    setFooterPhase("idle");

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      timers.add(setTimeout(fn, ms));
    };

    const runStep = (step: number) => {
      setFooterPhase("scanning");
      setActiveSection(step);
      setScanningIndex(step);

      later(() => {
        setCheckedCount(step + 1);
        setScanningIndex(-1);

        if (step >= LANDING_BLUEPRINT_SECTIONS.length - 1) {
          later(() => {
            setFooterPhase("scanned");
            later(() => setFooterPhase("ready"), SCANNED_HOLD_MS);
          }, 80);
          return;
        }

        later(() => runStep(step + 1), LANDING_STEP_GAP_MS);
      }, READINESS_SCAN_MS);
    };

    later(() => runStep(0), LANDING_START_MS);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, reduce]);

  return { activeSection, checkedCount, scanningIndex, footerPhase };
}

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
      transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}

/** landing-sprint — landing page blueprint + launch readiness */
export function LandingMockup({ active = false }: MockupProps) {
  const reduce = !!useReducedMotion();
  const playing = active || reduce;
  const { activeSection, checkedCount, scanningIndex, footerPhase } = useLandingBlueprintSequence(
    active,
    reduce,
  );

  const showLive = footerPhase === "ready";
  const itemCount = LANDING_READINESS_ITEMS.length;

  return (
    <MockFrame className="flex h-full flex-col overflow-hidden bg-zinc-50/40 p-3" interactive>
      {/* Browser chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200/80 pb-2">
        <WindowDots />
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1">
          <span className="size-1.5 shrink-0 rounded-full bg-zinc-300" aria-hidden />
          <span className="truncate text-[10px] font-normal text-zinc-500">
            launch.yourstartup.com
          </span>
          <AnimatePresence>
            {showLive ? (
              <motion.span
                key="live"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700"
              >
                <span className="size-1 rounded-full bg-emerald-500" aria-hidden />
                Live
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={playing ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease }}
        className="mt-2.5 flex min-h-0 flex-1 flex-col gap-3 md:flex-row md:gap-0"
      >
        {/* Blueprint — stacked page sections */}
        <div className="min-w-0 flex-1 md:pr-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
            Page structure
          </p>

          <div className="mt-1.5 space-y-1">
            {LANDING_BLUEPRINT_SECTIONS.map((section, index) => {
              const isActive = index === activeSection;
              const isDone = index < activeSection;
              const isPending = index > activeSection;

              return (
                <motion.div
                  key={section.title}
                  initial={reduce ? false : { opacity: 0, y: 3 }}
                  animate={{
                    opacity: playing ? 1 : 0,
                    y: playing ? 0 : 3,
                    borderColor: isActive ? "#BFDBFE" : isDone ? "#E4E4E7" : "#F4F4F5",
                    backgroundColor: isActive ? "#F8FAFC" : isDone ? "#FAFAFA" : "#FFFFFF",
                  }}
                  transition={{
                    opacity: { duration: reduce ? 0 : 0.22, delay: reduce ? 0 : index * 0.03 },
                    y: { duration: reduce ? 0 : 0.22, delay: reduce ? 0 : index * 0.03 },
                    default: { duration: 0.18, ease },
                  }}
                  className="rounded-lg border px-2 py-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-[10px] font-medium leading-none",
                        isPending ? "text-zinc-400" : "text-zinc-900",
                      )}
                    >
                      {section.title}
                    </span>
                    {isDone ? (
                      <IconCheck size={10} className="shrink-0 text-blue-600" strokeWidth={2.25} />
                    ) : isActive ? (
                      <motion.span
                        className="size-1.5 shrink-0 rounded-full bg-blue-500"
                        animate={!reduce ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden
                      />
                    ) : (
                      <span className="size-1.5 shrink-0 rounded-full bg-zinc-200" aria-hidden />
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[9px] leading-snug text-zinc-500">{section.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Readiness — clean checklist */}
        <div className="flex min-w-0 flex-col border-zinc-200/80 md:w-[44%] md:border-l md:pl-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[11px] font-medium text-zinc-900">Launch readiness</p>
            <motion.span
              key={checkedCount}
              initial={reduce ? false : { opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-medium tabular-nums text-zinc-500"
            >
              {checkedCount}/{itemCount}
            </motion.span>
          </div>

          <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
              className="h-full rounded-full bg-blue-600"
              animate={{ width: `${(checkedCount / itemCount) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.3, ease }}
            />
          </div>

          <ul className="mt-2.5 flex-1 space-y-1">
            {LANDING_READINESS_ITEMS.map((item, index) => {
              const checked = index < checkedCount;
              const scanning = index === scanningIndex;

              return (
                <motion.li
                  key={item}
                  animate={{ opacity: checked || scanning ? 1 : 0.35 }}
                  transition={{ duration: 0.2, ease }}
                  className="flex items-center gap-2 py-0.5"
                >
                  <span
                    className={cn(
                      "flex size-3.5 shrink-0 items-center justify-center rounded-full border",
                      checked && "border-blue-200 bg-blue-50 text-blue-600",
                      scanning && "border-blue-400 bg-white",
                      !checked && !scanning && "border-zinc-200 bg-white",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {checked ? (
                        <motion.span
                          key="ok"
                          initial={reduce ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        >
                          <IconCheck size={9} strokeWidth={2.5} />
                        </motion.span>
                      ) : scanning ? (
                        <motion.span
                          key="scan"
                          className="size-1.5 rounded-full bg-blue-500"
                          animate={!reduce ? { scale: [0.85, 1.1, 0.85] } : { scale: 1 }}
                          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden
                        />
                      ) : null}
                    </AnimatePresence>
                  </span>
                  <span
                    className={cn(
                      "text-[10px] leading-tight",
                      checked ? "font-medium text-zinc-800" : scanning ? "text-blue-700" : "text-zinc-400",
                    )}
                  >
                    {item}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            {footerPhase === "ready" ? (
              <motion.div
                key="ready"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease }}
                className="mt-0 flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 py-1.5 text-[10px] font-medium text-blue-700"
              >
                <IconCheck size={10} strokeWidth={2.5} />
                Ready to publish
              </motion.div>
            ) : footerPhase === "scanned" ? (
              <motion.div
                key="scanned"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease }}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 py-1.5 text-[10px] font-medium text-emerald-700"
              >
                <IconCheck size={10} strokeWidth={2.5} />
                Scanned
              </motion.div>
            ) : footerPhase === "scanning" ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-1.5 text-[10px] text-zinc-500"
              >
                <motion.span
                  className="size-1.5 rounded-full bg-blue-500"
                  animate={!reduce ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
                Scanning structure…
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                className="mt-2 rounded-lg border border-dashed border-zinc-200 py-1.5 text-center text-[10px] text-zinc-400"
              >
                Awaiting scan
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
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
    <MockFrame className="p-3 min-h-96 -mt-5">
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
