# AI Agent Context — SvelteKit App Starter

## Tech Stack

- **Framework**: SvelteKit 2 (Svelte 5 runes mode)
- **Language**: TypeScript (strict)
- **CSS**: Tailwind CSS v4
- **UI**: shadcn-svelte v1 (Bits UI v2 primitives)
- **Animation**: GSAP v3 (CustomEase, ScrollTrigger, TextPlugin, MotionPathPlugin)
- **Icons**: Lucide Svelte
- **Build**: Vite 8

## Key Conventions

### Svelte 5 Runes

- `$state()` for reactive variables; `$state.raw()` for objects only reassigned (e.g. API responses)
- `$derived()` / `$derived.by()` instead of `$effect` for computed values
- `$effect()` only for side effects syncing with external libs (GSAP) or browser APIs
- `$props()` instead of `export let`
- `{#snippet}` / `{@render}` instead of `<slot>`
- `onclick={handler}` instead of `on:click`
- `{@const}` for local constants inside templates

### Bind Refs

- `bind:this={el}` on native HTML elements
- `bind:ref={el}` on shadcn components (they expose `ref` via `$bindable(null)`)
- Always initialize with `$state(null)` (not `undefined`) to match `$bindable(null)` fallback
- Only use `$state()` on refs when used in `$effect` or `bind:this`/`bind:ref`; refs used only in `onMount` could be plain `let` but the compiler warns

### Animation (GSAP)

- `gsap.context(() => { ... }, element)` for scoped animations with auto-cleanup
- Always return `() => ctx.revert()` from `onMount` or `$effect` for cleanup
- Custom eases: `premium-bounce`, `premium-spring`, `premium-smooth`, `premium-elastic`
- Timing: taps 150-250ms, transitions 250-450ms, celebrations 600-1200ms, ambient 10-30s

### shadcn-svelte

- Import pattern: `import { Button } from '$lib/components/ui/button'` or `import * as Card from '$lib/components/ui/card'`
- Every shadcn component exposes `ref` prop via `$bindable(null)` — use `bind:ref={el}` for DOM access
- `cn()` utility (clsx + tailwind-merge) for class merging
- Icons from `@lucide/svelte` — use `data-btn-press` attribute on buttons to auto-attach interaction animation

## Project Structure

```
src/
├── lib/
│   ├── animate/           # GSAP animation layer
│   │   ├── registry.ts    # Plugin registration + custom eases
│   │   ├── ambient.ts     # Ambient/background animations
│   │   ├── interaction.ts # Tap, press, shake interactions
│   │   ├── page-entry.ts  # Page/card/list enter animations
│   │   ├── reward.ts      # Success, error, count-up, toast
│   │   ├── transitions.ts # Screen, modal, sheet transitions
│   │   ├── confetti.ts    # Confetti burst
│   │   ├── actions.ts     # Svelte use:action wrappers
│   │   └── index.ts       # Exports `gsap`, `animate` object, `ScrollTrigger`
│   ├── components/
│   │   ├── patterns/      # 40 reusable app pattern components
│   │   └── ui/            # shadcn-svelte base components
│   ├── stores/
│   │   └── app.svelte.ts  # Global app state (theme, user, online)
│   ├── utils.ts           # cn(), WithElementRef<T>, type utilities
│   ├── app.css            # Tailwind + global styles
│   └── index.ts           # Barrel exports
└── routes/
    ├── +layout.svelte     # Theme, ambient bg, app shell
    └── +page.svelte       # Demo page showcasing all patterns
```

## Animation Library (`src/lib/animate`)

Import: `import { gsap, animate, ScrollTrigger, buttonPress } from '$lib/animate'`

### `animate` object — semantic animation helpers

| Method | Parameters | Use |
|---|---|---|
| `animate.pageEnter(element)` | `HTMLElement` | Page entry fade-up |
| `animate.pageExit(element)` | `HTMLElement` | Page exit fade |
| `animate.cardEnter(element, idx?)` | `HTMLElement, number?` | Card stagger entry |
| `animate.stagger(elements, options?)` | `HTMLElement[], {amount?, from?}` | Stagger children |
| `animate.hero(element)` | `HTMLElement` | Hero section entrance |
| `animate.list(element)` | `HTMLElement` | List row entry |
| `animate.metric(element)` | `HTMLElement` | Metric number entry |
| `animate.hierarchy(element)` | `HTMLElement` | Platform hierarchy entry |
| `animate.buttonPress(element)` | `HTMLElement` | Tap scale feedback |
| `animate.cardPress(element)` | `HTMLElement` | Card press feedback |
| `animate.shake(element)` | `HTMLElement` | Error shake |
| `animate.modalOpen(element)` | `HTMLElement` | Modal backdrop + content |
| `animate.modalClose(element)` | `HTMLElement` | Modal reverse |
| `animate.sheetOpen(element)` | `HTMLElement` | Bottom sheet slide-up |
| `animate.sheetClose(element)` | `HTMLElement` | Bottom sheet slide-down |
| `animate.fab(element)` | `HTMLElement` | FAB entry scale+rotate |
| `animate.headerCompress(element)` | `HTMLElement` | Header compress on scroll |
| `animate.skeletonShimmer(element)` | `HTMLElement` | Skeleton loading shimmer |
| `animate.success(element)` | `HTMLElement` | Success checkmark burst |
| `animate.error(element)` | `HTMLElement` | Error X shake |
| `animate.countUp(element, start, end)` | `HTMLElement, number, number` | Number count-up |
| `animate.toast(element)` | `HTMLElement` | Toast slide-in |
| `animate.confetti(element)` | `HTMLElement` | Confetti burst from position |

### Eases

```js
'premium-bounce'  // M0,0 C0.34,1.2 0.4,1 1,1
'premium-spring'  // M0,0 C0.2,1.3 0.35,1 1,1
'premium-smooth'  // M0,0 C0.25,0.1 0.25,1 1,1
'premium-elastic' // M0,0 C0.4,1.6 0.6,1 1,1
```

### Low-level GSAP usage pattern

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

## Pattern Components (`src/lib/components/patterns`)

40 components, all listed in `index.ts`. Key groups:

### Dashboard
- `GreetingCard` — `{name, avatar?, streak?, quote?, class?}`
- `StatGrid` — `{items: StatItem[], columns?, class?}`
- `MetricCard` — `{icon?, value, label, trend?, variant?, className?}`
- `QuickActionGrid` — `{actions: ActionItem[], columns?, class?}`
- `ChartCard` — `{title, period?, icon?, children, class?}`
- `InsightCard` — `{icon?, title, description, variant?, onDismiss?, class?}`
- `StreakWidget` — `{count, goal?, label?, className?}`
- `HeroCard` — `{headline, description?, illustration?, icon?, ctaLabel?, onCta?, variant?, class?}`
- `AchievementCard` — `{icon?, title, description?, unlocked?, progress?, progressMax?, rarity?, class?}`
- `ChallengeCard` — `{icon?, title, description?, progress?, progressMax?, reward?, daysLeft?, class?}`
- `ProgressRing` — `{value, size?, strokeWidth?, variant?, class?}`
- `SectionHeader` — `{title, actionLabel?, onSeeAll?, class?}`
- `ActivityCard` — `{icon?, title, description?, timestamp?, badge?, class?}`
- `TipsCarousel` — `{tips: TipItem[], class?}`

### Social
- `ProfileHeader` — `{name, username?, bio?, avatar?, followers?, following?, isPremium?, onEdit?, class?}`
- `Leaderboard` — `{entries: LeaderboardEntry[], class?}`
- `Timeline` — `{items: TimelineItem[], class?}`
- `DetailPage` — `{hero: HeroInfo, metadata?, actions?, children, class?}`

### Feedback / Modals
- `ConfirmDialog` — `{open, title, description?, confirmLabel?, cancelLabel?, variant?, onConfirm, onCancel, class?}`
- `SuccessDialog` — `{open, title, description?, actionLabel?, onAction?, icon?, className?}`
- `BottomSheetActionList` — `{open, title?, actions: SheetAction[], onClose, class?}`
- `FilterSheet` — `{open, title?, filters, selectedFilters, onFilterChange, onClear, onApply, class?}`
- `EmptyState` — `{icon?, title, description?, actionLabel?, onAction?, class?}`
- `ErrorState` — `{title, description?, retryLabel?, onRetry?, icon?, class?}`
- `Toast` notifications via `svelte-sonner`

### Data / Lists
- `CalendarView` — `{month?, year?, events?, class?}`
- `KanbanBoard` — `{columns: KanbanColumn[], class?}`
- `PullToRefreshContainer` — `{onRefresh, children, class?}`
- `InfiniteList` — `{items, loadMore, hasMore, loading?, renderItem, class?}`
- `SearchHeader` — `{onSearch, placeholder?, debounce?, class?}`
- `SearchResults` — `{query, results, loading?, onSelect, total?, class?}`
- `SkeletonList` — `{count?, class?}`

### Navigation / Shell
- `BottomNavigation` — `{items: NavItem[], activeRoute, onSelect, class?}`
- `AppShell` — `{navItems, activeRoute, onSelect, children, class?}`
- `FloatingActionButton` — `{icon?, label?, variant?, onClick?, position?, class?}`
- `SearchHeader` — (shared with data above)

### Onboarding
- `SplashScreen` — `{appName, version?, loading?, onFinish, class?}`
- `OnboardingSlide` — `{icon?, title, description, image?, class?}`
- `PermissionCard` — `{icon?, title, description?, granted?, onGrant, onDeny, class?}`

### Settings / Misc
- `SettingsSection` — `{title, items: SettingItem[], class?}`
- `ColorThemeSwitcher` — `{class?}`
- `PremiumBanner` — `{title, description?, actionLabel?, icon?, onAction?, class?}`
- `OfflineBanner` — `{class?}`

All patterns import shadcn-svelte components via `$lib/components/ui/`. Use `bind:ref` instead of wrapper `<div>` for GSAP refs.

## App Store (`$lib/stores/app.svelte.ts`)

```ts
import { app } from '$lib/stores/app.svelte';

app.theme          // 'light' | 'dark' | 'system'
app.colorScheme    // 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal'
app.user           // AppUser | null
app.isAuthenticated
app.isOnline
app.isLoading
app.isOnboarded
app.version
```

## shadcn-svelte UI Components

Available at `$lib/components/ui/`. All use Bits UI v2 primitives. Standard components: `accordion`, `alert`, `alert-dialog`, `avatar`, `badge`, `button`, `card`, `checkbox`, `command`, `dialog`, `drawer`, `dropdown-menu`, `input`, `input-group`, `input-otp`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toggle`, `toggle-group`, `tooltip`.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Type-check (svelte-check) |

## How to Add New Components

1. Add shadcn component: `npx shadcn-svelte add <component-name>`
2. Create pattern: `src/lib/components/patterns/my-pattern.svelte` using Svelte 5 runes + shadcn components
3. Export from `src/lib/components/patterns/index.ts`
4. For animations: use `gsap.context()` in `onMount` with `bind:ref` on shadcn components
5. Add to demo page `src/routes/+page.svelte` within appropriate section

## TypeScript Strict Rules

- `WithElementRef<T>` adds `ref?: U | null` to an HTML attributes type — used by shadcn components
- `WithoutChildren<T>` / `WithoutChild<T>` / `WithoutChildrenOrChild<T>` — utility types for component prop wrappers
- `cn(...inputs: ClassValue[])` — class merge utility (clsx + tailwind-merge)
- Interfaces over types for public component props
- `const` assertions (`as const`) for literal types
