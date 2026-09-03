import type { ReactNode } from "react";

import {
  ServiceIllustrationFrame,
  serviceIllustrations,
} from "@/components/services/illustrations";
import { MobileOpsProof, WebDigitalProof } from "@/components/services/service-proof-panels";
import { MarketingSectionHeader } from "@/components/marketing/marketing-section-header";

const ILLUSTRATION_BY_SLUG: Record<string, string> = {
  "application-support": "application-support",
  "ai-agent-development": "agentic-infrastructure",
  "cloud-infrastructure-scaling": "cloud-infrastructure",
  "custom-software-development": "custom-software",
  "seo-aeo-copywriting": "seo-aeo",
};

type ServiceProofModuleProps = {
  slug: string;
  title: string;
  caption: string;
};

export function ServiceProofModule({ slug, title, caption }: ServiceProofModuleProps) {
  const visual = resolveProofVisual(slug);
  if (!visual) return null;

  return (
    <section className="border-b border-border bg-card px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MarketingSectionHeader eyebrow="Proof" title={title} description={caption} />
        {visual}
      </div>
    </section>
  );
}

function resolveProofVisual(slug: string): ReactNode {
  if (slug === "website-design-development") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        <WebDigitalProof />
      </div>
    );
  }
  if (slug === "mobile-app-development") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        <MobileOpsProof />
      </div>
    );
  }

  const illustrationKey = ILLUSTRATION_BY_SLUG[slug];
  const illustration = illustrationKey ? serviceIllustrations[illustrationKey] : undefined;
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame
      label={label}
      chrome={false}
      className="min-h-[22rem] rounded-2xl border border-border md:min-h-[34rem] md:aspect-[16/10]"
    >
      <Component />
    </ServiceIllustrationFrame>
  );
}
