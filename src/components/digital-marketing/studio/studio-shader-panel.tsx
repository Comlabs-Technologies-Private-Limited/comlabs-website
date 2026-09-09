"use client";

import { useEffect, useRef } from "react";

/**
 * Small decorative shader panels used in place of imagery.
 *
 * Each panel owns a tiny WebGL context that only draws while on screen and
 * while the tab is visible, at 1× DPR, and stops entirely once it has nothing
 * left to animate. The panels are placeholders for photography that will be
 * layered on top later, so they keep to the studio palette and stay quiet.
 *
 * Three looks:
 *   pixel — a coarse grid of ink/blue cells drifting like a signal readout
 *   flow  — soft blue/cyan light fields moving through paper
 *   scan  — hairline rows with a slow scan and a dot grid
 *
 * Without WebGL the wrapper's hairline frame is all that renders, which is an
 * acceptable empty slot. Under reduced motion a single static frame is drawn.
 */

export type StudioShaderVariant = "pixel" | "flow" | "scan";

type Props = {
  variant: StudioShaderVariant;
  tone?: "light" | "dark";
  /** Offsets the noise so neighbouring panels don't move in lockstep. */
  seed?: number;
  className?: string;
};

const VERTEX = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const COMMON = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uHover;
uniform float uSeed;
uniform vec3 uBg;
uniform vec3 uFg;
uniform vec3 uAccent;

float hash(vec2 p) {
  return fract(sin(dot(p + uSeed, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
`;

const FRAGMENTS: Record<StudioShaderVariant, string> = {
  pixel: `${COMMON}
void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float cols = 30.0;
  float rows = floor(cols / aspect);
  vec2 cell = vec2(floor(vUv.x * cols), floor(vUv.y * rows));
  vec2 inner = fract(vec2(vUv.x * cols, vUv.y * rows));

  // Gap between pixels so the grid reads as a readout, not a texture.
  float gap = step(0.12, inner.x) * step(0.12, inner.y);

  float t = uTime * 0.06;
  float n = noise(cell * 0.28 + vec2(t, t * 0.6));
  float wave = sin(cell.x * 0.35 - uTime * 0.28 + cell.y * 0.12) * 0.08;

  // Cursor proximity lights nearby cells.
  vec2 toMouse = (cell + 0.5) / vec2(cols, rows) - uMouse;
  toMouse.x *= aspect;
  float glow = smoothstep(0.32, 0.0, length(toMouse)) * uHover;

  float on = step(0.64 + wave - glow * 0.3, n);
  float bright = step(0.88 - glow * 0.2, n);

  // Cells sit at a fraction of full ink so the field stays quiet.
  vec3 cellColor = mix(uBg, mix(uFg, uAccent, bright), 0.42);
  vec3 color = mix(uBg, cellColor, on * gap);
  gl_FragColor = vec4(color, 1.0);
}
`,
  flow: `${COMMON}
void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  float t = uTime * 0.018;

  float a = noise(p * 1.6 + vec2(t, t * 0.5));
  float b = noise(p * 2.8 - vec2(t * 0.7, t * 0.3));

  vec2 toMouse = vUv - uMouse;
  toMouse.x *= aspect;
  float lift = smoothstep(0.45, 0.0, length(toMouse)) * uHover * 0.25;

  float accentMask = smoothstep(0.48, 0.95, a) + lift;
  float inkMask = smoothstep(0.62, 1.0, b) * 0.35;

  vec3 color = mix(uBg, uAccent, clamp(accentMask, 0.0, 1.0) * 0.3);
  color = mix(color, uFg, inkMask * 0.1);

  float grain = (hash(gl_FragCoord.xy + floor(uTime * 6.0)) - 0.5) * 0.018;
  gl_FragColor = vec4(color + grain, 1.0);
}
`,
  scan: `${COMMON}
void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float rows = 26.0;
  float line = step(0.94, fract(vUv.y * rows));

  float scan = smoothstep(0.1, 0.0, abs(fract(uTime * 0.03 + uSeed) - vUv.y));

  vec2 dots = fract(vec2(vUv.x * rows * aspect, vUv.y * rows));
  float dot = smoothstep(0.16, 0.08, length(dots - 0.5));
  float dotMask = step(0.62, noise(floor(vec2(vUv.x * rows * aspect, vUv.y * rows)) * 0.6 + uTime * 0.015));

  vec2 toMouse = vUv - uMouse;
  toMouse.x *= aspect;
  float glow = smoothstep(0.35, 0.0, length(toMouse)) * uHover;

  vec3 color = mix(uBg, uFg, line * 0.14);
  color = mix(color, uFg, dot * dotMask * 0.38);
  color = mix(color, uAccent, (scan * 0.32 + glow * dot * dotMask * 0.7));
  gl_FragColor = vec4(color, 1.0);
}
`,
};

const PALETTES = {
  light: {
    bg: [0.949, 0.949, 0.933],
    fg: [0.067, 0.075, 0.082],
    accent: [0.306, 0.447, 0.949],
  },
  dark: {
    bg: [0.035, 0.043, 0.051],
    fg: [0.98, 0.98, 0.969],
    accent: [0.306, 0.447, 0.949],
  },
} as const;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function StudioShaderPanel({
  variant,
  tone = "light",
  seed = 0,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let teardown: (() => void) | null = null;

    /**
     * Builds the context, program and loop for this panel. Returns a disposer.
     * Called on viewport entry and torn down on exit, so the page never holds
     * more live WebGL contexts than there are panels on screen.
     */
    function mount(): (() => void) | null {
      const gl = canvas!.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      });
      if (!gl) return null;

      const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENTS[variant]);
      const program = gl.createProgram();
      if (!vertex || !fragment || !program) return null;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const u = {
        time: gl.getUniformLocation(program, "uTime"),
        resolution: gl.getUniformLocation(program, "uResolution"),
        mouse: gl.getUniformLocation(program, "uMouse"),
        hover: gl.getUniformLocation(program, "uHover"),
      };
      const palette = PALETTES[tone];
      gl.uniform1f(gl.getUniformLocation(program, "uSeed"), seed);
      gl.uniform3fv(gl.getUniformLocation(program, "uBg"), palette.bg);
      gl.uniform3fv(gl.getUniformLocation(program, "uFg"), palette.fg);
      gl.uniform3fv(gl.getUniformLocation(program, "uAccent"), palette.accent);

      let frame = 0;
      let disposed = false;
      let lost = false;
      let tabVisible = document.visibilityState === "visible";
      const mouse = { x: 0.5, y: 0.5 };
      const target = { x: 0.5, y: 0.5 };
      let hover = 0;
      let hoverTarget = 0;
      const startedAt = performance.now();

      function resize() {
        // 1× is plenty for a soft field; these panels are small.
        const width = Math.max(1, canvas!.clientWidth);
        const height = Math.max(1, canvas!.clientHeight);
        if (canvas!.width === width && canvas!.height === height) return;
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }

      function draw(now: number) {
        resize();
        mouse.x += (target.x - mouse.x) * 0.08;
        mouse.y += (target.y - mouse.y) * 0.08;
        hover += (hoverTarget - hover) * 0.08;
        gl!.uniform1f(u.time, (now - startedAt) / 1000);
        gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
        gl!.uniform2f(u.mouse, mouse.x, mouse.y);
        gl!.uniform1f(u.hover, hover);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      }

      function render(now: number) {
        frame = 0;
        if (disposed || lost) return;
        draw(now);
        schedule();
      }

      function schedule() {
        if (frame || disposed || lost || reduce || !tabVisible) return;
        frame = requestAnimationFrame(render);
      }

      function stop() {
        if (!frame) return;
        cancelAnimationFrame(frame);
        frame = 0;
      }

      function onPointerMove(event: PointerEvent) {
        const rect = canvas!.getBoundingClientRect();
        target.x = (event.clientX - rect.left) / rect.width;
        target.y = 1 - (event.clientY - rect.top) / rect.height;
        hoverTarget = 1;
      }
      function onPointerLeave() {
        hoverTarget = 0;
      }
      function onContextLost(event: Event) {
        event.preventDefault();
        lost = true;
        stop();
      }
      function onVisibility() {
        tabVisible = document.visibilityState === "visible";
        if (tabVisible) schedule();
        else stop();
      }

      canvas!.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas!.addEventListener("pointerleave", onPointerLeave);
      canvas!.addEventListener("webglcontextlost", onContextLost);
      document.addEventListener("visibilitychange", onVisibility);

      // Reduced motion: one static frame, then nothing.
      if (reduce) draw(performance.now());
      else schedule();

      return () => {
        disposed = true;
        stop();
        canvas!.removeEventListener("pointermove", onPointerMove);
        canvas!.removeEventListener("pointerleave", onPointerLeave);
        canvas!.removeEventListener("webglcontextlost", onContextLost);
        document.removeEventListener("visibilitychange", onVisibility);
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        gl.deleteBuffer(buffer);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !teardown) {
          teardown = mount();
        } else if (!visible && teardown) {
          teardown();
          teardown = null;
        }
      },
      { rootMargin: "160px" },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      teardown?.();
      teardown = null;
    };
  }, [variant, tone, seed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
    />
  );
}
