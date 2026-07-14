# App Starter — Component Reference

## Architecture

```
+page.svelte (thin shell — 9 tabs, renders active)
└── showcase/*.svelte (per-tab, self-contained mock data)
    └── sections/*.svelte (28 feature blocks)
        └── patterns/*.svelte (40 atomic components)
            └── ui/* (shadcn-svelte primitives)
```

## Showcase Components (src/lib/components/showcase/)

Each is self-contained with its own mock data, state, and imports. `+page.svelte` renders via `<activeTab.component />`.

| Component | File | What it renders |
|-----------|------|-----------------|
| Home | `home.svelte` | HeroSection, BigTimer, AnimatedStatCounter, FeatureGrid |
| Auth | `auth.svelte` | LoginForm, SignupForm, OTPForm |
| Feed | `feed.svelte` | StoryCircle, VideoCard, PostComposer, CommentSection |
| Social | `social.svelte` | UserProfileCard, LiveIndicator, ShareSheet |
| Discovery | `discovery.svelte` | SearchPage, TrendingCarousel |
| Dashboard | `dashboard.svelte` | CreatorDashboard, ContentAnalytics, StreakCalendar |
| Gamification | `gamification.svelte` | ChallengeSection, LeaderboardPanel |
| Settings | `settings.svelte` | ProfileEditForm, PremiumUpsellPage, AppSettingsPage |
| Shell | `shell.svelte` | BottomNavigation, DrawerMenu |

---

## Section Composites (src/lib/components/sections/)

### Auth

**LoginForm**
```
Props: onLogin?: (email: string, password: string) => void
       onForgotPassword?: () => void
       class?: string
Imports: Button, Input, Card, Separator, Mail, Lock, Eye, EyeOff, Globe, GitBranch, Loader2
Features: email validation, password show/hide, loading state, social login buttons
```

**SignupForm**
```
Props: onSignup?: (data: {name, email, password}) => void
       onLogin?: () => void
       class?: string
Imports: Button, Input, Card, Checkbox, Label, User, Mail, Lock, Eye, EyeOff, Loader2
Features: password match validation, terms checkbox, loading state
```

**OTPForm**
```
Props: onVerify?: (otp: string) => void
       onResend?: () => void
       email?: string
       class?: string
Imports: Button, Loader2, Timer
Features: 6 digit inputs, auto-advance, paste support, 30s resend timer, stagger entry
```

### Feed

**StoryCircle**
```
Props: stories: Array<{id, username, avatar?, seen?, hasStory?}>
       onStoryClick?: (id: string) => void
       class?: string
Imports: Avatar, Plus, gsap
Notes: {#each} with {@attach} — use PLAIN array not $state
```

**VideoCard**
```
Props: thumbnail?, title, username?, avatar?, likes?, comments?, shares?, liked?, onLike?, onComment?, onShare?, onProfile?, class?
Imports: Card, Avatar, Button, Badge, Heart, MessageCircle, Share2, Play, Music2, Bookmark, gsap
Features: heart animation on like (premium-bounce), bookmark toggle
```

**PostComposer**
```
Props: placeholder?, maxLength?: number (default 280), onSubmit?: (text: string) => void, class?
Imports: Button, Textarea, Avatar, Image, MapPin, Smile, X, Loader2
Features: character count, near-limit warning, submit via Cmd+Enter
```

**CommentSection**
```
Props: comments?, onAddComment?: (text: string) => void, onLikeComment?: (id: string) => void, class?
Imports: Avatar, Button, Input, Separator, Heart, gsap
Features: internal mock comments, relative timestamps via $derived, like toggle
```

**ContentFeed**
```
Props: class?
Imports: PullToRefreshContainer, InfiniteList, VideoCard, Skeleton, Heart
Features: self-contained mock data, pull-to-refresh, infinite scroll (max 12)
```

### Social

**UserProfileCard**
```
Props: name, username?, avatar?, bio?, followers?, following?, isOwn?, onEdit?, onFollow?, class?
Imports: Card, Avatar, Badge, Button, Separator, MapPin, Calendar, gsap
Notes: NO gradient cover — clean avatar layout with pt-(--card-spacing)
```

**LiveIndicator**
```
Props: viewerCount?, label?, class?
Features: pulsing red dot via GSAP, viewer count badge
```

**ShareSheet**
```
Props: open: boolean, url?, title?, onClose?, class?
Imports: BottomSheetActionList, Link, Twitter, Facebook, MessageCircle, Mail, Copy, Check
Features: share targets, clipboard copy with check feedback, navigator.share fallback
```

### Discovery

**SearchPage**
```
Props: onSelect?: (item: any) => void, class?
Imports: SearchHeader, SearchResults, Badge, Button, Separator
Features: internal $state for query/results, mock async search (600ms), trending tags, recent searches
```

**TrendingCarousel**
```
Props: items: Array<{id, title, description?, image?, badge?}>
       autoRotateInterval?: number (default 4000)
       onSelect?: (id: string) => void
       class?
Imports: Button, Badge, ChevronLeft, ChevronRight
Features: snap scroll, prev/next, dot indicators, auto-rotate with hover pause
```

### Home

**HeroSection**
```
Props: headline, subheadline?, ctaLabel?, onCta?, secondaryLabel?, onSecondary?, class?
Imports: Button, ArrowRight, Play, gsap
Features: min-h-[80vh], gradient bg, floating orbs (GSAP yoyo), staggered entry
GSAP: timeline with 0.6s title, 0.5s subtitle, 0.4s CTAs; orbs float random
```

**BigTimer**
```
Props: value: number, label?, sub?, class?
Imports: cn
Style: font-display (Space Grotesk) at 35vh, bold, tracking-tight
```

**FeatureGrid**
```
Props: features?: Array<{icon, title, description}>, class?
Imports: Card, gsap
Default: 6 features (Zap, Shield, Sparkles, Clock, Users, BarChart3), 2-col grid
Features: staggered card entry via gsap.utils.toArray
```

**AnimatedStatCounter**
```
Props: value: number, label, prefix?, suffix?, duration?: number (default 2), class?
Imports: gsap, ScrollTrigger
Features: GSAP count-up on scroll via ScrollTrigger, formatted display
```

### Dashboard

**CreatorDashboard**
```
Props: name?, class?
Imports: GreetingCard, StatGrid, ChartCard, ActivityCard
Features: internal mock data for stats, activities, chart
```

**ContentAnalytics**
```
Props: class?
Imports: ChartCard, MetricCard, ActivityCard, Separator
Features: period tabs (daily/weekly/monthly) change chart data, metric grid, top content list
```

**StreakCalendar**
```
Props: year?, month?, streakData?: number[], class?
Imports: Button, ChevronLeft, ChevronRight, Flame, gsap
Features: month nav, day cells with streak dots, current day highlight
```

### Gamification

**ChallengeSection**
```
Props: class?
Imports: ChallengeCard, Tabs (Tabs, TabsList, TabsTrigger, TabsContent)
Features: Daily/Weekly/All tabs, internal mock challenges, GSAP stagger
Notes: Use <Tabs> not <Tabs.Root> — shadcn export is Root as Tabs
```

**LeaderboardPanel**
```
Props: class?
Imports: Leaderboard, Tabs (Tabs, TabsList, TabsTrigger, TabsContent)
Features: Global/Friends/Weekly tabs, internal mock data per tab
Notes: Use <Tabs> not <Tabs.Root>
```

**RewardPopup**
```
Props: open: boolean, title?, description?, rewardAmount?, rewardLabel?, onClaim?, class?
Imports: Dialog, Button, Coins, Star, CheckCircle, Sparkles, gsap, confetti, countUp
Features: checkmark draw-in, title/desc fade-up, reward count-up, claim bounce, confetti burst
```

### Settings

**ProfileEditForm**
```
Props: user?: {name, bio, avatar?}, onSave?: (data) => void, class?
Imports: Button, Input, Textarea, Card, Avatar, Camera, Loader2, Save, Globe
Features: avatar click-to-change (mock dicebear), name/bio/social inputs, save with loading
```

**AppSettingsPage**
```
Props: class?
Imports: SettingsSection (Account + About), Card (Appearance + Notifications), ColorThemeSwitcher, Switch, Button
Features: Appearance (theme cycle + accent color), Notifications (push/email/SMS toggles inside Card.Root), Account, About
CRITICAL: Notifications section uses Card.Root > Card.Content, NOT SettingsSection with empty items
```

**PremiumUpsellPage**
```
Props: onSubscribe?: (planId: string) => void, class?
Imports: Button, Card, Badge, Crown, Check, Star, Sparkles, X, gsap
Features: 3 pricing tiers (Free/Pro/Enterprise), feature comparison, GSAP stagger entry
CRITICAL: "Popular" badge needs z-10
```

### Commerce

**PremiumUpsellPage** — see Settings above (same component)

### Shell

**BottomNavigation**
```
Props: items: Array<{icon, label, route}>, activeRoute: string, onSelect: (route) => void, class?
Imports: from patterns/bottom-navigation.svelte
```

**DrawerMenu**
```
Props: open: boolean, onClose?, items: Array<{id, icon, label}>, activeId?, onNavigate?, user?: {name, avatar?, email?}, class?
Imports: Sheet, Avatar, Card, Separator, Button, Settings, LogOut, User, HelpCircle, gsap
Features: Sheet side="left", user header, nav items with active state, Settings/Help/Logout at bottom
```

---

## Pattern Components (src/lib/components/patterns/)

40 atomic components. Key ones:

| Pattern | Props | Notes |
|---------|-------|-------|
| `greeting-card` | name, avatar?, streak?, quote? | Time-based greeting, GSAP entry |
| `stat-grid` | items, columns? | Wraps MetricCard in grid |
| `metric-card` | icon?, value, label, trend?, variant? | GSAP from entry |
| `quick-action-grid` | actions, columns? | Uses Button with data-icon |
| `activity-card` | icon?, title, description?, timestamp?, badge? | Relative time via $derived |
| `insight-card` | title, description, icon?, variant?, onDismiss?, onAction? | Info/warning/success variants |
| `streak-widget` | count, goal?, label? | GSAP fromTo flame + bar |
| `progress-ring` | value, size?, strokeWidth?, variant? | GSAP animated arc |
| `achievement-card` | icon, title, description?, unlocked?, progress?, rarity? | Common/rare/epic/legendary |
| `challenge-card` | icon, title, description, progress?, progressMax?, reward?, daysLeft?, completed? | |
| `section-header` | title, href?, onSeeAll? | "See all" button with arrow |
| `tips-carousel` | tips, className? | Scroll snap, dot nav, prev/next |
| `bottom-navigation` | items, activeRoute, onSelect | 3-5 tab bar |
| `floating-action-button` | icon?, label?, variant?, onClick?, position? | GSAP from entry |
| `search-header` | value (bindable), placeholder?, onSearch, onClear? | GSAP icon morph on focus |
| `search-results` | query, results, loading?, total?, onSelect | Empty state, loading skeletons |
| `settings-section` | title?, description?, items | Renders rows with separators |
| `skeleton-list` | count?, variant? | Loading placeholders |
| `empty-state` | icon?, title, description?, actionLabel?, onAction? | GSAP floating icon |
| `error-state` | icon?, title, description?, retryLabel?, onRetry? | Destructive border |
| `confirm-dialog` | open, title, description?, confirmLabel?, variant? | AlertDialog wrapper |
| `success-dialog` | open, title, description?, actionLabel?, onAction?, icon? | Dialog with GSAP entry |
| `bottom-sheet-action-list` | open, title?, actions, onClose? | Sheet side="bottom" |
| `filter-sheet` | open, title?, filters, selectedFilters, onFilterChange, onClear?, onApply? | Badge toggle filters |
| `pull-to-refresh-container` | onRefresh, disabled? | Touch handlers + GSAP spin |
| `infinite-list` | items, loadMore, hasMore, loading?, renderItem | IntersectionObserver sentinel |
| `kanban-board` | columns, onItemClick? | Card-based column layout |
| `calendar-view` | year?, month?, events?, onDateClick? | Month nav, day grid, event dots |
| `detail-page` | hero?, metadata?, actions?, children | Hero card + metadata grid + actions |
| `timeline` | items | Dot + line connector layout |
| `leaderboard` | entries | Rank, avatar, name, value, highlight |
| `profile-header` | name, username?, avatar?, bio?, followers?, following?, isPremium?, onEdit? | |
| `permission-card` | icon?, title, description?, granted?, onGrant?, onDeny? | Grant/Deny/Denied |
| `chart-card` | title, description?, icon?, period?, onPeriodChange?, children | Period tabs + animated bars |
| `progress-ring` | value, size?, strokeWidth?, variant? | GSAP arc animation |
| `otp-input` | length?, value, onComplete? | (part of OTPForm) |

---

## App Store

```ts
// src/lib/stores/app.svelte.ts
app.theme           // 'light' | 'dark' | 'system'
app.colorScheme     // 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal'
app.isOnline        // boolean (listens to window online/offline)
app.version         // '1.0.0'
app.setTheme(t)     // persists to localStorage
app.setColorScheme(s) // persists to localStorage
app.reset()         // clears all localStorage, resets to defaults
```

---

## Critical Rules (Violations Will Break The App)

### 1. {@attach} + $state = infinite loop
```svelte
<!-- ❌ WRONG -->
<script> let items = $state([]); </script>
<div {@attach (el) => items.push(el)}></div>

<!-- ✅ CORRECT -->
<script> let items = []; </script>
<div {@attach (el) => items.push(el)}></div>
```

### 2. class: with opacity modifiers
```svelte
<!-- ❌ WRONG — parser breaks on / -->
<div class:bg-primary/5={condition}></div>

<!-- ✅ CORRECT -->
<div class={cn("base", condition && "bg-primary/5")}></div>
```

### 3. Headings use text-foreground
```svelte
<!-- ❌ WRONG -->
<h2 class="text-sm font-semibold text-muted-foreground">

<!-- ✅ CORRECT -->
<h2 class="text-lg font-semibold tracking-tight">
```

### 4. Icons in Buttons
```svelte
<!-- ❌ WRONG -->
<Button><SearchIcon class="size-4" /></Button>

<!-- ✅ CORRECT -->
<Button><SearchIcon data-icon="inline-start" /></Button>
```

### 5. Card composition
```svelte
<!-- Always use proper Card.Header/Content/Footer -->
<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>...</Card.Footer>
</Card.Root>
```

### 6. shadcn import patterns
```ts
// Multi-part: namespace import
import * as Card from "$lib/components/ui/card";
// -> Card.Root, Card.Header, Card.Title, Card.Content, Card.Footer

// Single-component: named import
import { Button } from "$lib/components/ui/button";
import { Separator } from "$lib/components/ui/separator";
import { Badge } from "$lib/components/ui/badge";
```

### 7. Tabs component
```svelte
<!-- Tabs is the Root — NOT Tabs.Root -->
import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';

<Tabs value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">One</TabsTrigger>
    <TabsTrigger value="tab2">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

### 8. bind:ref on shadcn components
```svelte
<script>
  let el: HTMLElement | null = $state(null);
</script>
<Button bind:ref={el}>Click</Button>
```

---

## GSAP Animation Patterns

### Entry animation (standard)
```ts
onMount(() => {
  if (!el) return;
  const ctx = gsap.context(() => {
    gsap.from(el, { opacity: 0, y: 20, duration: 0.4, ease: 'premium-smooth' });
  }, el);
  return () => ctx.revert();
});
```

### Stagger entry
```ts
onMount(() => {
  if (!el) return;
  const ctx = gsap.context(() => {
    gsap.from(el.querySelectorAll('[data-anim]'), {
      opacity: 0, y: 15, duration: 0.35, stagger: 0.06, ease: 'premium-smooth'
    });
  }, el);
  return () => ctx.revert();
});
```

### Timeline (sequenced)
```ts
const tl = gsap.timeline({ ease: 'premium-smooth' });
tl.from(title, { opacity: 0, y: 30, duration: 0.6 }, 0)
  .from(subtitle, { opacity: 0, y: 20, duration: 0.5 }, 0.15)
  .from(cta, { opacity: 0, y: 10, duration: 0.3 }, 0.3);
```

### Background/ambient loop
```ts
gsap.to(element, {
  y: 10, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true
});
```

### Premium eases (defined in registry.ts)
- `premium-bounce`: `M0,0 C0.34,1.2 0.4,1 1,1` — slight overshoot + settle
- `premium-spring`: `M0,0 C0.2,1.3 0.35,1 1,1` — more pronounced spring  
- `premium-smooth`: `M0,0 C0.25,0.1 0.25,1 1,1` — smooth deceleration
- `premium-elastic`: `M0,0 C0.4,1.6 0.6,1 1,1` — more bounce

---

## Layout

The layout (`+layout.svelte`) provides:
- **Warped perspective grid**: SVG with `perspective(500px) rotateX(9deg) scale(0.95)`, GSAP drifts x/y 24px over 25s yoyo
- **Theme**: Applies dark mode and color scheme from app store
- **Toaster**: svelte-sonner at top-center with richColors

The page (`+page.svelte`) handles all content in a `min-h-dvh max-w-2xl` container. No `bg-background` on the page container (body provides it).

---

## Build & Verify

```bash
npm run dev           # dev server
npm run build         # production build
npx svelte-check      # type-check (enforce 0 errors)
npx @sveltejs/mcp svelte-autofixer <file> --svelte-version 5  # analyze/validate
```
