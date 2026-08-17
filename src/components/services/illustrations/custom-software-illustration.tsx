"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  ClaudeMark,
  OutlookMark,
  SalesforceMark,
  SlackMark,
} from "./brand-marks";
import {
  CheckGlyph,
  Chip,
  MicroLabel,
  Panel,
  WindowDots,
} from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationBlurHidden,
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationRadius,
  illustrationShadow,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STAGES = [
  { label: "Request", Mark: SlackMark, detail: "#ops-requests" },
  { label: "Review", Mark: ClaudeMark, detail: "Scope validated" },
  { label: "Build", Mark: null, detail: "Workspace ready" },
  { label: "Live", Mark: SalesforceMark, detail: "CRM synced" },
] as const;

const INTEGRATIONS = [
  { name: "Slack", Mark: SlackMark, channel: "#ops-requests", bg: "#F4F0FF" },
  { name: "Salesforce", Mark: SalesforceMark, channel: "AC-4421", bg: "#E8F6FC" },
  { name: "Claude", Mark: ClaudeMark, channel: "Scope agent", bg: "#FDF3EF" },
  { name: "Outlook", Mark: OutlookMark, channel: "Invites", bg: "#EEF6FC" },
] as const;

const RUN_DETAILS = [
  { label: "Trigger", value: "Slack form submitted" },
  { label: "Owner", value: "Operations team" },
] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

function ComlabsMark({ className = "h-[9px] w-[9px]" }: { className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="-3 -1 268 245" fill="none" aria-hidden>
      <path
        fill={illustrationColors.accent}
        d="M92.0 242.0C90.8 241.5 89.7 240.4 88.9 238.9C88.3 237.7 88.3 236.9 88.4 208.2L88.5 178.8L89.4 177.0C90.1 175.4 92.5 172.9 104.3 161.1C121.3 144.2 126.9 138.7 128.1 137.7C128.8 137.2 129.6 137.0 130.7 137.0C132.1 137.0 132.6 137.2 133.8 138.1C134.5 138.7 141.0 144.9 148.1 152.0C155.1 159.1 163.4 167.3 166.5 170.3C169.5 173.3 172.3 176.2 172.6 176.8C173.1 177.8 173.2 180.0 173.3 207.2C173.3 227.5 173.3 236.9 173.0 237.7C172.5 239.4 171.2 240.9 169.6 241.7C168.4 242.3 167.8 242.4 160.8 242.3L153.4 242.2L152.1 241.1C149.5 239.1 149.7 240.8 149.7 213.2L149.7 188.5L143.6 182.5C134.5 173.5 131.4 170.7 130.8 170.7C130.1 170.7 123.3 177.0 116.0 184.2L111.8 188.4L111.7 213.0L111.5 237.6L110.5 239.2C109.8 240.2 109.0 241.0 108.0 241.6C106.6 242.3 106.3 242.3 99.7 242.3C95.9 242.3 92.5 242.1 92.0 242.0Z"
      />
    </svg>
  );
}

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const stageIndex =
    step <= 1 ? 0 : Math.min(step - 1, STAGES.length - 1);
  const integrationsLive = step >= 4;
  const toastVisible = step >= 5;
  const isLive = stageIndex >= STAGES.length - 1;

  return (
    <IllustrationStage>
      <div className="relative flex h-full min-h-0 items-stretch gap-2.5 overflow-hidden lg:gap-3">
        {/* Integration rail — mirrors the page-layers rail in website design */}
        <div className="hidden min-h-0 w-[84px] shrink-0 flex-col overflow-hidden lg:flex">
          <MicroLabel className="mb-2 pl-[2px]">Connected</MicroLabel>
          <Panel className="min-h-0 flex-1 overflow-hidden p-1.5" elevation="flat">
            <div className="flex flex-col gap-1">
              {INTEGRATIONS.map((app, index) => {
                const connected = integrationsLive || index < stageIndex + 1;
                return (
                  <div
                    key={app.name}
                    className="flex flex-col gap-[3px] px-1.5 py-[5px]"
                    style={{
                      borderRadius: illustrationRadius.chip,
                      background: connected ? app.bg : "transparent",
                      opacity: connected ? 1 : 0.5,
                      transition: "opacity 380ms ease, background 380ms ease",
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <app.Mark className="h-[9px] w-[9px]" />
                      <span
                        className="truncate text-[8px] leading-none font-medium"
                        style={{
                          color: connected
                            ? illustrationColors.ink
                            : illustrationColors.inkFaint,
                        }}
                      >
                        {app.name}
                      </span>
                      {connected ? (
                        <span
                          className="ml-auto block h-[4px] w-[4px] shrink-0 rounded-full"
                          style={{ background: illustrationColors.accent }}
                        />
                      ) : null}
                    </span>
                    <span
                      className="truncate text-[6.5px] leading-none"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {app.channel}
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* Main workspace */}
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
          <Panel className="flex h-full min-h-0 flex-col overflow-hidden" elevation="raised">
            <div
              className="flex shrink-0 items-center gap-2 border-b px-2.5 py-[7px]"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surfaceMuted,
              }}
            >
              <WindowDots />
              <div
                className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-[3px]"
                style={{
                  borderRadius: 999,
                  background: illustrationColors.surface,
                  border: `1px solid ${illustrationColors.border}`,
                }}
              >
                <ComlabsMark className="h-[8px] w-[8px]" />
                <span
                  className="truncate text-[8px] leading-none lg:text-[9.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  ops.comlabs.internal / customer-onboarding
                </span>
              </div>
              <AnimatePresence>
                {isLive ? (
                  <motion.span
                    initial={reduce ? false : illustrationPopHidden}
                    animate={illustrationPopShown}
                    transition={fade}
                    className="flex shrink-0 items-center"
                  >
                    <Chip tone="accent" size="compact">
                      <CheckGlyph size={6} />
                      Live
                    </Chip>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="relative flex-1 overflow-hidden p-2.5 lg:p-3">
              <div className="flex h-full min-h-0 flex-col gap-2 lg:gap-2.5">
              {/* Mobile integration strip */}
              <div className="flex shrink-0 items-center gap-1 lg:hidden">
                {INTEGRATIONS.map((app, index) => {
                  const connected = integrationsLive || index < stageIndex + 1;
                  return (
                    <span
                      key={app.name}
                      className="flex flex-1 items-center justify-center py-1"
                      style={{
                        borderRadius: illustrationRadius.chip,
                        background: connected ? app.bg : illustrationColors.surfaceMuted,
                        opacity: connected ? 1 : 0.45,
                        transition: "opacity 380ms ease",
                      }}
                    >
                      <app.Mark className="h-[9px] w-[9px]" />
                    </span>
                  );
                })}
              </div>

              {/* Workflow pipeline */}
              <div className="shrink-0">
                <MicroLabel className="mb-2">Workflow pipeline</MicroLabel>
                <div className="relative">
                  <span
                    className="absolute top-[11px] right-[8%] left-[8%] block h-px"
                    style={{ background: illustrationColors.border }}
                  />
                  <motion.span
                    className="absolute top-[11px] left-[8%] block h-px origin-left"
                    style={{ background: illustrationColors.accent, right: "8%" }}
                    initial={false}
                    animate={{ scaleX: stageIndex / (STAGES.length - 1) }}
                    transition={
                      reduce ? { duration: 0 } : fade
                    }
                  />

                  <div className="relative mb-2 grid grid-cols-4 pb-1">
                    {STAGES.map((stage, index) => (
                      <div key={stage.label} className="flex justify-center">
                        {index === stageIndex ? (
                          <motion.div
                            layoutId="workflow-record"
                            initial={reduce ? false : { ...illustrationBlurHidden, y: 4 }}
                            animate={{ ...illustrationBlurShown, y: 0 }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : fade
                            }
                            className="inline-flex max-w-full items-center gap-1 px-1.5 py-1 lg:gap-1.5 lg:px-2 lg:py-1.5"
                            style={{
                              borderRadius: illustrationRadius.control,
                              background: illustrationColors.surface,
                              border: `1px solid ${
                                isLive ? "rgba(201,100,66,0.24)" : illustrationColors.border
                              }`,
                              boxShadow: illustrationShadow.chip,
                            }}
                          >
                            <span
                              className="block h-[4px] w-[4px] shrink-0 rounded-full"
                              style={{
                                background: isLive
                                  ? illustrationColors.accent
                                  : illustrationColors.wire,
                              }}
                            />
                            <span
                              className="truncate text-[6.5px] leading-none font-medium lg:text-[8px]"
                              style={{ color: illustrationColors.ink }}
                            >
                              Onboarding
                            </span>
                          </motion.div>
                        ) : (
                          <span className="block h-[22px] lg:h-[24px]" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="relative grid grid-cols-4">
                    {STAGES.map((stage, index) => {
                      const reached = index <= stageIndex;
                      const current = index === stageIndex;
                      const StageMark = stage.Mark;

                      return (
                        <div key={stage.label} className="flex flex-col items-center gap-1">
                          <span
                            className="flex h-[22px] w-[22px] items-center justify-center lg:h-[24px] lg:w-[24px]"
                            style={{
                              borderRadius: current ? illustrationRadius.control : 999,
                              background: current
                                ? illustrationColors.surface
                                : reached
                                  ? illustrationColors.accentSoft
                                  : illustrationColors.surfaceMuted,
                              border: `1px solid ${
                                current
                                  ? illustrationColors.accent
                                  : reached
                                    ? "rgba(201,100,66,0.22)"
                                    : illustrationColors.border
                              }`,
                              boxShadow: current ? illustrationShadow.chip : undefined,
                              transition: "background 380ms ease, border-color 380ms ease",
                            }}
                          >
                            {StageMark ? (
                              <StageMark className="h-[10px] w-[10px] lg:h-[11px] lg:w-[11px]" />
                            ) : current ? (
                              <ComlabsMark className="h-[9px] w-[9px] lg:h-[10px] lg:w-[10px]" />
                            ) : reached ? (
                              <CheckGlyph size={8} />
                            ) : (
                              <span
                                className="block h-[3px] w-[3px] rounded-full"
                                style={{ background: illustrationColors.wire }}
                              />
                            )}
                          </span>
                          <span
                            className="text-center text-[7px] leading-none font-medium lg:text-[8.5px]"
                            style={{
                              color: current
                                ? illustrationColors.accent
                                : reached
                                  ? illustrationColors.ink
                                  : illustrationColors.inkFaint,
                            }}
                          >
                            {stage.label}
                          </span>
                          <span
                            className="max-w-full truncate px-0.5 text-center text-[6px] leading-none lg:text-[7px]"
                            style={{
                              color: reached
                                ? illustrationColors.inkMuted
                                : illustrationColors.inkFaint,
                            }}
                          >
                            {reached ? stage.detail : "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Active run detail */}
              <div
                className="mt-auto flex shrink-0 flex-col gap-1.5 px-2 py-1.5 lg:px-2.5 lg:py-2"
                style={{
                  borderRadius: illustrationRadius.control,
                  background: illustrationColors.surfaceMuted,
                  border: `1px solid ${
                    isLive ? "rgba(201,100,66,0.18)" : illustrationColors.border
                  }`,
                  transition: "border-color 380ms ease",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <MicroLabel tone="muted">Active run</MicroLabel>
                  <span
                    className="text-[6.5px] leading-none lg:text-[7.5px]"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {STAGES[stageIndex].label}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {RUN_DETAILS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span
                        className="shrink-0 text-[7px] leading-none lg:text-[8px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="truncate text-[7px] leading-none font-medium lg:text-[8.5px]"
                        style={{ color: illustrationColors.ink }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="shrink-0 text-[7px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      Action
                    </span>
                    <span
                      className="truncate text-[7px] leading-none font-medium lg:text-[8.5px]"
                      style={{
                        color: isLive ? illustrationColors.accent : illustrationColors.ink,
                      }}
                    >
                      {isLive ? "CRM record + Outlook invite" : "Create workspace"}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <AnimatePresence>
              {toastVisible ? (
                <motion.div
                  initial={reduce ? false : { ...illustrationBlurHidden, y: 8 }}
                  animate={{ ...illustrationBlurShown, y: 0 }}
                  exit={reduce ? undefined : { ...illustrationBlurHidden, y: 8 }}
                  transition={fade}
                  className="absolute bottom-2 left-1/2 z-20 flex max-w-[calc(100%-16px)] -translate-x-1/2 items-center gap-2 border border-white/60 bg-white/50 px-2.5 py-1.5 shadow-[0_8px_24px_-8px_rgba(28,25,23,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md backdrop-saturate-150 lg:bottom-2.5 lg:px-3 lg:py-2"
                  style={{ borderRadius: illustrationRadius.control }}
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
                    className="truncate text-[8px] leading-none font-medium lg:text-[9px]"
                    style={{ color: illustrationColors.ink }}
                  >
                    Workflow live across 4 systems
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Panel>
        </div>
      </div>
    </IllustrationStage>
  );
}
