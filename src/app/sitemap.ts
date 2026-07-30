import type { MetadataRoute } from "next";
import { join } from "node:path";

import { discoverSitemapPaths } from "@/lib/discover-sitemap-routes";
import { siteUrl } from "@/lib/site";

const base = siteUrl.replace(/\/$/, "");

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  if (path === "/blog") return 0.9;
  return 0.8;
}

function changeFrequencyForPath(path: string): MetadataRoute.Sitemap[0]["changeFrequency"] {
  if (path === "/") return "weekly";
  if (path.startsWith("/blog")) return "weekly";
  return "monthly";
}

async function getBlogPostEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const { connectDB } = await import("@/lib/db");
    const { Post } = await import("@/models/post");
    await connectDB();
    const posts = await Post.find({ status: "published" })
      .select("slug updatedAt")
      .lean();
    return posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: (post.updatedAt as Date) ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appRoot = join(process.cwd(), "src", "app");
  const paths = discoverSitemapPaths(appRoot);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
  }));

  const blogEntries = await getBlogPostEntries();
  return [...staticEntries, ...blogEntries];
}
