import type { ReactNode } from "react";

export function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}

export default MarketingLayout;
