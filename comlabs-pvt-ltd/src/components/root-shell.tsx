"use client";

import { AppNavbar } from "@/components/layout/app-navbar";
import { FooterBar } from "@/components/layout/footer-bar";
import { ScrollProgress } from "@/components/layout/scroll-progress";

type RootShellProps = {
  interClassName: string;
  children: React.ReactNode;
};

export function RootShell({ interClassName, children }: RootShellProps) {
  return (
    <html lang="en" className={`${interClassName} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full max-w-full flex-col overflow-x-clip bg-[var(--bg-primary)] text-[var(--fg-primary)]">
        <ScrollProgress />
        <AppNavbar />
        <div className="relative flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</div>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[28] h-[min(14vh,128px)]"
        >
          <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_0%,transparent_40%)]" />
          <div className="absolute inset-0 backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_0%,transparent_65%)]" />
          <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/75 via-[var(--bg-primary)]/20 to-transparent" />
        </div>
        <FooterBar />
      </body>
    </html>
  );
}
