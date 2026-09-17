"use client";

import { AnimatePresence, motion } from "framer-motion";

import { ActivitySpinner, DrawnCheck } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationSpring,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const GRAPHITE = "#2C2826";
const GRAPHITE_EDGE = "#4A433E";
const SCREEN = "#F7F7F4";

const ACTIVITY = [
  { title: "Production deploy", meta: "Live", tone: "live" as const },
  { title: "Payment issue", meta: "Review", tone: "review" as const },
  { title: "Usage alert", meta: "82%", tone: "watch" as const },
  { title: "Workspace created", meta: "Complete", tone: "done" as const },
] as const;

const NAV = ["Home", "Activity", "Requests"] as const;

function islandCopy(step: number): { label: string; mode: "compact" | "wide" } {
  if (step >= 9) return { label: "Connected", mode: "compact" };
  if (step >= 6) return { label: "Production live", mode: "wide" };
  if (step >= 3) return { label: "Syncing", mode: "wide" };
  return { label: "Connected", mode: "compact" };
}

export function MobileAppIllustration() {
  const { active, reduce, pointer } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 10,
    active,
    reduce,
    stepMs: [420, 480, 520, 480, 520, 560, 480, 620, 700],
  });

  const island = islandCopy(step);
  const screenIn = step >= 1;
  const notify = step >= 2 && step < 4;
  const sheet = step >= 7;
  const focusedRow = step >= 6;

  return (
    <IllustrationStage className="flex items-center justify-center p-3 lg:p-4">
      <motion.div
        className="relative h-full"
        style={{ aspectRatio: "9 / 18.4", maxWidth: "46%" }}
        animate={
          reduce
            ? undefined
            : { x: pointer.x * 2, y: pointer.y * 1.5 }
        }
        transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.8 }}
      >
        <div
          className="relative h-full w-full"
          style={{
            borderRadius: 28,
            background: `linear-gradient(160deg, ${GRAPHITE_EDGE} 0%, ${GRAPHITE} 38%, #231F1D 100%)`,
            boxShadow:
              "0 1px 1px rgba(255,255,255,0.12) inset, 0 1px 2px rgba(28,25,23,0.08), 0 18px 36px -20px rgba(28,25,23,0.38)",
            padding: 2.5,
          }}
        >
          <span
            aria-hidden
            className="absolute top-[22%] left-[-1.5px] h-[18px] w-[1.5px] rounded-l-sm"
            style={{ background: GRAPHITE_EDGE }}
          />
          <span
            aria-hidden
            className="absolute top-[30%] left-[-1.5px] h-[28px] w-[1.5px] rounded-l-sm"
            style={{ background: GRAPHITE_EDGE }}
          />
          <span
            aria-hidden
            className="absolute top-[28%] right-[-1.5px] h-[42px] w-[1.5px] rounded-r-sm"
            style={{ background: GRAPHITE_EDGE }}
          />

          <div
            className="relative flex h-full w-full flex-col overflow-hidden"
            style={{
              borderRadius: 25,
              background: SCREEN,
            }}
          >
            <div className="relative z-20 flex h-7 shrink-0 items-start justify-center pt-[5px]">
              <motion.div
                layout
                className="flex items-center justify-center overflow-hidden px-2"
                style={{
                  background: GRAPHITE,
                  borderRadius: 999,
                  minHeight: 15.5,
                  minWidth: island.mode === "compact" ? 52 : 96,
                }}
                transition={reduce ? { duration: 0 } : illustrationSpring.island}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={island.label}
                    initial={reduce ? false : { opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, filter: "blur(3px)" }}
                    className="flex items-center gap-1 text-[6px] tracking-tight"
                    style={{ color: SCREEN }}
                  >
                    {island.label === "Syncing" ? (
                      <ActivitySpinner
                        size={7}
                        active={!reduce}
                        reduce={Boolean(reduce)}
                        color="rgba(247,247,244,0.85)"
                      />
                    ) : island.label === "Production live" ? (
                      <DrawnCheck show reduce={Boolean(reduce)} size={8} color="#8FCBAA" />
                    ) : (
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: "#8FCBAA" }}
                      />
                    )}
                    {island.label}
                    {island.label === "Production live" ? " ✓" : ""}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              className="flex min-h-0 flex-1 flex-col"
              initial={false}
              animate={
                screenIn
                  ? illustrationBlurShown
                  : illustrationBlurHidden
              }
              transition={{ duration: reduce ? 0 : 0.45, ease: illustrationEase }}
            >
              <div className="px-3 pt-1 pb-2">
                <span
                  className="block text-[11px] font-medium tracking-tight lg:text-[13px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Operations
                </span>
                <span
                  className="mt-2 block text-[7px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  Today
                </span>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden px-1.5">
                {ACTIVITY.map((item, index) => {
                  const selected = focusedRow && index === 0;
                  return (
                    <motion.div
                      key={item.title}
                      className="flex items-center justify-between rounded-[10px] px-2 py-1.5"
                      animate={{
                        backgroundColor: selected
                          ? "rgba(28,25,23,0.05)"
                          : "transparent",
                        y: selected ? -1 : 0,
                      }}
                      transition={{ duration: reduce ? 0 : 0.24, ease: illustrationEase }}
                    >
                      <span className="min-w-0">
                        <span
                          className="block truncate text-[8px] tracking-tight lg:text-[9px]"
                          style={{ color: illustrationColors.ink }}
                        >
                          {item.title}
                        </span>
                      </span>
                      <span
                        className="shrink-0 text-[6.5px] lg:text-[7.5px]"
                        style={{
                          color:
                            item.tone === "live" || item.tone === "done"
                              ? illustrationColors.health
                              : illustrationColors.inkFaint,
                        }}
                      >
                        {item.meta}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <div
                className="mt-auto grid grid-cols-3 border-t px-2 pt-1.5 pb-4"
                style={{ borderColor: illustrationColors.border }}
              >
                {NAV.map((item, index) => (
                  <span
                    key={item}
                    className="text-center text-[6.5px] tracking-tight"
                    style={{
                      color: index === 1 ? illustrationColors.ink : illustrationColors.inkFaint,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {notify ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: -8, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.32, ease: illustrationEase }}
                  className="absolute inset-x-3 top-9 z-30 rounded-[10px] border px-2 py-1.5"
                  style={{
                    background: illustrationColors.surface,
                    borderColor: illustrationColors.border,
                    boxShadow: "0 8px 20px -12px rgba(28,25,23,0.28)",
                  }}
                >
                  <span
                    className="block text-[7px] tracking-tight"
                    style={{ color: illustrationColors.ink }}
                  >
                    Deploy completed
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {sheet ? (
                <motion.div
                  initial={reduce ? false : { y: 64, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={reduce ? { duration: 0 } : illustrationSpring.sheet}
                  className="absolute inset-x-0 bottom-0 z-30 border-t px-3 pt-3 pb-5"
                  style={{
                    background: illustrationColors.surface,
                    borderColor: illustrationColors.border,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    boxShadow: "0 -12px 28px -18px rgba(28,25,23,0.22)",
                  }}
                >
                  <span
                    className="mx-auto mb-2 block h-0.5 w-8 rounded-full"
                    style={{ background: illustrationColors.wire }}
                  />
                  <span
                    className="block text-[8.5px] font-medium tracking-tight"
                    style={{ color: illustrationColors.ink }}
                  >
                    Deploy v2.8.4
                  </span>
                  <span
                    className="mt-1 block text-[7px]"
                    style={{ color: illustrationColors.health }}
                  >
                    3/3 services healthy
                  </span>
                  <span
                    className="mt-2 inline-flex rounded-[8px] px-2 py-1 text-[6.5px]"
                    style={{
                      background: illustrationColors.ink,
                      color: illustrationColors.surface,
                    }}
                  >
                    View details
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[6px] left-1/2 z-40 h-[3px] w-10 -translate-x-1/2 rounded-full"
              style={{ background: "rgba(28,25,23,0.28)" }}
            />
          </div>
        </div>
      </motion.div>
    </IllustrationStage>
  );
}
