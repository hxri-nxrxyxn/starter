# Animation API Reference

## Import

```ts
import { gsap, animate, ScrollTrigger, buttonPress } from '$lib/animate';
```

## Custom Eases

| Name | Curve | Use |
|---|---|---|
| `premium-bounce` | `M0,0 C0.34,1.2 0.4,1 1,1` | Celebration overshoot |
| `premium-spring` | `M0,0 C0.2,1.3 0.35,1 1,1` | Natural spring motions |
| `premium-smooth` | `M0,0 C0.25,0.1 0.25,1 1,1` | Default enter/exit |
| `premium-elastic` | `M0,0 C0.4,1.6 0.6,1 1,1` | Emphasized wobble |

## Registered Plugins

ScrollTrigger, TextPlugin, CustomEase, MotionPathPlugin — all registered in `registry.ts`.

## Low-Level Pattern

```svelte
<script lang="ts">
import { gsap } from '$lib/animate';
import { onMount } from 'svelte';

let el: HTMLElement | null = $state(null);

onMount(() => {
  if (!el) return;
  const ctx = gsap.context(() => {
    gsap.from(el, { opacity: 0, y: 20, duration: 0.4, ease: 'premium-smooth' });
  }, el);
  return () => ctx.revert();
});
</script>

<div bind:this={el}>content</div>
```

## `animate` Object — Semantic Helpers

### Page Entry

```ts
animate.pageEnter(element: HTMLElement): void
animate.cardEnter(element: HTMLElement, index?: number): void
animate.stagger(elements: HTMLElement[], options?: { amount?: number; from?: 'start' | 'end' | 'center' }): void
animate.hero(element: HTMLElement): void
animate.list(element: HTMLElement): void
animate.metric(element: HTMLElement): void
animate.hierarchy(element: HTMLElement): void
```

### Page Exit

```ts
animate.pageExit(element: HTMLElement): void
```

### Interactions

```ts
animate.buttonPress(element: HTMLElement): void
animate.cardPress(element: HTMLElement): void
animate.shake(element: HTMLElement): void
```

Also exported directly:
```ts
import { buttonPress } from '$lib/animate';
// Use with data attribute selector:
document.querySelectorAll('[data-btn-press]').forEach(el => buttonPress(el as HTMLElement));
```

### Transitions

```ts
animate.modalOpen(element: HTMLElement): void
animate.modalClose(element: HTMLElement): void
animate.sheetOpen(element: HTMLElement): void
animate.sheetClose(element: HTMLElement): void
animate.fab(element: HTMLElement): void
animate.headerCompress(element: HTMLElement): void
animate.skeletonShimmer(element: HTMLElement): void
```

### Rewards & Celebrations

```ts
animate.success(element: HTMLElement): TL       // checkmark scale + spring
animate.error(element: HTMLElement): void        // X shake
animate.countUp(element: HTMLElement, start: number, end: number): void
animate.toast(element: HTMLElement): void
animate.confetti(element: HTMLElement): void     // particle burst from position
```

## Timing Guidelines

| Action | Duration |
|---|---|
| Tap / press | 150-250ms |
| Transitions (modals, sheets) | 250-450ms |
| Card/page enter | 300-500ms |
| Celebrations (confetti, success) | 600-1200ms |
| Ambient (bg gradient) | 10-30s |

## `use:` Actions (`src/lib/animate/actions.ts`)

```svelte
<script lang="ts">
import { cardEnter, staggerChildren } from '$lib/animate/actions';
</script>

<div use:cardEnter={{ index: 0 }}>
<div use:staggerChildren={{ stagger: 0.05 }}>
```

Available actions: `cardEnter`, `staggerChildren`, `buttonPress`, `skeletonShimmer`.
