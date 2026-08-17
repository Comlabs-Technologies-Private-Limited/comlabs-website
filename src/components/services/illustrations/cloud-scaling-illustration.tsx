"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  AwsMark,
  CloudFrontMark,
  CloudWatchMark,
  Ec2Mark,
  RdsMark,
} from "./brand-marks";
import { CheckGlyph, MicroLabel, Panel } from "./illustration-primitives";
import {
  IllustrationStage,
  useIllustrationState,
} from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationRadius,
  illustrationShadow,
} from "./illustration-tokens";
import { useIllustrationSequence } from "./use-illustration-sequence";

const STEPS = 6;

const EC2_INSTANCES = [
  { id: "i-0a3b8c2d", type: "t3.medium", zone: "ap-south-1a" },
  { id: "i-0f7e1a9b", type: "t3.medium", zone: "ap-south-1b" },
  { id: "i-0c2d4e6f", type: "t3.medium", zone: "ap-south-1a" },
] as const;

/** Fan-out connector between infrastructure layers. */
function LayerConnector({
  targets,
  activeTargets,
}: {
  targets: number[];
  activeTargets: number;
}) {
  return (
    <svg
      viewBox="0 0 100 16"
      preserveAspectRatio="none"
      className="h-[12px] w-full lg:h-[16px]"
      aria-hidden
    >
      {targets.map((x, index) => (
        <path
          key={x}
          d={`M50,0 C50,8 ${x},8 ${x},16`}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          strokeLinecap="round"
          stroke={
            index < activeTargets
              ? illustrationColors.accentLine
              : illustrationColors.border
          }
          style={{
            transition: "stroke 420ms ease, opacity 420ms ease",
            opacity: index < activeTargets ? 1 : 0.45,
          }}
        />
      ))}
    </svg>
  );
}

function ServiceNode({
  label,
  meta,
  Mark,
  active,
  className,
}: {
  label: string;
  meta: string;
  Mark: typeof CloudFrontMark;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: illustrationRadius.control,
        background: active ? illustrationColors.surface : illustrationColors.surfaceMuted,
        border: `1px solid ${
          active ? "rgba(201,100,66,0.22)" : illustrationColors.border
        }`,
        boxShadow: active ? illustrationShadow.chip : undefined,
        transition: "background 420ms ease, border-color 420ms ease",
      }}
    >
      <div className="flex items-center gap-1.5 px-2 py-[5px] lg:px-2.5 lg:py-[6px]">
        <span
          className="flex h-[16px] w-[16px] shrink-0 items-center justify-center lg:h-[18px] lg:w-[18px]"
          style={{
            borderRadius: illustrationRadius.chip,
            background: active ? "#F7F7F4" : illustrationColors.surfaceSunk,
          }}
        >
          <Mark />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <span
            className="truncate text-[7px] leading-none font-medium lg:text-[9px]"
            style={{ color: active ? illustrationColors.ink : illustrationColors.inkMuted }}
          >
            {label}
          </span>
          <span
            className="truncate text-[6px] leading-none lg:text-[7.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            {meta}
          </span>
        </div>
        {active ? (
          <span
            className="block h-[4px] w-[4px] shrink-0 rounded-full"
            style={{ background: illustrationColors.accent }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function CloudScalingIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({ steps: STEPS, active, reduce });

  const trafficHigh = step >= 1;
  const scaledOut = step >= 2;
  const redistributed = step >= 3;
  const dataFlowing = step >= 4;
  const confirmed = step >= 5;

  const activeInstanceRoutes = redistributed ? 3 : scaledOut ? 2 : trafficHigh ? 2 : 1;
  const instanceCount = scaledOut ? 3 : 2;

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col overflow-hidden" elevation="raised">
        {/* Console header */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-2.5 py-2 lg:px-3 lg:py-2.5"
          style={{
            borderColor: illustrationColors.border,
            background: illustrationColors.surfaceMuted,
          }}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <AwsMark className="h-[10px] w-[16px] lg:h-[11px] lg:w-[18px]" />
            <span
              className="truncate text-[7.5px] leading-none font-medium lg:text-[9px]"
              style={{ color: illustrationColors.ink }}
            >
              AWS Console
            </span>
            <span
              className="shrink-0 px-1 py-[2px] text-[6px] leading-none lg:text-[7px]"
              style={{
                borderRadius: 3,
                background: illustrationColors.surfaceSunk,
                color: illustrationColors.inkMuted,
              }}
            >
              ap-south-1
            </span>
          </span>
          <span
            className="shrink-0 text-[6px] leading-none lg:text-[7.5px]"
            style={{ color: illustrationColors.inkFaint }}
          >
            prod-api
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-2.5 lg:p-3">
          {/* CloudWatch metrics */}
          <div className="flex shrink-0 items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1">
              <CloudWatchMark />
              <MicroLabel tone="muted">Request rate</MicroLabel>
            </span>
            <div className="flex items-center gap-1.5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={trafficHigh ? "high" : "base"}
                  initial={reduce ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -3 }}
                  transition={{ duration: 0.24, ease: illustrationEase }}
                  className="text-[9px] leading-none font-medium tabular-nums lg:text-[11px]"
                  style={{ color: illustrationColors.ink }}
                >
                  {trafficHigh ? "4,820" : "1,240"}
                </motion.span>
              </AnimatePresence>
              <span
                className="text-[7px] leading-none lg:text-[9px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                req/min
              </span>
            </div>
          </div>

          <div className="mt-1.5 flex shrink-0 items-end gap-[2px]">
            {Array.from({ length: 20 }).map((_, index) => {
              const filled = trafficHigh ? index < 16 : index < 5;
              return (
                <motion.span
                  key={index}
                  className="block flex-1"
                  initial={false}
                  animate={{ height: filled ? 6 : 2 }}
                  transition={{
                    duration: reduce ? 0 : 0.4,
                    delay: reduce ? 0 : index * 0.012,
                    ease: illustrationEase,
                  }}
                  style={{
                    borderRadius: 999,
                    background: filled
                      ? illustrationColors.accent
                      : illustrationColors.surfaceSunk,
                  }}
                />
              );
            })}
          </div>

          <LayerConnector targets={[50]} activeTargets={1} />

          <ServiceNode
            label="CloudFront"
            meta="d1234abcd.cloudfront.net"
            Mark={CloudFrontMark}
            active={trafficHigh}
            className="mx-auto w-[78%] shrink-0"
          />

          <LayerConnector targets={[50]} activeTargets={trafficHigh ? 1 : 0} />

          <ServiceNode
            label="Application Load Balancer"
            meta="alb-prod-api · 3 targets"
            Mark={AwsMark}
            active={trafficHigh}
            className="mx-auto w-[78%] shrink-0"
          />

          <LayerConnector
            targets={[18, 50, 82]}
            activeTargets={activeInstanceRoutes}
          />

          {/* EC2 Auto Scaling group */}
          <div className="grid shrink-0 grid-cols-3 gap-1">
            {EC2_INSTANCES.map((instance, index) => {
              const isNew = index === 2;
              const visible = !isNew || scaledOut;
              return (
                <motion.div
                  key={instance.id}
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0.3,
                    scale: visible ? 1 : 0.96,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.42,
                    ease: illustrationEase,
                  }}
                >
                  <div
                    className="flex flex-col gap-[3px] px-1 py-[5px] lg:py-[6px]"
                    style={{
                      borderRadius: illustrationRadius.control,
                      background: visible
                        ? illustrationColors.surface
                        : "transparent",
                      border: `1px ${visible ? "solid" : "dashed"} ${
                        visible ? illustrationColors.border : illustrationColors.wire
                      }`,
                    }}
                  >
                    <span className="flex items-center justify-center gap-0.5">
                      <Ec2Mark className="h-[8px] w-[8px] lg:h-[10px] lg:w-[10px]" />
                      <span
                        className="truncate text-[6px] leading-none font-medium lg:text-[7.5px]"
                        style={{
                          color: visible
                            ? illustrationColors.ink
                            : illustrationColors.inkFaint,
                        }}
                      >
                        {isNew && !scaledOut ? "pending" : instance.id.slice(0, 8)}
                      </span>
                    </span>
                    <span
                      className="truncate text-center text-[5.5px] leading-none lg:text-[6.5px]"
                      style={{ color: illustrationColors.inkFaint }}
                    >
                      {visible ? instance.type : "ASG"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <LayerConnector targets={[50]} activeTargets={dataFlowing ? 1 : 0} />

          <ServiceNode
            label="Amazon RDS"
            meta="aurora-mysql · primary + replica"
            Mark={RdsMark}
            active={dataFlowing}
            className="mx-auto w-[78%] shrink-0"
          />

          {/* Operations footer */}
          <div
            className="mt-auto flex shrink-0 items-center justify-between gap-2 px-2 py-[5px] lg:py-[6px]"
            style={{
              borderRadius: illustrationRadius.control,
              background: illustrationColors.surfaceMuted,
              border: `1px solid ${illustrationColors.border}`,
            }}
          >
            <div className="flex min-w-0 items-center gap-1.5">
              {confirmed ? (
                <CheckGlyph size={8} />
              ) : (
                <span
                  className="block h-[4px] w-[4px] shrink-0 rounded-full"
                  style={{ background: illustrationColors.accent }}
                />
              )}
              <span
                className="truncate text-[7px] leading-none font-medium lg:text-[9px]"
                style={{ color: illustrationColors.ink }}
              >
                {confirmed
                  ? "Target group healthy"
                  : scaledOut
                    ? `Scaling · ${instanceCount} instances`
                    : "Monitoring traffic"}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className="text-[6px] leading-none lg:text-[7.5px]"
                style={{ color: illustrationColors.inkFaint }}
              >
                p95
              </span>
              <span
                className="text-[7px] leading-none font-medium tabular-nums lg:text-[9px]"
                style={{ color: illustrationColors.inkMuted }}
              >
                128 ms
              </span>
            </div>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
