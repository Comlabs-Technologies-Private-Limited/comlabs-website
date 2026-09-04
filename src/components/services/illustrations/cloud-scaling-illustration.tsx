"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { AnimatedBeam } from "./animated-beam";
import {
  AlbMark,
  AwsMark,
  CloudFrontMark,
  CloudWatchMark,
  EcsMark,
  RdsMark,
} from "./brand-marks";
import {
  ActivitySpinner,
  Chip,
  DrawnCheck,
  Panel,
} from "./illustration-primitives";
import { IllustrationStage, useIllustrationState } from "./service-illustration-frame";
import {
  illustrationColors,
  illustrationEase,
  illustrationShadow,
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
const health = illustrationColors.health;
const healthSoft = illustrationColors.healthSoft;
const wire = illustrationColors.wire;

const DEPLOY_LINES = [
  { at: 2, text: "Deploying billing-service" },
  { at: 3, text: "Health checks passed" },
  { at: 4, text: "3/3 targets healthy" },
  { at: 5, text: "Zero-downtime rollout complete" },
] as const;

function instanceCount(step: number, reduce: boolean): number {
  if (reduce) return 5;
  if (step >= 6) return 5;
  if (step >= 4) return 4;
  return 3;
}

export function CloudScalingIllustration() {
  const { active, reduce } = useIllustrationState();
  const step = useIllustrationSequence({
    steps: 8,
    active,
    reduce,
    stepMs: [700, 780, 820, 860, 900, 780, 720],
    startDelayMs: 380,
    loop: true,
    loopDelayMs: 2200,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const cfRef = useRef<HTMLDivElement>(null);
  const albRef = useRef<HTMLDivElement>(null);
  const ecsRef = useRef<HTMLDivElement>(null);
  const rdsRef = useRef<HTMLDivElement>(null);

  const instances = instanceCount(step, Boolean(reduce));
  const deployComplete = step >= 5 || reduce;
  const trafficOn = step >= 1 || reduce;
  const deployProgress = reduce
    ? 100
    : step >= 5
      ? 100
      : step >= 4
        ? 78
        : step >= 3
          ? 52
          : step >= 2
            ? 28
            : 8;

  return (
    <IllustrationStage className="p-0">
      <Panel
        className="flex h-full min-h-0 flex-col overflow-hidden border-0"
        elevation="flat"
        radius={0}
        style={{ background: surface }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5 lg:px-4"
          style={{ borderColor: border }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <AwsMark className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />
            <p
              className="truncate text-[10px] font-medium tracking-tight lg:text-[11px]"
              style={{ color: ink }}
            >
              Production · ap-south-1
            </p>
          </div>
          <Chip tone="quiet" size="compact">
            v2.8.4
          </Chip>
        </div>

        {/* Topology */}
        <div
          ref={canvasRef}
          className="relative flex min-h-0 flex-1 items-center justify-between gap-1 px-2.5 py-3 lg:gap-2 lg:px-4"
        >
          {trafficOn && !reduce ? (
            <>
              <AnimatedBeam
                containerRef={canvasRef}
                fromRef={cfRef}
                toRef={albRef}
                duration={2.8}
                delay={0}
                loop
                enabled
                pathWidth={1}
                pathOpacity={0.55}
                gradientStartColor={health}
                gradientStopColor={accent}
              />
              <AnimatedBeam
                containerRef={canvasRef}
                fromRef={albRef}
                toRef={ecsRef}
                duration={2.8}
                delay={0.35}
                loop
                enabled
                pathWidth={1}
                pathOpacity={0.55}
                gradientStartColor={health}
                gradientStopColor={accent}
              />
              <AnimatedBeam
                containerRef={canvasRef}
                fromRef={ecsRef}
                toRef={rdsRef}
                duration={2.8}
                delay={0.7}
                loop
                enabled
                pathWidth={1}
                pathOpacity={0.55}
                gradientStartColor={health}
                gradientStopColor={accent}
              />
            </>
          ) : null}

          {/* CloudFront */}
          <div ref={cfRef} className="relative z-[1] w-[18%] shrink-0">
            <Panel
              className="px-1.5 py-2 text-center lg:px-2 lg:py-2.5"
              elevation="flat"
              radius={10}
              style={{ background: surfaceMuted }}
            >
              <CloudFrontMark className="mx-auto h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <p
                className="mt-1.5 text-[8px] font-medium tracking-tight lg:text-[9px]"
                style={{ color: ink }}
              >
                CloudFront
              </p>
              <p
                className="mt-0.5 text-[6.5px] tracking-tight lg:text-[7.5px]"
                style={{ color: inkFaint }}
              >
                Edge
              </p>
              <motion.span
                className="mx-auto mt-1.5 block size-1.5 rounded-full"
                style={{ background: health }}
                animate={
                  reduce || !trafficOn
                    ? { opacity: 1 }
                    : { opacity: [1, 0.35, 1] }
                }
                transition={
                  reduce || !trafficOn
                    ? { duration: 0 }
                    : { duration: 2.4, ease: "easeInOut", repeat: Infinity }
                }
              />
            </Panel>
          </div>

          {/* ALB */}
          <div ref={albRef} className="relative z-[1] w-[18%] shrink-0">
            <Panel
              className="px-1.5 py-2 text-center lg:px-2 lg:py-2.5"
              elevation="flat"
              radius={10}
              style={{ background: surfaceMuted }}
            >
              <AlbMark className="mx-auto h-3.5 w-3.5 lg:h-4 lg:w-4" />
              <p
                className="mt-1.5 text-[8px] font-medium tracking-tight lg:text-[9px]"
                style={{ color: ink }}
              >
                Load Balancer
              </p>
              <p
                className="mt-0.5 text-[6.5px] tracking-tight lg:text-[7.5px]"
                style={{ color: inkFaint }}
              >
                3 targets
              </p>
            </Panel>
          </div>

          {/* ECS — focal */}
          <div ref={ecsRef} className="relative z-[1] w-[34%] shrink-0">
            <Panel
              className="overflow-hidden"
              elevation="panel"
              radius={12}
              style={{
                background: surface,
                boxShadow: illustrationShadow.panel,
                borderColor: borderStrong,
              }}
            >
              <div
                className="flex items-center justify-between border-b px-2 py-1.5"
                style={{ borderColor: border, background: illustrationColors.surfaceWarm }}
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <EcsMark className="h-3 w-3 shrink-0" />
                  <p
                    className="truncate text-[8px] font-medium tracking-tight lg:text-[9px]"
                    style={{ color: ink }}
                  >
                    ECS · billing-service
                  </p>
                </div>
                <span
                  className="hidden text-[6.5px] tracking-tight tabular-nums lg:inline lg:text-[7.5px]"
                  style={{ color: health }}
                >
                  {instances} tasks
                </span>
              </div>
              <div className="flex items-end justify-center gap-1 px-2 py-2.5 lg:gap-1.5 lg:py-3">
                {Array.from({ length: 5 }).map((_, index) => {
                  const visible = index < instances;
                  return (
                    <motion.div
                      key={index}
                      className="flex h-9 w-[14%] flex-col overflow-hidden rounded-[5px] border lg:h-11"
                      initial={false}
                      animate={{
                        opacity: visible ? 1 : 0.2,
                        scaleY: visible ? 1 : 0.55,
                        y: visible ? 0 : 4,
                      }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                      style={{
                        borderColor: visible ? "rgba(63,122,90,0.22)" : border,
                        background: visible ? healthSoft : surfaceSunk,
                        transformOrigin: "bottom",
                      }}
                    >
                      <div
                        className="h-1.5 shrink-0"
                        style={{
                          background: visible ? health : wire,
                          opacity: visible ? 0.85 : 0.4,
                        }}
                      />
                      <div className="flex flex-1 items-center justify-center">
                        {visible ? (
                          <motion.span
                            className="size-1 rounded-full"
                            style={{ background: health }}
                            animate={
                              reduce
                                ? { opacity: 1 }
                                : { opacity: [1, 0.4, 1] }
                            }
                            transition={
                              reduce
                                ? { duration: 0 }
                                : {
                                    duration: 2.6,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    delay: index * 0.18,
                                  }
                            }
                          />
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div
                className="border-t px-2 py-1 text-center"
                style={{ borderColor: border }}
              >
                <p
                  className="text-[6.5px] tracking-tight lg:text-[7.5px]"
                  style={{ color: inkFaint }}
                >
                  Autoscaling · desired {instances}
                </p>
              </div>
            </Panel>
          </div>

          {/* RDS */}
          <div ref={rdsRef} className="relative z-[1] w-[20%] shrink-0">
            <Panel
              className="overflow-hidden"
              elevation="flat"
              radius={10}
              style={{ background: surfaceMuted }}
            >
              <div className="px-1.5 py-2 text-center lg:px-2">
                <RdsMark className="mx-auto h-3.5 w-3.5 lg:h-4 lg:w-4" />
                <p
                  className="mt-1.5 text-[8px] font-medium tracking-tight lg:text-[9px]"
                  style={{ color: ink }}
                >
                  RDS
                </p>
                <div className="mt-1.5 space-y-1">
                  <div
                    className="rounded-[4px] border px-1 py-0.5"
                    style={{
                      borderColor: "rgba(63,122,90,0.2)",
                      background: healthSoft,
                    }}
                  >
                    <p
                      className="text-[6.5px] font-medium tracking-tight lg:text-[7px]"
                      style={{ color: health }}
                    >
                      Primary
                    </p>
                  </div>
                  <div
                    className="rounded-[4px] border px-1 py-0.5"
                    style={{ borderColor: border, background: surface }}
                  >
                    <p
                      className="text-[6.5px] tracking-tight lg:text-[7px]"
                      style={{ color: inkFaint }}
                    >
                      Standby
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Deploy + metrics */}
        <div
          className="grid shrink-0 grid-cols-[1.15fr_1fr] gap-0 border-t"
          style={{ borderColor: border }}
        >
          <div
            className="border-r px-3 py-2.5 lg:px-4"
            style={{ borderColor: border, background: "#FFFFFF" }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <CloudWatchMark className="h-3 w-3" />
                <p
                  className="text-[7.5px] font-medium tracking-tight lg:text-[8.5px]"
                  style={{ color: ink }}
                >
                  Deploy event
                </p>
              </div>
              {deployComplete ? (
                <DrawnCheck show size={10} reduce={Boolean(reduce)} />
              ) : (
                <ActivitySpinner size={10} reduce={Boolean(reduce)} color={accent} />
              )}
            </div>
            <div
              className="mt-1.5 h-1 overflow-hidden rounded-full"
              style={{ background: surfaceSunk }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: deployComplete ? health : accent }}
                initial={false}
                animate={{ width: `${deployProgress}%` }}
                transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
              />
            </div>
            <ul className="mt-2 space-y-0.5">
              {DEPLOY_LINES.map((line) => {
                const visible = step >= line.at || reduce;
                return (
                  <motion.li
                    key={line.text}
                    initial={false}
                    animate={{
                      opacity: visible ? 1 : 0.35,
                      x: visible ? 0 : 2,
                    }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                    className="text-[7px] tracking-tight lg:text-[8px]"
                    style={{
                      color:
                        visible && line.at === 5
                          ? health
                          : visible
                            ? inkMuted
                            : inkFaint,
                    }}
                  >
                    {line.text}
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-3 py-2.5 lg:px-3.5">
            <Metric label="Requests" value="1,184/min" />
            <Metric label="p95 latency" value="128ms" />
            <Metric label="Error rate" value="0.03%" tone="health" />
            <Metric label="Backup" value="Successful" tone="health" />
          </div>
        </div>
      </Panel>
    </IllustrationStage>
  );
}

function Metric({
  label,
  value,
  tone = "ink",
}: {
  label: string;
  value: string;
  tone?: "ink" | "health";
}) {
  return (
    <div>
      <p className="text-[6.5px] tracking-tight lg:text-[7.5px]" style={{ color: inkFaint }}>
        {label}
      </p>
      <p
        className="mt-0.5 text-[9px] font-medium tracking-tight tabular-nums lg:text-[10px]"
        style={{ color: tone === "health" ? health : ink }}
      >
        {value}
      </p>
    </div>
  );
}
