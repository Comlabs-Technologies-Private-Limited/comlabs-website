"use client";

import { Database, Mail, Radio, Table2 } from "lucide-react";

import { Chip, MicroLabel, Panel, StatusDot, WindowDots } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import { illustrationColors, illustrationRadius } from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STEPS = 6;

const PIPELINE = [
  "Request",
  "Context",
  "Agent",
  "Tools",
  "Approval",
  "Action",
] as const;

const TOOLS = [
  { label: "CRM", Icon: Table2 },
  { label: "Database", Icon: Database },
  { label: "Email", Icon: Mail },
  { label: "API", Icon: Radio },
] as const;

export function AgenticWorkflowIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" elevation="raised">
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-2 lg:px-3 lg:py-2.5"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <span className="flex items-center gap-1.5">
            <WindowDots />
            <span
              className="text-[7.5px] leading-none font-medium lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              Agent run
            </span>
          </span>
          <Chip tone="quiet" size="compact">
            guarded
          </Chip>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-2.5 lg:p-3">
          <div className="flex flex-wrap gap-1">
            {PIPELINE.map((label, index) => {
              const reached = step >= index;
              const current = step === index;
              return (
                <span key={label} className="flex items-center gap-1">
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-[3px]"
                    style={{
                      borderRadius: illustrationRadius.chip,
                      background: current
                        ? illustrationColors.accentSoft
                        : reached
                          ? illustrationColors.surface
                          : illustrationColors.surfaceSunk,
                      border: `1px solid ${
                        current ? "rgba(201,100,66,0.22)" : illustrationColors.border
                      }`,
                      color: reached ? illustrationColors.ink : illustrationColors.inkFaint,
                    }}
                  >
                    <StatusDot tone={current ? "accent" : reached ? "muted" : "idle"} />
                    <span className="text-[6.5px] leading-none font-medium lg:text-[8px]">
                      {label}
                    </span>
                  </span>
                  {index < PIPELINE.length - 1 ? (
                    <span
                      className="text-[6px] leading-none"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      →
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>

          <div
            className="min-h-0 flex-1 px-2 py-2"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            <MicroLabel>User request</MicroLabel>
            <p
              className="mt-1 text-[8px] leading-snug lg:text-[9.5px]"
              style={{ color: illustrationColors.ink }}
            >
              Pull Q3 renewal context and draft a reply for approval.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {TOOLS.map((tool, index) => {
              const live = step >= 3 && (reduce || index <= step - 2);
              const Icon = tool.Icon;
              return (
                <div
                  key={tool.label}
                  className="flex flex-col items-center gap-1 px-1 py-1.5"
                  style={{
                    borderRadius: illustrationRadius.control,
                    background: live
                      ? illustrationColors.surface
                      : illustrationColors.surfaceSunk,
                    border: `1px solid ${
                      live ? "rgba(201,100,66,0.18)" : illustrationColors.border
                    }`,
                  }}
                >
                  <Icon
                    size={10}
                    strokeWidth={1.75}
                    style={{ color: live ? illustrationColors.accent : illustrationColors.inkFaint }}
                  />
                  <span
                    className="text-[6px] leading-none lg:text-[7.5px]"
                    style={{ color: live ? illustrationColors.ink : illustrationColors.inkFaint }}
                  >
                    {tool.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-auto flex items-center justify-between gap-2 px-2 py-[5px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            <span
              className="text-[7px] leading-none font-medium lg:text-[8.5px]"
              style={{ color: illustrationColors.ink }}
            >
              {step >= 5 ? "Action queued after approval" : "Waiting on human approval"}
            </span>
            <Chip tone={step >= 4 ? "accent" : "quiet"} size="compact">
              {step >= 5 ? "Approved" : "Hold"}
            </Chip>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
