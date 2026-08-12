"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CheckGlyph, MicroLabel, Panel } from "./illustration-primitives";
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

const STEPS = 6;

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
      className="h-[14px] w-full lg:h-[18px]"
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
            opacity: index < activeTargets ? 1 : 0.55,
          }}
        />
      ))}
    </svg>
  );
}

function LayerNode({
  label,
  meta,
  active,
  className,
}: {
  label: string;
  meta?: string;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: illustrationRadius.control,
        background: active
          ? illustrationColors.accentSoft
          : illustrationColors.surface,
        border: `1px solid ${
          active ? "rgba(201,100,66,0.26)" : illustrationColors.border
        }`,
        transition: "background 420ms ease, border-color 420ms ease",
      }}
    >
      <div className="flex items-center justify-center gap-1 px-1.5 py-[6px]">
        <span
          className="truncate text-[7.5px] leading-none font-medium lg:text-[10px]"
          style={{
            color: active ? illustrationColors.accent : illustrationColors.ink,
          }}
        >
          {label}
        </span>
        {meta ? (
          <span
            className="hidden truncate text-[8px] leading-none lg:inline"
            style={{ color: illustrationColors.inkFaint }}
          >
            {meta}
          </span>
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

  return (
    <IllustrationStage>
      <Panel className="flex h-full flex-col p-2.5 lg:p-3.5" elevation="raised">
        {/* Traffic source */}
        <div className="flex shrink-0 items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5">
            <MicroLabel tone="muted">Incoming requests</MicroLabel>
            <span
              className="hidden shrink-0 px-1 py-[2px] text-[7.5px] leading-none font-medium lg:inline"
              style={{
                borderRadius: 3,
                background: illustrationColors.surfaceSunk,
                color: illustrationColors.inkMuted,
              }}
            >
              ap-south-1
            </span>
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
              className="text-[7.5px] leading-none lg:text-[10px]"
              style={{ color: illustrationColors.inkFaint }}
            >
              req/min
            </span>
          </div>
        </div>

        {/* Traffic intensity — request density, not a chart */}
        <div className="mt-1.5 flex shrink-0 items-end gap-[2px]">
          {Array.from({ length: 22 }).map((_, index) => {
            const filled = trafficHigh ? index < 18 : index < 6;
            return (
              <motion.span
                key={index}
                className="block flex-1"
                initial={false}
                animate={{ height: filled ? 7 : 3 }}
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

        {/* Edge */}
        <LayerNode
          label="Edge · load balancer"
          active={trafficHigh}
          className="mx-auto w-[74%] shrink-0"
        />

        <LayerConnector
          targets={[18, 50, 82]}
          activeTargets={activeInstanceRoutes}
        />

        {/* Application instances */}
        <div className="grid shrink-0 grid-cols-3 gap-1.5">
          {[0, 1, 2].map((instance) => {
            const isNew = instance === 2;
            const visible = !isNew || scaledOut;
            return (
              <motion.div
                key={instance}
                initial={false}
                animate={{
                  opacity: visible ? 1 : 0.28,
                  scale: visible ? 1 : 0.96,
                }}
                transition={{
                  duration: reduce ? 0 : 0.42,
                  ease: illustrationEase,
                }}
              >
                <div
                  className="flex flex-col items-center gap-[5px] px-1 py-[7px]"
                  style={{
                    borderRadius: illustrationRadius.control,
                    background: visible
                      ? illustrationColors.surfaceMuted
                      : "transparent",
                    border: `1px ${visible ? "solid" : "dashed"} ${
                      visible
                        ? illustrationColors.border
                        : illustrationColors.wire
                    }`,
                  }}
                >
                  <span
                    className="block h-[6px] w-[6px]"
                    style={{
                      borderRadius: 2,
                      background: visible
                        ? illustrationColors.accent
                        : illustrationColors.wire,
                    }}
                  />
                  <span
                    className="truncate text-[7px] leading-none lg:text-[9.5px]"
                    style={{
                      color: visible
                        ? illustrationColors.inkMuted
                        : illustrationColors.inkFaint,
                    }}
                  >
                    {isNew && !scaledOut ? "standby" : `app-0${instance + 1}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <LayerConnector
          targets={[50]}
          activeTargets={dataFlowing ? 1 : 0}
        />

        {/* Data layer */}
        <LayerNode
          label="Database"
          meta="primary + replica"
          active={dataFlowing}
          className="mx-auto w-[74%] shrink-0"
        />

        {/* Health panel */}
        <div
          className="mt-auto flex shrink-0 items-center justify-between gap-2 px-2 py-[6px]"
          style={{
            borderRadius: illustrationRadius.control,
            background: illustrationColors.surfaceMuted,
            border: `1px solid ${illustrationColors.border}`,
          }}
        >
          <div className="flex items-center gap-1.5">
            {confirmed ? (
              <CheckGlyph size={9} />
            ) : (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M6 9.5V2.8m0 0L3.3 5.5M6 2.8l2.7 2.7"
                  stroke={illustrationColors.accent}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <span
              className="text-[8px] leading-none font-medium lg:text-[10px]"
              style={{ color: illustrationColors.ink }}
            >
              {confirmed ? "All targets healthy" : "Scaling out"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="hidden text-[8.5px] leading-none lg:inline"
              style={{ color: illustrationColors.inkFaint }}
            >
              p95
            </span>
            <span
              className="text-[8px] leading-none font-medium tabular-nums lg:text-[10px]"
              style={{ color: illustrationColors.inkMuted }}
            >
              128 ms
            </span>
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}
