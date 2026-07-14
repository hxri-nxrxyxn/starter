import { gsap } from "./registry.js";

export function floatingBackground(element: HTMLElement, options?: {
  xRange?: [number, number];
  yRange?: [number, number];
  duration?: number;
}) {
  const { xRange = [-5, 5], yRange = [-5, 5], duration = 15 } = options ?? {};
  const ctx = gsap.context(() => {
    gsap.to(element, {
      x: `random(${xRange[0]}, ${xRange[1]})`,
      y: `random(${yRange[0]}, ${yRange[1]})`,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, element);
  return ctx;
}

export function gradientShift(element: HTMLElement, colors?: string[], duration?: number) {
  const ctx = gsap.context(() => {
    gsap.to(element, {
      backgroundPosition: `${Math.random() * 100}% ${Math.random() * 100}%`,
      duration: duration ?? 20,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, element);
  return ctx;
}

export function glowPulse(element: HTMLElement, options?: {
  color?: string;
  intensity?: number;
  duration?: number;
}) {
  const intensity = options?.intensity ?? 0.6;
  const duration = options?.duration ?? 2;
  const ctx = gsap.context(() => {
    gsap.fromTo(element,
      { boxShadow: `0 0 ${8 * intensity}px ${options?.color ?? "var(--color-primary)"}` },
      {
        boxShadow: `0 0 ${20 * intensity}px ${options?.color ?? "var(--color-primary)"}`,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
  }, element);
  return ctx;
}

export function numberTicker(
  element: HTMLElement,
  from: number,
  to: number,
  options?: { duration?: number; prefix?: string; suffix?: string; separator?: boolean }
) {
  const { duration = 0.8, prefix = "", suffix = "", separator = false } = options ?? {};
  const obj = { value: from };
  const fmt = (v: number) => {
    const n = Math.round(v);
    const s = separator ? n.toLocaleString() : String(n);
    return `${prefix}${s}${suffix}`;
  };
  const tween = gsap.to(obj, {
    value: to,
    duration,
    ease: "premium-smooth",
    onUpdate: () => { element.textContent = fmt(obj.value); },
  });
  return tween;
}

export function liveChartBars(container: HTMLElement, options?: {
  stagger?: number;
  duration?: number;
}) {
  const stagger = options?.stagger ?? 0.04;
  const duration = options?.duration ?? 0.6;
  const ctx = gsap.context(() => {
    const bars = container.querySelectorAll("[data-chart-bar]");
    gsap.from(bars, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration,
      stagger,
      ease: "premium-bounce",
    });
  }, container);
  return ctx;
}

export function progressRingAnimate(
  svg: SVGSVGElement,
  from: number,
  to: number,
  options?: { duration?: number }
) {
  const circle = svg.querySelector("circle:last-child") as SVGCircleElement | null;
  if (!circle) return null;
  const radius = parseFloat(circle.getAttribute("r") ?? "0");
  const circumference = 2 * Math.PI * radius;
  const obj = { value: from };
  const tween = gsap.to(obj, {
    value: to,
    duration: options?.duration ?? 0.8,
    ease: "premium-smooth",
    onUpdate: () => {
      const offset = circumference - (obj.value / 100) * circumference;
      circle.setAttribute("stroke-dashoffset", String(offset));
    },
  });
  return tween;
}
