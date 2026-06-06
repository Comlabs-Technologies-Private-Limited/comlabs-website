import { sectionContainer } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centers section content at the site max width (1440px — MacBook Air 13" M1). */
export function SectionContainer({ children, className }: SectionContainerProps) {
  return <div className={cn(sectionContainer, className)}>{children}</div>;
}
