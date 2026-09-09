"use client";

import { useEffect, useRef, useState } from "react";

import {
  DIGITAL_STUDIO_HERO_ALT,
  digitalStudioHeroImage,
} from "@/lib/digital-marketing-studio";

/**
 * WebGL hero treatment.
 *
 * The hero photograph is uploaded as a texture and drawn through custom GLSL:
 * a cover-fit sampler, a soft cursor refraction lens, pointer-velocity driven
 * chromatic separation and grain, a smoothed scroll-velocity bend, fine film
 * grain, and a `uProgress` entrance reveal.
 *
 * Written against raw WebGL rather than Three.js: this is one full-screen
 * quad with one material, so a renderer abstraction would add far more weight
 * than it saves. There is exactly one context on the page.
 *
 * The DOM `<Image>` in `studio-hero.tsx` stays mounted underneath and is what
 * a visitor sees while the texture loads, if WebGL is unavailable, if a shader
 * fails to compile, if the texture is blocked, or under reduced motion. The
 * canvas only fades in once it has actually drawn a frame.
 */

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

/** object-fit: cover, solved in UV space. */
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

  // --- Cursor refraction -------------------------------------------------
  // Distance is measured in aspect-corrected space so the lens stays round.
  vec2 toMouse = vUv - uMouse;
  toMouse.x *= aspect;
  float dist = length(toMouse);

  float radius = 0.28;
  float lens = smoothstep(radius, 0.0, dist);
  // Squared falloff keeps the centre soft instead of pinched.
  lens *= lens;

  float strength = (0.016 + uVelocity * 0.022) * mix(0.55, 1.0, uHover);
  vec2 refraction = normalize(toMouse + 1e-5) * lens * strength;
  refraction.x /= aspect;

  // --- Scroll bend -------------------------------------------------------
  float bend = sin(vUv.x * 3.14159) * uScrollVelocity * 0.05;
  vec2 scrollOffset = vec2(0.0, uScrollVelocity * 0.022 + bend);

  // --- Entrance reveal ---------------------------------------------------
  // A radial mask opening outward from just below centre.
  vec2 fromCentre = vUv - vec2(0.5, 0.44);
  fromCentre.x *= aspect;
  float reveal = smoothstep(length(fromCentre), length(fromCentre) + 0.35, uProgress * 1.35);
  float settle = (1.0 - uProgress) * 0.03;

  vec2 uv = vUv - refraction - scrollOffset;
  uv += (uv - 0.5) * settle;
  uv = coverUv(uv, uResolution, uImageResolution);

  // --- Chromatic separation ----------------------------------------------
  // Rises with pointer velocity and inside the lens only, so the image is
  // never permanently fringed.
  float split = (uVelocity * 0.0032 + lens * uVelocity * 0.006);
  vec2 shift = normalize(toMouse + 1e-5) * split;
  shift.x /= aspect;

  vec3 color;
  color.r = texture2D(uTexture, uv + shift).r;
  color.g = texture2D(uTexture, uv).g;
  color.b = texture2D(uTexture, uv - shift).b;

  // --- Grain -------------------------------------------------------------
  float grainAmount = 0.028 + uVelocity * 0.02 * lens;
  float grain = hash(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
  color += grain * grainAmount;

  // Reveal darkens the not-yet-open area rather than clipping it.
  color *= mix(0.06, 1.0, reveal);

  gl_FragColor = vec4(color, 1.0);
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

function loadTexture(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export default function StudioHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Constrained devices keep the plain DOM photograph: a full-viewport
    // fragment shader is the wrong trade on a low-core phone.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (coarse && lowCore) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    let disposed = false;
    let frame = 0;
    let contextLost = false;
    let tabVisible = document.visibilityState === "visible";
    let onScreen = true;

    // Pointer and scroll state live in closures, never in React state: these
    // update on every move and every frame.
    const mouse = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let velocity = 0;
    let hover = 0;
    let hoverTarget = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let startedAt = 0;

    const program = gl.createProgram();
    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!program || !vertex || !fragment) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
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

    const uniforms = {
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

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width === width && canvas!.height === height) return;
      canvas!.width = width;
      canvas!.height = height;
      gl!.viewport(0, 0, width, height);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (event.clientX - rect.left) / rect.width;
      // GL's origin is bottom-left.
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const dx = x - target.x;
      const dy = y - target.y;
      velocity = Math.min(velocity + Math.hypot(dx, dy) * 5.5, 1.6);
      target.x = x;
      target.y = y;
      hoverTarget = x >= 0 && x <= 1 && y >= 0 && y <= 1 ? 1 : 0;
    }

    function onPointerLeave() {
      hoverTarget = 0;
    }

    function onScroll() {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity = Math.max(-1, Math.min(1, scrollVelocity + delta / 220));
    }

    function render(now: number) {
      frame = 0;
      if (disposed || contextLost || !texture) return;
      if (!startedAt) startedAt = now;

      resize();

      // Critically damped easing — approaches rest without oscillating.
      mouse.x += (target.x - mouse.x) * 0.075;
      mouse.y += (target.y - mouse.y) * 0.075;
      hover += (hoverTarget - hover) * 0.08;
      velocity *= 0.92;
      scrollVelocity *= 0.9;

      const elapsed = (now - startedAt) / 1000;
      // ~1050ms reveal, eased out, played exactly once.
      const linear = Math.min(elapsed / 1.05, 1);
      const progress = 1 - Math.pow(1 - linear, 3);

      gl!.uniform1f(uniforms.time, elapsed);
      gl!.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl!.uniform1f(uniforms.velocity, velocity);
      gl!.uniform1f(uniforms.hover, hover);
      gl!.uniform1f(uniforms.scrollVelocity, scrollVelocity);
      gl!.uniform1f(uniforms.progress, progress);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // Once the reveal is done and every driver has settled, stop drawing
      // until something moves again.
      const settled =
        progress >= 1 &&
        Math.abs(velocity) < 0.001 &&
        Math.abs(scrollVelocity) < 0.001 &&
        Math.abs(hover - hoverTarget) < 0.001 &&
        Math.abs(mouse.x - target.x) < 0.0005 &&
        Math.abs(mouse.y - target.y) < 0.0005;
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

    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      stop();
      setReady(false);
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
      { rootMargin: "80px" },
    );

    canvas.addEventListener("webglcontextlost", onContextLost);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    observer.observe(canvas);

    void loadTexture(digitalStudioHeroImage).then((image) => {
      if (disposed || !image) return;
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      // Non-power-of-two source: clamp and linear filtering, no mipmaps.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(uniforms.texture, 0);
      gl.uniform2f(
        uniforms.imageResolution,
        image.naturalWidth,
        image.naturalHeight,
      );
      setReady(true);
      schedule();
    });

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("pointerleave", onPointerLeave);
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
      // Decorative: the DOM photograph with its alt text sits underneath.
      title={DIGITAL_STUDIO_HERO_ALT}
      className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
