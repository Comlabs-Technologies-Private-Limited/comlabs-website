"use client";

import { useReducedMotion } from "motion/react";
import { Beam, Group, Pixelate, Shader, SolidColor } from "shaders/react";

const CTA_BLACK = "#1c1917";
const BEAM_CORE = "#f7f7f4";
const BEAM_EDGE = "#a8a29e";

type AutoAnimate = {
  type: "auto-animate";
  mode: "ping-pong";
  outputMin: number;
  outputMax: number;
  speed: number;
  easing: "sine";
};

function pulse(
  outputMin: number,
  outputMax: number,
  speed: number,
  animate: boolean,
): number | AutoAnimate {
  if (!animate) {
    return (outputMin + outputMax) / 2;
  }

  return {
    type: "auto-animate",
    mode: "ping-pong",
    outputMin,
    outputMax,
    speed,
    easing: "sine",
  };
}

export function CtaPixelBeams() {
  const animate = !(useReducedMotion() ?? false);

  return (
    <Shader
      aria-hidden
      className="size-full"
      style={{ background: CTA_BLACK }}
    >
      <SolidColor color={CTA_BLACK} />
      <Pixelate scale={96} gap={0.1} roundness={0}>
        <Group>
          <Beam
            startPosition={{ x: -0.15, y: 0.08 }}
            endPosition={{ x: 1.12, y: 0.78 }}
            startThickness={pulse(0.04, 0.09, 0.18, animate)}
            endThickness={pulse(0.02, 0.05, 0.16, animate)}
            startSoftness={0.35}
            endSoftness={0.55}
            insideColor={BEAM_CORE}
            outsideColor={BEAM_EDGE}
            blendMode="screen"
            opacity={0.36}
          />
          <Beam
            startPosition={{ x: -0.08, y: 0.42 }}
            endPosition={{ x: 1.08, y: 0.98 }}
            startThickness={pulse(0.03, 0.07, 0.22, animate)}
            endThickness={pulse(0.015, 0.04, 0.2, animate)}
            startSoftness={0.4}
            endSoftness={0.6}
            insideColor={BEAM_EDGE}
            outsideColor={CTA_BLACK}
            blendMode="screen"
            opacity={0.26}
          />
          <Beam
            startPosition={{ x: 0.05, y: -0.12 }}
            endPosition={{ x: 0.82, y: 1.15 }}
            startThickness={pulse(0.02, 0.05, 0.14, animate)}
            endThickness={pulse(0.03, 0.08, 0.15, animate)}
            startSoftness={0.45}
            endSoftness={0.4}
            insideColor={BEAM_CORE}
            outsideColor={BEAM_EDGE}
            blendMode="screen"
            opacity={0.2}
          />
          <Beam
            startPosition={{ x: 0.55, y: -0.18 }}
            endPosition={{ x: 1.2, y: 0.62 }}
            startThickness={pulse(0.015, 0.04, 0.26, animate)}
            endThickness={pulse(0.01, 0.03, 0.24, animate)}
            startSoftness={0.5}
            endSoftness={0.65}
            insideColor={BEAM_EDGE}
            outsideColor={CTA_BLACK}
            blendMode="screen"
            opacity={0.22}
          />
        </Group>
      </Pixelate>
    </Shader>
  );
}
