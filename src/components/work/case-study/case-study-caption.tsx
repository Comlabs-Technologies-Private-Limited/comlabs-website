type CaseStudyCaptionProps = {
  children: string;
};

export function CaseStudyCaption({ children }: CaseStudyCaptionProps) {
  return (
    <figcaption className="mt-3 max-w-[640px] text-xs leading-relaxed text-muted-foreground md:text-sm md:leading-relaxed">
      {children}
    </figcaption>
  );
}
