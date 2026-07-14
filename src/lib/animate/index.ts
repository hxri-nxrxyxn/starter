export { gsap, ScrollTrigger } from "./registry.js";

export * from "./ambient.js";
export * from "./interaction.js";
export * from "./page-entry.js";
export * from "./reward.js";
export * from "./transitions.js";
export * from "./confetti.js";

import { pageEnter, cardEnter, staggerElements, heroEnter, listEnter, metricEnter, pageEnterHierarchy } from "./page-entry.js";
import { screenTransition, modalOpen, modalClose, sheetOpen, sheetClose, fabEnter, headerCompress, skeletonShimmer } from "./transitions.js";
import { cardTap, buttonPress, shake } from "./interaction.js";
import { successAnimation, errorAnimation, countUp, toastEnter } from "./reward.js";
import { confetti } from "./confetti.js";

export const animate = {
  pageEnter,
  pageExit: (element: HTMLElement) => screenTransition(element, "leave"),
  cardEnter,
  cardPress: cardTap,
  buttonPress,
  stagger: staggerElements,
  modalOpen,
  modalClose,
  sheetOpen,
  sheetClose,
  success: successAnimation,
  error: errorAnimation,
  countUp,
  toast: toastEnter,
  shake,
  confetti,
  hero: heroEnter,
  list: listEnter,
  metric: metricEnter,
  hierarchy: pageEnterHierarchy,
  fab: fabEnter,
  headerCompress,
  skeletonShimmer,
};
