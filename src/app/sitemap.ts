import type { MetadataRoute } from "next";
import { connection } from "next/server";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { listStaticPosts } from "@/lib/posts";
import { isDatabaseConfigured } from "@/lib/prisma";
import { CASE_STUDIES_PATH, canonicalUrl, caseStudyPath, indexableStaticPaths, isBlogEnabled } from "@/lib/site";

function entry(
  path: string,
  lastModified?: Date,
): MetadataRoute.Sitemap[0] {
  return {
    url: canonicalUrl(path),
    lastModified,
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

async function getCaseStudyEntries(): Promise<{
  entries: MetadataRoute.Sitemap;
  latestUpdatedAt?: Date;
}> {
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
      // Keep statically authored case-study URLs if the database is unavailable.
    }
  }

  const entries = [...bySlug.entries()].map(([slug, lastModified]) =>
    entry(caseStudyPath(slug), lastModified),
  );
  const latestUpdatedAt = [...bySlug.values()].reduce<Date | undefined>((current, next) => {
    if (!next) return current;
    return !current || next > current ? next : current;
  }, undefined);

  return { entries, latestUpdatedAt };
}

async function getBlogPostEntries(): Promise<{
  posts: MetadataRoute.Sitemap;
  latestUpdatedAt?: Date;
}> {
  if (!isBlogEnabled()) return { posts: [] };

  try {
    const posts = await listPosts({ status: "published" });
    const mapped = posts.map((post) =>
      entry(`/blog/${post.slug}`, post.updatedAt ? new Date(post.updatedAt) : undefined),
    );
    const latest = posts.reduce<Date | undefined>((current, post) => {
      if (!post.updatedAt) return current;
      const next = new Date(post.updatedAt);
      return !current || next > current ? next : current;
    }, undefined);
    return { posts: mapped, latestUpdatedAt: latest };
  } catch {
    const posts = listStaticPosts({ status: "published" });
    const mapped = posts.map((post) =>
      entry(`/blog/${post.slug}`, post.updatedAt ? new Date(post.updatedAt) : undefined),
    );
    const latest = posts.reduce<Date | undefined>((current, post) => {
      if (!post.updatedAt) return current;
      const next = new Date(post.updatedAt);
      return !current || next > current ? next : current;
    }, undefined);
    return { posts: mapped, latestUpdatedAt: latest };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();

  const { posts: blogPostEntries, latestUpdatedAt } = await getBlogPostEntries();
  const { entries: caseStudyEntries, latestUpdatedAt: latestCaseStudyAt } =
    await getCaseStudyEntries();
  const staticEntries = indexableStaticPaths.map((path) =>
    path === CASE_STUDIES_PATH ? entry(path, latestCaseStudyAt) : entry(path),
  );
  const blogEntries: MetadataRoute.Sitemap = isBlogEnabled()
    ? [entry("/blog", latestUpdatedAt), ...blogPostEntries]
    : [];

  return dedupe([...staticEntries, ...blogEntries, ...caseStudyEntries]);
}
