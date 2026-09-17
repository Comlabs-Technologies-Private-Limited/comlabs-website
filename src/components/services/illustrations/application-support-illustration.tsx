"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ComlabsMark } from "@/components/brand/comlabs-mark";
import { SlackMark } from "./brand-marks";
import { WindowDots } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationShadow,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const EASE = illustrationEase;
const ink = illustrationColors.ink;
const inkMuted = illustrationColors.inkMuted;
const inkFaint = illustrationColors.inkFaint;
const border = illustrationColors.border;
const borderStrong = illustrationColors.borderStrong;
const surface = illustrationColors.surface;
const surfaceMuted = illustrationColors.surfaceMuted;
const surfaceSunk = illustrationColors.surfaceSunk;
const accent = illustrationColors.accent;
const health = illustrationColors.health;

/** L1–L4 tasks shown live inside the support agent as the incident resolves. */
const TASKS = [
  {
    level: "L1",
    label: "Triage",
    detail: "Customer report confirmed",
    appearsAt: 2,
    doneAt: 3,
  },
  {
    level: "L2",
    label: "Diagnose",
    detail: "5xx spike traced to payments",
    appearsAt: 3,
    doneAt: 4,
  },
  {
    level: "L3",
    label: "Engineering",
    detail: "Connection pool patch deploying",
    appearsAt: 4,
    doneAt: 5,
  },
  {
    level: "L4",
    label: "Specialist",
    detail: "Capacity headroom signed off",
    appearsAt: 5,
    doneAt: 6,
  },
] as const;

const RESOLVED_STEP = 6;

function errorRate(step: number): string {
  if (step >= RESOLVED_STEP) return "0.3%";
  if (step >= 5) return "1.4%";
  if (step >= 4) return "3.8%";
  if (step >= 3) return "6.1%";
  return "8.2%";
}

function Avatar({ label, tone }: { label: string; tone?: "neutral" | "accent" }) {
  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center rounded-[4px] text-[7px] font-medium tracking-tight sm:size-5 sm:text-[8px]"
      style={{
        background: tone === "accent" ? accent : surfaceSunk,
        color: tone === "accent" ? surface : inkMuted,
        border: `1px solid ${tone === "accent" ? "transparent" : borderStrong}`,
      }}
    >
      {label}
    </span>
  );
}

function SlackMessage({
  author,
  avatar,
  time,
  app,
  children,
  visible = true,
  reduce,
}: {
  author: string;
  avatar: React.ReactNode;
  time: string;
  app?: boolean;
  children: React.ReactNode;
  visible?: boolean;
  reduce: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.div
      className="flex gap-1.5 sm:gap-2"
      initial={reduce ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
    >
      {avatar}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-[8px] font-medium tracking-tight sm:text-[9px]" style={{ color: ink }}>
            {author}
          </span>
          {app ? (
            <span
              className="rounded px-1 py-px text-[6px] font-medium tracking-[0.04em] uppercase sm:text-[7px]"
              style={{ background: surfaceSunk, color: inkFaint, border: `1px solid ${border}` }}
            >
              App
            </span>
          ) : null}
          <span className="text-[7px] tracking-tight tabular-nums sm:text-[8px]" style={{ color: inkFaint }}>
            {time}
          </span>
        </div>
        <div
          className="mt-0.5 text-[8px] leading-relaxed tracking-tight sm:text-[9px]"
          style={{ color: inkMuted }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function TaskGlyph({ state, reduce }: { state: "pending" | "active" | "done"; reduce: boolean }) {
  if (state === "done") {
    return (
      <span
        className="mt-0.5 block size-2 shrink-0 sm:size-2.5"
        style={{
          background: health,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        aria-hidden
      />
    );
  }

  return (
    <motion.span
      className="mt-1 block size-1.5 shrink-0 rounded-full sm:size-2"
      aria-hidden
      style={{ background: state === "active" ? accent : borderStrong }}
      animate={state === "active" && !reduce ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
      transition={
        state === "active" ? { duration: 1.6, ease: "easeInOut", repeat: Infinity } : { duration: 0 }
      }
    />
  );
}

function AgentTaskRow({
  level,
  label,
  detail,
  state,
  visible,
  reduce,
}: {
  level: string;
  label: string;
  detail: string;
  state: "pending" | "active" | "done";
  visible: boolean;
  reduce: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.li
      className="flex items-start gap-1.5 sm:gap-2"
      initial={reduce ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
    >
      <TaskGlyph state={state} reduce={reduce} />
      <div className="min-w-0 flex-1">
        <p className="text-[8px] leading-none font-medium tracking-tight sm:text-[9px]" style={{ color: ink }}>
          {level} · {label}
        </p>
        <p className="mt-0.5 text-[7px] leading-relaxed tracking-tight sm:text-[8px]" style={{ color: inkMuted }}>
          {detail}
        </p>
      </div>
    </motion.li>
  );
}

export function ApplicationSupportIllustration() {
  const { active, reduce: reduceMotion } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: RESOLVED_STEP + 1,
    active,
    reduce: reduceMotion,
    stepMs: [800, 900, 950, 1000, 950, 1100],
    startDelayMs: 480,
    loop: true,
    loopDelayMs: 2600,
  });

  const resolved = step >= RESOLVED_STEP;
  const agentVisible = step >= 1;
  const rate = errorRate(step);

  return (
    <IllustrationStage className="p-0">
      <div
        className="relative h-full min-h-0 w-full min-w-0 overflow-hidden"
        style={{
          background: `linear-gradient(165deg, ${surfaceMuted} 0%, ${surfaceSunk} 100%)`,
        }}
      >
        {/* Slack channel — customer asks in the thread they already use. */}
        <div
          className="absolute inset-x-1.5 top-1.5 bottom-[34%] sm:inset-x-2 sm:top-2 sm:bottom-[36%]"
          style={{ filter: agentVisible ? "blur(0.4px)" : undefined }}
        >
          <div
            className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border sm:rounded-xl"
            style={{
              borderColor: borderStrong,
              background: surface,
              boxShadow: illustrationShadow.panel,
            }}
          >
            <div
              className="flex shrink-0 items-center gap-1.5 border-b px-2 py-1.5 sm:px-2.5 sm:py-2"
              style={{ borderColor: border }}
            >
              <SlackMark className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              <span
                className="min-w-0 truncate text-[8px] font-medium tracking-tight sm:text-[9px]"
                style={{ color: ink }}
              >
                #inc-payments-api
              </span>
              <span className="ml-auto shrink-0 text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkFaint }}>
                12
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 sm:gap-2.5 sm:p-2.5">
              <SlackMessage
                author="sarah"
                avatar={<Avatar label="S" />}
                time="08:14"
                reduce={reduceMotion}
              >
                Checkout is failing for EU customers — 500s on{" "}
                <span style={{ color: ink }}>/v1/charges</span>
              </SlackMessage>
              <SlackMessage
                author="alex"
                avatar={<Avatar label="A" />}
                time="08:15"
                visible={step >= 1}
                reduce={reduceMotion}
              >
                Looping in Comlabs on this
              </SlackMessage>
              <AnimatePresence initial={false}>
                {resolved ? (
                  <motion.div
                    key="resolved"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.38, ease: EASE }}
                  >
                    <SlackMessage
                      author="Comlabs"
                      avatar={
                        <span
                          className="flex size-4 shrink-0 items-center justify-center rounded-[4px] sm:size-5"
                          style={{ background: surfaceSunk, border: `1px solid ${border}` }}
                        >
                          <ComlabsMark className="h-2.5 w-auto sm:h-3" />
                        </span>
                      }
                      time="08:52"
                      app
                      reduce={reduceMotion}
                    >
                      <span style={{ color: ink }}>
                        Patch deployed. 5xx back to {rate}. Runbook updated.
                      </span>
                      <span
                        className="mt-1.5 inline-flex items-center rounded-[4px] px-1.5 py-0.5 text-[7px] font-medium tracking-tight sm:text-[8px]"
                        style={{ background: health, color: surface }}
                      >
                        View runbook
                      </span>
                    </SlackMessage>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Support agent — solves L1–L4 in real time over the thread. */}
        <AnimatePresence initial={false}>
          {agentVisible ? (
            <motion.div
              key="agent"
              className="absolute inset-x-1 bottom-1 z-10 sm:inset-x-1.5 sm:bottom-1.5"
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }}
            >
              <div
                className="flex max-h-full min-h-0 flex-col overflow-hidden rounded-lg border sm:rounded-xl"
                style={{
                  borderColor: borderStrong,
                  background: surface,
                  boxShadow: illustrationShadow.raised,
                }}
              >
                <div
                  className="flex shrink-0 items-center gap-1.5 border-b px-2 py-1.5 sm:px-2.5 sm:py-2"
                  style={{ borderColor: border, background: surfaceMuted }}
                >
                  <WindowDots />
                  <ComlabsMark className="h-2.5 w-auto sm:h-3" />
                  <span className="text-[8px] font-medium tracking-tight sm:text-[9px]" style={{ color: ink }}>
                    comlabs-agent
                  </span>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-2 sm:gap-2.5 sm:p-2.5">
                  <div
                    className="shrink-0 rounded-[6px] border px-2 py-1.5 sm:px-2.5 sm:py-2"
                    style={{ borderColor: border, background: surfaceMuted }}
                  >
                    <p className="text-[7px] font-medium tracking-tight sm:text-[8px]" style={{ color: inkFaint }}>
                      Scope
                    </p>
                    <p className="mt-1 text-[8px] leading-relaxed tracking-tight sm:text-[9px]" style={{ color: inkMuted }}>
                      What should we verify first?
                    </p>
                    <div className="mt-1.5 space-y-0.5">
                      <p className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: ink }}>
                        [x] CloudWatch 5xx rate
                      </p>
                      <p className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkFaint }}>
                        [ ] Recent deployments
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 space-y-1">
                    {step >= 1 ? (
                      <p className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkMuted }}>
                        • Analyzed scope · 2s
                      </p>
                    ) : null}
                    {step >= 2 ? (
                      <p className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkMuted }}>
                        • Started L1–L4 path
                      </p>
                    ) : null}
                  </div>

                  <ul className="min-w-0 space-y-1.5 sm:space-y-2">
                    {TASKS.map((task) => {
                      const visible = reduceMotion || step >= task.appearsAt;
                      const isDone = reduceMotion || step >= task.doneAt;
                      const isActive = visible && !isDone;
                      const state = isDone ? "done" : isActive ? "active" : "pending";

                      return (
                        <AgentTaskRow
                          key={task.level}
                          level={task.level}
                          label={task.label}
                          detail={task.detail}
                          state={state}
                          visible={visible}
                          reduce={reduceMotion}
                        />
                      );
                    })}
                  </ul>

                  <div
                    className="mt-auto shrink-0 rounded-[6px] border px-2 py-1.5 sm:px-2.5"
                    style={{ borderColor: border, background: surface }}
                  >
                    <p className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkFaint }}>
                      → Add a follow-up
                      <span className="float-right tabular-nums">esc to stop</span>
                    </p>
                  </div>
                </div>

                <div
                  className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-0.5 border-t px-2 py-1.5 sm:px-2.5 sm:py-2"
                  style={{ borderColor: border, background: surfaceMuted }}
                >
                  <span className="text-[7px] font-medium tracking-tight sm:text-[8px]" style={{ color: health }}>
                    ◉ Plan
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={rate}
                      initial={reduceMotion ? false : illustrationTextSwapHidden}
                      animate={illustrationTextSwapShown}
                      exit={reduceMotion ? undefined : illustrationTextSwapExit}
                      transition={illustrationSwap}
                      className="text-[7px] tracking-tight tabular-nums sm:text-[8px]"
                      style={{ color: resolved ? health : accent }}
                    >
                      5xx {resolved ? `8.2% → ${rate}` : rate}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[7px] tracking-tight sm:text-[8px]" style={{ color: inkFaint }}>
                    · {resolved ? "Deployment verified" : step >= 4 ? "Rolling out" : "2 agents"}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </IllustrationStage>
  );
}
