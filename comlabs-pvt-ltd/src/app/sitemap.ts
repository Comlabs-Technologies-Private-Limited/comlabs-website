import type { MetadataRoute } from "next";
import { join } from "node:path";

import { discoverSitemapPaths } from "@/lib/discover-sitemap-routes";
import { siteUrl } from "@/lib/site";

const base = siteUrl.replace(/\/$/, "");

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  return 0.8;
}

function changeFrequencyForPath(path: string): MetadataRoute.Sitemap[0]["changeFrequency"] {
  if (path === "/") return "weekly";
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appRoot = join(process.cwd(), "src", "app");
  const paths = discoverSitemapPaths(appRoot);
  const now = new Date();

  return paths.map((path) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
  }));
}
