import type { CaseStudyHeadline } from "@/lib/case-studies";
import { siteShortName } from "@/lib/site";

const META_TITLE_MAX = 60;
const META_DESC_MAX = 155;
const EXCERPT_MAX = 160;

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateForSeo(text: string, max: number): string {
  const normalized = text.trim();
  if (normalized.length <= max) return normalized;

  const slice = normalized.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;

  return `${cut.trim()}…`;
}

function headlineToText(headline?: CaseStudyHeadline): string {
  if (!headline) return "";
  return [headline.before, headline.highlight, headline.after].filter(Boolean).join("");
}

export function buildPostSeo(input: {
  title: string;
  content?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
}): { excerpt: string; metaTitle: string; metaDescription: string } {
  const plain = stripHtml(input.content ?? "");
  const excerpt =
    input.excerpt?.trim() || (plain ? truncateForSeo(plain, EXCERPT_MAX) : "");
  const metaTitle =
    input.metaTitle?.trim() || truncateForSeo(input.title.trim(), META_TITLE_MAX);
  const metaDescription =
    input.metaDescription?.trim() ||
    truncateForSeo(excerpt || plain || input.title.trim(), META_DESC_MAX);

  return { excerpt, metaTitle, metaDescription };
}

export function buildCaseStudySeo(input: {
  client: string;
  standfirst?: string;
  headline?: CaseStudyHeadline;
  metaTitle?: string;
  metaDescription?: string;
}): { metaTitle: string; metaDescription: string } {
  const headlineText = headlineToText(input.headline);
  const defaultTitle = `${input.client} Engineering Case Study | Comlabs`;

  const metaTitle =
    input.metaTitle?.trim() || truncateForSeo(defaultTitle, META_TITLE_MAX);

  const standfirst = input.standfirst?.trim();
  const fallbackDescription = standfirst
    ? standfirst
    : `${siteShortName} case study for ${input.client}${headlineText ? `: ${headlineText}` : "."}`;

  const metaDescription =
    input.metaDescription?.trim() || truncateForSeo(fallbackDescription, META_DESC_MAX);

  return { metaTitle, metaDescription };
}
