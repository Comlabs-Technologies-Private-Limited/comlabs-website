"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ForceField } from "@/components/canvasui/ForceField";
import { canonicalPath } from "@/lib/site";

/** Warm orange lattice on charcoal — brand-aligned Force Field. */
const FIELD_COLOR: [number, number, number] = [0.788, 0.392, 0.259];
const FIELD_EDGE: [number, number, number] = [0.95, 0.72, 0.55];

export function FigmaAppliedAiSection() {
  return (
    <section id="applied-ai" className="relative overflow-hidden">
      <ForceField
        className="min-h-[420px] w-full md:min-h-[480px]"
        style={{ background: "#141414" }}
        shape="hexagon"
        cellScale={16}
        lineWidth={0.03}
        gridOpacity={0.18}
        gridReveal="both"
        gridRevealStrength={1.5}
        gridRevealRadius={250}
        gridFade={0.35}
        flowIntensity={0}
        flowSpeed={0.5}
        flashIntensity={0.1}
        edgeGlow={0.35}
        hoverGlow={0.3}
        hoverRadius={350}
        hoverCharge={1.6}
        hideOnHover={false}
        rippleIntensity={0.18}
        rippleSpeed={0.5}
        rippleBlend={1}
        refraction={30}
        aberration={2.5}
        haze={0.5}
        pageReact={0}
        tint={0.08}
        reveal={1}
        dim={0}
        bloom={1}
        grain={0.2}
        color={FIELD_COLOR}
        edgeColor={FIELD_EDGE}
      >
        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center justify-center px-6 py-24 md:min-h-[480px] md:py-28">
          <div className="max-w-2xl text-center">
            <h2
              className="mb-6 text-2xl leading-tight font-bold tracking-tight text-neutral-100 md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              AI should do more than{" "}
              <span style={{ color: "var(--warm-orange)" }}>generate</span> an answer.
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-neutral-100/70 md:text-base">
              We build AI around actual business systems, giving models the context, tools and
              controls required to complete useful work safely.
            </p>
            <Link
              href={canonicalPath("/services/ai-agent-development")}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-[#141414] transition-opacity hover:opacity-90"
              style={{ background: "#F7F7F4" }}
            >
              Explore AI Engineering
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </ForceField>
    </section>
  );
}
