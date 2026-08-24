import Image from "next/image";

import type { DigitalMarketingInsight } from "@/lib/digital-marketing";
import { DM, DM_PHOTOS } from "@/lib/digital-marketing-media";

type InsightsRailProps = {
  insights: readonly DigitalMarketingInsight[];
};

export function DigitalMarketingInsights({ insights }: InsightsRailProps) {
  const aboutPhoto = DM_PHOTOS["IMG-12"];

  return (
    <aside className="flex flex-col gap-3 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto">
      <article
        className="overflow-hidden"
        style={{
          background: DM.elevated,
          borderRadius: 12,
          boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
        }}
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={aboutPhoto.srcSm}
            alt={aboutPhoto.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 24vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: DM.muted }}>
            About this practice
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: DM.text }}>
            We combine creative judgment with commercial evidence to build marketing systems that
            are distinctive, measurable and designed to improve over time.
          </p>
        </div>
      </article>

      {insights.map((insight) => (
        <article
          key={insight.title}
          className="grid grid-cols-[88px_minmax(0,1fr)] items-start gap-3 p-3"
          style={{
            background: DM.elevated,
            borderRadius: 12,
            boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
            color: DM.text,
          }}
        >
          <div className="relative aspect-square overflow-hidden" style={{ borderRadius: 8, background: DM.black }}>
            <Image
              src={insight.thumbnail}
              alt={insight.thumbnailAlt}
              fill
              sizes="88px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: DM.muted }}>
              {insight.category}
            </p>
            <h3 className="mt-1 text-sm leading-snug font-medium tracking-tight">{insight.title}</h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed" style={{ color: DM.muted }}>
              {insight.excerpt}
            </p>
          </div>
        </article>
      ))}
    </aside>
  );
}
