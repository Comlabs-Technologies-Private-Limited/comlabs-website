import { listPosts } from "@/lib/admin/posts";
import {
  canonicalUrl,
  isBlogEnabled,
  siteDefaultDescription,
  siteName,
  siteUrl,
} from "@/lib/site";

export const revalidate = 3600;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc2822(iso: string): string {
  return new Date(iso).toUTCString();
}

export async function GET(): Promise<Response> {
  if (!isBlogEnabled()) {
    return new Response("Not Found", { status: 404 });
  }

  const posts = await listPosts({ status: "published" });
  const recent = posts.slice(0, 20);

  const feedUrl = canonicalUrl("/feed.xml");
  const blogUrl = canonicalUrl("/blog");
  const lastBuildDate =
    recent.length > 0 && recent[0].updatedAt
      ? toRfc2822(recent[0].updatedAt)
      : new Date().toUTCString();

  const items = recent
    .map((post) => {
      const link = canonicalUrl(`/blog/${post.slug}`);
      const pubDate = post.publishedAt ? toRfc2822(post.publishedAt) : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(post.excerpt || "")}</description>${pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ""}
      <guid isPermaLink="true">${link}</guid>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(siteDefaultDescription)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
