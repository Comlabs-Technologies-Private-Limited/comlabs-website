"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  Settings2,
} from "lucide-react";

import {
  OutlookMark,
  SalesforceMark,
  SlackMark,
  StripeMark,
} from "./brand-marks";
import { Chip, DrawnCheck, Panel } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationShadow,
  illustrationSpring,
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
const accentSoft = illustrationColors.accentSoft;
const accentLine = illustrationColors.accentLine;

/** Softer sage — less saturated than global health green. */
const sage = "#5F7266";
const sageSoft = "#F1F4F2";
const sageLine = "rgba(95, 114, 102, 0.2)";
const sageBorder = "rgba(95, 114, 102, 0.16)";

const NAV = [
  { label: "Overview", Icon: LayoutDashboard },
  { label: "Requests", Icon: ClipboardList, active: true },
  { label: "Customers", Icon: Building2 },
  { label: "Operations", Icon: Settings2 },
] as const;

const WORKFLOW = [
  { id: 1, label: "Request received", at: 1, Mark: null },
  { id: 2, label: "Workspace provisioned", at: 2, Mark: null },
  { id: 3, label: "CRM record created", at: 3, Mark: SalesforceMark },
  { id: 4, label: "Admin seats assigned", at: 4, Mark: null },
  { id: 5, label: "Kickoff invite sent", at: 5, Mark: OutlookMark },
] as const;

const CHECKLIST = [
  { label: "Identity federation", at: 2, Mark: null },
  { label: "Billing account linked", at: 3, Mark: StripeMark },
  { label: "Ops channel created", at: 4, Mark: SlackMark },
  { label: "Kickoff scheduled", at: 5, Mark: OutlookMark },
] as const;

const CONNECTED = [
  { name: "Salesforce", Mark: SalesforceMark },
  { name: "Stripe", Mark: StripeMark },
  { name: "Slack", Mark: SlackMark },
  { name: "Outlook", Mark: OutlookMark },
] as const;

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 7,
    active,
    reduce,
    stepMs: [720, 780, 800, 820, 780, 900],
    startDelayMs: 400,
    loop: true,
    loopDelayMs: 2100,
  });

  const ready = step >= 6 || reduce;
  const minsLeft = reduce ? 0 : Math.max(0, 14 - step * 2);
  const layoutTransition = reduce ? { duration: 0 } : illustrationSpring.panel;

  return (
    <IllustrationStage className="overflow-hidden p-0">
      <Panel
        className="flex h-full min-h-0 overflow-hidden border-0"
        elevation="flat"
        radius={0}
        style={{ background: surface }}
      >
        {/* Left rail — desktop */}
        <div
          className="hidden w-[22%] shrink-0 flex-col border-r py-2.5 lg:flex"
          style={{ borderColor: border, background: surfaceMuted }}
        >
          <p
            className="px-2.5 pb-2 text-[8px] font-medium tracking-tight"
            style={{ color: inkFaint }}
          >
            Atlas Ops
          </p>
          <nav className="relative flex flex-col gap-0.5 px-1.5">
            {NAV.map((item) => {
              const activeNav = "active" in item && item.active;
              return (
                <div
                  key={item.label}
                  className="relative flex items-center gap-1.5 rounded-[6px] px-1.5 py-1.5"
                  style={{ color: activeNav ? accent : inkMuted }}
                >
                  {activeNav && !reduce ? (
                    <motion.span
                      layoutId="atlas-nav-pill"
                      className="absolute inset-0 rounded-[6px]"
                      style={{ background: accentSoft }}
                      transition={layoutTransition}
                    />
                  ) : activeNav ? (
                    <span
                      className="absolute inset-0 rounded-[6px]"
                      style={{ background: accentSoft }}
                    />
                  ) : null}
                  <item.Icon className="relative size-3 shrink-0" strokeWidth={1.6} />
                  <span className="relative text-[8px] font-medium tracking-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Request header */}
          <div
            className="flex shrink-0 items-start justify-between gap-2 border-b px-3 py-2.5 lg:px-3.5"
            style={{ borderColor: border }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <p
                  className="truncate text-[10px] font-medium tracking-tight lg:text-[11px]"
                  style={{ color: ink }}
                >
                  Helio Growth · Workspace onboarding
                </p>
                <motion.span layout transition={layoutTransition} className="inline-flex">
                  <Chip
                    tone={ready ? "quiet" : "accent"}
                    size="compact"
                    style={
                      ready
                        ? {
                            background: sageSoft,
                            color: sage,
                            borderColor: sageBorder,
                          }
                        : undefined
                    }
                  >
                    {ready ? "Ready" : "In progress"}
                  </Chip>
                </motion.span>
              </div>
              <div
                className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[7.5px] tracking-tight lg:text-[8px]"
                style={{ color: inkMuted }}
              >
                <span>Customer: Helio Growth</span>
                <span>Region: ap-south-1</span>
                <span>Plan: Growth</span>
                <span>Owner: Arjun</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Workflow board — top-anchored so the ready banner never re-centers the stack */}
            <div className="flex min-w-0 flex-1 flex-col justify-start overflow-hidden px-3 pt-2.5 pb-0 lg:px-3.5 lg:pt-2">
              <p
                className="mb-2 shrink-0 text-[7px] font-medium tracking-[0.04em] uppercase lg:text-[7.5px]"
                style={{ color: inkFaint }}
              >
                Implementation workflow
              </p>
              <ol className="relative min-h-0 shrink space-y-1.5 overflow-hidden">
                {WORKFLOW.map((item) => {
                  const done = step >= item.at || reduce;
                  const currentlyActive =
                    !reduce && !done && step === item.at - 1;

                  return (
                    <li
                      key={item.id}
                      className="relative flex items-center gap-2 rounded-[8px] border px-2 py-1.5 lg:px-2.5"
                      style={{
                        borderColor: done ? sageBorder : border,
                        background: done ? sageSoft : surface,
                      }}
                    >
                      {currentlyActive ? (
                        <motion.span
                          layoutId="atlas-workflow-active"
                          className="absolute inset-0 rounded-[8px] border"
                          style={{
                            borderColor: accentLine,
                            background: accentSoft,
                            boxShadow: illustrationShadow.panel,
                          }}
                          transition={layoutTransition}
                        />
                      ) : null}

                      <div
                        className="relative z-[1] flex size-5 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          borderColor: done
                            ? sageLine
                            : currentlyActive
                              ? accentLine
                              : borderStrong,
                          background: done
                            ? sageSoft
                            : currentlyActive
                              ? surface
                              : surfaceSunk,
                        }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {done ? (
                            <motion.span
                              key="check"
                              initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
                              transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                            >
                              <DrawnCheck
                                show
                                size={10}
                                reduce={Boolean(reduce)}
                                color={sage}
                              />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="num"
                              initial={reduce ? false : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={reduce ? undefined : { opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.18, ease: EASE }}
                              className="text-[7px] font-medium tracking-tight"
                              style={{
                                color: currentlyActive ? accent : inkFaint,
                              }}
                            >
                              {item.id}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <span
                        className="relative z-[1] min-w-0 flex-1 text-[8.5px] font-medium tracking-tight lg:text-[9.5px]"
                        style={{
                          color: done || currentlyActive ? ink : inkFaint,
                        }}
                      >
                        {item.label}
                      </span>
                      {item.Mark ? (
                        <item.Mark className="relative z-[1] h-3 w-3 shrink-0 opacity-90" />
                      ) : null}
                      <AnimatePresence mode="wait" initial={false}>
                        {done ? (
                          <motion.span
                            key="done"
                            initial={reduce ? false : { opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? undefined : { opacity: 0, y: -3 }}
                            transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                            className="relative z-[1] text-[7px] tracking-tight lg:text-[7.5px]"
                            style={{ color: sage }}
                          >
                            Done
                          </motion.span>
                        ) : currentlyActive ? (
                          <motion.span
                            key="running"
                            layoutId="atlas-step-status"
                            initial={reduce ? false : { opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? undefined : { opacity: 0, y: -3 }}
                            transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                            className="relative z-[1] text-[7px] tracking-tight lg:text-[7.5px]"
                            style={{ color: accent }}
                          >
                            Running
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>

              {/* Fixed slot — banner fades in without growing the column */}
              <div className="relative mt-2.5 h-[32px] shrink-0 lg:h-[34px]">
                <AnimatePresence>
                  {ready ? (
                    <motion.div
                      key="ready"
                      initial={reduce ? false : illustrationPopHidden}
                      animate={illustrationPopShown}
                      exit={illustrationPopHidden}
                      transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                      className="absolute inset-x-0 top-0 flex items-center gap-2 rounded-[8px] border px-2.5 py-2"
                      style={{
                        borderColor: sageLine,
                        background: sageSoft,
                      }}
                    >
                      <DrawnCheck show size={12} reduce={Boolean(reduce)} color={sage} />
                      <p
                        className="text-[9px] font-medium tracking-tight lg:text-[10px]"
                        style={{ color: sage }}
                      >
                        Workspace ready
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Side panel */}
            <div
              className="hidden w-[38%] shrink-0 flex-col overflow-hidden border-l px-2.5 pt-2.5 pb-0 sm:flex lg:w-[34%] lg:px-3 lg:pt-2"
              style={{ borderColor: border, background: surfaceMuted }}
            >
              <p
                className="text-[7.5px] font-medium tracking-tight lg:text-[8.5px]"
                style={{ color: ink }}
              >
                Implementation checklist
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ready ? "now" : minsLeft}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                  className="mt-0.5 text-[7px] tracking-tight lg:text-[7.5px]"
                  style={{ color: inkFaint }}
                >
                  {ready
                    ? "Customer-ready now"
                    : `Customer-ready in ${minsLeft} mins`}
                </motion.p>
              </AnimatePresence>

              <ul className="mt-2.5 flex-1 space-y-1.5">
                {CHECKLIST.map((item) => {
                  const done = step >= item.at || reduce;
                  return (
                    <motion.li
                      key={item.label}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="flex size-3.5 shrink-0 items-center justify-center rounded-full border"
                        style={{
                          borderColor: done ? sageLine : border,
                          background: done ? sageSoft : surface,
                        }}
                      >
                        {done ? (
                          <DrawnCheck
                            show
                            size={8}
                            reduce={Boolean(reduce)}
                            color={sage}
                          />
                        ) : null}
                      </div>
                      <span
                        className="min-w-0 flex-1 text-[7.5px] tracking-tight lg:text-[8px]"
                        style={{ color: done ? inkMuted : inkFaint }}
                      >
                        {item.label}
                      </span>
                      {item.Mark ? (
                        <item.Mark className="h-2.5 w-2.5 shrink-0 opacity-90" />
                      ) : null}
                    </motion.li>
                  );
                })}
              </ul>

              <div
                className="mt-auto shrink-0 rounded-[8px] border px-2 py-1.5 mb-2.5 lg:mb-2"
                style={{
                  borderColor: ready ? sageBorder : border,
                  background: surface,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={ready ? "connected" : "connecting"}
                    initial={reduce ? false : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -3 }}
                    transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                    className="text-[7px] tracking-tight lg:text-[7.5px]"
                    style={{ color: ready ? sage : inkFaint }}
                  >
                    {ready ? "All systems connected" : "Connecting systems…"}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {CONNECTED.map(({ name, Mark }, index) => {
                    const lit = ready || step >= index + 2 || reduce;
                    return (
                      <motion.span
                        key={name}
                        animate={{ opacity: lit ? 1 : 0.45 }}
                        transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                        className="flex size-5 items-center justify-center rounded-[5px] border"
                        style={{
                          borderColor: border,
                          background: surfaceMuted,
                        }}
                        title={name}
                      >
                        <Mark className="h-2.5 w-2.5" />
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
