# AI Agent Context — SvelteKit App Starter

## Tech Stack

- **Framework**: SvelteKit 2 (Svelte 5 runes mode)
- **Language**: TypeScript (strict)
- **CSS**: Tailwind CSS v4
- **UI**: shadcn-svelte v1 (Bits UI v2 primitives)
- **Animation**: GSAP v3 (CustomEase, ScrollTrigger)
- **Icons**: Lucide Svelte
- **Build**: Vite 8
- **Toast**: svelte-sonner

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
│   │   └── index.ts       # Exports `gsap`, `animate` object
│   ├── components/
│   │   ├── patterns/      # 40 atomic pattern components
│   │   ├── sections/      # 28 composite blocks (feature-level)
│   │   ├── showcase/      # 9 per-tab showcase composites
│   │   └── ui/            # shadcn-svelte base components
│   ├── stores/
│   │   └── app.svelte.ts  # Global app state (theme, colorScheme)
│   ├── utils.ts           # cn(), utility types
│   ├── app.css            # Tailwind + global styles + font config
│   └── index.ts           # Barrel exports
├── routes/
│   ├── +layout.svelte     # Warped grid BG + theme + Toaster
│   └── +page.svelte       # 9-tab component showcase (thin shell)
└── app.html               # Google Fonts (Space Grotesk)
```

## Svelte 5 Runes — Mandatory Rules

### State & Reactivity

- `$state()` for reactive variables. Objects/arrays are deeply proxied.
- `$state.raw()` for large objects only ever reassigned (e.g. API responses).
- `$derived(expression)` or `$derived.by(() => ...)` instead of `$effect` for computed values.
- NEVER use `$effect` to derive values — use `$derived` or `$derived.by`.
- `$effect()` only for side effects syncing with external libs (GSAP) or browser APIs.

### Props & Events

- `let { prop1, prop2 } = $props()` instead of `export let`.
- `onclick={handler}` instead of `on:click`.
- `bind:this={el}` on native HTML elements.
- `bind:ref={el}` on shadcn components (they expose `ref` via `$bindable(null)`).
- Always initialize refs with `$state(null)` (not `$state()` or `undefined`).

### Templates

- `{#snippet name()}` / `{@render name()}` instead of `<slot>`.
- keyed `{#each items as item (item.id)}` — never use index as key.
- `{@const}` only inside blocks (`{#if}`, `{#each}`, `{#snippet}`).
- Dynamic components use `<activeTab.component />` pattern.

### CRITICAL: {@attach} with arrays

- `{@attach}` should push to **plain arrays**, NOT `$state` arrays.
- Pushing to `$state` arrays inside `{@attach}` creates an infinite loop (re-render → re-attach → push → re-render).
- Always use: `let els: HTMLDivElement[] = [];` for `{@attach}` collections.

### CRITICAL: class: directives

- NEVER use `class:` with Tailwind opacity modifiers like `class:bg-primary/5={condition}` — the `/5` syntax breaks Svelte's parser.
- Always use `cn()` instead: `class={cn("base-class", condition && "bg-primary/5")}`.

## shadcn-svelte — Mandatory Rules

### Typography

- Headings use `text-foreground`, NOT `text-muted-foreground`.
- Section `<h2>`: `class="text-lg font-semibold tracking-tight"`.
- Descriptions/labels: `text-xs text-muted-foreground`.
- Names/titles: `text-sm font-medium`.

### Card Composition

Always use proper Card structure:
```svelte
<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>content</Card.Content>
  <Card.Footer>actions</Card.Footer>
</Card.Root>
```
Never dump everything in `Card.Content`.

### Icons in Buttons

- Icons inside `<Button>` must use `data-icon="inline-start"` or `data-icon="inline-end"`.
- Do NOT add `size-*` classes to icons inside Buttons — the Button component handles sizing.
- Example: `<SearchIcon data-icon="inline-start" />` inside `<Button>`.
- Standalone icons (not in Button) CAN use `size-*` classes.

### Other shadcn Rules

- `truncate` shorthand instead of `overflow-hidden text-ellipsis whitespace-nowrap`.
- `size-*` when width and height are equal (not `w-* h-*`).
- `flex` with `gap-*`, never `space-x-*` or `space-y-*`.
- Avatar always needs `Avatar.Fallback`.
- Dialog/Sheet/Drawer always need a `Title` (can be `class="sr-only"`).
- Use `Separator` instead of `<hr>` or border-only divs.
- Use `Skeleton` for loading placeholders.
- Use `Badge` instead of custom styled spans.
- Callouts use `Alert`, empty states use `EmptyState`.
- Use semantic colors only: `bg-background`, `text-muted-foreground`, `border`, `bg-muted`. Never raw colors.
- No manual `dark:` color overrides — use semantic tokens.

## GSAP Animation Rules

- Always use `gsap.context(() => { ... }, element)` for scoped animations with auto-cleanup.
- Always return `() => ctx.revert()` from `onMount`.
- Custom eases: `premium-bounce`, `premium-spring`, `premium-smooth`, `premium-elastic`.
- Timing: taps 150-250ms, transitions 250-450ms, celebrations 600-1200ms, ambient 10-30s.
- Use `fromTo` for entry animations (explicit start/end, no flash).
- For background/ambient animations, use `repeat: -1, yoyo: true` with `ease: 'none'` or `'sine.inOut'`.

## Component Architecture

### Layers

```
+page.svelte (thin shell — imports 9 showcase components, tabs, renders via <activeTab.component />)
├── showcase/home.svelte       → HeroSection, BigTimer, AnimatedStatCounter, FeatureGrid
├── showcase/auth.svelte       → LoginForm, SignupForm, OTPForm
├── showcase/feed.svelte       → StoryCircle, VideoCard, PostComposer, CommentSection
├── showcase/social.svelte     → UserProfileCard, LiveIndicator, ShareSheet
├── showcase/discovery.svelte  → SearchPage, TrendingCarousel
├── showcase/dashboard.svelte  → CreatorDashboard, ContentAnalytics, StreakCalendar
├── showcase/gamification.svelte → ChallengeSection, LeaderboardPanel
├── showcase/settings.svelte   → ProfileEditForm, PremiumUpsellPage, AppSettingsPage
└── showcase/shell.svelte      → BottomNavigation, DrawerMenu (self-contained mock data + state)
```

### Import Pattern

- Each showcase component is self-contained with its own mock data, state, and imports.
- `+page.svelte` only imports the 9 showcase components — no direct pattern/section imports.
- Showcase components import from `$lib/components/patterns/`, `$lib/components/sections/`, and `$lib/components/ui/`.
- Showcase components handle their own callback wiring (toast feedback for demos).

## Key Fixes Applied (Do Not Revert)

| Issue | Fix |
|-------|-----|
| `{@attach}` on `$state` array | Use plain array — infinite loop prevention |
| `class:bg-primary/5` syntax | Use `cn()` instead |
| `text-muted-foreground` on headings | Use `text-foreground` |
| UserProfileCard gradient cover | Removed — clean avatar layout |
| AppSettingsPage notifications | Inside Card.Root, not floating divs |
| PremiumUpsellPage Popular badge | Added `z-10` |
| HeroSection gradient gap | `-mx-4 -mt-4` to negate page padding |
| Grid background | SVG with CSS perspective, `var(--color-foreground)` at `opacity-[0.09]` |
| Button icons | `data-icon="inline-start"`, no `size-*` |
| BigTimer | 35vh Space Grotesk, reusable section component |

## App Store (`src/lib/stores/app.svelte.ts`)

```ts
import { app } from '$lib/stores/app.svelte';

app.theme          // 'light' | 'dark' | 'system'
app.colorScheme    // 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal'
app.isOnline       // true/false
app.version        // '1.0.0'
app.setTheme(t)    // persists to localStorage
app.setColorScheme(s) // persists to localStorage
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Type-check (svelte-check) |

## Load This Skill When Writing Svelte Code

- Always load `svelte-core-bestpractices` and `svelte-code-writer` skills before writing Svelte files.
- Always load `shadcn-svelte` skill when working with UI components.
- Always load `gsap-core` and `gsap-frameworks` when adding animations.
- Run `npx svelte-check` after all changes — enforce 0 errors.
