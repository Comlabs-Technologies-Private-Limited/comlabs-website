"use client";

import { ForceField } from "@/components/canvasui/ForceField";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";

/** Warm orange lattice on charcoal — brand-aligned Force Field. */
const FIELD_COLOR: [number, number, number] = [0.788, 0.392, 0.259];
const FIELD_EDGE: [number, number, number] = [0.95, 0.72, 0.55];

/**
 * Compact editorial bridge between credibility logos and Services.
 * Charcoal + Force Field background; left-aligned ownership positioning.
 */
export function FigmaPositioningBridgeSection() {
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
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-6xl items-center px-6 py-16 md:min-h-[320px] md:py-20">
          <MarketingFadeIn className="max-w-2xl text-left">
            <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-100/55 uppercase">
              Beyond the build
            </p>
            <h2
              id="positioning-heading"
              className="text-2xl font-bold tracking-tight text-neutral-100 md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Technology is only{" "}
              <span style={{ color: "var(--warm-orange)" }}>valuable</span> when it works in
              production.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-neutral-100/70 md:text-base">
              Comlabs supports the applications, infrastructure and operational systems behind
              growing businesses—from the first customer request to the production issue that cannot
              wait until Monday.
            </p>
          </MarketingFadeIn>
        </div>
      </ForceField>
    </section>
  );
}
