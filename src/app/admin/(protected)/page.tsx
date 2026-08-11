import Link from "next/link";

import { AdminDbError } from "@/components/admin/admin-db-error";
import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const dbReady = isDatabaseConfigured();
  let postCount = 0;
  let caseStudyCount = 0;
  let loadError: string | null = null;

  if (dbReady) {
    try {
      const [posts, caseStudies] = await Promise.all([listPosts(), listCaseStudies()]);
      postCount = posts.length;
      caseStudyCount = caseStudies.length;
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Failed to load content.";
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Admin
        </p>
        <h1
          className="max-w-2xl text-2xl font-bold tracking-tight md:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Manage your <MarketingOrangeHighlight>content</MarketingOrangeHighlight>.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Publish blog posts and manage editorial case studies for the Comlabs website.
        </p>
      </div>

      {!dbReady ? (
        <AdminDbError message="Add MONGODB_URI to your environment to enable saving posts and case studies." />
      ) : loadError ? (
        <AdminDbError message={loadError} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/posts"
            className="rounded-3xl border border-border bg-card p-8 transition-colors hover:border-foreground/20"
          >
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Blog posts
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight">{postCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Drafts and published articles</p>
          </Link>
          <Link
            href="/admin/case-studies"
            className="rounded-3xl border border-border bg-card p-8 transition-colors hover:border-foreground/20"
          >
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Case studies
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight">{caseStudyCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Editorial project stories</p>
          </Link>
        </div>
      )}
    </div>
  );
}
