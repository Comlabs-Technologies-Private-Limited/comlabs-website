import { isSiteHostname, siteUrl } from "@/lib/site";

const ATTR_VALUE = String.raw`(?:"[^"]*"|'[^']*'|[^\s>]+)`;

/**
 * Prepare blog HTML so the *page* stays indexable:
 * - Strip robots noindex snippets pasted into the body
 * - Strip rel="nofollow" from editorial links (nofollow on citations does not
 *   deindex our page, but it is the usual WordPress paste and is not wanted
 *   on studio writing)
 * - Mark real outbound http(s) links with noopener noreferrer + target=_blank
 *   without adding nofollow, so Google can still follow citations
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
    for (const token of ["noopener", "noreferrer"]) {
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
