"use client";

import { useEffect, useRef } from "react";

import {
  DIGITAL_STUDIO_HERO_ALT,
  digitalStudioHeroImage,
} from "@/lib/digital-marketing-studio";

/**
 * Hero WebGL treatment — the page's only WebGL context.
 *
 * The hero photograph is uploaded as a texture and drawn through custom GLSL:
 * a cover-fit sampler, a soft directional UV displacement around the pointer,
 * gentle refraction, fine grain, and slight RGB separation driven by pointer
 * and scroll velocity. No ripple, liquid or blob.
 *
 * The canvas starts hidden and is faded in by toggling `data-ready` only once
 * the texture has decoded, both shaders have compiled, the program has linked
 * and the first frame has actually been drawn. If any of that fails the
 * attribute is never set, so the static `<Image>` underneath stays visible and
 * the hero is never blank.
 *
 * The renderer is sized from the hero container through a ResizeObserver
 * rather than from the canvas's own box, so the backing store always matches
 * the element it covers instead of the 300×150 canvas default.
 */

const DEV = process.env.NODE_ENV !== "production";

function warn(message: string, detail?: unknown) {
  // Diagnostics only in development; production degrades silently to the image.
  if (DEV) console.warn(`[studio-hero-canvas] ${message}`, detail ?? "");
}

const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform vec2 uMouse;
uniform float uVelocity;
uniform float uHover;
uniform float uScrollVelocity;
uniform float uProgress;

/** object-fit: cover, solved in UV space so any aspect ratio is preserved. */
vec2 coverUv(vec2 uv, vec2 canvas, vec2 image) {
  vec2 ratio = vec2(
    min((canvas.x / canvas.y) / (image.x / image.y), 1.0),
    min((canvas.y / canvas.x) / (image.y / image.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  // Aspect-corrected distance to the pointer keeps the lens circular.
  vec2 toMouse = vUv - uMouse;
  toMouse.x *= aspect;
  float dist = length(toMouse);
  vec2 dir = normalize(toMouse + 1e-5);

  // Directional displacement: the frame yields away from the pointer, with a
  // squared falloff so the centre stays soft rather than pinched.
  float lens = smoothstep(0.34, 0.0, dist);
  lens *= lens;
  float strength = (0.012 + uVelocity * 0.018) * mix(0.6, 1.0, uHover);
  vec2 displace = dir * lens * strength;
  displace.x /= aspect;

  // Refraction: a slight secondary bend across the lens edge.
  float edge = smoothstep(0.34, 0.14, dist) - smoothstep(0.14, 0.0, dist);
  vec2 refract = dir * edge * 0.006 * mix(0.5, 1.0, uHover);
  refract.x /= aspect;

  // Scroll adds a vertical drift and a shallow bend across the frame.
  float bend = sin(vUv.x * 3.14159) * uScrollVelocity * 0.035;
  vec2 scrollOffset = vec2(0.0, uScrollVelocity * 0.016 + bend);

  // Entrance: a radial opening from just below centre, played once.
  vec2 fromCentre = vUv - vec2(0.5, 0.44);
  fromCentre.x *= aspect;
  float reveal = smoothstep(length(fromCentre), length(fromCentre) + 0.35, uProgress * 1.35);
  float settle = (1.0 - uProgress) * 0.028;

  vec2 uv = vUv - displace - refract - scrollOffset;
  uv += (uv - 0.5) * settle;
  uv = coverUv(uv, uResolution, uImageResolution);

  // RGB separation, confined to the lens and to moments of movement.
  float split = uVelocity * 0.0022 + lens * uVelocity * 0.005;
  vec2 shift = dir * split;
  shift.x /= aspect;

  vec3 color;
  color.r = texture2D(uTexture, uv + shift).r;
  color.g = texture2D(uTexture, uv).g;
  color.b = texture2D(uTexture, uv - shift).b;

  // Fine grain, stepped so it reads as film rather than per-frame noise.
  float grain = hash(gl_FragCoord.xy + floor(uTime * 18.0)) - 0.5;
  color += grain * (0.024 + uVelocity * 0.016 * lens);

  color *= mix(0.05, 1.0, reveal);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
  label: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    warn(`${label} shader failed to compile`, gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadTexture(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new window.Image();
    // Required to upload a remote texture; Unsplash serves permissive CORS.
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => {
      warn(
        "hero texture failed to load (CORS or network); keeping static image",
      );
      resolve(null);
    };
    image.src = src;
  });
}

export default function StudioHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A full-viewport fragment shader is the wrong trade on a low-core phone.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && (navigator.hardwareConcurrency ?? 8) <= 4) return;

    // Size from the element the canvas covers, not the canvas's own box.
    const host = canvas.parentElement ?? canvas;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      warn("WebGL unavailable; keeping static image");
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER, "vertex");
    const fragment = compile(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER,
      "fragment",
    );
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      warn("program failed to link", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const u = {
      texture: gl.getUniformLocation(program, "uTexture"),
      time: gl.getUniformLocation(program, "uTime"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      imageResolution: gl.getUniformLocation(program, "uImageResolution"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      velocity: gl.getUniformLocation(program, "uVelocity"),
      hover: gl.getUniformLocation(program, "uHover"),
      scrollVelocity: gl.getUniformLocation(program, "uScrollVelocity"),
      progress: gl.getUniformLocation(program, "uProgress"),
    };

    let texture: WebGLTexture | null = null;
    let frame = 0;
    let disposed = false;
    let contextLost = false;
    let painted = false;
    let tabVisible = document.visibilityState === "visible";
    let onScreen = true;
    let startedAt = 0;

    // Pointer and scroll state live in closures — never React state.
    const smoothed = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let velocity = 0;
    let hover = 0;
    let hoverTarget = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let width = 0;
    let height = 0;

    function applySize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = host.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      canvas!.width = width;
      canvas!.height = height;
      gl!.viewport(0, 0, width, height);
    }

    function draw(now: number) {
      if (!startedAt) startedAt = now;
      applySize();

      // Critically damped easing: approaches rest without oscillating.
      smoothed.x += (target.x - smoothed.x) * 0.07;
      smoothed.y += (target.y - smoothed.y) * 0.07;
      hover += (hoverTarget - hover) * 0.08;
      velocity *= 0.92;
      scrollVelocity *= 0.9;

      const elapsed = (now - startedAt) / 1000;
      const linear = Math.min(elapsed / 1.05, 1);
      const progress = 1 - Math.pow(1 - linear, 3);

      gl!.uniform1f(u.time, elapsed);
      gl!.uniform2f(u.resolution, width, height);
      gl!.uniform2f(u.mouse, smoothed.x, smoothed.y);
      gl!.uniform1f(u.velocity, velocity);
      gl!.uniform1f(u.hover, hover);
      gl!.uniform1f(u.scrollVelocity, scrollVelocity);
      gl!.uniform1f(u.progress, progress);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (!painted) {
        painted = true;
        // Only now is there something real to show.
        canvas!.dataset.ready = "true";
      }

      return progress;
    }

    function render(now: number) {
      frame = 0;
      if (disposed || contextLost || !texture) return;
      const progress = draw(now);

      // Stop drawing once the reveal is done and every driver has settled;
      // pointer and scroll handlers restart the loop.
      const settled =
        progress >= 1 &&
        Math.abs(velocity) < 0.001 &&
        Math.abs(scrollVelocity) < 0.001 &&
        Math.abs(hover - hoverTarget) < 0.001 &&
        Math.abs(smoothed.x - target.x) < 0.0005 &&
        Math.abs(smoothed.y - target.y) < 0.0005;
      if (!settled) schedule();
    }

    function schedule() {
      if (
        frame ||
        disposed ||
        contextLost ||
        !tabVisible ||
        !onScreen ||
        !texture
      )
        return;
      frame = requestAnimationFrame(render);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      velocity = Math.min(
        velocity + Math.hypot(x - target.x, y - target.y) * 5.5,
        1.6,
      );
      target.x = x;
      target.y = y;
      hoverTarget = x >= 0 && x <= 1 && y >= 0 && y <= 1 ? 1 : 0;
      schedule();
    }

    function onScroll() {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity = Math.max(-1, Math.min(1, scrollVelocity + delta / 220));
      schedule();
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      stop();
      // Hand the hero back to the static image rather than showing a dead canvas.
      canvas!.removeAttribute("data-ready");
      warn("WebGL context lost; reverting to static image");
    }

    function onVisibilityChange() {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible) schedule();
      else stop();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (disposed || contextLost || !texture) return;
      applySize();
      schedule();
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        if (onScreen) schedule();
        else stop();
      },
      { rootMargin: "80px" },
    );
    intersectionObserver.observe(canvas);

    canvas.addEventListener("webglcontextlost", onContextLost);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    void loadTexture(digitalStudioHeroImage).then((image) => {
      if (disposed || !image) return;
      try {
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        // Non-power-of-two source: clamp, linear filter, no mipmaps.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image,
        );
        gl.uniform1i(u.texture, 0);
        gl.uniform2f(
          u.imageResolution,
          image.naturalWidth,
          image.naturalHeight,
        );
      } catch (error) {
        // A tainted (non-CORS) image throws here; keep the static hero.
        warn("texture upload rejected; keeping static image", error);
        texture = null;
        return;
      }
      schedule();
    });

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (texture) gl.deleteTexture(texture);
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
      title={DIGITAL_STUDIO_HERO_ALT}
      className="studio-hero-canvas pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
