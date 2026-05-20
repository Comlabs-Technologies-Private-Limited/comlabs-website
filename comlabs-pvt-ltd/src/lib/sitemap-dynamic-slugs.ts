import { caseStudies } from "@/app/(portfolio)/case-studies/data";

/**
 * Slugs for dynamic `[...]` route segments. Keys are the URL path after the group
 * is stripped, e.g. `case-studies/[slug]`.
 *
 * When you add a new dynamic route, add a matching key and return slugs from your data source.
 */
export const dynamicSlugResolvers: Record<string, () => string[]> = {
  "case-studies/[slug]": () => caseStudies.map((s) => s.slug),
};
