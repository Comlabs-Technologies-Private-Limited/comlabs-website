/** Strip script tags from HTML blog content before persistence. */
export function sanitizeBlogHtml(html: string): string {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}
