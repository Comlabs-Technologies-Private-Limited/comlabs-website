"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type HydrateOnViewProps = {
  children: ReactNode;
  /** Reserved height so skipping SSR of children does not cause CLS. */
  minHeightClassName: string;
  rootMargin?: string;
};

export function HydrateOnView({
  children,
  minHeightClassName,
  rootMargin = "200px",
}: HydrateOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={visible ? undefined : minHeightClassName}>
      {visible ? children : null}
    </div>
  );
}
