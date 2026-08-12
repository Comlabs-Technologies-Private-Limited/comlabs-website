"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowGlyph,
  Bar,
  CheckGlyph,
  Chip,
  MicroLabel,
  Panel,
  StatusDot,
} from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STAGES = ["Request", "Validate", "Process", "Approve", "Complete"] as const;

const CONFIG_LINES = [
  { indent: 0, text: "rule: purchase_order", tone: "key" },
  { indent: 1, text: "limit: 250000", tone: "value" },
  { indent: 1, text: "approver: founder", tone: "value" },
  { indent: 0, text: "on_pass: provision", tone: "key" },
] as const;

const STEPS = 6;

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  // The record advances one stage per step, settling on "Complete".
  const recordIndex = Math.min(Math.max(step - 1, 0), STAGES.length - 1);
  const validationPassed = step >= 2;
  const approvalReached = step >= 3;
  const deployBuilding = step >= 4;
  const isLive = step >= 5;

  return (
    <IllustrationStage>
      <div className="flex h-full flex-col gap-2.5">
        {/* Workflow rail — primary object */}
        <Panel className="flex-1 p-2.5 lg:p-3" elevation="raised">
          <div className="mb-2 flex items-center justify-between gap-2">
            <MicroLabel tone="muted">Purchase order workflow</MicroLabel>
            <Chip tone={isLive ? "accent" : "quiet"}>
              {isLive ? <CheckGlyph /> : <StatusDot tone="idle" />}
              {isLive ? "Completed" : "Running"}
            </Chip>
          </div>

          {/* Travelling record */}
          <div className="grid grid-cols-5 pb-1.5">
            {STAGES.map((stage, index) => (
              <div key={stage} className="flex justify-center">
                {index === recordIndex && step >= 1 ? (
                  <motion.div
                    layoutId="software-record"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.5, ease: illustrationEase }
                    }
                  >
                    <Chip tone="accent" className="shadow-none">
                      ORD-4821
                    </Chip>
                  </motion.div>
                ) : (
                  <span className="block h-[15px]" />
                )}
              </div>
            ))}
          </div>

          {/* Stage nodes + connector */}
          <div className="relative">
            <span
              className="absolute top-[9px] right-[10%] left-[10%] block h-px"
              style={{ background: illustrationColors.border }}
            />
            <motion.span
              className="absolute top-[9px] left-[10%] block h-px origin-left"
              style={{ background: illustrationColors.accent, right: "10%" }}
              initial={false}
              animate={{
                scaleX: recordIndex / (STAGES.length - 1),
              }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.5, ease: illustrationEase }
              }
            />

            <div className="relative grid grid-cols-5">
              {STAGES.map((stage, index) => {
                const reached = step >= 1 && index <= recordIndex;
                return (
                  <div
                    key={stage}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="flex h-[18px] w-[18px] items-center justify-center"
                      style={{
                        borderRadius: 999,
                        background: reached
                          ? illustrationColors.accent
                          : illustrationColors.surface,
                        border: `1px solid ${
                          reached
                            ? illustrationColors.accent
                            : illustrationColors.borderStrong
                        }`,
                      }}
                    >
                      {reached ? (
                        <CheckGlyph color={illustrationColors.surface} size={9} />
                      ) : (
                        <span
                          className="block h-[4px] w-[4px] rounded-full"
                          style={{ background: illustrationColors.wire }}
                        />
                      )}
                    </span>
                    <span
                      className="text-center text-[7.5px] leading-none lg:text-[9px]"
                      style={{
                        color: reached
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

          {/* Stage detail line */}
          <div
            className="mt-2.5 flex items-center gap-1.5 px-2 py-[6px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={
                  isLive
                    ? "live"
                    : approvalReached
                      ? "approval"
                      : validationPassed
                        ? "passed"
                        : "pending"
                }
                initial={reduce ? false : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -2 }}
                transition={{ duration: 0.2, ease: illustrationEase }}
                className="flex min-w-0 items-center gap-1.5"
              >
                {validationPassed ? (
                  <CheckGlyph />
                ) : (
                  <StatusDot tone="muted" />
                )}
                <span
                  className="truncate text-[8px] leading-none lg:text-[9px]"
                  style={{ color: illustrationColors.inkMuted }}
                >
                  {isLive
                    ? "Order provisioned · vendor notified"
                    : approvalReached
                      ? "Founder approval · ₹2,40,000"
                      : validationPassed
                        ? "Validation passed · budget in policy"
                        : "Customer request received"}
                </span>
              </motion.span>
            </AnimatePresence>
          </div>
        </Panel>

        {/* Supporting panels */}
        <div className="flex shrink-0 items-stretch gap-2.5">
          {/* Config panel — secondary layer, desktop only */}
          <Panel className="hidden min-w-0 flex-1 flex-col gap-[5px] p-2.5 lg:flex">
            <MicroLabel>Rule configuration</MicroLabel>
            <div className="flex flex-col gap-[3px] pt-[2px]">
              {CONFIG_LINES.map((line) => (
                <span
                  key={line.text}
                  className="truncate text-[8.5px] leading-[1.3]"
                  style={{
                    paddingLeft: line.indent * 8,
                    fontFamily: "var(--font-mono, monospace)",
                    color:
                      line.tone === "key"
                        ? illustrationColors.ink
                        : illustrationColors.inkMuted,
                  }}
                >
                  {line.text}
                </span>
              ))}
            </div>
          </Panel>

          {/* Deployment panel */}
          <Panel className="flex w-full flex-col justify-between gap-2 p-2.5 lg:w-[46%]">
            <div className="flex items-center justify-between gap-2">
              <MicroLabel>Deployment</MicroLabel>
              <span
                className="text-[8px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                #248
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className="relative block h-[3px] flex-1 overflow-hidden"
                style={{
                  borderRadius: 999,
                  background: illustrationColors.surfaceSunk,
                }}
              >
                <motion.span
                  className="absolute inset-y-0 left-0 block origin-left"
                  style={{
                    borderRadius: 999,
                    background: illustrationColors.accent,
                    width: "100%",
                  }}
                  initial={false}
                  animate={{
                    scaleX: isLive ? 1 : deployBuilding ? 0.62 : 0.12,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.6, ease: illustrationEase }
                  }
                />
              </span>
              <Chip tone={isLive ? "accent" : "quiet"}>
                {isLive ? <CheckGlyph /> : <StatusDot tone="idle" />}
                {isLive ? "Live" : deployBuilding ? "Building" : "Queued"}
              </Chip>
            </div>

            <div className="flex items-center gap-1">
              <ArrowGlyph />
              <Bar width="52%" height={3} />
            </div>
          </Panel>
        </div>
      </div>
    </IllustrationStage>
  );
}
