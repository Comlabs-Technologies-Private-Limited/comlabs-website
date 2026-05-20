import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, eyebrow, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const articles = [
  {
    category: "Engineering",
    title: "Designing Agent Guardrails for Regulated Workflows",
    excerpt: "A practical architecture for safe autonomous execution in production.",
    readingTime: "7 min read",
  },
  {
    category: "Product",
    title: "From Monolith to Modular SaaS Platform",
    excerpt: "How to split product layers without slowing feature velocity.",
    readingTime: "9 min read",
  },
  {
    category: "Growth",
    title: "Technical SEO for JavaScript-Heavy Applications",
    excerpt: "Core rendering checks that improve visibility and conversion quality.",
    readingTime: "6 min read",
  },
  {
    category: "Craft",
    title: "Design Systems That Accelerate Delivery",
    excerpt: "Reusable interface primitives for faster launch cycles.",
    readingTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <p className={eyebrow}>Resources</p>
        <h1 className={cn(sectionTitle, "mt-4")}>Writing we stand behind.</h1>
        <p className={cn(bodyText, "mt-4 max-w-2xl")}>
          Notes on building software that holds up in production.
        </p>
      </TextFade>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", "Engineering", "Product", "Growth", "Craft"].map((filter) => (
          <button
            key={filter}
            type="button"
            className="rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-[13px] font-normal text-[var(--fg-secondary)] transition-colors duration-100 hover:text-[var(--fg-primary)] active:scale-[0.97]"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {articles.map((article, index) => (
          <article key={article.title} className={cardSurface}>
            <p className="text-[12px] font-normal uppercase tracking-widest text-[var(--fg-tertiary)]">
              {index === 0 ? "Featured" : article.category}
            </p>
            <h2 className="mt-2 text-[15px] font-medium text-[var(--fg-primary)]">{article.title}</h2>
            <p className={cn(bodyText, "mt-2 text-[13px]")}>{article.excerpt}</p>
            <p className="mt-4 text-[12px] font-normal text-[var(--fg-tertiary)]">
              {article.readingTime}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
