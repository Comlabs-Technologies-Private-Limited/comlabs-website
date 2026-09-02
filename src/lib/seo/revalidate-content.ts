import { revalidatePath } from "next/cache";

type RevalidateContentInput = {
  type: "post" | "case-study";
  slug?: string;
};

/** Bust cached sitemap and public content routes after admin CRUD. */
export function revalidateContentPaths({ type, slug }: RevalidateContentInput): void {
  revalidatePath("/sitemap.xml");
  revalidatePath("/work/[slug]", "page");
  revalidatePath("/blog/[slug]", "page");

  if (type === "post") {
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
    return;
  }

  revalidatePath("/work");
  revalidatePath("/");
  revalidatePath("/about");
  if (slug) revalidatePath(`/work/${slug}`);
}
