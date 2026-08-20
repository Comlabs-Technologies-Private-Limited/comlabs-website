"use client";

import { CustomCraftIllustration } from "@/components/services/illustrations/custom-craft-illustration";
import { ServiceIllustrationFrame } from "@/components/services/illustrations/service-illustration-frame";

const SPECIALTY_LABEL =
  "Custom development illustration: a TypeScript component being written in an editor alongside quality gates for type safety, performance budget and accessibility that each pass, ending in a handoff-ready state.";

export function SpecialtyVisualRuntime() {
  return (
    <ServiceIllustrationFrame
      label={SPECIALTY_LABEL}
      background="/services-bg/service-bg-1.png"
      className="shadow-[0_2px_24px_rgba(28,25,23,0.07)]"
    >
      <CustomCraftIllustration />
    </ServiceIllustrationFrame>
  );
}
