import { TextFade } from "@/components/motion/text-fade";
import { bodyText, pageMain, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

export default function WebDevelopmentServicePage() {
  return (
    <div className={pageMain}>
      <TextFade mode="scroll">
        <h1 className={sectionTitle}>Web development</h1>
        <p className={cn(bodyText, "mt-4 max-w-3xl")}>
          Fast, durable web products — clean architecture, performance budgets, and UX that
          converts.
        </p>
      </TextFade>
    </div>
  );
}
