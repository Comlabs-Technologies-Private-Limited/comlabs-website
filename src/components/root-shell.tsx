import type { ReactNode } from "react";

type RootShellProps = {
  children: ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  return (
    <body
      suppressHydrationWarning
      className="flex min-h-full max-w-full flex-col overflow-x-clip bg-background text-foreground"
    >
      <div className="relative flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</div>
    </body>
  );
}
