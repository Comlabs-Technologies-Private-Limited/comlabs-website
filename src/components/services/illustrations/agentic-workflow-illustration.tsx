"use client";

import { Database, Mail, Radio, Table2 } from "lucide-react";

import { Chip, Panel, StatusDot, WindowDots } from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import { illustrationColors } from "./illustration-tokens";
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

  const toolsLive = step >= 3;
  const approved = step >= 5;
  const awaiting = step >= 4 && !approved;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" elevation="panel">
        <div
          className="flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 lg:px-4 lg:py-3"
          style={{ borderBottom: `1px solid ${illustrationColors.border}` }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <WindowDots />
            <span
              className="truncate text-[8px] leading-none font-medium tracking-tight lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              Agent run
            </span>
          </span>
          <Chip tone="quiet" size="compact">
            Guarded
          </Chip>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3 py-3 lg:px-4 lg:py-4">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {PIPELINE.map((label, index) => {
              const reached = step >= index;
              const current = step === index;
              return (
                <span key={label} className="flex items-center gap-1.5">
                  <span
                    className="text-[7px] leading-none lg:text-[8px]"
                    style={{
                      color: current
                        ? illustrationColors.ink
                        : reached
                          ? illustrationColors.inkMuted
                          : illustrationColors.inkFaint,
                    }}
                  >
                    {label}
                  </span>
                  {index < PIPELINE.length - 1 ? (
                    <span
                      className="text-[7px] leading-none"
                      style={{ color: illustrationColors.wire }}
                    >
                      /
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>

          <div className="mt-4 min-h-0 flex-1">
            <p
              className="text-[7px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Current task
            </p>
            <p
              className="mt-2 text-[9px] leading-[1.45] lg:text-[11px]"
              style={{ color: illustrationColors.ink }}
            >
              Pull Q3 renewal context and draft a reply for approval.
            </p>
          </div>

          <div
            className="flex items-center gap-4 py-3"
            style={{ borderTop: `1px solid ${illustrationColors.border}` }}
          >
            {TOOLS.map((tool, index) => {
              const live = toolsLive && (reduce || index <= step - 2);
              const Icon = tool.Icon;
              return (
                <span key={tool.label} className="flex items-center gap-1.5">
                  <Icon
                    size={10}
                    strokeWidth={1.5}
                    style={{
                      color: live ? illustrationColors.ink : illustrationColors.inkFaint,
                    }}
                  />
                  <span
                    className="text-[7px] leading-none lg:text-[8px]"
                    style={{
                      color: live ? illustrationColors.inkMuted : illustrationColors.inkFaint,
                    }}
                  >
                    {tool.label}
                  </span>
                </span>
              );
            })}
          </div>

          <div
            className="mt-auto flex items-center justify-between gap-3 pt-3"
            style={{ borderTop: `1px solid ${illustrationColors.border}` }}
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <StatusDot tone={approved ? "health" : awaiting ? "accent" : "idle"} />
              <span
                className="truncate text-[8px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.ink }}
              >
                {approved
                  ? "Action queued"
                  : awaiting
                    ? "Waiting on approval"
                    : "Gathering context"}
              </span>
            </span>
            <Chip tone={approved ? "health" : awaiting ? "accent" : "quiet"} size="compact">
              {approved ? "Approved" : awaiting ? "Review" : "Hold"}
            </Chip>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
