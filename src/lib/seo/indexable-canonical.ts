import { canonicalUrl, isSiteHostname } from "@/lib/site";

/**
 * Canonical URL for an indexable Comlabs page.
 * Off-site URLs (a cited article, a source the post "refers to") must never
 * become the canonical — Google would drop our page from the index.
 */
export function indexableCanonicalUrl(
  storedCanonical: string | undefined,
  fallbackPath: string,
): string {
  const fallback = canonicalUrl(fallbackPath);
  const trimmed = storedCanonical?.trim() ?? "";
  if (!trimmed) return fallback;

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const parsed = new URL(trimmed);
      if (!isSiteHostname(parsed.hostname)) return fallback;
      return canonicalUrl(`${parsed.pathname}${parsed.search}`);
    }

    if (trimmed.startsWith("/")) {
      return canonicalUrl(trimmed);
    }
  } catch {
    return fallback;
  }

  return fallback;
}

/** Persist only same-origin canonicals. External values are dropped. */
export function sanitizeCanonicalInput(input: string | undefined): string {
  const trimmed = input?.trim() ?? "";
  if (!trimmed) return "";

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const parsed = new URL(trimmed);
      if (!isSiteHostname(parsed.hostname)) return "";
      return canonicalUrl(`${parsed.pathname}${parsed.search}`);
    }

    if (trimmed.startsWith("/")) return trimmed;
  } catch {
    return "";
  }

  return "";
}
