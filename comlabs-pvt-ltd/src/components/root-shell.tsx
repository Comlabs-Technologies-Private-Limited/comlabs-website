"use client";

import { useState } from "react";

import { AppNavbar } from "@/components/layout/app-navbar";
import { FooterBar } from "@/components/layout/footer-bar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeProvider } from "@/context/theme-context";
import { cn } from "@/lib/utils";

type RootShellProps = {
  interClassName: string;
  children: React.ReactNode;
};

export function RootShell({ interClassName, children }: RootShellProps) {
  const [dark, setDark] = useState(false);

  return (
    <html
      lang="en"
      className={cn(interClassName, "h-full antialiased", dark && "dark")}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--bg-primary)] text-[var(--fg-primary)]">
        <ThemeProvider dark={dark} setDark={setDark}>
          <ScrollProgress />
          <AppNavbar />
          <div className="relative flex flex-1 flex-col">{children}</div>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[28] h-[min(20vh,180px)] "
          />
          <FooterBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
