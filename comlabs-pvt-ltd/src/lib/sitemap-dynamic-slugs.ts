/**
 * Slugs for dynamic `[...]` route segments. Keys are the URL path after route groups
 * are stripped, e.g. `case-studies/[slug]`.
 */
export const dynamicSlugResolvers: Record<string, () => string[]> = {};
