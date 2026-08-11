type AdminDbErrorProps = {
  title?: string;
  message?: string;
};

export function AdminDbError({
  title = "Could not connect to the database",
  message = "Check that MONGODB_URI is set correctly in your environment and that the MongoDB cluster allows connections from this server.",
}: AdminDbErrorProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Database
      </p>
      <h2
        className="mt-4 text-xl font-bold tracking-tight md:text-2xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {message}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Ensure the password in <code className="text-foreground">MONGODB_URI</code> is URL-encoded
        (e.g. <code className="text-foreground">@</code> becomes{" "}
        <code className="text-foreground">%40</code>).
      </p>
    </div>
  );
}
