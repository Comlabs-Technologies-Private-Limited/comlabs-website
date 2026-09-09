"use client";

import { useEffect, useRef } from "react";

/**
 * Atmospheric shader layer that sits over the hero photograph.
 *
 * It is deliberately *not* a Three.js scene: the effect is a single full-screen
 * fragment shader (drifting light bands in the studio blue/cyan/amber, plus
 * animated film grain), so raw WebGL keeps it at a few kilobytes instead of
 * pulling a renderer into the critical path.
 *
 * The component renders nothing meaningful without WebGL — the photograph and
 * all hero text sit underneath in normal DOM, so losing the canvas costs only
 * the atmosphere. It is loaded dynamically, capped at 1.5× DPR, paused when
 * scrolled out of view or when the tab is hidden, and re-initialises after a
 * `webglcontextlost` event.
 */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

// Studio palette. Blue is the signal; cyan and amber stay atmospheric.
const vec3 BLUE  = vec3(0.306, 0.447, 0.949);
const vec3 CYAN  = vec3(0.459, 0.835, 0.816);
const vec3 AMBER = vec3(0.851, 0.604, 0.329);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
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

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = vec2(uv.x * (uResolution.x / max(uResolution.y, 1.0)), uv.y);

  float t = uTime * 0.045;

  // Two slow, overlapping light fields drifting across the frame.
  float fieldA = noise(p * 1.7 + vec2(t, t * 0.6));
  float fieldB = noise(p * 2.6 - vec2(t * 0.8, t * 0.35));

  float blueMask = smoothstep(0.42, 0.98, fieldA) * (1.0 - uv.x * 0.55);
  float cyanMask = smoothstep(0.58, 1.0, fieldB) * 0.45;
  float amberMask = smoothstep(0.55, 1.0, fieldA * fieldB) * uv.x * 0.7;

  vec3 color = BLUE * blueMask + CYAN * cyanMask + AMBER * amberMask;

  // Vignette so the atmosphere never washes out the headline area.
  float vignette = smoothstep(1.15, 0.28, length(uv - vec2(0.5)));
  color *= vignette;

  // Fine animated grain keeps large flat areas from banding.
  float grain = (hash(gl_FragCoord.xy + fract(uTime) * 137.0) - 0.5) * 0.055;
  color += grain;

  float alpha = clamp(blueMask * 0.5 + cyanMask * 0.4 + amberMask * 0.45 + 0.06, 0.0, 0.62);
  gl_FragColor = vec4(color, alpha);
}
`;

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

export default function StudioHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");

    let frame = 0;
    let disposed = false;
    let contextLost = false;
    let tabVisible = document.visibilityState === "visible";
    let onScreen = true;
    const startedAt = performance.now();

    function resize() {
      // Capped DPR: this is a soft atmospheric layer, so extra pixels buy
      // nothing visible and cost fill rate on phones.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width === width && canvas!.height === height) return;
      canvas!.width = width;
      canvas!.height = height;
      gl!.viewport(0, 0, width, height);
    }

    function render(now: number) {
      frame = 0;
      if (disposed || contextLost) return;
      resize();
      gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLocation, (now - startedAt) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      schedule();
    }

    function schedule() {
      if (frame || disposed || contextLost || !tabVisible || !onScreen) return;
      frame = requestAnimationFrame(render);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      stop();
    }

    function onContextRestored() {
      // The GPU resources above are gone; a fresh mount rebuilds them, so the
      // page simply continues without the atmosphere rather than half-drawing.
      contextLost = true;
    }

    function onVisibilityChange() {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible) schedule();
      else stop();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) schedule();
        else stop();
      },
      { rootMargin: "120px" },
    );

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    document.addEventListener("visibilitychange", onVisibilityChange);
    observer.observe(canvas);
    schedule();

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
    />
  );
}
