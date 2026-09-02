import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { listStaticPosts } from "@/lib/posts";
import { isDatabaseConfigured } from "@/lib/prisma";
import { canonicalUrl, indexableStaticPaths, isBlogEnabled } from "@/lib/site";

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
  if (path.startsWith("/blog")) return "weekly";
  if (path.startsWith("/services") || path === "/digital-marketing") return "monthly";
  if (path.startsWith("/work")) return "monthly";
  return "monthly";
}

function entry(
  path: string,
  lastModified?: Date,
): MetadataRoute.Sitemap[0] {
  return {
    url: canonicalUrl(path),
    lastModified,
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
  };
}

function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

async function getCaseStudyEntries(): Promise<MetadataRoute.Sitemap> {
  const bySlug = new Map<string, Date | undefined>();

  for (const slug of CASE_STUDY_ORDER) {
    bySlug.set(slug, undefined);
  }

  if (isDatabaseConfigured()) {
    try {
      const caseStudies = await listCaseStudies({ status: "published" });
      for (const study of caseStudies) {
        bySlug.set(study.slug, new Date(study.updatedAt));
      }
    } catch {
      // Keep statically authored work URLs if the database is unavailable.
    }
  }

  return [...bySlug.entries()].map(([slug, lastModified]) =>
    entry(`/work/${slug}`, lastModified),
  );
}

async function getBlogPostEntries(): Promise<MetadataRoute.Sitemap> {
  if (!isBlogEnabled()) return [];

  try {
    const posts = await listPosts({ status: "published" });
    return posts.map((post) =>
      entry(`/blog/${post.slug}`, post.updatedAt ? new Date(post.updatedAt) : undefined),
    );
  } catch {
    return listStaticPosts({ status: "published" }).map((post) =>
      entry(`/blog/${post.slug}`, post.updatedAt ? new Date(post.updatedAt) : undefined),
    );
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const staticEntries = indexableStaticPaths.map((path) => entry(path));

  const blogEntries: MetadataRoute.Sitemap = isBlogEnabled()
    ? [entry("/blog"), ...(await getBlogPostEntries())]
    : [];

  const caseStudyEntries = await getCaseStudyEntries();

  return dedupe([...staticEntries, ...blogEntries, ...caseStudyEntries]);
}
