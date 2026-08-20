"use client";

import dynamic from "next/dynamic";

import { lazyServiceVisuals } from "@/components/services/illustrations/lazy-visuals";

const ServiceIllustrationFrame = dynamic(
  () =>
    import("@/components/services/illustrations/service-illustration-frame").then(
      (mod) => mod.ServiceIllustrationFrame,
    ),
  { ssr: false },
);

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
