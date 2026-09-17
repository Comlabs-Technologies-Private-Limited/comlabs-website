import { ArrowUpRight } from "lucide-react";

import type { CaseStudyMetaItem } from "@/lib/case-studies";
import { referringAnchorProps } from "@/lib/seo/prepare-html-links";

type CaseStudyMetaProps = {
  items: CaseStudyMetaItem[];
};

export function CaseStudyMeta({ items }: CaseStudyMetaProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Project details">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-8">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-xs tracking-widest text-muted-foreground uppercase">{item.label}</dt>
            <dd className="mt-1.5 text-sm font-medium text-foreground">
              {item.href ? (
                <a
                  {...referringAnchorProps(item.href)}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[var(--warm-orange)]"
                >
                  {item.value}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
