<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { toast } from 'svelte-sonner';

	import SplashScreen from '$lib/components/patterns/splash-screen.svelte';
	import OfflineBanner from '$lib/components/patterns/offline-banner.svelte';
	import GreetingCard from '$lib/components/patterns/greeting-card.svelte';
	import StatGrid from '$lib/components/patterns/stat-grid.svelte';
	import QuickActionGrid from '$lib/components/patterns/quick-action-grid.svelte';
	import SectionHeader from '$lib/components/patterns/section-header.svelte';
	import ActivityCard from '$lib/components/patterns/activity-card.svelte';
	import TipsCarousel from '$lib/components/patterns/tips-carousel.svelte';
	import InsightCard from '$lib/components/patterns/insight-card.svelte';
	import HeroCard from '$lib/components/patterns/hero-card.svelte';
	import EmptyState from '$lib/components/patterns/empty-state.svelte';
	import ErrorState from '$lib/components/patterns/error-state.svelte';
	import ConfirmDialog from '$lib/components/patterns/confirm-dialog.svelte';
	import SuccessDialog from '$lib/components/patterns/success-dialog.svelte';
	import BottomSheetActionList from '$lib/components/patterns/bottom-sheet-action-list.svelte';
	import ProgressRing from '$lib/components/patterns/progress-ring.svelte';
	import StreakWidget from '$lib/components/patterns/streak-widget.svelte';
	import AchievementCard from '$lib/components/patterns/achievement-card.svelte';
	import ChallengeCard from '$lib/components/patterns/challenge-card.svelte';
	import PremiumBanner from '$lib/components/patterns/premium-banner.svelte';
	import ProfileHeader from '$lib/components/patterns/profile-header.svelte';
	import Leaderboard from '$lib/components/patterns/leaderboard.svelte';
	import Timeline from '$lib/components/patterns/timeline.svelte';
	import PermissionCard from '$lib/components/patterns/permission-card.svelte';
	import SkeletonList from '$lib/components/patterns/skeleton-list.svelte';
	import FloatingActionButton from '$lib/components/patterns/floating-action-button.svelte';
	import SearchHeader from '$lib/components/patterns/search-header.svelte';
	import SearchResults from '$lib/components/patterns/search-results.svelte';
	import SettingsSection from '$lib/components/patterns/settings-section.svelte';
	import DetailPage from '$lib/components/patterns/detail-page.svelte';
	import CalendarView from '$lib/components/patterns/calendar-view.svelte';
	import KanbanBoard from '$lib/components/patterns/kanban-board.svelte';
	import ChartCard from '$lib/components/patterns/chart-card.svelte';
	import OnboardingSlide from '$lib/components/patterns/onboarding-slide.svelte';
	import PullToRefreshContainer from '$lib/components/patterns/pull-to-refresh-container.svelte';
	import FilterSheet from '$lib/components/patterns/filter-sheet.svelte';
	import InfiniteList from '$lib/components/patterns/infinite-list.svelte';
	import ColorThemeSwitcher from '$lib/components/patterns/color-theme-switcher.svelte';

	import {
		Flame, Target, Trophy, Zap, Search, Plus, Camera, Timer, Share2,
		TrendingUp, BookOpen, Brain, Heart, Sparkles, Star, Crown,
		Bell, Shield, User, Settings, LogOut, Sun, Moon, Monitor,
		MessageCircle, AlertTriangle, Info, CheckCircle,
		Activity, Layers, Users,
		ChevronRight, Clock, Gift, Inbox,
		Edit3, Trash2, UserPlus, Award, Lightbulb, Footprints
	} from '@lucide/svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	let section = $state('dashboard');
	let showSplash = $state(false);

	let showConfirm = $state(false);
	let showSuccess = $state(false);
	let showSheet = $state(false);
	let showFilter = $state(false);
	let searchQuery = $state('');
	let searchResults: Array<{ id: string; title: string; description?: string; icon?: any; badge?: string }> = $state.raw([]);
	let searchLoading = $state(false);
	let mainEl: HTMLElement | undefined = $state();
	let heroTitleEl: HTMLElement | undefined = $state();

	let onboardingStep = $state(1);
	let onboardingGoal = $state('');
	let onboardingLevel = $state('');
	let totalOnboardingSteps = $state(5);

	let selectedFilters = $state.raw<Record<string, string[]>>({});
	let insightItems = $state.raw([
		{ id: 'insight-1', title: 'Best time to exercise', description: 'Your activity peaks around 7 AM.', variant: 'info' as const, icon: Brain },
		{ id: 'insight-2', title: 'Almost there!', description: '3 days from beating your longest streak.', variant: 'success' as const, icon: Flame },
	]);
	let kanbanCols = $state([
		{ id: 'todo', title: 'To Do', items: [
			{ id: '1', title: 'Design system', badge: 'Design' },
			{ id: '2', title: 'API integration', badge: 'Dev' },
		]},
		{ id: 'progress', title: 'In Progress', items: [
			{ id: '3', title: 'Auth flow', badge: 'Feature' },
		]},
		{ id: 'done', title: 'Done', items: [
			{ id: '4', title: 'Splash screen', badge: 'UI' },
			{ id: '5', title: 'Dashboard layout', badge: 'UI' },
		]},
	]);
	let infItems = $state([1, 2, 3]);
	let infHasMore = $state(true);
	let infiniteLoading = $state(false);

	function moveKanbanItem(colId: string, itemId: string) {
		const sourceIdx = kanbanCols.findIndex(c => c.id === colId);
		if (sourceIdx === -1) return;
		const item = kanbanCols[sourceIdx].items.find(i => i.id === itemId);
		if (!item) return;
		const targetIdx = (sourceIdx + 1) % kanbanCols.length;
		kanbanCols[sourceIdx].items = kanbanCols[sourceIdx].items.filter(i => i.id !== itemId);
		kanbanCols[targetIdx].items = [...kanbanCols[targetIdx].items, item];
		toast.success(`Moved "${item.title}" to ${kanbanCols[targetIdx].title}`);
	}

	async function loadMoreItems() {
		if (infiniteLoading) return;
		infiniteLoading = true;
		await new Promise(r => setTimeout(r, 800));
		const next = infItems.length + 1;
		infItems = [...infItems, next];
		if (infItems.length >= 6) infHasMore = false;
		infiniteLoading = false;
	}

	function nextStep() {
		if (onboardingStep < totalOnboardingSteps) {
			onboardingStep++;
		}
	}

	function skipToEnd() {
		onboardingStep = totalOnboardingSteps;
	}

	async function handleSearch(q: string) {
		searchQuery = q;
		if (!q) { searchResults = []; return; }
		searchLoading = true;
		await new Promise(r => setTimeout(r, 600));
		searchResults = [
			{ id: '1', title: 'Getting Started Guide', description: 'Learn the basics', icon: BookOpen, badge: 'Guide' },
			{ id: '2', title: 'Advanced Patterns', description: 'Deep dive into architecture', icon: Layers, badge: 'Advanced' },
		];
		searchLoading = false;
	}

	onMount(() => {
		if (!mainEl) return;
		const ctx = gsap.context(() => {
			const sections = mainEl!.querySelectorAll('[data-entry-section]');
			gsap.from(sections, {
				opacity: 0,
				y: 20,
				duration: 0.5,
				stagger: { amount: 0.4, from: 'start' },
				ease: 'premium-smooth',
				clearProps: 'opacity,y',
			});
			if (heroTitleEl) {
				gsap.from(heroTitleEl, {
					opacity: 0,
					y: 10,
					duration: 0.3,
					ease: 'power2.out',
				});
			}
			document.querySelectorAll('[data-btn-press]').forEach(el => {
				buttonPress(el as HTMLElement);
			});
		}, mainEl);
		return () => ctx.revert();
	});

	const sections = [
		{ id: 'dashboard', label: 'Dashboard', icon: Activity },
		{ id: 'onboarding', label: 'Onboarding', icon: Star },
		{ id: 'social', label: 'Social', icon: Users },
		{ id: 'feedback', label: 'Feedback', icon: MessageCircle },
		{ id: 'data', label: 'Data', icon: Layers },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];

	const timelineItems = [
		{ icon: UserPlus, title: 'Joined the app', description: 'Created an account', timestamp: new Date(Date.now() - 86400000 * 30), variant: 'success' as const },
		{ icon: Award, title: 'First achievement', description: 'Completed onboarding', timestamp: new Date(Date.now() - 86400000 * 28), variant: 'default' as const },
		{ icon: Flame, title: '7-day streak', description: 'Consistent usage', timestamp: new Date(Date.now() - 86400000 * 21) },
		{ icon: Lightbulb, title: 'New insight', description: 'AI recommendation available', timestamp: new Date(Date.now() - 86400000 * 7), variant: 'warning' as const },
	];

	const leaderboardEntries = [
		{ rank: 1, name: 'Sarah K.', value: 2840, avatar: '', isCurrentUser: false },
		{ rank: 2, name: 'Mike R.', value: 2710, avatar: '', isCurrentUser: false },
		{ rank: 3, name: 'You', value: 2530, avatar: '', isCurrentUser: true },
		{ rank: 4, name: 'Emma L.', value: 2400, avatar: '' },
		{ rank: 5, name: 'James W.', value: 2180, avatar: '' },
	];
</script>

<div class="mx-auto flex min-h-dvh max-w-2xl flex-col">
	{#if showSplash}
		<SplashScreen appName="App Starter" version="1.0.0" loading={false} onFinish={() => { showSplash = false; }} />
	{:else}
		<header class="sticky top-0 z-50 border-b bg-background px-4 py-3">
			<div class="flex items-center justify-between">
				<h1 bind:this={heroTitleEl} class="text-lg font-bold">App Starter</h1>
				<div class="flex items-center gap-2">
					<Button variant="outline" size="xs" data-btn-press onclick={() => { showSplash = true; }}>
						Splash
					</Button>
					<Button variant="outline" size="xs" data-btn-press onclick={() => { app.setTheme(app.theme === 'light' ? 'dark' : app.theme === 'dark' ? 'system' : 'light'); }}>
						{#if app.theme === 'dark'}
							<Sun class="size-4" />
						{:else if app.theme === 'system'}
							<Monitor class="size-4" />
						{:else}
							<Moon class="size-4" />
						{/if}
					</Button>
				</div>
			</div>
			<div class="mt-2 flex gap-1 overflow-x-auto" style="scrollbar-width: none;" role="tablist" aria-label="App sections">
				{#each sections as s (s.id)}
					<button
						data-btn-press
						role="tab"
						aria-selected={section === s.id}
						onclick={() => { section = s.id; }}
						class={cn(
							"flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
							section === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
						)}
					>
						<s.icon class="size-3.5" />
						{s.label}
					</button>
				{/each}
			</div>
		</header>

		<main bind:this={mainEl} class={cn("flex-1", section === 'onboarding' ? "flex flex-col overflow-y-auto" : "overflow-y-auto p-4")}>
			<OfflineBanner />

			{#if section === 'dashboard'}
				<div class="flex flex-col gap-4">
					<h2 data-entry-section class="text-sm font-semibold text-muted-foreground">DASHBOARD PATTERNS</h2>

					<GreetingCard name="Hari" streak={17} quote="Every day counts" />

					<StatGrid items={[
						{ icon: Flame, value: '17', label: 'Day Streak', trend: { value: '+3', positive: true } },
						{ icon: Target, value: '47%', label: "Today's Progress", trend: { value: '+12%', positive: true } },
						{ icon: Trophy, value: '230', label: 'Points', trend: { value: '+45', positive: true } },
						{ icon: Zap, value: '12h', label: 'Time Saved', trend: { value: '+2h', positive: true } },
					]} columns={2} />

					<QuickActionGrid actions={[
						{ icon: Search, label: 'Search', onClick: () => toast('Search opened') },
						{ icon: Plus, label: 'Add', onClick: () => toast('Add item') },
						{ icon: Camera, label: 'Scan', onClick: () => toast('Camera opened') },
						{ icon: Timer, label: 'Timer', onClick: () => toast('Timer started') },
						{ icon: Share2, label: 'Share', onClick: () => toast('Share menu opened') },
					]} columns={5} />

					<SectionHeader title="Recent Activity" onSeeAll={() => toast('See all activity')} />

					<ActivityCard icon={TrendingUp} title="Completed Walk" description="2km walk in the park" timestamp={new Date(Date.now() - 3600000)} badge="Walk" />
					<ActivityCard icon={Brain} title="Meditation Session" description="10 min mindfulness" timestamp={new Date(Date.now() - 7200000)} badge="Mind" />

					<SectionHeader title="Tips for You" />
					<TipsCarousel tips={[
						{ title: 'Stay Consistent', description: 'Small steps every day lead to big results', icon: Sparkles },
						{ title: 'Take Breaks', description: 'Your brain needs rest to perform at its best', icon: Heart },
						{ title: 'Track Progress', description: 'What gets measured gets improved', icon: Target },
					]} />

					{#each insightItems as item (item.id)}
						<InsightCard
							title={item.title}
							description={item.description}
							variant={item.variant}
							icon={item.icon}
							onDismiss={() => { insightItems = insightItems.filter(i => i.id !== item.id); }}
						/>
					{/each}

					<StreakWidget count={17} goal={30} label="Day Streak" />

					<HeroCard headline="Upgrade to Pro" description="Unlock all features." ctaLabel="Learn More" icon={Crown} variant="compact" onCta={() => toast('Learn More about Pro')} />
					<PremiumBanner title="Go Premium" description="Unlock unlimited access" actionLabel="Upgrade" icon={Sparkles} onAction={() => toast('Upgrade flow started')} />

					<SectionHeader title="Achievements" />
					<div class="grid grid-cols-2 gap-4">
						<AchievementCard icon={Trophy} title="Early Bird" description="First login" unlocked rarity="legendary" />
						<AchievementCard icon={Flame} title="On Fire" description="7-day streak" unlocked={false} progress={5} progressMax={7} rarity="rare" />
						<AchievementCard icon={Star} title="Consistent" description="30-day streak" unlocked={false} progress={17} progressMax={30} rarity="epic" />
						<AchievementCard icon={Target} title="Goal Crusher" description="Complete 10 goals" unlocked rarity="common" />
					</div>

					<ChallengeCard icon={Gift} title="Daily Challenge" description="Complete 3 activities" progress={1} progressMax={3} reward="50 XP" daysLeft={1} />

					<div class="flex items-center gap-4">
						<ProgressRing value={75} variant="success" />
						<ProgressRing value={45} variant="warning" />
						<ProgressRing value={90} variant="default" />
					</div>
				</div>

			{:else if section === 'onboarding'}
				{#if onboardingStep === 1}
						<OnboardingSlide
							icon={Sparkles}
							title="Welcome to App Starter"
							description="Build beautiful apps fast with reusable patterns, GSAP animations, and shadcn-svelte components. Let's get you set up!"
							actionLabel="Get Started"
							onAction={nextStep}
							actionSecondary="Skip"
							onSecondary={skipToEnd}
							step={1}
							totalSteps={totalOnboardingSteps}
						/>
					{:else if onboardingStep === 2}
						<OnboardingSlide
							icon={Target}
							title="What brings you here?"
							description="Choose what matters most to you right now."
							actionLabel="Continue"
							onAction={() => { if (onboardingGoal) nextStep(); }}
							actionSecondary="Skip"
							onSecondary={nextStep}
							choices={[
								{ id: 'fitness', label: 'Get Fit', description: 'Track workouts and build habits', icon: Flame },
								{ id: 'productivity', label: 'Stay Productive', description: 'Manage tasks and goals', icon: Zap },
								{ id: 'learning', label: 'Learn Something New', description: 'Build skills every day', icon: BookOpen },
							]}
							selected={onboardingGoal}
							onSelect={(id) => { onboardingGoal = id; }}
							step={2}
							totalSteps={totalOnboardingSteps}
						/>
					{:else if onboardingStep === 3}
						<OnboardingSlide
							icon={TrendingUp}
							title="Your experience level?"
							description="We'll tailor the experience to match your pace."
							actionLabel="Continue"
							onAction={() => { if (onboardingLevel) nextStep(); }}
							actionSecondary="Skip"
							onSecondary={nextStep}
							choices={[
								{ id: 'beginner', label: 'Beginner', description: "I'm just getting started", icon: Star },
								{ id: 'intermediate', label: 'Intermediate', description: 'I know the basics', icon: Activity },
								{ id: 'advanced', label: 'Advanced', description: 'I am already experienced', icon: Crown },
							]}
							selected={onboardingLevel}
							onSelect={(id) => { onboardingLevel = id; }}
							step={3}
							totalSteps={totalOnboardingSteps}
						/>
					{:else if onboardingStep === 4}
						<OnboardingSlide
							icon={Bell}
							title="Stay in the loop"
							description="Get notified about your progress, reminders, and personalized tips."
							actionLabel="Allow Notifications"
							onAction={nextStep}
							actionSecondary="Not now"
							onSecondary={nextStep}
							step={4}
							totalSteps={totalOnboardingSteps}
						/>
					{:else if onboardingStep === 5}
						<OnboardingSlide
							icon={CheckCircle}
							title="You're all set!"
							description={onboardingGoal
								? "We'll help you stay on track with your goals. Let's start!"
								: 'Jump right in and explore what App Starter has to offer.'}
							actionLabel="Start Exploring"
							onAction={() => { section = 'dashboard'; }}
							step={5}
							totalSteps={totalOnboardingSteps}
						/>
					{/if}

			{:else if section === 'social'}
				<div class="flex flex-col gap-4">
					<h2 data-entry-section class="text-sm font-semibold text-muted-foreground">SOCIAL</h2>

					<ProfileHeader name="Hari" username="@hari" bio="Building the future" followers={128} following={64} isPremium onEdit={() => toast('Edit profile')} />

					<Leaderboard entries={leaderboardEntries} />

					<Timeline items={timelineItems} />

					<DetailPage
						hero={{ icon: Footprints, title: 'Marathon Runner', subtitle: 'Completed 42km', badge: 'Achievement' }}
						metadata={[
							{ label: 'Distance', value: '42.2 km' },
							{ label: 'Time', value: '3h 45m' },
							{ label: 'Calories', value: '2,840' },
						]}
						actions={[
							{ icon: Share2, label: 'Share', onClick: () => toast('Shared achievement') },
							{ icon: Heart, label: 'Like', onClick: () => toast('Achievement liked') },
						]}
					>
						<p class="text-sm text-muted-foreground">Congratulations on completing your first marathon!</p>
					</DetailPage>
				</div>

			{:else if section === 'feedback'}
				<div class="flex flex-col gap-4">
					<h2 data-entry-section class="text-sm font-semibold text-muted-foreground">FEEDBACK & MODALS</h2>

					<Card.Root>
						<Card.Header>
							<Card.Title>Dialogs & Modals</Card.Title>
							<Card.Description>Click to open each dialog type</Card.Description>
						</Card.Header>
						<Card.Content class="flex flex-wrap gap-2">
							<Button onclick={() => { showConfirm = true; }}>Confirm Dialog</Button>
							<Button onclick={() => { showSuccess = true; }} variant="secondary">Success Dialog</Button>
							<Button onclick={() => { showSheet = true; }} variant="outline">Bottom Sheet</Button>
							<Button onclick={() => { showFilter = true; }} variant="outline">Filter Sheet</Button>
						</Card.Content>
					</Card.Root>

					<ConfirmDialog open={showConfirm} title="Delete Item" description="This cannot be undone." confirmLabel="Delete" variant="destructive" onConfirm={() => { showConfirm = false; }} onCancel={() => { showConfirm = false; }} />
					<SuccessDialog open={showSuccess} title="Success!" description="Your changes have been saved." actionLabel="Great" onAction={() => { showSuccess = false; }} icon={CheckCircle} />
					<BottomSheetActionList open={showSheet} title="Actions" actions={[
						{ icon: Edit3, label: 'Edit', onClick: () => { showSheet = false; } },
						{ icon: Share2, label: 'Share', onClick: () => { showSheet = false; } },
						{ icon: Trash2, label: 'Delete', variant: 'destructive' as const, onClick: () => { showSheet = false; } },
					]} onClose={() => { showSheet = false; }} />
					<FilterSheet
						open={showFilter}
						title="Filter"
						filters={[
							{ id: 'type', label: 'Type', options: [{ value: 'walk', label: 'Walk' }, { value: 'run', label: 'Run' }, { value: 'cycle', label: 'Cycle' }] },
							{ id: 'duration', label: 'Duration', options: [{ value: 'short', label: '< 15 min' }, { value: 'medium', label: '15-30 min' }, { value: 'long', label: '> 30 min' }] },
						]}
						selectedFilters={selectedFilters}
						onFilterChange={(filterId, values) => { selectedFilters = { ...selectedFilters, [filterId]: values }; }}
						onClear={() => { selectedFilters = {}; showFilter = false; }}
						onApply={() => { toast('Filters applied'); showFilter = false; }}
					/>

					<EmptyState icon={Inbox} title="No messages" description="Start a conversation to see your messages here." actionLabel="New Message" onAction={() => toast('New conversation started')} />

					<ErrorState title="Something went wrong" description="We couldn't load your data. Try again." retryLabel="Retry" onRetry={() => toast('Retrying...')} />
				</div>

			{:else if section === 'data'}
				<div class="flex flex-col gap-4">
					<h2 data-entry-section class="text-sm font-semibold text-muted-foreground">DATA & LISTS</h2>

					<ChartCard title="Weekly Progress" period="weekly" icon={Activity}>
						<div class="flex items-end justify-between gap-2 py-4" style="height: 120px;">
							{#each [40, 65, 45, 80, 55, 90, 70] as h (h)}
								<div data-chart-bar class="flex-1 rounded-md bg-primary" style="height: {h}%"></div>
							{/each}
						</div>
					</ChartCard>

					<CalendarView events={[
						{ date: 5, title: 'Workout' },
						{ date: 12, title: 'Meeting', variant: 'destructive' },
						{ date: 15, title: 'Birthday' },
					]} />

					<KanbanBoard columns={kanbanCols} onItemClick={moveKanbanItem} />

					<PullToRefreshContainer onRefresh={async () => { await new Promise(r => setTimeout(r, 1000)); }}>
						<div class="flex flex-col gap-2 rounded-lg border p-4">
							<p class="text-sm text-muted-foreground">Pull down to refresh</p>
						</div>
					</PullToRefreshContainer>

					<p class="text-muted-foreground text-xs">Infinite list (items rendered via snippet):</p>
					<InfiniteList items={infItems} loadMore={loadMoreItems} hasMore={infHasMore} loading={infiniteLoading}>
						{#snippet renderItem(item: number)}
							<div class="rounded-lg border p-3 text-sm">Item {item}</div>
						{/snippet}
					</InfiniteList>

					<SettingsSection title="Account" items={[
						{ icon: User, label: 'Profile', description: 'Edit your profile', onClick: () => toast('Profile settings opened') },
						{ icon: Bell, label: 'Notifications', description: 'Manage alerts', onClick: () => toast('Notification settings opened') },
						{ icon: Shield, label: 'Privacy', description: 'Control your data', onClick: () => toast('Privacy settings opened') },
						{ icon: LogOut, label: 'Sign Out', variant: 'destructive', onClick: () => { toast('Signed out'); } },
					]} />
				</div>

			{:else if section === 'settings'}
				<div class="flex flex-col gap-4">
					<h2 data-entry-section class="text-sm font-semibold text-muted-foreground">SETTINGS</h2>

					<SettingsSection title="Appearance" items={[
						{ icon: Sun, label: 'Theme', description: `Current: ${app.theme}`, onClick: () => { app.setTheme(app.theme === 'light' ? 'dark' : app.theme === 'dark' ? 'system' : 'light'); } },
						{ icon: Crown, label: 'Accent Color', description: 'Customize your theme' },
					]} />

					<div class="rounded-xl border bg-card p-4">
						<p class="mb-3 text-sm font-medium">Color Scheme</p>
						<ColorThemeSwitcher />
					</div>

					<SettingsSection title="Notifications" items={[
						{ icon: Bell, label: 'Push Notifications' },
						{ icon: Bell, label: 'Email Notifications' },
					]} />

					<SettingsSection title="Account" items={[
						{ icon: Crown, label: 'Upgrade to Premium', description: 'Get access to all features' },
						{ icon: Info, label: 'About', description: `Version ${app.version}` },
						{ icon: LogOut, label: 'Delete Account', variant: 'destructive' },
					]} />

					<FloatingActionButton label="New" position="br" onClick={() => toast('FAB clicked!')} />
				</div>
			{/if}

			<div class="pb-24"></div>
		</main>
	{/if}
</div>
