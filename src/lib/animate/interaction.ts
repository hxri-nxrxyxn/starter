import { gsap } from "./registry.js";

export function buttonPress(element: HTMLElement) {
  const ctx = gsap.context(() => {
    let down = false;
    const onPointerDown = () => {
      if (down) return;
      down = true;
      gsap.to(element, {
        scale: 0.96,
        duration: 0.08,
        ease: "none",
        overwrite: "auto",
      });
    };
    const onPointerUp = () => {
      if (!down) return;
      down = false;
      gsap.to(element, {
        scale: 1.02,
        duration: 0.06,
        ease: "none",
        onComplete: () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.12,
            ease: "premium-bounce",
            overwrite: "auto",
          });
        },
      });
    };
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointerleave", onPointerUp);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointerleave", onPointerUp);
    };
  }, element);
  return ctx;
}

export function cardTap(element: HTMLElement) {
  const ctx = gsap.context(() => {
    let down = false;
    const origBoxShadow = getComputedStyle(element).boxShadow;
    const onDown = () => {
      if (down) return;
      down = true;
      gsap.to(element, {
        scale: 0.98,
        boxShadow: `0 4px 24px rgba(0,0,0,0.12)`,
        duration: 0.1,
        ease: "none",
        overwrite: "auto",
      });
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      gsap.to(element, {
        scale: 1,
        boxShadow: origBoxShadow,
        duration: 0.3,
        ease: "premium-spring",
        overwrite: "auto",
      });
    };
    element.addEventListener("pointerdown", onDown);
    element.addEventListener("pointerup", onUp);
    element.addEventListener("pointerleave", onUp);
    return () => {
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointerleave", onUp);
    };
  }, element);
  return ctx;
}

export function toggleAnimate(track: HTMLElement, thumb: HTMLElement, on: boolean) {
  const trackWidth = track.offsetWidth;
  const thumbSize = thumb.offsetWidth;
  const x = on ? trackWidth - thumbSize - 4 : 4 - (trackWidth - thumbSize - 4);
  const tl = gsap.timeline();
  if (on) {
    tl.to(thumb, {
      x: trackWidth - thumbSize - 4,
      scaleX: 1.2,
      duration: 0.15,
      ease: "none",
    })
    .to(thumb, {
      scaleX: 1,
      duration: 0.2,
      ease: "premium-spring",
    }, "-=0.05")
    .to(track, {
      backgroundColor: "var(--color-primary)",
      duration: 0.2,
      ease: "power2.out",
    }, 0)
    .to(thumb, {
      boxShadow: `0 0 12px var(--color-primary)`,
      duration: 0.3,
      ease: "power2.out",
    }, "-=0.1");
  } else {
    tl.to(thumb, {
      x: 4,
      scaleX: 1.2,
      duration: 0.15,
      ease: "none",
    })
    .to(thumb, {
      scaleX: 1,
      duration: 0.2,
      ease: "premium-spring",
    }, "-=0.05")
    .to(track, {
      backgroundColor: "var(--color-muted)",
      duration: 0.2,
      ease: "power2.out",
    }, 0)
    .to(thumb, {
      boxShadow: `0 0 0px var(--color-primary)`,
      duration: 0.2,
      ease: "power2.out",
    }, "-=0.1");
  }
  return tl;
}

export function checkboxAnimate(checkmark: HTMLElement, checked: boolean) {
  if (checked) {
    gsap.set(checkmark, { scale: 0, opacity: 0 });
    const tl = gsap.timeline();
    tl.to(checkmark, { scale: 1.1, opacity: 1, duration: 0.15, ease: "back.out(2)" })
      .to(checkmark, { scale: 1, duration: 0.1, ease: "power2.out" });
    return tl;
  } else {
    const tl = gsap.timeline();
    tl.to(checkmark, { scale: 0.8, duration: 0.08 })
      .to(checkmark, { scale: 0, opacity: 0, duration: 0.1 });
    return tl;
  }
}

export function shake(element: HTMLElement) {
  return gsap.to(element, {
    x: "random(-4, 4)",
    duration: 0.08,
    repeat: 4,
    yoyo: true,
    ease: "none",
    onComplete: () => {
      gsap.set(element, { x: 0 });
    },
  });
}

export function morphSearchIcon(container: HTMLElement) {
  const icon = container.querySelector("[data-search-icon]") as HTMLElement | null;
  if (!icon) return;
  const ctx = gsap.context(() => {
    gsap.to(icon, {
      rotation: 15,
      scale: 1.1,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(icon, { rotation: 0, scale: 1, duration: 0.3, ease: "premium-spring" });
      },
    });
  }, container);
  return ctx;
}

export function pullToRefreshLogoSpin(logo: HTMLElement, progress: number) {
  gsap.to(logo, {
    rotation: progress * 360,
    scale: 1 + progress * 0.15,
    duration: 0.2,
    ease: "none",
    overwrite: "auto",
  });
}

export function searchSuggestionsCascade(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const items = container.querySelectorAll("[data-search-suggestion]");
    gsap.from(items, {
      opacity: 0,
      y: -8,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.out",
    });
  }, container);
  return ctx;
}
