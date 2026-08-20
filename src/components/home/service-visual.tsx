"use client";

import { ServiceIllustrationFrame } from "@/components/services/illustrations";
import { lazyServiceVisuals } from "@/components/services/illustrations/lazy-visuals";

export function ServiceVisual({
  background,
  visualClassName,
  id,
}: {
  background: string;
  visualClassName?: string;
  id: string;
}) {
  const illustration = lazyServiceVisuals[id];
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame label={label} background={background} className={visualClassName}>
      <Component />
    </ServiceIllustrationFrame>
  );
}
