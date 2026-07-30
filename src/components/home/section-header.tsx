"use client";

import { TextFade } from "@/components/motion/text-fade";

type SectionHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <TextFade mode="scroll" className={className}>
      {children}
    </TextFade>
  );
}
