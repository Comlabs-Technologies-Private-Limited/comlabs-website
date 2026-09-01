import type { MetadataRoute } from "next";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { listStaticPosts } from "@/lib/posts";
import { canonicalUrl, indexableStaticPaths, isBlogEnabled } from "@/lib/site";

export const revalidate = 60;

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  if (path === "/services" || path === "/digital-marketing") return 0.9;
  if (path.startsWith("/services/")) return 0.85;
  if (path === "/work") return 0.85;
  if (path.startsWith("/work/")) return 0.8;
  return 0.7;
}

function changeFrequencyForPath(
  path: string,
): MetadataRoute.Sitemap[0]["changeFrequency"] {
  if (path === "/") return "weekly";
  if (path.startsWith("/services") || path === "/digital-marketing") return "monthly";
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

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function getCaseStudyEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const caseStudies = await withTimeout(listCaseStudies({ status: "published" }), 8000);
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
    const posts = await withTimeout(listPosts({ status: "published" }), 8000);
    return posts.map((post) => ({
      url: canonicalUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return listStaticPosts({ status: "published" }).map((post) => ({
      url: canonicalUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
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
