import type { ReactNode } from "react";

type MarketingLayoutProps = {
  children: ReactNode;
};

export async function MarketingLayout({ children }: MarketingLayoutProps) {
  if (process.env.NODE_ENV === "development") {
    const { AgentationGate } = await import("@/components/dev/agentation-gate");
    return (
      <>
        {children}
        <AgentationGate />
      </>
    );
  }

  return children;
}

export default MarketingLayout;
