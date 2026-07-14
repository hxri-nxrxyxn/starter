# App Starter — SvelteKit Template

Rapid application starter with 40+ UI patterns, GSAP animations, shadcn-svelte components, and Tailwind CSS v4.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes mode)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn-svelte**
- **GSAP v3** (CustomEase, ScrollTrigger, TextPlugin, MotionPathPlugin)
- **Lucide Svelte** icons

## Quick Start

```bash
npm install
npm run dev
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run check` | Type-check + svelte-check |

## Structure

```
src/
├── lib/
│   ├── animate/         # GSAP animation layer (semantic helpers)
│   ├── components/
│   │   ├── patterns/    # 40 reusable app patterns
│   │   └── ui/          # shadcn-svelte base components
│   ├── stores/          # App store (theme, user, online)
│   └── utils.ts         # cn(), type utilities
└── routes/
    └── +page.svelte     # Demo page (all patterns showcased)
```

## AI Agent Usage

If using an AI coding assistant, reference `AGENTS.md` for full project context.

## Pattern Components

40 pattern components in `src/lib/components/patterns/`: greeting, stats, metrics, charts, achievements, streaks, social profile, leaderboard, timeline, dialogs, sheets, onboarding, settings, and more — all with GSAP entry animations built in.

## Animation Layer

Import semantic helpers from `$lib/animate`:

```ts
import { gsap, animate, ScrollTrigger } from '$lib/animate';

// Entry animations
animate.pageEnter(element);
animate.cardEnter(element, index);
animate.stagger(elements);

// Interactions
animate.buttonPress(element);
animate.cardPress(element);

// Modals
animate.modalOpen(element);
animate.sheetOpen(element);

// Celebrations
animate.success(element);
animate.confetti(element);
animate.countUp(element, 0, 100);
```

Custom eases: `premium-bounce`, `premium-spring`, `premium-smooth`, `premium-elastic`.
