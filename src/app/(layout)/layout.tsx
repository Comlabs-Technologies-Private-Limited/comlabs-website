import type { ReactNode } from "react";

import { AgentationGate } from "@/components/dev/agentation-gate";

export function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <AgentationGate />
    </>
  );
}

export default MarketingLayout;
