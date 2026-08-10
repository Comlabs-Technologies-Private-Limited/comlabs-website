import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import type { CaseStudyHeadline } from "@/lib/case-studies";
import { canonicalPath } from "@/lib/site";

type CaseStudyHeroProps = {
  client: string;
  year: string;
  headline: CaseStudyHeadline;
  standfirst: string;
};

export function CaseStudyHero({ client, year, headline, standfirst }: CaseStudyHeroProps) {
  return (
    <header className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href={canonicalPath("/work")}
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All work
        </Link>

        <MarketingFadeIn>
          <p className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
            Case study · {year}
          </p>
          <p className="mb-4 text-sm text-muted-foreground">{client}</p>
          <h1
            className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {headline.before}
            <MarketingOrangeHighlight>{headline.highlight}</MarketingOrangeHighlight>
            {headline.after}
          </h1>
          <p className="mt-6 max-w-[42rem] text-base leading-[1.7] text-muted-foreground md:text-[17px] md:leading-[1.75]">
            {standfirst}
          </p>
        </MarketingFadeIn>
      </div>
    </header>
  );
}
