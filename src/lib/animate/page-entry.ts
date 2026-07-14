import { gsap } from "./registry.js";

interface StaggerOptions {
  from?: "start" | "end" | "center" | "random";
  stagger?: number;
  duration?: number;
}

export function pageEnter(container: HTMLElement, options?: StaggerOptions) {
  const stagger = options?.stagger ?? 0.05;
  const duration = options?.duration ?? 0.5;
  const from = options?.from ?? "start";

  const ctx = gsap.context(() => {
    const items = container.children;
    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration,
      stagger: { amount: stagger * items.length, from },
      ease: "premium-smooth",
      clearProps: "opacity,y",
    });
  }, container);
  return ctx;
}

export function pageEnterHierarchy(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const title = container.querySelector("[data-entry-title]");
    const subtitle = container.querySelector("[data-entry-subtitle]");
    const stats = container.querySelector("[data-entry-stats]");
    const cards = container.querySelector("[data-entry-cards]");
    const buttons = container.querySelector("[data-entry-buttons]");

    const tl = gsap.timeline({ ease: "premium-smooth" });

    if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.4 }, 0);
    if (subtitle) tl.from(subtitle, { opacity: 0, y: 15, duration: 0.4 }, 0.05);
    if (stats) tl.from(stats, { opacity: 0, y: 15, duration: 0.4 }, 0.1);
    if (cards) {
      const cardEls = cards.querySelectorAll("[data-entry-card]");
      tl.from(cardEls, { opacity: 0, y: 20, rotation: 1, duration: 0.4, stagger: 0.05 }, 0.15);
    }
    if (buttons) tl.from(buttons, { opacity: 0, y: 10, duration: 0.3 }, 0.25);
  }, container);
  return ctx;
}

export function heroEnter(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ ease: "premium-smooth" });
    const title = container.querySelector("[data-hero-title]");
    const subtitle = container.querySelector("[data-hero-subtitle]");
    const image = container.querySelector("[data-hero-image]");
    const cta = container.querySelector("[data-hero-cta]");

    if (title) tl.from(title, { opacity: 0, y: 30, duration: 0.5 }, 0);
    if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.5 }, 0.1);
    if (image) tl.from(image, { opacity: 0, y: 25, scale: 0.95, duration: 0.6 }, 0.15);
    if (cta) tl.from(cta, { opacity: 0, y: 15, duration: 0.4 }, 0.3);
  }, container);
  return ctx;
}

export function listEnter(container: HTMLElement, options?: { stagger?: number }) {
  const stagger = options?.stagger ?? 0.03;
  const ctx = gsap.context(() => {
    const items = container.querySelectorAll("[data-list-item]");
    gsap.from(items, {
      opacity: 0,
      x: -10,
      duration: 0.35,
      stagger,
      ease: "power2.out",
      clearProps: "opacity,x",
    });
  }, container);
  return ctx;
}

export function cardEnter(element: HTMLElement, options?: { delay?: number }) {
  const ctx = gsap.context(() => {
    gsap.from(element, {
      opacity: 0,
      y: 20,
      rotation: 0.5,
      filter: "blur(2px)",
      duration: 0.5,
      delay: options?.delay ?? 0,
      ease: "premium-smooth",
      clearProps: "opacity,y,rotation,filter",
    });
  }, element);
  return ctx;
}

export function metricEnter(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ ease: "premium-smooth" });
    const card = container.querySelector("[data-metric-card]") ?? container;
    const value = container.querySelector("[data-metric-value]");
    const label = container.querySelector("[data-metric-label]");
    const trend = container.querySelector("[data-metric-trend]");

    tl.from(card, { opacity: 0, y: 15, duration: 0.4 }, 0);
    if (value) tl.from(value, { opacity: 0, y: 10, duration: 0.3 }, 0.1);
    if (label) tl.from(label, { opacity: 0, duration: 0.2 }, 0.2);
    if (trend) tl.from(trend, { opacity: 0, x: -8, duration: 0.3 }, 0.25);
  }, container);
  return ctx;
}

export function staggerElements(container: HTMLElement, options?: StaggerOptions & { property?: string; fromValue?: number; toValue?: number }) {
  const stagger = options?.stagger ?? 0.04;
  const duration = options?.duration ?? 0.5;
  const ctx = gsap.context(() => {
    const children = Array.from(container.children);
    gsap.from(children, {
      opacity: 0,
      y: 20,
      duration,
      stagger: { amount: stagger * children.length, from: options?.from ?? "start" },
      ease: "premium-smooth",
      clearProps: "opacity,y",
    });
  }, container);
  return ctx;
}
