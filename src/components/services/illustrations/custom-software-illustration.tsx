"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Inbox, LayoutGrid, Search, Settings2, Users } from "lucide-react";

import {
  OutlookMark,
  SalesforceMark,
  SlackMark,
} from "./brand-marks";
import { CheckGlyph, Chip, StatusDot, WindowDots } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationBlurShown,
  illustrationColors,
  illustrationEase,
  illustrationPopHidden,
  illustrationPopShown,
  illustrationRadius,
  illustrationShadow,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
  illustrationTiming,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

type Stage = "Request" | "Review" | "Build" | "Live";

const NAV = [
  { label: "Requests", Icon: Inbox, active: true },
  { label: "Workspaces", Icon: LayoutGrid, active: false },
  { label: "Teams", Icon: Users, active: false },
  { label: "Settings", Icon: Settings2, active: false },
] as const;

const REQUESTS = [
  { company: "Acme Corp", plan: "Enterprise", owner: "Priya", Source: SlackMark },
  { company: "Helio", plan: "Growth", owner: "Arjun", Source: SalesforceMark },
  { company: "Vithub", plan: "Studio", owner: "Meera", Source: OutlookMark },
  { company: "Formial", plan: "Scale", owner: "Jeet", Source: SalesforceMark },
] as const;

const FIELDS = [
  { label: "Plan", value: "Enterprise" },
  { label: "Owner", value: "Priya Shah" },
  { label: "Source", value: "Slack · #ops-requests" },
  { label: "Region", value: "ap-south-1" },
] as const;

const PROVISION = [
  { label: "Workspace created", hint: "atlas.app/acme", step: 3 },
  { label: "CRM record", hint: "Salesforce · AC-4421", step: 4 },
  { label: "Admin seats", hint: "12 seats assigned", step: 4 },
  { label: "Calendar invite", hint: "Outlook · kickoff", step: 5 },
] as const;

const INTEGRATIONS = [
  { name: "Slack", Mark: SlackMark, detail: "#ops-requests", step: 0 },
  { name: "Salesforce", Mark: SalesforceMark, detail: "AC-4421", step: 4 },
  { name: "Outlook", Mark: OutlookMark, detail: "Invites", step: 5 },
] as const;

const STEPS = 6;

const fade = {
  duration: illustrationTiming.transitionSec,
  ease: illustrationEase,
};

function acmeStage(step: number): Stage {
  if (step >= 5) return "Live";
  if (step >= 3) return "Build";
  if (step >= 2) return "Review";
  return "Request";
}

function rowStage(index: number, step: number): Stage {
  if (index === 0) return acmeStage(step);
  if (index === 1) return "Review";
  return "Live";
}

function AppMark() {
  return (
    <span
      className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[5px] lg:h-[18px] lg:w-[18px]"
      style={{ background: illustrationColors.ink }}
    >
      <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden>
        <rect x="0.5" y="0.5" width="4" height="4" rx="0.8" fill={illustrationColors.surface} />
        <rect x="5.5" y="0.5" width="4" height="4" rx="0.8" fill={illustrationColors.surface} opacity="0.45" />
        <rect x="0.5" y="5.5" width="4" height="4" rx="0.8" fill={illustrationColors.surface} opacity="0.45" />
        <rect x="5.5" y="5.5" width="4" height="4" rx="0.8" fill={illustrationColors.accent} />
      </svg>
    </span>
  );
}

function StatusLabel({ stage }: { stage: Stage }) {
  const live = stage === "Live";
  return (
    <span
      className="shrink-0 text-[6.5px] leading-none lg:text-[7.5px]"
      style={{
        color: live ? illustrationColors.accent : illustrationColors.inkMuted,
      }}
    >
      {stage}
    </span>
  );
}

export function CustomSoftwareIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const stage = acmeStage(step);
  const live = stage === "Live";
  const building = stage === "Build" || live;

  return (
    <IllustrationStage className="p-2 lg:p-3">
      <div
        className="flex h-full min-h-0 flex-col overflow-hidden"
        style={{
          borderRadius: illustrationRadius.device,
          background: illustrationColors.surface,
          border: `1px solid ${illustrationColors.borderStrong}`,
          boxShadow: illustrationShadow.raised,
        }}
      >
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-[7px] lg:px-3"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <WindowDots />
            <AppMark />
            <span
              className="truncate text-[8px] leading-none lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Atlas
            </span>
            <span
              className="hidden truncate text-[7px] leading-none lg:inline"
              style={{ color: illustrationColors.inkFaint }}
            >
              Operations
            </span>
          </span>
          <Chip tone={live ? "accent" : building ? "neutral" : "quiet"} size="compact">
            {live ? (
              <>
                <CheckGlyph size={6} />
                Live
              </>
            ) : building ? (
              "Provisioning"
            ) : (
              "New request"
            )}
          </Chip>
        </div>

        <div className="flex min-h-0 flex-1">
          <div
            className="hidden w-[22%] shrink-0 flex-col border-r lg:flex"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <div
              className="mx-1.5 mt-2 mb-1.5 flex items-center gap-1 rounded-[6px] border px-1.5 py-[5px]"
              style={{
                borderColor: illustrationColors.border,
                background: illustrationColors.surface,
              }}
            >
              <Search size={8} color={illustrationColors.inkFaint} />
              <span
                className="text-[7px] leading-none"
                style={{ color: illustrationColors.inkFaint }}
              >
                Search requests
              </span>
            </div>

            <div className="flex flex-col gap-1 px-1.5">
              {NAV.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 px-1.5 py-[6px]"
                  style={{
                    borderRadius: 6,
                    background: item.active ? illustrationColors.surface : "transparent",
                    boxShadow: item.active ? illustrationShadow.chip : undefined,
                  }}
                >
                  <item.Icon
                    size={9}
                    color={item.active ? illustrationColors.ink : illustrationColors.inkFaint}
                  />
                  <span
                    className="truncate text-[8px] leading-none"
                    style={{
                      color: item.active
                        ? illustrationColors.ink
                        : illustrationColors.inkMuted,
                    }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}
            </div>

            <div
              className="mt-auto flex flex-col gap-1 border-t px-1.5 py-2"
              style={{ borderColor: illustrationColors.border }}
            >
              <span
                className="px-1.5 text-[6.5px] leading-none"
                style={{ color: illustrationColors.inkFaint }}
              >
                Connected
              </span>
              {INTEGRATIONS.map((app) => {
                const connected = step >= app.step;
                return (
                  <span
                    key={app.name}
                    className="flex items-center gap-1.5 px-1.5 py-[5px]"
                    style={{
                      borderRadius: 6,
                      opacity: connected ? 1 : 0.42,
                      transition: "opacity 380ms ease",
                    }}
                  >
                    <app.Mark className="h-[10px] w-[10px]" />
                    <span className="min-w-0 flex-1">
                      <span
                        className="block truncate text-[7.5px] leading-none"
                        style={{ color: illustrationColors.ink }}
                      >
                        {app.name}
                      </span>
                      <span
                        className="mt-[3px] block truncate text-[6.5px] leading-none"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        {connected ? app.detail : "Waiting"}
                      </span>
                    </span>
                    {connected ? <CheckGlyph size={7} /> : <StatusDot tone="idle" />}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div
              className="flex shrink-0 items-center gap-1.5 border-b px-2.5 py-[7px] lg:px-3"
              style={{ borderColor: illustrationColors.border }}
            >
              <Inbox size={9} color={illustrationColors.inkMuted} />
              <span
                className="text-[8px] leading-none lg:text-[10px]"
                style={{ color: illustrationColors.ink }}
              >
                Requests
              </span>
              <span
                className="ml-auto text-[7px] leading-none tabular-nums lg:text-[8px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                4
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-1 pt-1 lg:px-1.5">
              {REQUESTS.map((row, index) => {
                const selected = index === 0;
                const current = rowStage(index, step);

                return (
                  <div
                    key={row.company}
                    className="mb-0.5 flex items-center gap-1.5 px-1.5 py-[7px] lg:px-2"
                    style={{
                      borderRadius: 8,
                      background: selected
                        ? illustrationColors.surfaceMuted
                        : "transparent",
                    }}
                  >
                    <span
                      className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[5px] lg:h-[18px] lg:w-[18px]"
                      style={{
                        background: illustrationColors.surface,
                      }}
                    >
                      <row.Source className="h-[9px] w-[9px] lg:h-[10px] lg:w-[10px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-1">
                        <span
                          className="truncate text-[7.5px] leading-none lg:text-[9px]"
                          style={{ color: illustrationColors.ink }}
                        >
                          {row.company}
                        </span>
                        {selected ? (
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={current}
                              initial={reduce ? false : illustrationTextSwapHidden}
                              animate={illustrationTextSwapShown}
                              exit={reduce ? undefined : illustrationTextSwapExit}
                              transition={illustrationSwap}
                              className="inline-flex"
                            >
                              <StatusLabel stage={current} />
                            </motion.span>
                          </AnimatePresence>
                        ) : (
                          <StatusLabel stage={current} />
                        )}
                      </span>
                      <span
                        className="mt-1 block truncate text-[6.5px] leading-none lg:text-[7.5px]"
                        style={{ color: illustrationColors.inkFaint }}
                      >
                        {row.plan} · {row.owner}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="flex w-[42%] shrink-0 flex-col border-l md:w-[36%] lg:w-[32%]"
            style={{
              borderColor: illustrationColors.border,
              background: illustrationColors.surfaceMuted,
            }}
          >
            <div
              className="flex shrink-0 items-center justify-between gap-1 border-b px-2 py-[7px] lg:px-2.5"
              style={{ borderColor: illustrationColors.border }}
            >
              <span className="min-w-0">
                <span
                  className="block truncate text-[8px] leading-none lg:text-[9.5px]"
                  style={{ color: illustrationColors.ink }}
                >
                  Acme Corp
                </span>
                <span
                  className="mt-1 block truncate text-[6.5px] leading-none"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  Workspace onboarding
                </span>
              </span>
              <SlackMark className="h-[10px] w-[10px]" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 lg:p-2.5">
              <div className="flex flex-col gap-1.5">
                {FIELDS.map((field) => (
                  <div key={field.label} className="flex items-baseline justify-between gap-2">
                    <span
                      className="shrink-0 text-[6.5px] leading-none lg:text-[7.5px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {field.label}
                    </span>
                    <span
                      className="truncate text-[7px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="flex min-h-0 flex-1 flex-col gap-1 rounded-[8px] border p-1.5 lg:p-2"
                style={{
                  borderColor: live ? "rgba(201,100,66,0.18)" : illustrationColors.border,
                  background: illustrationColors.surface,
                }}
              >
                <span
                  className="mb-0.5 text-[6.5px] leading-none lg:text-[7.5px]"
                  style={{ color: illustrationColors.inkFaint }}
                >
                  Provisioning
                </span>
                {PROVISION.map((item) => {
                  const done = step >= item.step;
                  return (
                    <div key={item.label} className="flex items-start gap-1.5 py-[3px]">
                      <span className="mt-px flex h-[12px] w-[12px] shrink-0 items-center justify-center">
                        {done ? <CheckGlyph size={8} /> : <StatusDot tone="idle" />}
                      </span>
                      <span className="min-w-0">
                        <span
                          className="block truncate text-[7.5px] leading-none lg:text-[8.5px]"
                          style={{
                            color: done ? illustrationColors.ink : illustrationColors.inkFaint,
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="mt-[3px] block truncate text-[6.5px] leading-none"
                          style={{
                            color: done
                              ? illustrationColors.inkMuted
                              : illustrationColors.wire,
                          }}
                        >
                          {done ? item.hint : "Pending"}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {live ? (
                  <motion.div
                    key="live"
                    initial={reduce ? false : illustrationPopHidden}
                    animate={illustrationPopShown}
                    transition={fade}
                    className="flex items-center gap-1.5 rounded-[8px] border px-2 py-1.5"
                    style={{
                      borderColor: "rgba(201,100,66,0.20)",
                      background: illustrationColors.accentSoft,
                    }}
                  >
                    <CheckGlyph size={8} />
                    <span
                      className="truncate text-[7.5px] leading-none lg:text-[8.5px]"
                      style={{ color: illustrationColors.accent }}
                    >
                      Workspace live
                    </span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="progress"
                    initial={false}
                    animate={illustrationBlurShown}
                    className="truncate text-[7px] leading-none"
                    style={{ color: illustrationColors.inkFaint }}
                  >
                    {building ? "Provisioning systems…" : "Waiting to start…"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </IllustrationStage>
  );
}
