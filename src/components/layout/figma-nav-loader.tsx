import { FigmaNav } from "@/components/layout/figma-nav";
import { listPublishedCaseStudySummaries } from "@/lib/admin/case-studies";

type FigmaNavLoaderProps = {
  showBlogLink?: boolean;
  tone?: "light" | "dark";
};

export async function FigmaNavLoader({
  showBlogLink = true,
  tone = "light",
}: FigmaNavLoaderProps) {
  const summaries = await listPublishedCaseStudySummaries();

  return (
    <FigmaNav
      showBlogLink={showBlogLink}
      tone={tone}
      caseStudies={summaries.map((study) => ({
        title: study.title,
        description: study.category,
        href: study.href,
      }))}
    />
  );
}
