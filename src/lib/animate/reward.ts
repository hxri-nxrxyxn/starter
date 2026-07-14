import { gsap } from "./registry.js";

export function countUp(
  element: HTMLElement,
  from: number,
  to: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    separator?: boolean;
  }
) {
  const { duration = 1, prefix = "", suffix = "", separator = false } = options ?? {};
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

export function xpGain(element: HTMLElement, amount: number, options?: { x?: number; y?: number }) {
  const tl = gsap.timeline();
  tl.fromTo(element,
    { opacity: 0, y: 20, scale: 0.5 },
    {
      opacity: 1, y: options?.y ?? -40, x: options?.x ?? 10,
      scale: 1.2, duration: 0.4, ease: "power2.out",
    }
  )
  .to(element, {
    opacity: 0, y: -80, scale: 0.8, duration: 0.4, ease: "power2.in",
  });
  return tl;
}

export function coinCollect(element: HTMLElement, target?: HTMLElement) {
  const tl = gsap.timeline();
  tl.fromTo(element,
    { opacity: 1, scale: 1, y: 0 },
    { opacity: 0, y: -60, scale: 0.3, duration: 0.5, ease: "power2.out" }
  );
  return tl;
}

export function streakFire(element: HTMLElement, count: number) {
  const ctx = gsap.context(() => {
    const flames = element.querySelectorAll("[data-streak-flame]");
    gsap.from(flames, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "back.out(2)",
    });
    gsap.fromTo(element,
      { scale: 1 },
      { scale: 1.1, yoyo: true, repeat: 1, duration: 0.25, ease: "power2.out" }
    );
  }, element);
  return ctx;
}

export function achievementUnlock(element: HTMLElement) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ ease: "premium-spring" });
    const badge = element.querySelector("[data-achievement-badge]") ?? element;
    const title = element.querySelector("[data-achievement-title]");
    const sparkle = element.querySelector("[data-achievement-sparkle]");

    tl.set(badge, { scale: 0, opacity: 0, rotation: -15 })
      .to(badge, { scale: 1.15, opacity: 1, rotation: 5, duration: 0.4 }, 0)
      .to(badge, { scale: 1, rotation: 0, duration: 0.2 }, "-=0.1");

    if (title) tl.from(title, { opacity: 0, y: 10, duration: 0.3 }, "-=0.1");
    if (sparkle) {
      tl.fromTo(sparkle,
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" },
        "-=0.2"
      );
    }
  }, element);
  return ctx;
}

export function levelUpScreen(element: HTMLElement) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();
    const overlay = element.querySelector("[data-level-overlay]");
    const badge = element.querySelector("[data-level-badge]");
    const title = element.querySelector("[data-level-title]");
    const particles = element.querySelectorAll("[data-level-particle]");

    if (overlay) tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    if (badge) {
      tl.fromTo(badge,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "premium-elastic" },
        "-=0.15"
      );
    }
    if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.4 }, "-=0.3");
    if (particles.length) {
      tl.fromTo(particles,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05 },
        "-=0.4"
      )
      .to(particles, {
        opacity: 0, y: "random(-100, -200)", x: "random(-50, 50)",
        duration: 0.8, stagger: 0.05, ease: "power2.out",
      });
    }
  }, element);
  return ctx;
}

export function notificationBell(element: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.fromTo(element,
      { rotation: 0 },
      {
        rotation: -15, duration: 0.1,
        onComplete: () => {
          gsap.to(element, {
            rotation: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)",
          });
        },
      }
    );
  }, element);
  return ctx;
}

export function successAnimation(element: HTMLElement) {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();
    const icon = element.querySelector("[data-success-icon]");
    const title = element.querySelector("[data-success-title]");
    const desc = element.querySelector("[data-success-description]");

    if (icon) {
      tl.fromTo(icon,
        { scale: 0, rotation: -90, opacity: 0 },
        { scale: 1.1, rotation: 0, opacity: 1, duration: 0.4, ease: "premium-spring" }
      )
      .to(icon, { scale: 1, duration: 0.15, ease: "power2.out" }, "-=0.1");
    }
    if (title) tl.from(title, { opacity: 0, y: 10, duration: 0.3 }, "-=0.1");
    if (desc) tl.from(desc, { opacity: 0, y: 8, duration: 0.25 }, "-=0.05");
  }, element);
  return ctx;
}

export function toastEnter(element: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.fromTo(element,
      { opacity: 0, y: -20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "premium-spring" }
    );
  }, element);
  return ctx;
}

export function toastExit(element: HTMLElement) {
  return gsap.to(element, {
    opacity: 0, y: -10, scale: 0.95, duration: 0.2, ease: "power2.in",
  });
}

export function errorAnimation(element: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.fromTo(element,
      { x: 0 },
      { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: "none" }
    );
  }, element);
  return ctx;
}
