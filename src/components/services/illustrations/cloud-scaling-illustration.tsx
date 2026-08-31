"use client";

import { AnimatePresence, motion } from "framer-motion";

import { AwsMark, CloudFrontMark, Ec2Mark, RdsMark } from "./brand-marks";
import { Chip, Panel, StatusDot } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationSwap,
  illustrationTextSwapExit,
  illustrationTextSwapHidden,
  illustrationTextSwapShown,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STEPS = 6;

type Resource = {
  label: string;
  meta: string;
  Mark: typeof CloudFrontMark;
  readyFrom: number;
};

const RESOURCES: readonly Resource[] = [
  {
    label: "CloudFront",
    meta: "d1234abcd.cloudfront.net",
    Mark: CloudFrontMark,
    readyFrom: 1,
  },
  {
    label: "Application Load Balancer",
    meta: "alb-prod-api · 3 targets",
    Mark: AwsMark,
    readyFrom: 1,
  },
  {
    label: "EC2",
    meta: "t3.medium · ap-south-1",
    Mark: Ec2Mark,
    readyFrom: 2,
  },
  {
    label: "RDS Aurora",
    meta: "primary + replica",
    Mark: RdsMark,
    readyFrom: 4,
  },
];

export function CloudScalingIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const trafficHigh = step >= 1;
  const scaledOut = step >= 2;
  const dataFlowing = step >= 4;
  const confirmed = step >= 5;
  const healthyCount = RESOURCES.filter((item) => step >= item.readyFrom).length;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" elevation="panel">
        <div
          className="flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 lg:px-4 lg:py-3"
          style={{ borderBottom: `1px solid ${illustrationColors.border}` }}
        >
          <span className="flex min-w-0 items-center gap-2">
            <AwsMark className="h-[10px] w-[16px] lg:h-[11px] lg:w-[18px]" />
            <span className="min-w-0">
              <span
                className="block truncate text-[8px] leading-none font-medium tracking-tight lg:text-[10px]"
                style={{ color: illustrationColors.ink }}
              >
                Production
              </span>
              <span
                className="mt-1 block truncate text-[7px] leading-none lg:text-[8px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                prod-api · ap-south-1
              </span>
            </span>
          </span>
          <Chip tone={confirmed ? "health" : "quiet"} size="compact">
            {confirmed ? "Healthy" : "Watching"}
          </Chip>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3 pt-3 pb-3 lg:px-4 lg:pt-4">
          <div className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-3">
            <Metric
              label="Request rate"
              value={trafficHigh ? "4,820" : "1,240"}
              unit="/min"
              reduce={Boolean(reduce)}
            />
            <Metric label="p95 latency" value="128" unit="ms" reduce={Boolean(reduce)} />
          </div>

          <div className="mt-3 flex h-[18px] shrink-0 items-end gap-[3px]">
            {Array.from({ length: 24 }).map((_, index) => {
              const filled = trafficHigh ? index < 18 : index < 6;
              return (
                <span
                  key={index}
                  className="block flex-1"
                  style={{
                    height: filled ? (index % 4 === 0 ? 18 : 12) : 5,
                    borderRadius: 999,
                    background: filled ? illustrationColors.ink : illustrationColors.surfaceSunk,
                    opacity: filled ? 0.72 : 1,
                    transition: "height 420ms ease, background 420ms ease",
                  }}
                />
              );
            })}
          </div>

          <div
            className="mt-4 flex items-center justify-between gap-3 pb-2"
            style={{ borderBottom: `1px solid ${illustrationColors.border}` }}
          >
            <span
              className="text-[7px] leading-none lg:text-[8px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              Infrastructure
            </span>
            <span
              className="text-[7px] leading-none tabular-nums lg:text-[8px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              {healthyCount}/{RESOURCES.length} healthy
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            {RESOURCES.map((item, index) => {
              const ready = step >= item.readyFrom;
              const extra = item.label === "EC2" && scaledOut ? " · 3 instances" : "";
              const Mark = item.Mark;
              return (
                <div
                  key={item.label}
                  className="flex min-h-0 flex-1 items-center gap-2.5"
                  style={{
                    borderTop: index === 0 ? undefined : `1px solid ${illustrationColors.border}`,
                  }}
                >
                  <span
                    className="flex h-[16px] w-[16px] shrink-0 items-center justify-center lg:h-[18px] lg:w-[18px]"
                    style={{ background: illustrationColors.surfaceMuted, borderRadius: 6 }}
                  >
                    <Mark />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block truncate text-[8px] leading-none lg:text-[9.5px]"
                      style={{ color: illustrationColors.ink }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mt-1 block truncate text-[7px] leading-none lg:text-[8px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {item.meta}
                      {extra}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    <StatusDot tone={ready ? "health" : "idle"} />
                    <span
                      className="text-[7px] leading-none lg:text-[8px]"
                      style={{
                        color: ready ? illustrationColors.health : illustrationColors.inkFaint,
                      }}
                    >
                      {ready ? "Healthy" : "Sync"}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="mt-1 grid shrink-0 grid-cols-2 gap-x-6 pt-3"
            style={{ borderTop: `1px solid ${illustrationColors.border}` }}
          >
            <span>
              <span
                className="block text-[7px] leading-none lg:text-[8px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Last deploy
              </span>
              <span
                className="mt-1.5 block text-[8px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.ink }}
              >
                {confirmed ? "14:02 · successful" : "In flight"}
              </span>
            </span>
            <span>
              <span
                className="block text-[7px] leading-none lg:text-[8px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                Backups
              </span>
              <span
                className="mt-1.5 block text-[8px] leading-none lg:text-[9px]"
                style={{
                  color: confirmed ? illustrationColors.health : illustrationColors.inkMuted,
                }}
              >
                {confirmed || dataFlowing ? "Successful" : "Queued"}
              </span>
            </span>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}

function Metric({
  label,
  value,
  unit,
  reduce,
}: {
  label: string;
  value: string;
  unit: string;
  reduce: boolean;
}) {
  return (
    <div>
      <span
        className="block text-[7px] leading-none lg:text-[8px]"
        style={{ color: illustrationColors.inkFaint }}
      >
        {label}
      </span>
      <span className="mt-1.5 flex items-baseline gap-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={value}
            initial={reduce ? false : illustrationTextSwapHidden}
            animate={illustrationTextSwapShown}
            exit={reduce ? undefined : illustrationTextSwapExit}
            transition={illustrationSwap}
            className="text-[13px] leading-none font-medium tracking-tight tabular-nums lg:text-[15px]"
            style={{ color: illustrationColors.ink }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span
          className="text-[7.5px] leading-none lg:text-[8.5px]"
          style={{ color: illustrationColors.inkFaint }}
        >
          {unit}
        </span>
      </span>
    </div>
  );
}
