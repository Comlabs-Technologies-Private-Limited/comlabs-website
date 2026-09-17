"use client";

type RootShellProps = {
  children: React.ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  return (
    <body
      suppressHydrationWarning
      className="flex min-h-full max-w-full flex-col overflow-x-clip bg-background text-foreground"
    >
      <div className="relative mx-auto flex w-full min-w-0 max-w-[var(--site-shell-max)] flex-1 flex-col overflow-x-clip">
        {children}
      </div>
    </body>
  );
}
