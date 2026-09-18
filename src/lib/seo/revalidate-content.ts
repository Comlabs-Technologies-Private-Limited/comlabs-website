import { revalidatePath } from "next/cache";

import { canonicalUrl } from "@/lib/site";
import { notifyIndexNow } from "./indexnow";

type RevalidateContentInput = {
  type: "post" | "case-study";
  slug?: string;
};

/** Bust cached sitemap, RSS feed, and public content routes after admin CRUD. */
export function revalidateContentPaths({ type, slug }: RevalidateContentInput): void {
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/case-studies/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");

  const changedUrls: string[] = [canonicalUrl("/sitemap.xml")];

  if (type === "post") {
    revalidatePath("/blog");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      changedUrls.push(canonicalUrl(`/blog/${slug}`));
    }
    void notifyIndexNow(changedUrls);
    return;
  }

  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/about");
  if (slug) {
    revalidatePath(`/case-studies/${slug}`);
    changedUrls.push(canonicalUrl(`/case-studies/${slug}`));
  }
  void notifyIndexNow(changedUrls);
}
