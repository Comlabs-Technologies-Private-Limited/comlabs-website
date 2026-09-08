"use client";

import { BlurReveal, BLUR_REVEAL_NORMAL_SPEED } from "@/components/blur-reveal";
import { ForceField } from "@/components/canvasui/ForceField";
import { RevealCopy, useAfterTitleReveal } from "@/components/home/figma/after-title-reveal";

/** Warm orange lattice on charcoal — brand-aligned Force Field. */
const FIELD_COLOR: [number, number, number] = [0.788, 0.392, 0.259];
const FIELD_EDGE: [number, number, number] = [0.95, 0.72, 0.55];

/**
 * Compact editorial bridge between credibility logos and Services.
 * Charcoal + Force Field background; left-aligned ownership positioning.
 */
export function FigmaPositioningBridgeSection() {
  const { revealed, onTitleComplete } = useAfterTitleReveal();
  return (
    <section id="positioning" className="relative overflow-hidden" aria-labelledby="positioning-heading">
      <ForceField
        className="min-h-[280px] w-full md:min-h-[320px]"
        style={{ background: "#141414" }}
        shape="hexagon"
        cellScale={16}
        lineWidth={0.03}
        gridOpacity={0.16}
        gridReveal="both"
        gridRevealStrength={1.4}
        gridRevealRadius={240}
        gridFade={0.35}
        flowIntensity={0}
        flowSpeed={0.5}
        flashIntensity={0.08}
        edgeGlow={0.3}
        hoverGlow={0.28}
        hoverRadius={320}
        hoverCharge={1.5}
        hideOnHover={false}
        rippleIntensity={0.16}
        rippleSpeed={0.5}
        rippleBlend={1}
        refraction={28}
        aberration={2.2}
        haze={0.45}
        pageReact={0}
        tint={0.08}
        reveal={1}
        dim={0}
        bloom={1}
        grain={0.18}
        color={FIELD_COLOR}
        edgeColor={FIELD_EDGE}
      >
        <div className="section-layout relative z-10 flex min-h-[280px] items-center py-16 md:min-h-[320px] md:py-20">
          <div className="max-w-2xl px-3 md:px-4 text-left">
            <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-100/55 uppercase">
              Beyond the build
            </p>
            <BlurReveal
              as="h2"
              id="positioning-heading"
              inView
              speedReveal={BLUR_REVEAL_NORMAL_SPEED}
              onAnimationComplete={onTitleComplete}
              className="text-2xl font-bold tracking-tight text-neutral-100 md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
              segments={[
                { text: "Technology is only" },
                { text: "valuable", style: { color: "var(--warm-orange)" } },
                { text: "when it works in production." },
              ]}
            />
            <RevealCopy
              revealed={revealed}
              className="mt-5 text-sm leading-relaxed text-neutral-100/70 md:text-base"
            >
              Comlabs supports the applications, infrastructure and operational systems behind
              growing businesses—from the first customer request to the production issue that cannot
              wait until Monday.
            </RevealCopy>
          </div>
        </div>
      </ForceField>
      <span aria-hidden className="gutter-hatch gutter-hatch-on-dark" />
    </section>
  );
}
