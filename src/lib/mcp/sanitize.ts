import { prepareIndexableHtml } from "@/lib/seo/prepare-html-links";

/** Strip script tags and normalize outbound links before persistence. */
export function sanitizeBlogHtml(html: string): string {
  const withoutScripts = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );
  return prepareIndexableHtml(withoutScripts);
}
