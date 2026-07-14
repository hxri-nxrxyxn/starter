<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';

	import { LoginForm, SignupForm, BigTimer } from '$lib/components/sections/index.js';
	import VideoCard from '$lib/components/sections/feed/video-card.svelte';
	import StoryCircle from '$lib/components/sections/feed/story-circle.svelte';
	import PostComposer from '$lib/components/sections/feed/post-composer.svelte';
	import CommentSection from '$lib/components/sections/feed/comment-section.svelte';
	import UserProfileCard from '$lib/components/sections/social/user-profile-card.svelte';
	import LiveIndicator from '$lib/components/sections/social/live-indicator.svelte';
	import ShareSheet from '$lib/components/sections/social/share-sheet.svelte';
	import LeaderboardPanel from '$lib/components/sections/gamification/leaderboard-panel.svelte';
	import HeroSection from '$lib/components/sections/home/hero-section.svelte';
	import FeatureGrid from '$lib/components/sections/home/feature-grid.svelte';
	import CreatorDashboard from '$lib/components/sections/dashboard/creator-dashboard.svelte';
	import ContentAnalytics from '$lib/components/sections/dashboard/content-analytics.svelte';
	import ChallengeSection from '$lib/components/sections/gamification/challenge-section.svelte';
	import AppSettingsPage from '$lib/components/sections/settings/app-settings-page.svelte';
	import ProfileEditForm from '$lib/components/sections/settings/profile-edit-form.svelte';
	import PremiumUpsellPage from '$lib/components/sections/commerce/premium-upsell-page.svelte';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';

	import {
		Activity, Star, Users, MessageCircle, Layers, Settings,
		Sun, Moon, Monitor, Footprints, Timer, User
	} from '@lucide/svelte';

	let section = $state('home');
	let showShare = $state(false);
	let mainEl: HTMLElement | undefined = $state();
	let navSection = $state('dashboard');

	const tabs = [
		{ id: 'home', label: 'Home', icon: Star },
		{ id: 'auth', label: 'Auth', icon: Users },
		{ id: 'feed', label: 'Feed', icon: Activity },
		{ id: 'social', label: 'Social', icon: MessageCircle },
		{ id: 'dashboard', label: 'Dashboard', icon: Layers },
		{ id: 'settings', label: 'Settings', icon: Settings },
	];

	const navItems = [
		{ icon: Footprints, label: 'Dashboard', route: 'dashboard' },
		{ icon: Timer, label: 'Sessions', route: 'sessions' },
		{ icon: User, label: 'Profile', route: 'profile' },
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
				<h2 class="text-lg font-semibold tracking-tight">Hero</h2>
				<HeroSection
					headline="28 Composites Ready"
					subheadline="Svelte 5 · shadcn-svelte · GSAP — copy-paste into any app"
					ctaLabel="Explore"
					onCta={() => toast('App Starter ready!')}
				/>
				<BigTimer value={28} label="section composites" sub="40 pattern components · 0 errors" />
				<FeatureGrid />

				<h2 class="text-lg font-semibold tracking-tight">Bottom Navigation</h2>
				<p class="text-xs text-muted-foreground">Interactive demo. Tap a tab to see it switch.</p>
				<BottomNavigation items={navItems} activeRoute={navSection} onSelect={(r) => { navSection = r; toast(`Navigated to ${r}`); }} />
			</div>

		{:else if section === 'auth'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">Login</h2>
				<LoginForm onLogin={() => toast('Logged in!')} onForgotPassword={() => toast('Password reset')} />
				<h2 class="text-lg font-semibold tracking-tight">Sign Up</h2>
				<SignupForm onSignup={() => toast('Signed up!')} />
			</div>

		{:else if section === 'feed'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">Stories</h2>
				<StoryCircle stories={storyItems} onStoryClick={(id) => toast(`Story ${id}`)} />
				<h2 class="text-lg font-semibold tracking-tight">Compose</h2>
				<PostComposer onSubmit={(c) => toast(`Posted: ${c.slice(0, 30)}...`)} />
				<h2 class="text-lg font-semibold tracking-tight">Video</h2>
				<VideoCard {...video} onLike={() => toast('Liked!')} onComment={() => toast('Comments')} onShare={() => { showShare = true; }} />
				<h2 class="text-lg font-semibold tracking-tight">Comments</h2>
				<CommentSection onAddComment={(t) => toast(`Comment: ${t}`)} />
			</div>

		{:else if section === 'social'}
			<div class="flex flex-col gap-4">
				<UserProfileCard name="Sarah K." username="@sarah" bio="Building the future" followers={284} following={142} isOwn onEdit={() => toast('Edit profile')} />
				<div class="flex items-center justify-center py-4">
					<LiveIndicator viewerCount={142} />
				</div>
				<Button onclick={() => showShare = true} variant="outline" class="w-full">Open Share Sheet</Button>
				<LeaderboardPanel />
			</div>

		{:else if section === 'dashboard'}
			<div class="flex flex-col gap-4">
				<CreatorDashboard />
				<ContentAnalytics />
				<ChallengeSection />
			</div>

		{:else if section === 'settings'}
			<div class="flex flex-col gap-4">
				<h2 class="text-lg font-semibold tracking-tight">Edit Profile</h2>
				<ProfileEditForm onSave={() => toast('Profile saved!')} />
				<h2 class="text-lg font-semibold tracking-tight">Premium</h2>
				<PremiumUpsellPage onSubscribe={(plan) => toast(`Subscribed to ${plan}`)} />
				<AppSettingsPage />
			</div>
		{/if}

		<div class="pb-16"></div>
	</main>
</div>

<ShareSheet open={showShare} onClose={() => { showShare = false; }} />
