import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export default function MarketingServicePage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>Technical marketing</h1>
        <p className={cn(bodyText, "mt-4 max-w-3xl")}>
          Technical SEO, conversion, and content systems wired for software-led growth — not
          vanity traffic.
        </p>
      </TextFade>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className={cardSurface}>
          <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">
            Maturity assessment
          </h2>
          <p className={cn(bodyText, "mt-2 text-[13px]")}>
            A clear picture of your funnel, stack, and the highest-leverage fixes.
          </p>
        </article>
        <article className={cardSurface}>
          <h2 className="text-[15px] font-medium text-[var(--fg-primary)]">
            Technical SEO audit
          </h2>
          <p className={cn(bodyText, "mt-2 text-[13px]")}>
            Rendering, crawlability, and performance for modern JavaScript applications.
          </p>
        </article>
      </div>
    </div>
  );
}
