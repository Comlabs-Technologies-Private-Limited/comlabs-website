/** Cached getBoundingClientRect — invalidates on resize/scroll. */

export function createRectCache(element: HTMLElement) {
  let rect = element.getBoundingClientRect();
  let dirty = true;

  const markDirty = () => {
    dirty = true;
  };

  const observer = new ResizeObserver(markDirty);
  observer.observe(element);
  window.addEventListener("scroll", markDirty, true);
  window.addEventListener("resize", markDirty);

  return {
    get current(): DOMRect {
      if (dirty) {
        rect = element.getBoundingClientRect();
        dirty = false;
      }
      return rect;
    },
    destroy() {
      observer.disconnect();
      window.removeEventListener("scroll", markDirty, true);
      window.removeEventListener("resize", markDirty);
    },
  };
}
