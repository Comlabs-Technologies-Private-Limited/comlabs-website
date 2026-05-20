import type { MetadataRoute } from "next";
import { join } from "node:path";

import { discoverSitemapPaths } from "@/lib/discover-sitemap-routes";
import { siteUrl } from "@/lib/site";

const base = siteUrl.replace(/\/$/, "");

function priorityForPath(path: string): number {
  if (path === "/") return 1;
  if (path.startsWith("/case-studies/")) return 0.75;
  if (path === "/case-studies") return 0.9;
  if (path.startsWith("/services/")) return 0.85;
  return 0.8;
}

function changeFrequencyForPath(path: string): MetadataRoute.Sitemap[0]["changeFrequency"] {
  if (path === "/" || path === "/blog") return "weekly";
  if (path.startsWith("/case-studies")) return "monthly";
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
