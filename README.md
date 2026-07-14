# App Starter — SvelteKit Component Library

Rapid application starter with **40 atomic patterns**, **28 feature composites**, GSAP animations, shadcn-svelte UI, and Tailwind CSS v4. Copy-paste blocks into any app and ship fast.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes mode)
- **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn-svelte**
- **GSAP v3** (CustomEase, ScrollTrigger, TextPlugin, MotionPathPlugin)
- **Lucide Svelte** icons
- **svelte-sonner** (toast notifications)
- **Space Grotesk** (display font via Google Fonts)

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173) — 9-tab component showcase.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npx svelte-check` | Type-check (0 errors enforced) |

## Structure

```
src/
├── lib/
│   ├── animate/              # GSAP animation layer
│   ├── components/
│   │   ├── patterns/         # 40 atomic components
│   │   ├── sections/         # 28 feature composites
│   │   ├── showcase/         # 9 per-tab showcase pages
│   │   └── ui/               # shadcn-svelte primitives
│   ├── stores/
│   │   └── app.svelte.ts     # Theme + color scheme
│   ├── utils.ts              # cn(), utility types
│   └── app.css               # Tailwind + theme variables
└── routes/
    ├── +layout.svelte        # Warped grid BG + theme + Toaster
    └── +page.svelte          # 9-tab component showcase (thin shell)
```

## Component Hierarchy

```
+page.svelte (9 tabs — Home, Auth, Feed, Social, Discovery, Dashboard, Gamification, Settings, Shell)
└── showcase/*.svelte (self-contained — imports its own blocks + mock data)
    └── sections/*.svelte (28 feature composites)
        └── patterns/*.svelte (40 atomic components)
            └── ui/* (shadcn-svelte primitives)
```

## Showcase Tabs

| Tab | Blocks Demonstrated |
|-----|-------------------|
| **Home** | HeroSection, BigTimer, AnimatedStatCounter, FeatureGrid |
| **Auth** | LoginForm, SignupForm, OTPForm |
| **Feed** | StoryCircle, VideoCard, PostComposer, CommentSection |
| **Social** | UserProfileCard, LiveIndicator, ShareSheet |
| **Discovery** | SearchPage, TrendingCarousel |
| **Dashboard** | CreatorDashboard, ContentAnalytics, StreakCalendar |
| **Gamification** | ChallengeSection, LeaderboardPanel |
| **Settings** | ProfileEditForm, PremiumUpsellPage, AppSettingsPage |
| **Shell** | BottomNavigation, DrawerMenu |

## Documentation

| File | What it covers |
|---|---|
| `AGENTS.md` | Full project context for AI coding agents |
| `docs/components.md` | Every block — props, imports, features, critical rules |
| `docs/animate.md` | GSAP animation helpers and reference |

## AI Agent Usage

If using an AI coding assistant, always load these skills first:

- `svelte-core-bestpractices`
- `svelte-code-writer`
- `shadcn-svelte`
- `gsap-core`
- `gsap-frameworks`

Reference `AGENTS.md` and `docs/components.md` for full context.

## Key Conventions

- **Typography**: `<h2 class="text-lg font-semibold tracking-tight">`, descriptions `text-xs text-muted-foreground`
- **Icons in buttons**: `<SearchIcon data-icon="inline-start" />` — no `size-*` classes
- **Card structure**: Always `Card.Root > Card.Header + Card.Content + Card.Footer`
- **GSAP**: `gsap.context(() => {...}, element)` with cleanup via `ctx.revert()`
- **No `class:` with `/` modifiers**: Use `cn("base", condition && "bg-primary/5")` instead
- **`{@attach}` arrays**: Use plain arrays, never `$state` arrays (infinite loop prevention)

## AI Quick Start — Copy This Block

```
You are building a SvelteKit app. Use this template as your starting point:

Repo: https://github.com/hxri-nxrxyxn/starter

1. Run `npx degit hxri-nxrxyxn/starter my-app && cd my-app && npm install && npm run dev`
2. The main page at `/` has a 9-tab showcase with all blocks

To copy a block into another project:
- Open `src/lib/components/showcase/` to see which composite you need
- Find the actual component in `src/lib/components/sections/`
- Copy it AND the patterns it imports from `src/lib/components/patterns/`
- The 28 composites in `sections/` are self-contained with mock data — swap callbacks for real API calls

Always load these skills before writing code:
- svelte-core-bestpractices (Svelte 5 runes)
- svelte-code-writer (validation)
- shadcn-svelte (UI rules — data-icon, Card composition, typography)
- gsap-core + gsap-frameworks (GSAP animations)

Stack:
- SvelteKit 2 + Svelte 5 runes
- Tailwind CSS v4 + shadcn-svelte
- GSAP v3 (CustomEase, ScrollTrigger)
- Lucide Svelte icons
- svelte-sonner toast
- Space Grotesk font (display/headings)
- TypeScript strict

Key non-negotiable rules:
- `<h2>` → `class="text-lg font-semibold tracking-tight"`
- Icons in `<Button>` → `<Icon data-icon="inline-start" />`
- Card → `Card.Root > Card.Header + Card.Content + Card.Footer`
- GSAP → `gsap.context(() => {...}, el)` with cleanup via `ctx.revert()`
- No `class:` with Tailwind opacity modifiers — use `cn()` instead
- `{@attach}` → push to plain arrays, NOT `$state` arrays
- `bind:ref` → initialize with `$state(null)`
- `$state()` for reactive, `$derived()` for computed, `$effect()` only for side effects

Reference AGENTS.md and docs/components.md for full context.
```
