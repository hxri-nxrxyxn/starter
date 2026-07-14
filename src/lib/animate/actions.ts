import { buttonPress, cardTap, shake as shakeAnim } from "./interaction.js";
import { cardEnter, staggerElements } from "./page-entry.js";
import { successAnimation, errorAnimation, countUp } from "./reward.js";
import { modalOpen, sheetOpen, fabEnter } from "./transitions.js";
import { glowPulse, floatingBackground, numberTicker } from "./ambient.js";
import { confetti } from "./confetti.js";

type AnimationName =
  | "button-press"
  | "card-tap"
  | "card-enter"
  | "stagger"
  | "success"
  | "error"
  | "shake"
  | "modal-open"
  | "sheet-open"
  | "fab-enter"
  | "glow-pulse"
  | "floating-bg"
  | "confetti"
  | "count-up";

interface AnimationParams {
  "count-up"?: { from?: number; to: number; prefix?: string; suffix?: string; separator?: boolean };
  "glow-pulse"?: { color?: string; intensity?: number; duration?: number };
  "floating-bg"?: { xRange?: [number, number]; yRange?: [number, number]; duration?: number };
  "confetti"?: { count?: number; colors?: string[]; spread?: number };
  "card-enter"?: { delay?: number };
  [key: string]: unknown;
}

export function animate(node: HTMLElement, params?: { name: AnimationName; options?: AnimationParams }) {
  const name = params?.name ?? "card-enter";
  const options = params?.options ?? {};

  let cleanup: (() => void) | null = null;

  function apply() {
    cleanup?.();
    switch (name) {
      case "button-press": {
        const ctx = buttonPress(node);
        cleanup = () => ctx.revert();
        break;
      }
      case "card-tap": {
        const ctx = cardTap(node);
        cleanup = () => ctx.revert();
        break;
      }
      case "card-enter": {
        const opts = options as AnimationParams["card-enter"];
        const ctx = cardEnter(node, opts);
        cleanup = () => ctx.revert();
        break;
      }
      case "stagger": {
        const ctx = staggerElements(node);
        cleanup = () => ctx.revert();
        break;
      }
      case "success": {
        const ctx = successAnimation(node);
        cleanup = () => ctx.revert();
        break;
      }
      case "error": {
        const ctx = errorAnimation(node);
        cleanup = () => ctx.revert();
        break;
      }
      case "shake": {
        const tween = shakeAnim(node);
        cleanup = () => tween.kill();
        break;
      }
      case "modal-open": {
        modalOpen(node);
        break;
      }
      case "sheet-open": {
        sheetOpen(node);
        break;
      }
      case "fab-enter": {
        fabEnter(node);
        break;
      }
      case "glow-pulse": {
        const opts = options as AnimationParams["glow-pulse"];
        const ctx = glowPulse(node, opts);
        cleanup = () => ctx.revert();
        break;
      }
      case "floating-bg": {
        const opts = options as AnimationParams["floating-bg"];
        const ctx = floatingBackground(node, opts);
        cleanup = () => ctx.revert();
        break;
      }
      case "confetti": {
        const opts = options as AnimationParams["confetti"];
        const remove = confetti(node, opts);
        cleanup = remove;
        break;
      }
      case "count-up": {
        const opts = options as AnimationParams["count-up"];
        const tween = numberTicker(node, opts?.from ?? 0, opts?.to ?? 0, opts);
        cleanup = () => tween.kill();
        break;
      }
    }
  }

  apply();

  return {
    destroy() {
      cleanup?.();
    },
    update(newParams: { name: AnimationName; options?: AnimationParams }) {
      const newName = newParams?.name ?? name;
      if (newName !== name || newParams?.options !== options) {
        (node as any).__animationName = newName;
        (node as any).__animationOptions = newParams?.options;
        apply();
      }
    },
  };
}
