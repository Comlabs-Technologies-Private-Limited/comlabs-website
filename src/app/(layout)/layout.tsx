import type { ReactNode } from "react";

import { AgentationGate } from "@/components/dev/agentation-gate";

export function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" ? <AgentationGate /> : null}
    </>
  );
}

export default MarketingLayout;
