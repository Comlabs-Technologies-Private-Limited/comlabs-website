import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { createPost } from "../src/lib/admin/posts";

const content = `
<p>AI search visibility is finally becoming measurable.</p>
<p>It is not the same as business impact.</p>
<p>Google's new generative AI performance reports in Search Console show:</p>
<ul>
  <li>How often a site appears in AI-powered Search and Discover experiences</li>
  <li>Which pages are surfaced</li>
  <li>Visibility by country, device and date</li>
</ul>
<p>That is useful progress.</p>
<p>But the first report primarily answers:</p>
<p><strong>"Where did our content appear?"</strong></p>
<p>It does not complete the more important business question:</p>
<p><strong>"What happened because we appeared?"</strong></p>
<p>A company can gain thousands of AI-search impressions without knowing whether they created qualified visits, branded demand, enquiries or revenue.</p>
<p>That means AI-search reporting should be connected to the rest of the funnel:</p>
<ul>
  <li>Which pages are repeatedly surfaced?</li>
  <li>Does branded or direct traffic change?</li>
  <li>What do visitors do after arriving?</li>
  <li>Which pages assist real conversions?</li>
</ul>
<p>SEO teams should not replace rankings with AI impressions and call the strategy modernised.</p>
<p>Both are visibility metrics.</p>
<p>The commercial value begins when visibility changes user behaviour.</p>
<p>AI visibility is a signal.</p>
<p>Conversion is the outcome.</p>
`.trim();

async function main() {
  const post = await createPost({
    title: "AI search visibility is finally becoming measurable",
    slug: "ai-search-visibility-is-finally-becoming-measurable",
    excerpt:
      "Google's generative AI performance reports in Search Console show where content appears in AI-powered search — but visibility alone is not business impact. The commercial value begins when visibility changes user behaviour.",
    content,
    tags: ["SEO", "AI Search", "Search Console", "Digital Strategy"],
    status: "published",
    author: "Comlabs Technologies Pvt Ltd",
    metaTitle: "AI Search Visibility Is Measurable — But Not the Same as Business Impact",
    metaDescription:
      "Google Search Console now reports AI search visibility. Comlabs explains why impressions are not enough — and how to connect AI visibility to conversions, traffic and revenue.",
  });

  console.log(`Created blog post: /blog/${post.slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    const { getPrisma } = await import("../src/lib/prisma");
    await getPrisma().$disconnect();
  });
