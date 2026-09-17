type CaseStudyTransformationProps = {
  before: string[];
  after: string[];
};

function FlowList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={item} className="text-base leading-[1.7] md:text-[17px]">
          {index > 0 ? (
            <span className="text-muted-foreground" aria-hidden="true">
              →{" "}
            </span>
          ) : null}
          <span className={index === 0 ? "text-foreground" : "text-muted-foreground"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyTransformation({ before, after }: CaseStudyTransformationProps) {
  return (
    <div className="mt-8 grid gap-8 border-y border-border py-8 md:grid-cols-2 md:gap-12">
      <div>
        <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">Before</p>
        <FlowList items={before} />
      </div>
      <div>
        <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">After</p>
        <FlowList items={after} />
      </div>
    </div>
  );
}
