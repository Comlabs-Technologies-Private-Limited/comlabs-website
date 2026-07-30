type PostBodyProps = {
  html: string;
};

export function PostBody({ html }: PostBodyProps) {
  return (
    <div
      className="post-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
