<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';

	import HeroSection from '$lib/components/sections/home/hero-section.svelte';
	import { BigTimer, FeatureGrid, AnimatedStatCounter, TestimonialCarousel } from '$lib/components/sections/index.js';
	import { LoginForm, SignupForm, OTPForm } from '$lib/components/sections/index.js';
	import StoryCircle from '$lib/components/sections/feed/story-circle.svelte';
	import VideoCard from '$lib/components/sections/feed/video-card.svelte';
	import PostComposer from '$lib/components/sections/feed/post-composer.svelte';
	import CommentSection from '$lib/components/sections/feed/comment-section.svelte';
	import UserProfileCard from '$lib/components/sections/social/user-profile-card.svelte';
	import LiveIndicator from '$lib/components/sections/social/live-indicator.svelte';
	import ShareSheet from '$lib/components/sections/social/share-sheet.svelte';
	import SearchPage from '$lib/components/sections/discovery/search-page.svelte';
	import CategoryGrid from '$lib/components/sections/discovery/category-grid.svelte';
	import TrendingCarousel from '$lib/components/sections/discovery/trending-carousel.svelte';
	import CreatorDashboard from '$lib/components/sections/dashboard/creator-dashboard.svelte';
	import ContentAnalytics from '$lib/components/sections/dashboard/content-analytics.svelte';
	import StreakCalendar from '$lib/components/sections/dashboard/streak-calendar.svelte';
	import ChallengeSection from '$lib/components/sections/gamification/challenge-section.svelte';
	import LeaderboardPanel from '$lib/components/sections/gamification/leaderboard-panel.svelte';
	import { RewardPopup } from '$lib/components/sections/index.js';
	import ProfileEditForm from '$lib/components/sections/settings/profile-edit-form.svelte';
	import { PremiumUpsellPage, AppSettingsPage } from '$lib/components/sections/index.js';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';
	import DrawerMenu from '$lib/components/sections/shell/drawer-menu.svelte';

	import {
		Activity, Star, Users, MessageCircle, Search, Layout, Layers, Trophy, Settings, Grid3x3,
		Sun, Moon, Monitor, Footprints, Timer, User
	} from '@lucide/svelte';

	let section = $state('home');
	let showShare = $state(false);
	let showReward = $state(false);
	let showDrawer = $state(false);
	let mainEl: HTMLElement | undefined = $state();
	let navDemo = $state('dashboard');

	const tabs = [
		{ id: 'home', label: 'Home', icon: Star },
		{ id: 'auth', label: 'Auth', icon: Users },
		{ id: 'feed', label: 'Feed', icon: Activity },
		{ id: 'social', label: 'Social', icon: MessageCircle },
		{ id: 'discovery', label: 'Discovery', icon: Search },
		{ id: 'dashboard', label: 'Dashboard', icon: Layout },
		{ id: 'gamification', label: 'Gamification', icon: Trophy },
		{ id: 'settings', label: 'Settings', icon: Settings },
		{ id: 'shell', label: 'Shell', icon: Grid3x3 },
	];

	const storyItems = [
		{ id: '1', username: 'You', avatar: '', hasStory: false },
		{ id: '2', username: 'Sarah', avatar: '', hasStory: true, seen: false },
		{ id: '3', username: 'Mike', avatar: '', hasStory: true, seen: true },
		{ id: '4', username: 'Emma', avatar: '', hasStory: true, seen: false },
		{ id: '5', username: 'Alex', avatar: '', hasStory: false },
	];

	const video = {
		title: 'Morning Routine 2026',
		username: 'fitness_guru',
		likes: 2840,
		comments: 142,
		shares: 58,
	};

	const trendingItems = [
		{ id: '1', title: 'Morning Routine', description: 'Start your day right', badge: 'Trending' },
		{ id: '2', title: 'Svelte 5 Deep Dive', description: 'All about runes', badge: 'New' },
		{ id: '3', title: 'GSAP Animation Tips', description: 'Premium eases guide', badge: 'Popular' },
	];

	onMount(() => {
		if (!mainEl) return;
		const ctx = gsap.context(() => {
			document.querySelectorAll('[data-btn-press]').forEach(el => {
				buttonPress(el as HTMLElement);
			});
		}, mainEl);
		return () => ctx.revert();
	});
</script>

<div class="relative z-10 mx-auto flex min-h-dvh max-w-2xl flex-col bg-background">
	<header class="sticky top-0 z-50 border-b bg-background px-4 py-3">
		<div class="flex items-center justify-between">
			<h1 class="text-lg font-bold">App Starter</h1>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="xs" data-btn-press onclick={() => showReward = true}>Reward</Button>
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
		<div class="mt-2 flex gap-1 overflow-x-auto" style="scrollbar-width: none;" role="tablist">
			{#each tabs as t (t.id)}
				<button
					data-btn-press
					role="tab"
					aria-selected={section === t.id}
					onclick={() => { section = t.id; }}
					class={cn(
						"flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
						section === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
					)}
				>
					<t.icon class="size-3.5" />
					{t.label}
				</button>
			{/each}
		</div>
	</header>

	<main bind:this={mainEl} class="flex-1 overflow-y-auto p-4">
		{#if section === 'home'}
			<div class="flex flex-col gap-4">
				<div class="-mx-4 -mt-4">
					<HeroSection
						headline="28 Composites Ready"
						subheadline="Svelte 5 · shadcn-svelte · GSAP — copy-paste into any app"
						ctaLabel="Explore"
						onCta={() => toast('App Starter ready!')}
					/>
				</div>
				<h2 class="text-lg font-semibold tracking-tight">BigTimer</h2>
				<BigTimer value={28} label="section composites" sub="40 pattern components · 0 errors" />
				<h2 class="text-lg font-semibold tracking-tight">AnimatedStatCounter</h2>
				<AnimatedStatCounter value={2840} label="Components Built" />
				<h2 class="text-lg font-semibold tracking-tight">FeatureGrid</h2>
				<FeatureGrid />
				<h2 class="text-lg font-semibold tracking-tight">TestimonialCarousel</h2>
				<TestimonialCarousel />
			</div>

		{:else if section === 'auth'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">LoginForm</h2>
				<LoginForm onLogin={() => toast('Logged in!')} onForgotPassword={() => toast('Password reset')} />
				<h2 class="text-lg font-semibold tracking-tight">SignupForm</h2>
				<SignupForm onSignup={() => toast('Signed up!')} />
				<h2 class="text-lg font-semibold tracking-tight">OTPForm</h2>
				<OTPForm onVerify={() => toast('Verified!')} />
			</div>

		{:else if section === 'feed'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">StoryCircle</h2>
				<StoryCircle stories={storyItems} onStoryClick={(id) => toast(`Story ${id}`)} />
				<h2 class="text-lg font-semibold tracking-tight">VideoCard</h2>
				<VideoCard {...video} onLike={() => toast('Liked!')} onComment={() => toast('Comments')} onShare={() => { showShare = true; }} />
				<h2 class="text-lg font-semibold tracking-tight">PostComposer</h2>
				<PostComposer onSubmit={(c) => toast(`Posted: ${c.slice(0, 30)}...`)} />
				<h2 class="text-lg font-semibold tracking-tight">CommentSection</h2>
				<CommentSection onAddComment={(t) => toast(`Comment: ${t}`)} />
			</div>

		{:else if section === 'social'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">UserProfileCard</h2>
				<UserProfileCard name="Sarah K." username="@sarah" bio="Building the future" followers={284} following={142} isOwn onEdit={() => toast('Edit profile')} />
				<h2 class="text-lg font-semibold tracking-tight">LiveIndicator</h2>
				<div class="flex items-center justify-center py-4">
					<LiveIndicator viewerCount={142} />
				</div>
				<h2 class="text-lg font-semibold tracking-tight">ShareSheet</h2>
				<Button onclick={() => showShare = true} variant="outline" class="w-full">Open ShareSheet</Button>
			</div>

		{:else if section === 'discovery'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">SearchPage</h2>
				<SearchPage onSelect={(item) => toast(`Selected: ${item.title}`)} />
				<h2 class="text-lg font-semibold tracking-tight">CategoryGrid</h2>
				<CategoryGrid onSelect={(id) => toast(`Category: ${id}`)} />
				<h2 class="text-lg font-semibold tracking-tight">TrendingCarousel</h2>
				<TrendingCarousel items={trendingItems} onSelect={(id) => toast(`Trending: ${id}`)} />
			</div>

		{:else if section === 'dashboard'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">CreatorDashboard</h2>
				<CreatorDashboard />
				<h2 class="text-lg font-semibold tracking-tight">ContentAnalytics</h2>
				<ContentAnalytics />
				<h2 class="text-lg font-semibold tracking-tight">StreakCalendar</h2>
				<StreakCalendar />
			</div>

		{:else if section === 'gamification'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">ChallengeSection</h2>
				<ChallengeSection />
				<h2 class="text-lg font-semibold tracking-tight">LeaderboardPanel</h2>
				<LeaderboardPanel />
			</div>

		{:else if section === 'settings'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">ProfileEditForm</h2>
				<ProfileEditForm onSave={(data) => toast(`Saved: ${data.name}`)} />
				<h2 class="text-lg font-semibold tracking-tight">PremiumUpsellPage</h2>
				<PremiumUpsellPage onSubscribe={(plan) => toast(`Subscribed to ${plan}`)} />
				<h2 class="text-lg font-semibold tracking-tight">AppSettingsPage</h2>
				<AppSettingsPage />
			</div>

		{:else if section === 'shell'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">BottomNavigation</h2>
				<BottomNavigation items={[
					{ icon: Footprints, label: 'Dashboard', route: 'dashboard' },
					{ icon: Timer, label: 'Sessions', route: 'sessions' },
					{ icon: User, label: 'Profile', route: 'profile' },
				]} activeRoute={navDemo} onSelect={(r) => { navDemo = r; toast(`Nav: ${r}`); }} />
				<h2 class="text-lg font-semibold tracking-tight">DrawerMenu</h2>
				<Button onclick={() => showDrawer = true} variant="outline" class="w-full">Open DrawerMenu</Button>
			</div>
		{/if}

		<div class="pb-16"></div>
	</main>
</div>

<ShareSheet open={showShare} onClose={() => { showShare = false; }} />
<RewardPopup open={showReward} rewardAmount={500} rewardLabel="XP" onClaim={() => { showReward = false; }} title="Component Master!" description="You built all 28 composites" />
<DrawerMenu open={showDrawer} onClose={() => { showDrawer = false; }} items={tabs.map(t => ({ id: t.id, icon: t.icon, label: t.label }))} activeId={section} onNavigate={(id) => { section = id; showDrawer = false; }} />
