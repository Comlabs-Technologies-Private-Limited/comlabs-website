"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type DeferredHomeVisualProps =
  | {
      name: "service";
      id: string;
      background: string;
      visualClassName?: string;
    }
  | {
      name: "applied-ai";
    }
  | {
      name: "specialty";
    };

async function loadVisual(props: DeferredHomeVisualProps): Promise<ReactNode> {
  switch (props.name) {
    case "service": {
      const { ServiceVisualRuntime } = await import(
        /* webpackPrefetch: false */
        "@/components/home/service-visual-runtime"
      );
      return (
        <ServiceVisualRuntime
          id={props.id}
          background={props.background}
          visualClassName={props.visualClassName}
        />
      );
    }
    case "applied-ai": {
      const { AppliedAiVisualRuntime } = await import(
        /* webpackPrefetch: false */
        "@/components/home/figma/applied-ai-visual-runtime"
      );
      return <AppliedAiVisualRuntime />;
    }
    case "specialty": {
      const { SpecialtyVisualRuntime } = await import(
        /* webpackPrefetch: false */
        "@/components/home/figma/specialty-visual-runtime"
      );
      return <SpecialtyVisualRuntime />;
    }
  }
}

export function DeferredHomeVisual(props: DeferredHomeVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  const [visual, setVisual] = useState<ReactNode>(null);

  propsRef.current = props;

  const loadKey =
    props.name === "service"
      ? `${props.name}:${props.id}:${props.background}:${props.visualClassName ?? ""}`
      : props.name;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void loadVisual(propsRef.current).then((next) => {
          if (!cancelled) setVisual(next);
        });
      },
      { rootMargin: "160px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [loadKey]);

  return (
    <div ref={ref} className="aspect-[5/4] md:aspect-[4/3]">
      {visual}
    </div>
  );
}
