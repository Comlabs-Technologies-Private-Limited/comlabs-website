import Link from "next/link";

import { listCaseStudies } from "@/lib/admin/case-studies";
import { listPosts } from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const dbReady = isDatabaseConfigured();
  let postCount = 0;
  let caseStudyCount = 0;

  if (dbReady) {
    try {
      const [posts, caseStudies] = await Promise.all([listPosts(), listCaseStudies()]);
      postCount = posts.length;
      caseStudyCount = caseStudies.length;
    } catch {
      // counts stay at zero
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Dashboard</p>
        <h1
          className="mt-3 text-3xl font-medium tracking-tight md:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Content overview
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Publish blog posts and manage editorial case studies for the Comlabs website.
        </p>
      </div>

      {!dbReady ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
          Database connection is not configured. Add{" "}
          <code className="text-foreground">MONGODB_URI</code> to enable saving posts and case
          studies.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/posts"
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
          >
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Blog posts</p>
            <p className="mt-3 text-3xl font-medium tracking-tight">{postCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Drafts and published articles</p>
          </Link>
          <Link
            href="/admin/case-studies"
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
          >
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Case studies</p>
            <p className="mt-3 text-3xl font-medium tracking-tight">{caseStudyCount}</p>
            <p className="mt-2 text-sm text-muted-foreground">Editorial project stories</p>
          </Link>
        </div>
      )}
    </div>
  );
}
