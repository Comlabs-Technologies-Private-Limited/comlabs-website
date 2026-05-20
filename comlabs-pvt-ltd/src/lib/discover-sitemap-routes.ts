import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

import { dynamicSlugResolvers } from "@/lib/sitemap-dynamic-slugs";

const PAGE_NAMES = new Set(["page.tsx", "page.ts", "page.jsx", "page.mdx"]);

function shouldSkipDir(name: string): boolean {
  if (name.startsWith("_") || name.startsWith(".")) return true;
  if (name === "node_modules") return true;
  if (name.startsWith("@")) return true;
  return false;
}

function collectPageFiles(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (shouldSkipDir(name)) continue;
    const full = join(dir, name);
    let st: ReturnType<typeof statSync>;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      collectPageFiles(full, out);
    } else if (PAGE_NAMES.has(name)) {
      out.push(full);
    }
  }
  return out;
}

/** Strip Next.js route groups `(name)` from path segments. */
function stripRouteGroups(segments: string[]): string[] {
  return segments.filter((s) => !/^\([^)]+\)$/.test(s));
}

/** True if this URL path should not appear in the sitemap. */
function isExcludedPublicPath(segments: string[]): boolean {
  if (segments[0] === "api") return true;
  return false;
}

/**
 * From `src/app/(marketing)/about/page.tsx` → URL path segments `["about"]`.
 */
function filePathToRouteSegments(appRoot: string, pageFile: string): string[] {
  const dir = relative(appRoot, join(pageFile, ".."));
  if (!dir || dir === ".") return [];
  return dir.split(sep);
}

function segmentsToUrlPath(segments: string[]): string {
  const cleaned = stripRouteGroups(segments);
  if (isExcludedPublicPath(cleaned)) return "";
  if (cleaned.length === 0) return "/";
  return `/${cleaned.join("/")}`;
}

function hasDynamicSegment(segments: string[]): boolean {
  return stripRouteGroups(segments).some((s) => /^\[[^/]+\]$/.test(s));
}

function patternKey(segments: string[]): string {
  return stripRouteGroups(segments).join("/");
}

/**
 * Returns concrete URL paths (each starting with `/`) for the sitemap.
 */
export function discoverSitemapPaths(appRoot: string): string[] {
  const pageFiles = collectPageFiles(appRoot);
  const paths = new Set<string>();

  for (const file of pageFiles) {
    const segments = filePathToRouteSegments(appRoot, file);
    const stripped = stripRouteGroups(segments);
    if (isExcludedPublicPath(stripped)) continue;

    if (!hasDynamicSegment(segments)) {
      paths.add(segmentsToUrlPath(segments));
      continue;
    }

    const key = patternKey(segments);
    const resolver = dynamicSlugResolvers[key];
    if (!resolver) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console -- build-time hint for missing dynamic registry
        console.warn(
          `[sitemap] Dynamic route "${key}" has no entry in src/lib/sitemap-dynamic-slugs.ts — add one to emit URLs.`,
        );
      }
      continue;
    }

    const slugs = resolver();
    const bracket = stripped.find((s) => /^\[[^/]+\]$/.test(s));
    if (!bracket) continue;
    const idx = stripped.indexOf(bracket);
    const prefix = stripped.slice(0, idx).join("/");
    const suffix = stripped.slice(idx + 1).join("/");
    for (const slug of slugs) {
      const parts = [prefix, slug, suffix].filter(Boolean);
      paths.add(`/${parts.join("/")}`);
    }
  }

  return [...paths].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });
}
