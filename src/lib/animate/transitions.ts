import { gsap } from "./registry.js";

export function screenTransition(element: HTMLElement, direction: "enter" | "leave") {
  if (direction === "enter") {
    gsap.fromTo(element,
      { opacity: 0.6, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  } else {
    gsap.to(element, {
      opacity: 0, scale: 0.95, y: -10, duration: 0.2, ease: "power2.in",
    });
  }
}

export function modalOpen(element: HTMLElement) {
  gsap.fromTo(element,
    { opacity: 0, scale: 0.92, y: 10 },
    { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "premium-spring" }
  );
}

export function modalClose(element: HTMLElement) {
  return gsap.to(element, {
    opacity: 0, scale: 0.95, y: 5, duration: 0.15, ease: "power2.in",
  });
}

export function sheetOpen(element: HTMLElement) {
  gsap.fromTo(element,
    { opacity: 0, y: "100%" },
    { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
  );
}

export function sheetClose(element: HTMLElement) {
  return gsap.to(element, {
    opacity: 0, y: "100%", duration: 0.25, ease: "power2.in",
  });
}

export function fabEnter(element: HTMLElement) {
  gsap.fromTo(element,
    { opacity: 0, scale: 0, rotation: -45 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "premium-spring" }
  );
}

export function fabMorph(icon: HTMLElement, isOpen: boolean) {
  gsap.to(icon, {
    rotation: isOpen ? 45 : 0,
    duration: 0.3,
    ease: "premium-spring",
  });
}

export function headerCompress(header: HTMLElement, scrollY: number) {
  const maxScroll = 100;
  const progress = Math.min(scrollY / maxScroll, 1);
  gsap.to(header, {
    y: progress * -10,
    boxShadow: progress > 0.5 ? "0 1px 8px rgba(0,0,0,0.08)" : "0 0 0 transparent",
    duration: 0.1,
    ease: "none",
    overwrite: "auto",
  });
}

export function skeletonShimmer(element: HTMLElement) {
  gsap.fromTo(element,
    { backgroundPosition: "200% 0" },
    {
      backgroundPosition: "-200% 0",
      duration: 1.5,
      repeat: -1,
      ease: "none",
    }
  );
}
