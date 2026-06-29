import type { ReactNode } from "react";
import { Agentation } from "agentation";

export function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}
  <Agentation />
  </>;
}

export default MarketingLayout;
