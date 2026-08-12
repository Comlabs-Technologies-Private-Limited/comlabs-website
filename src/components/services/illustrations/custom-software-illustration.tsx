"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
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

const CONFIG_ROWS = [
  { key: "rule", value: "purchase_order" },
  { key: "limit", value: "₹2,50,000" },
  { key: "approver", value: "founder" },
  { key: "on_pass", value: "provision" },
] as const;

const STEPS = 6;

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  // The record sits at Request from the first frame, then advances one stage per step.
  const recordIndex = Math.min(step, STAGES.length - 1);
  const validationPassed = step >= 2;
  const approved = step >= 3;
  const deployBuilding = step >= 4;
  const isLive = step >= 5;

  return (
    <IllustrationStage>
      <div className="flex h-full flex-col gap-2.5 lg:gap-3.5">
        {/* Workflow + order detail — primary object */}
        <Panel className="flex flex-1 flex-col p-2.5 lg:p-4" elevation="raised">
          <div className="mb-2 flex items-center justify-between gap-2 lg:mb-3">
            <MicroLabel tone="muted">Purchase order · PO-4821</MicroLabel>
            <Chip tone={isLive ? "accent" : "quiet"}>
              {isLive ? <CheckGlyph /> : <StatusDot tone="idle" />}
              {isLive ? "Completed" : "Running"}
            </Chip>
          </div>

          {/* Travelling record */}
          <div className="grid grid-cols-5 pb-2 lg:pb-2.5">
            {STAGES.map((stage, index) => (
              <div key={stage} className="flex justify-center">
                {index === recordIndex ? (
                  <motion.div
                    layoutId="software-record"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.42, ease: illustrationEase }
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
              animate={{ scaleX: recordIndex / (STAGES.length - 1) }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.42, ease: illustrationEase }
              }
            />

            <div className="relative grid grid-cols-5">
              {STAGES.map((stage, index) => {
                const reached = index <= recordIndex;
                return (
                  <div key={stage} className="flex flex-col items-center gap-1.5">
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

          {/* Order facts — a single row on desktop keeps the panel open */}
          <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-[7px] lg:mt-5 lg:grid-cols-4 lg:gap-x-3">
            {[
              { label: "Vendor", value: "Sundaram Traders" },
              { label: "Requester", value: "Ops · Priya N." },
              { label: "Amount", value: "₹2,40,000" },
              {
                label: "Policy",
                value: validationPassed ? "Within limit" : "Checking…",
              },
            ].map((fact) => (
              <div key={fact.label} className="flex min-w-0 flex-col gap-[2px]">
                <span
                  className="text-[6.5px] leading-none tracking-[0.1em] uppercase lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  {fact.label}
                </span>
                <span
                  className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>

          {/* Approval activity */}
          <div
            className="mt-auto flex items-center gap-1.5 px-2 py-[7px] lg:px-2.5 lg:py-[9px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: approved
                ? illustrationColors.surfaceWarm
                : illustrationColors.surfaceMuted,
              border: `1px solid ${
                approved ? "rgba(201,100,66,0.18)" : illustrationColors.border
              }`,
              transition: "background 380ms ease, border-color 380ms ease",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={
                  isLive
                    ? "live"
                    : approved
                      ? "approved"
                      : validationPassed
                        ? "passed"
                        : "received"
                }
                initial={reduce ? false : { opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -2 }}
                transition={{ duration: 0.2, ease: illustrationEase }}
                className="flex min-w-0 items-center gap-1.5"
              >
                {validationPassed ? <CheckGlyph /> : <StatusDot tone="muted" />}
                <span
                  className="truncate text-[7.5px] leading-none lg:text-[9px]"
                  style={{ color: illustrationColors.inkMuted }}
                >
                  {isLive
                    ? "Provisioned · vendor notified 12:04"
                    : approved
                      ? "Approved by P. Mishra · 12:02"
                      : validationPassed
                        ? "Validation passed · budget in policy"
                        : "Submitted by Ops · 11:58"}
                </span>
              </motion.span>
            </AnimatePresence>
          </div>
        </Panel>

        {/* Supporting panels */}
        <div className="flex shrink-0 items-stretch gap-2.5">
          {/* Rule configuration — labelled rows rather than raw lines */}
          <Panel className="hidden min-w-0 flex-1 flex-col gap-[6px] p-3 lg:flex">
            <MicroLabel>Rule configuration</MicroLabel>
            <div className="flex flex-col gap-[6px] pt-[2px]">
              {CONFIG_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-2"
                >
                  <span
                    className="shrink-0 text-[8.5px] leading-none"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      color: illustrationColors.inkFaint,
                    }}
                  >
                    {row.key}
                  </span>
                  <span
                    className="truncate text-[8.5px] leading-none font-medium"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      color: illustrationColors.ink,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Deployment */}
          <Panel className="flex w-full flex-col justify-between gap-2 p-2.5 lg:w-[46%] lg:gap-2.5 lg:p-3">
            <div className="flex items-center justify-between gap-2">
              <MicroLabel>Deployment</MicroLabel>
              <span
                className="text-[8px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                build #248
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
                  className="absolute inset-y-0 left-0 block w-full origin-left"
                  style={{
                    borderRadius: 999,
                    background: illustrationColors.accent,
                  }}
                  initial={false}
                  animate={{
                    scaleX: isLive ? 1 : deployBuilding ? 0.62 : 0.18,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.5, ease: illustrationEase }
                  }
                />
              </span>
              <Chip tone={isLive ? "accent" : "quiet"}>
                {isLive ? <CheckGlyph /> : <StatusDot tone="idle" />}
                {isLive ? "Live" : deployBuilding ? "Building" : "Queued"}
              </Chip>
            </div>

            <span
              className="truncate text-[7.5px] leading-none lg:text-[8.5px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              {isLive
                ? "ap-south-1 · 2 instances healthy"
                : "Awaiting approval gate"}
            </span>
          </Panel>
        </div>
      </div>
    </IllustrationStage>
  );
}
