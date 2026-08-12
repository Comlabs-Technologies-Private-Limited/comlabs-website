import type { MetadataRoute } from "next";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { canonicalUrl, indexableStaticPaths, isBlogEnabled } from "@/lib/site";

export const revalidate = 60;

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  if (path === "/services") return 0.9;
  if (path.startsWith("/services/")) return 0.85;
  if (path === "/work") return 0.85;
  if (path.startsWith("/work/")) return 0.8;
  return 0.7;
}

function changeFrequencyForPath(
  path: string,
): MetadataRoute.Sitemap[0]["changeFrequency"] {
  if (path === "/") return "weekly";
  if (path.startsWith("/services")) return "monthly";
  if (path.startsWith("/work")) return "monthly";
  return "monthly";
}

function caseStudyFallbackEntries(exclude: Set<string> = new Set()): MetadataRoute.Sitemap {
  return CASE_STUDY_ORDER.filter((slug) => !exclude.has(slug)).map((slug) => ({
    url: canonicalUrl(`/work/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}

async function getCaseStudyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const caseStudies = await listCaseStudies({ status: "published" });
    const entries = caseStudies.map((study) => ({
      url: canonicalUrl(`/work/${study.slug}`),
      lastModified: new Date(study.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    // Statically authored case studies are listed even before they are seeded.
    return [
      ...entries,
      ...caseStudyFallbackEntries(new Set(caseStudies.map((study) => study.slug))),
    ];
  } catch {
    return caseStudyFallbackEntries();
  }
}

async function getBlogPostEntries(): Promise<MetadataRoute.Sitemap> {
  if (!isBlogEnabled()) return [];

  try {
    const posts = await listPosts({ status: "published" });
    return posts.map((post) => ({
      url: canonicalUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = indexableStaticPaths.map((path) => ({
    url: canonicalUrl(path),
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
  }));

  const blogEntries: MetadataRoute.Sitemap = isBlogEnabled()
    ? [
        {
          url: canonicalUrl("/blog"),
          changeFrequency: "weekly",
          priority: 0.7,
        },
        ...(await getBlogPostEntries()),
      ]
    : [];

  const caseStudyEntries = await getCaseStudyEntries();

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
