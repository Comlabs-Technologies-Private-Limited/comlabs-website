import { isSiteHostname, siteUrl } from "@/lib/site";

const ATTR_VALUE = String.raw`(?:"[^"]*"|'[^']*'|[^\s>]+)`;

/** Rel tokens for outbound http(s) referring links. */
export const EXTERNAL_REFERRING_REL = "nofollow noopener noreferrer" as const;

/**
 * Prepare blog HTML so the *page* stays indexable:
 * - Strip robots noindex snippets pasted into the body
 * - Follow internal / same-host referring links (strip nofollow)
 * - Mark outbound http(s) links as nofollow + noopener noreferrer + target=_blank
 */
export function prepareIndexableHtml(html: string): string {
  if (!html) return html;

  const withoutBlockingMeta = html
    .replace(/<meta\b[^>]*\bname=["']robots["'][^>]*>/gi, "")
    .replace(/<!--\s*googleoff:[\s\S]*?-->/gi, "")
    .replace(/<!--\s*noindex\s*-->/gi, "");

  return withoutBlockingMeta.replace(/<a\b([^>]*?)>/gi, (full, rawAttrs: string) => {
    const href = readAttr(rawAttrs, "href");
    if (!href) return full;
    return `<a${rewriteAnchorAttrs(rawAttrs, href)}>`;
  });
}

/** True for http(s) URLs whose host is not comlabstechnologies.com / www. */
export function isExternalHttpUrl(href: string): boolean {
  const value = href.trim();
  if (!value) return false;
  if (
    value.startsWith("#") ||
    value.startsWith("/") ||
    value.startsWith("?") ||
    value.startsWith("./") ||
    value.startsWith("../")
  ) {
    return false;
  }
  if (/^(mailto|tel|sms|javascript):/i.test(value)) return false;

  try {
    const url = new URL(value, siteUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return !isSiteHostname(url.hostname);
  } catch {
    return false;
  }
}

/** Anchor props: follow internal links; nofollow + new tab for outbound http(s). */
export function referringAnchorProps(href: string): {
  href: string;
  rel?: typeof EXTERNAL_REFERRING_REL;
  target?: "_blank";
} {
  if (isExternalHttpUrl(href)) {
    return { href, rel: EXTERNAL_REFERRING_REL, target: "_blank" };
  }
  return { href };
}

function readAttr(attrs: string, name: string): string | null {
  const match = attrs.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3] ?? "").trim();
}

function setAttr(attrs: string, name: string, value: string): string {
  const assignment = ` ${name}="${value.replace(/"/g, "&quot;")}"`;
  const re = new RegExp(`\\s+${name}\\s*=\\s*${ATTR_VALUE}`, "i");
  if (re.test(attrs)) return attrs.replace(re, assignment);
  return `${attrs}${assignment}`;
}

function removeAttr(attrs: string, name: string): string {
  return attrs.replace(new RegExp(`\\s+${name}\\s*=\\s*${ATTR_VALUE}`, "i"), "");
}

function rewriteAnchorAttrs(rawAttrs: string, href: string): string {
  const external = isExternalHttpUrl(href);
  let attrs = rawAttrs;

  const existingRel = readAttr(attrs, "rel") ?? "";
  const tokens = existingRel
    .split(/\s+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .filter((token) => token !== "nofollow");

  if (external) {
    for (const token of ["nofollow", "noopener", "noreferrer"]) {
      if (!tokens.includes(token)) tokens.push(token);
    }
    attrs = setAttr(attrs, "target", "_blank");
    attrs = setAttr(attrs, "rel", tokens.join(" "));
    return attrs;
  }

  const nextRel = tokens.join(" ");
  if (nextRel) attrs = setAttr(attrs, "rel", nextRel);
  else attrs = removeAttr(attrs, "rel");
  return attrs;
}
