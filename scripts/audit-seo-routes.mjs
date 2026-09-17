#!/usr/bin/env node
/**
 * Technical SEO route audit.
 *
 * Checks the three things that produce "Page with redirect" in Search Console:
 *   1. every sitemap URL must answer 200 directly, with no redirect
 *   2. every sitemap URL must carry one self-referencing canonical
 *   3. every retired URL must reach its destination in one permanent hop
 *
 * Node built-ins only — no dependencies.
 *
 * Usage:
 *   node scripts/audit-seo-routes.mjs                      # audits production
 *   node scripts/audit-seo-routes.mjs http://localhost:3000
 */

const CANONICAL_ORIGIN = "https://www.comlabstechnologies.com";
const base = (process.argv[2] ?? CANONICAL_ORIGIN).replace(/\/$/, "");
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(base);

/** Retired URL -> the single page that should now answer for it. */
const REDIRECT_EXPECTATIONS = [
  ["/work", "/case-studies/"],
  ["/work/", "/case-studies/"],
  ["/work/global-services", "/case-studies/global-services/"],
  ["/work/global-services/", "/case-studies/global-services/"],
  ["/work/radiant", "/case-studies/radiant/"],
  ["/work/with-hub", "/case-studies/vithub/"],
  ["/work/with-hub/", "/case-studies/vithub/"],
  ["/work/formula-lab", "/case-studies/formial-labs/"],
  ["/work/formula-lab/", "/case-studies/formial-labs/"],
  ["/services/website-redesign", "/services/website-design-development/"],
  ["/services/cms-development", "/services/custom-software-development/"],
  ["/services/erp-development", "/services/custom-software-development/"],
  [
    "/services/product-ui-development",
    "/services/custom-software-development/",
  ],
  // Slash normalisation must also resolve in one hop.
  ["/about", "/about/"],
  ["/services", "/services/"],
];

const PERMANENT = new Set([301, 308]);
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
  console.error(`  FAIL  ${message}`);
}
function warn(message) {
  warnings.push(message);
  console.warn(`  WARN  ${message}`);
}
function pass(message) {
  console.log(`  ok    ${message}`);
}

/** Follows redirects manually so each hop can be inspected. */
async function trace(url, limit = 10) {
  const hops = [];
  let current = url;

  for (let i = 0; i < limit; i += 1) {
    let response;
    try {
      response = await fetch(current, { redirect: "manual" });
    } catch (error) {
      return { hops, error: String(error?.message ?? error), final: current };
    }

    const location = response.headers.get("location");
    if (!location || response.status < 300 || response.status >= 400) {
      return { hops, status: response.status, final: current, response };
    }

    const next = new URL(location, current).toString();
    if (hops.some((hop) => hop.to === next) || next === current) {
      return { hops, loop: true, final: next };
    }
    hops.push({ from: current, to: next, status: response.status });
    current = next;
  }

  return { hops, exceeded: true, final: current };
}

/** Local runs hit localhost, but expectations are written against production. */
function toBase(pathOrUrl) {
  const path = pathOrUrl.startsWith("http")
    ? new URL(pathOrUrl).pathname
    : pathOrUrl;
  return `${base}${path}`;
}

async function readSitemapUrls() {
  const url = `${base}/sitemap.xml`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`sitemap.xml returned ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim(),
  );
}

function auditSitemapUrl(url) {
  if (url.includes("/work/") || /\/work\/?$/.test(new URL(url).pathname)) {
    fail(`sitemap contains a retired /work URL: ${url}`);
  }
  if (url.startsWith("http://")) {
    fail(`sitemap contains an http URL: ${url}`);
  }
  if (/^https:\/\/comlabstechnologies\.com/i.test(url)) {
    fail(`sitemap contains a non-www URL: ${url}`);
  }
  if (!isLocal && !url.startsWith(CANONICAL_ORIGIN)) {
    fail(`sitemap URL is not on the canonical origin: ${url}`);
  }
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!match) return null;
  const href = match[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

async function main() {
  console.log(`\nSEO route audit against ${base}\n`);

  console.log("Sitemap");
  const sitemapUrls = await readSitemapUrls();
  if (sitemapUrls.length === 0) fail("sitemap.xml contains no <loc> entries");
  console.log(`  ${sitemapUrls.length} URLs\n`);

  const seen = new Set();
  for (const url of sitemapUrls) {
    if (seen.has(url)) fail(`duplicate sitemap URL: ${url}`);
    seen.add(url);
    auditSitemapUrl(url);
  }

  console.log("Sitemap URLs resolve directly");
  for (const url of sitemapUrls) {
    const target = toBase(url);
    const result = await trace(target);
    const path = new URL(target).pathname;

    if (result.error) {
      fail(`${path} — request failed: ${result.error}`);
      continue;
    }
    if (result.hops.length > 0) {
      fail(
        `${path} redirects (${result.hops.length} hop(s)) to ${result.final}`,
      );
      continue;
    }
    if (result.status !== 200) {
      fail(`${path} returned ${result.status}`);
      continue;
    }

    const html = await result.response.text();
    const canonical = extractCanonical(html);
    if (!canonical) {
      fail(`${path} has no canonical link`);
    } else {
      const expected = `${CANONICAL_ORIGIN}${new URL(target).pathname}`;
      if (canonical !== expected) {
        fail(`${path} canonical is ${canonical}, expected ${expected}`);
      } else {
        pass(`${path} — 200, self-canonical`);
      }
    }
  }

  console.log("\nRetired URLs redirect once, permanently");
  for (const [from, to] of REDIRECT_EXPECTATIONS) {
    const result = await trace(toBase(from));

    if (result.loop) {
      fail(`${from} — redirect loop`);
      continue;
    }
    if (result.exceeded) {
      fail(`${from} — exceeded redirect limit`);
      continue;
    }
    if (result.hops.length === 0) {
      fail(`${from} — expected a redirect to ${to}, got ${result.status}`);
      continue;
    }
    if (result.hops.length > 1) {
      const chain = result.hops
        .map((hop) => `${hop.status} ${hop.to}`)
        .join(" -> ");
      fail(`${from} — ${result.hops.length} hops (chain): ${chain}`);
      continue;
    }

    const [hop] = result.hops;
    if (!PERMANENT.has(hop.status)) {
      fail(`${from} — redirect is ${hop.status}, must be 301 or 308`);
      continue;
    }

    const finalPath = new URL(result.final).pathname;
    if (finalPath !== to) {
      fail(`${from} — lands on ${finalPath}, expected ${to}`);
      continue;
    }
    if (result.status !== 200) {
      fail(`${from} — destination ${finalPath} returned ${result.status}`);
      continue;
    }
    pass(`${from} -> ${finalPath} (${hop.status}, 1 hop, 200)`);
  }

  console.log("\nInternal links point at canonical URLs");
  const checked = new Set();
  for (const url of sitemapUrls.slice(0, 12)) {
    const response = await fetch(toBase(url));
    if (!response.ok) continue;
    const html = await response.text();
    const hrefs = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map(
      (m) => m[1],
    );

    for (const href of hrefs) {
      if (checked.has(href)) continue;
      checked.add(href);
      if (
        href.startsWith("/_next/") ||
        href.startsWith("/api/") ||
        /\.[a-z0-9]+$/i.test(href)
      ) {
        continue;
      }
      if (/^\/work(\/|$)/.test(href)) {
        fail(
          `internal link points at a retired /work URL: ${href} (on ${url})`,
        );
        continue;
      }
      const result = await trace(`${base}${href}`, 3);
      if (result.hops.length > 0) {
        warn(`internal link redirects: ${href} -> ${result.final} (on ${url})`);
      }
    }
  }
  console.log(`  ${checked.size} distinct internal links checked`);

  console.log(
    `\n${failures.length} failure(s), ${warnings.length} warning(s)\n`,
  );
  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(`\nAudit could not run: ${error.message}\n`);
  process.exit(1);
});
