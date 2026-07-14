import { gsap } from "./registry.js";

interface ConfettiOptions {
  count?: number;
  colors?: string[];
  spread?: number;
  origin?: { x: number; y: number };
  gravity?: number;
}

export function confetti(element: HTMLElement, options?: ConfettiOptions) {
  const {
    count = 40,
    colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff6bcb", "#c084fc"],
    spread = 120,
    origin = { x: 50, y: 50 },
    gravity = 0.6,
  } = options ?? {};

  const rect = element.getBoundingClientRect();
  const cx = rect.left + (origin.x / 100) * rect.width;
  const cy = rect.top + (origin.y / 100) * rect.height;

  const particles: HTMLElement[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const size = gsap.utils.random(4, 10);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isSquare = Math.random() > 0.5;
    el.style.cssText = `
      position: fixed;
      width: ${isSquare ? size : size * 0.6}px;
      height: ${isSquare ? size : size * 2}px;
      background: ${color};
      border-radius: ${isSquare ? "2px" : "50%"};
      pointer-events: none;
      z-index: 9999;
      left: ${cx}px;
      top: ${cy}px;
    `;
    document.body.appendChild(el);
    particles.push(el);

    const angle = gsap.utils.random(-spread / 2, spread / 2);
    const velocity = gsap.utils.random(200, 500);
    const vx = Math.sin((angle * Math.PI) / 180) * velocity;
    const vy = -Math.abs(Math.cos((angle * Math.PI) / 180) * velocity) - 100;

    gsap.to(el, {
      x: vx * gsap.utils.random(0.5, 1.2),
      y: vy * gsap.utils.random(0.5, 1) + 300,
      rotation: gsap.utils.random(-720, 720),
      scale: gsap.utils.random(0.5, 1.5),
      opacity: 0,
      duration: gsap.utils.random(1, 2.5),
      ease: `power${gsap.utils.random(1, 3)}.out`,
      onComplete: () => el.remove(),
    });
  }

  return () => particles.forEach(p => p.remove());
}
