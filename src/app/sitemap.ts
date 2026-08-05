import type { MetadataRoute } from "next";

import { indexableStaticPaths, isBlogEnabled, siteUrl } from "@/lib/site";

const base = siteUrl;

function urlForPath(path: string): string {
  if (path === "/") return `${base}/`;
  return `${base}${path}/`;
}

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

async function getBlogPostEntries(): Promise<MetadataRoute.Sitemap> {
  if (!isBlogEnabled()) return [];

  try {
    const { connectDB } = await import("@/lib/db");
    const { Post } = await import("@/models/post");
    await connectDB();
    const posts = await Post.find({ status: "published" })
      .select("slug updatedAt")
      .lean();

    return posts.map((post) => ({
      url: `${base}/blog/${post.slug}/`,
      ...(post.updatedAt ? { lastModified: post.updatedAt as Date } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = indexableStaticPaths.map((path) => ({
    url: urlForPath(path),
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
  }));

  const blogEntries: MetadataRoute.Sitemap = isBlogEnabled()
    ? [
        {
          url: `${base}/blog/`,
          changeFrequency: "weekly",
          priority: 0.7,
        },
        ...(await getBlogPostEntries()),
      ]
    : [];

  return [...staticEntries, ...blogEntries];
}
