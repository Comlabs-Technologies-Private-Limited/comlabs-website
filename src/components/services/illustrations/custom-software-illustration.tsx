"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CheckGlyph, Panel, WindowDots } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationShadow,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STAGES = ["Request", "Review", "Build", "Live"] as const;

const CONFIG = [
  { label: "Owner", value: "Operations" },
  { label: "Trigger", value: "Form submitted" },
  { label: "Action", value: "Create workspace" },
] as const;

const STATUSES = [
  { label: "API connected", key: "api" },
  { label: "Database healthy", key: "db" },
  { label: "Deployment live", key: "deploy" },
] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

/** Understated sidebar navigation glyphs. */
function SidebarIcon({ index, active }: { index: number; active: boolean }) {
  const color = active ? illustrationColors.accent : illustrationColors.inkFaint;
  const paths = [
    "M2.4 3.2h7.2M2.4 6h7.2M2.4 8.8h4.8",
    "M3.2 2.4 1.6 3.6v5.6l1.6-.8 2.4.8 1.6-.8V3.6L5.6 4.8 3.2 2.4Z",
    "M2.4 8.4V3.6l3.6-1.6 3.6 1.6v4.8",
    "M6 6.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM2.8 10.4c.4-1.6 1.6-2.4 3.2-2.4s2.8.8 3.2 2.4",
  ];

  return (
    <span
      className="flex h-[22px] w-[22px] items-center justify-center lg:h-[26px] lg:w-[26px]"
      style={{
        borderRadius: illustrationRadius.chip,
        background: active ? illustrationColors.accentSoft : "transparent",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d={paths[index]}
          stroke={color}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  // 0 populated · 1 request active · 2 review · 3 build · 4 live + statuses · 5 toast
  const stageIndex =
    step <= 1 ? 0 : Math.min(step - 1, STAGES.length - 1);
  const statusesConfirmed = step >= 4;
  const toastVisible = step >= 5;
  const isLive = stageIndex >= STAGES.length - 1;

  return (
    <IllustrationStage>
      <Panel
        className="relative flex h-full flex-col overflow-hidden"
        elevation="raised"
        radius={illustrationRadius.panel}
      >
        {/* Window chrome */}
        <div
          className="flex shrink-0 items-center gap-2 border-b px-3 py-2 lg:px-4 lg:py-2.5"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <WindowDots />
          <span
            className="ml-1 truncate text-[8px] leading-none lg:text-[9.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            Operations workspace
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Slim sidebar */}
          <div
            className="flex w-[36px] shrink-0 flex-col items-center gap-2 border-r py-4 lg:w-[44px] lg:gap-2.5 lg:py-5"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surface,
            }}
          >
            {[0, 1, 2, 3].map((index) => (
              <SidebarIcon key={index} index={index} active={index === 0} />
            ))}
          </div>

          {/* Main workspace */}
          <div className="flex min-w-0 flex-1 flex-col px-3 py-3 lg:px-5 lg:py-4">
            <h3
              className="mb-4 text-[10px] leading-none font-medium lg:mb-5 lg:text-[12px]"
              style={{ color: illustrationColors.ink }}
            >
              Operations workspace
            </h3>

            {/* Horizontal workflow */}
            <div className="relative mb-5 lg:mb-6">
              <span
                className="absolute top-[10px] right-[8%] left-[8%] block h-px"
                style={{ background: illustrationColors.border }}
              />
              <motion.span
                className="absolute top-[10px] left-[8%] block h-px origin-left"
                style={{
                  background: illustrationColors.accent,
                  right: "8%",
                }}
                initial={false}
                animate={{ scaleX: stageIndex / (STAGES.length - 1) }}
                transition={
                  reduce ? { duration: 0 } : { duration: 0.42, ease: illustrationEase }
                }
              />

              {/* Travelling workflow record sits above stage nodes */}
              <div className="relative grid grid-cols-4 pb-2 lg:pb-2.5">
                {STAGES.map((stage, index) => (
                  <div key={stage} className="flex justify-center">
                    {index === stageIndex ? (
                      <motion.div
                        layoutId="workflow-record"
                        initial={reduce ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.42, ease: illustrationEase }
                        }
                        className="inline-flex max-w-full items-center gap-1.5 px-2 py-1.5 lg:gap-2 lg:px-2.5 lg:py-2"
                        style={{
                          borderRadius: illustrationRadius.control,
                          background: illustrationColors.surface,
                          border: `1px solid ${
                            isLive ? "rgba(201,100,66,0.28)" : illustrationColors.border
                          }`,
                          boxShadow: illustrationShadow.chip,
                        }}
                      >
                        <span
                          className="block h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{
                            background: isLive
                              ? illustrationColors.accent
                              : illustrationColors.wire,
                          }}
                        />
                        <span
                          className="truncate text-[8px] leading-none font-medium lg:text-[9.5px]"
                          style={{ color: illustrationColors.ink }}
                        >
                          Customer onboarding
                        </span>
                      </motion.div>
                    ) : (
                      <span className="block h-[26px] lg:h-[28px]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="relative grid grid-cols-4">
                {STAGES.map((stage, index) => {
                  const reached = index <= stageIndex;
                  const current = index === stageIndex;
                  return (
                    <div key={stage} className="flex flex-col items-center gap-2">
                      <span
                        className="flex h-[20px] w-[20px] items-center justify-center lg:h-[22px] lg:w-[22px]"
                        style={{
                          borderRadius: 999,
                          background: current
                            ? illustrationColors.accent
                            : illustrationColors.surface,
                          border: `1px solid ${
                            current
                              ? illustrationColors.accent
                              : reached
                                ? illustrationColors.accentLine
                                : illustrationColors.borderStrong
                          }`,
                          transition: "background 380ms ease, border-color 380ms ease",
                        }}
                      >
                        {current ? (
                          <span
                            className="block h-[5px] w-[5px] rounded-full"
                            style={{ background: illustrationColors.surface }}
                          />
                        ) : reached ? (
                          <CheckGlyph size={9} color={illustrationColors.accent} />
                        ) : (
                          <span
                            className="block h-[4px] w-[4px] rounded-full"
                            style={{ background: illustrationColors.wire }}
                          />
                        )}
                      </span>
                      <span
                        className="text-center text-[8px] leading-none lg:text-[9.5px]"
                        style={{
                          color: current
                            ? illustrationColors.accent
                            : reached
                              ? illustrationColors.ink
                              : illustrationColors.inkFaint,
                        }}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configuration panel */}
            <div
              className="mt-auto flex flex-col gap-2.5 px-3 py-3 lg:gap-3 lg:px-4 lg:py-3.5"
              style={{
                borderRadius: illustrationRadius.control,
                background: illustrationColors.surfaceMuted,
                border: `1px solid ${illustrationColors.border}`,
              }}
            >
              {CONFIG.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span
                    className="shrink-0 text-[8px] leading-none lg:text-[9.5px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="truncate text-[8.5px] leading-none font-medium lg:text-[10px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right status panel */}
          <div
            className="hidden w-[88px] shrink-0 flex-col gap-3 border-l px-3 py-4 lg:flex lg:w-[104px] lg:gap-3.5 lg:px-4 lg:py-5"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surface,
            }}
          >
            {STATUSES.map((status, index) => {
              const showCheck =
                index < 2 ? statusesConfirmed : statusesConfirmed && isLive;

              return (
                <div key={status.key} className="flex flex-col gap-1.5">
                  <span
                    className="flex h-[16px] w-[16px] items-center justify-center"
                    style={{
                      borderRadius: 999,
                      background: showCheck
                        ? "rgba(201,100,66,0.12)"
                        : illustrationColors.surfaceSunk,
                      border: `1px solid ${
                        showCheck ? "rgba(201,100,66,0.24)" : illustrationColors.border
                      }`,
                      transition: "background 380ms ease, border-color 380ms ease",
                    }}
                  >
                    {showCheck ? (
                      <CheckGlyph size={8} />
                    ) : (
                      <span
                        className="block h-[4px] w-[4px] rounded-full"
                        style={{ background: illustrationColors.wire }}
                      />
                    )}
                  </span>
                  <span
                    className="text-[7.5px] leading-[1.3] lg:text-[8.5px]"
                    style={{
                      color: showCheck
                        ? illustrationColors.ink
                        : illustrationColors.inkFaint,
                    }}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {toastVisible ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 4 }}
              transition={fade}
              className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 px-3 py-2 lg:bottom-4 lg:px-3.5 lg:py-2.5"
              style={{
                borderRadius: illustrationRadius.control,
                background: illustrationColors.surface,
                border: `1px solid ${illustrationColors.border}`,
                boxShadow: illustrationShadow.chip,
              }}
            >
              <span
                className="flex h-[14px] w-[14px] shrink-0 items-center justify-center"
                style={{
                  borderRadius: 999,
                  background: illustrationColors.accentSoft,
                }}
              >
                <CheckGlyph size={8} />
              </span>
              <span
                className="whitespace-nowrap text-[8px] leading-none font-medium lg:text-[9.5px]"
                style={{ color: illustrationColors.ink }}
              >
                Workflow deployed successfully
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Panel>
    </IllustrationStage>
  );
}
