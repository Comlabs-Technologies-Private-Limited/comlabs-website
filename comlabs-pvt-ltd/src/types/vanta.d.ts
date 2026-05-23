declare module "vanta/dist/vanta.fog.min" {
  interface VantaFogEffect {
    destroy: () => void;
    setOptions: (options: Record<string, unknown>) => void;
  }

  export default function FOG(options: {
    el: HTMLElement | string;
    THREE: typeof import("three");
    [key: string]: unknown;
  }): VantaFogEffect;
}
