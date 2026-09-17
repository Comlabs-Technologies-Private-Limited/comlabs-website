import { prepareIndexableHtml } from "@/lib/seo/prepare-html-links";

type PostBodyProps = {
  html: string;
};

export function PostBody({ html }: PostBodyProps) {
  return (
    <div
      className="post-body"
      dangerouslySetInnerHTML={{ __html: prepareIndexableHtml(html) }}
    />
  );
}
