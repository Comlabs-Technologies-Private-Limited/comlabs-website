import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { MarketingInsight } from "@/lib/digital-marketing-insights";
import { DM, DM_PHOTOS } from "@/lib/digital-marketing-media";
import { canonicalPath } from "@/lib/site";

type InsightsRailProps = {
  insights: readonly MarketingInsight[];
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
            About Comlabs Marketing
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: DM.text }}>
            We combine creative judgment with commercial evidence to build marketing systems that
            are distinctive, measurable and designed to improve over time.
          </p>
        </div>
      </article>

      {insights.map((insight) => (
        <Link
          key={insight.href}
          href={canonicalPath(insight.href)}
          className="group grid grid-cols-[88px_minmax(0,1fr)_16px] items-start gap-3 p-3 transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2"
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
              {insight.dateLabel ? ` · ${insight.dateLabel}` : ""}
            </p>
            <h3 className="mt-1 text-sm leading-snug font-medium tracking-tight">{insight.title}</h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed" style={{ color: DM.muted }}>
              {insight.excerpt}
            </p>
          </div>
          <ArrowUpRight
            size={14}
            className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
            style={{ color: DM.muted }}
          />
        </Link>
      ))}
    </aside>
  );
}
