import dynamic from "next/dynamic";
import Image from "next/image";

import { HydrateOnView } from "@/components/media/hydrate-on-view";
import { ServiceIllustrationFrame } from "@/components/services/illustrations";
import { editorialImages } from "@/lib/editorial-images";
import { EDITORIAL_HERO_OVERLAY } from "@/lib/editorial-hero-styles";

const AppliedAiVisual = dynamic(() =>
  import("@/components/services/illustrations/applied-ai-illustration").then(
    (mod) => mod.AppliedAiIllustration,
  ),
);

const APPLIED_AI_CAPABILITIES = [
  "AI Search",
  "Internal Copilots",
  "Workflow Automation",
  "Model Integrations",
] as const;

const APPLIED_AI_IMAGE = editorialImages.appliedAi;
const APPLIED_AI_LABEL =
  "Applied AI illustration: signals from Slack, Outlook and Salesforce feeding a Claude agent that prepares a renewal quote, pauses for operator approval, then executes actions back to CRM and email.";

export function FigmaAppliedAiSection() {
  return (
    <section id="applied-ai" className="relative overflow-hidden px-6 py-24 md:py-28">
      <Image
        src={APPLIED_AI_IMAGE.src}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: EDITORIAL_HERO_OVERLAY }} />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(247,247,244,0.5)" }}
          >
            Applied AI
          </p>
          <h2
            className="mb-6 text-2xl leading-tight font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
          >
            AI, applied where it actually{" "}
            <span style={{ color: "var(--warm-orange)" }}>changes</span> the product.
          </h2>
          <p
            className="mb-7 text-sm leading-relaxed md:text-base"
            style={{ color: "rgba(247,247,244,0.62)" }}
          >
            From intelligent search and internal copilots to workflow automation and model-powered
            product features, we build AI around real business workflows — not demos for the sake of
            it.
          </p>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(247,247,244,0.72)" }}>
            {APPLIED_AI_CAPABILITIES.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--warm-orange)" }}>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HydrateOnView minHeightClassName="aspect-[5/4] md:aspect-[4/3]">
          <ServiceIllustrationFrame
            label={APPLIED_AI_LABEL}
            className="shadow-[0_28px_70px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
          >
            <AppliedAiVisual />
          </ServiceIllustrationFrame>
        </HydrateOnView>
      </div>
    </section>
  );
}
