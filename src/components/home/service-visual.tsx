import { DeferredHomeVisual } from "@/components/media/deferred-home-visual";

export function ServiceVisual({
  background,
  visualClassName,
  id,
}: {
  background: string;
  visualClassName?: string;
  id: string;
}) {
  return (
    <DeferredHomeVisual
      name="service"
      id={id}
      background={background}
      visualClassName={visualClassName}
    />
  );
}
