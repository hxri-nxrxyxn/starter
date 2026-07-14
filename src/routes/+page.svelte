<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';

	import { LoginForm, SignupForm } from '$lib/components/sections/index.js';
	import VideoCard from '$lib/components/sections/feed/video-card.svelte';
	import StoryCircle from '$lib/components/sections/feed/story-circle.svelte';
	import PostComposer from '$lib/components/sections/feed/post-composer.svelte';
	import CommentSection from '$lib/components/sections/feed/comment-section.svelte';
	import UserProfileCard from '$lib/components/sections/social/user-profile-card.svelte';
	import LiveIndicator from '$lib/components/sections/social/live-indicator.svelte';
	import HeroSection from '$lib/components/sections/home/hero-section.svelte';
	import FeatureGrid from '$lib/components/sections/home/feature-grid.svelte';
	import TestimonialCarousel from '$lib/components/sections/home/testimonial-carousel.svelte';
	import AnimatedStatCounter from '$lib/components/sections/home/animated-stat-counter.svelte';
	import CreatorDashboard from '$lib/components/sections/dashboard/creator-dashboard.svelte';
	import ContentAnalytics from '$lib/components/sections/dashboard/content-analytics.svelte';
	import ChallengeSection from '$lib/components/sections/gamification/challenge-section.svelte';
	import LeaderboardPanel from '$lib/components/sections/gamification/leaderboard-panel.svelte';
	import RewardPopup from '$lib/components/sections/gamification/reward-popup.svelte';
	import AppSettingsPage from '$lib/components/sections/settings/app-settings-page.svelte';
	import ProfileEditForm from '$lib/components/sections/settings/profile-edit-form.svelte';
	import PremiumUpsellPage from '$lib/components/sections/commerce/premium-upsell-page.svelte';
	import DrawerMenu from '$lib/components/sections/shell/drawer-menu.svelte';
	import ShareSheet from '$lib/components/sections/social/share-sheet.svelte';

	import {
		Activity, Star, Users, MessageCircle, Layers, Settings, Sun, Moon, Monitor
	} from '@lucide/svelte';

	let section = $state('home');
	let showShare = $state(false);
	let showReward = $state(false);
	let showDrawer = $state(false);
	let mainEl: HTMLElement | undefined = $state();

	const sections = [
		{ id: 'home', label: 'Home', icon: Star },
		{ id: 'auth', label: 'Auth', icon: Users },
		{ id: 'feed', label: 'Feed', icon: Activity },
		{ id: 'social', label: 'Social', icon: MessageCircle },
		{ id: 'dashboard', label: 'Dashboard', icon: Layers },
		{ id: 'settings', label: 'Settings', icon: Settings },
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

<div class="mx-auto flex min-h-dvh max-w-2xl flex-col">
	<header class="sticky top-0 z-50 border-b bg-background px-4 py-3">
		<div class="flex items-center justify-between">
			<h1 class="text-lg font-bold">App Starter</h1>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="xs" data-btn-press onclick={() => showReward = true}>
					Reward
				</Button>
				<Button variant="outline" size="xs" data-btn-press onclick={() => showDrawer = true}>
					Menu
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
		<div class="mt-2 flex gap-1 overflow-x-auto" style="scrollbar-width: none;" role="tablist">
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

	<main bind:this={mainEl} class="flex-1 overflow-y-auto p-4">
		{#if section === 'home'}
			<div class="flex flex-col gap-4">
				<HeroSection
					headline="Build Apps Fast"
					subheadline="Reusable Svelte 5 section composites with GSAP animations and shadcn-svelte UI"
					ctaLabel="Get Started"
					onCta={() => toast('Welcome to App Starter!')}
				/>
				<AnimatedStatCounter value={2840} label="Components Built" />
				<FeatureGrid />
				<TestimonialCarousel />
			</div>

		{:else if section === 'auth'}
			<div class="flex flex-col gap-4">
				<LoginForm onLogin={() => toast('Logged in!')} onForgotPassword={() => toast('Password reset flow')} />
				<SignupForm onSignup={() => toast('Signed up!')} />
			</div>

		{:else if section === 'feed'}
			<div class="flex flex-col gap-4">
				<h2 class="text-sm font-semibold text-muted-foreground">STORIES</h2>
				<StoryCircle stories={storyItems} onStoryClick={(id) => toast(`Story ${id}`)} />

				<h2 class="text-sm font-semibold text-muted-foreground">COMPOSE</h2>
				<PostComposer onSubmit={(c) => toast(`Posted: ${c.slice(0, 30)}...`)} />

				<h2 class="text-sm font-semibold text-muted-foreground">VIDEO</h2>
				<VideoCard {...video} onLike={() => toast('Liked!')} onComment={() => toast('Comments')} onShare={() => { showShare = true; }} />

				<h2 class="text-sm font-semibold text-muted-foreground">COMMENTS</h2>
				<CommentSection onAddComment={(t) => toast(`Comment: ${t}`)} />
			</div>

		{:else if section === 'social'}
			<div class="flex flex-col gap-4">
				<UserProfileCard name="Sarah K." username="@sarah" bio="Building the future" followers={284} following={142} isOwn onEdit={() => toast('Edit profile')} />
				<div class="flex items-center justify-center">
					<LiveIndicator viewerCount={142} />
				</div>
				<Button onclick={() => showShare = true} variant="outline">Open Share Sheet</Button>
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
				<ProfileEditForm onSave={() => toast('Profile saved!')} />
				<PremiumUpsellPage onSubscribe={(plan) => toast(`Subscribed to ${plan}`)} />
				<AppSettingsPage />
			</div>
		{/if}

		<div class="pb-16"></div>
	</main>
</div>

<ShareSheet open={showShare} onClose={() => { showShare = false; }} />
<RewardPopup open={showReward} rewardAmount={500} rewardLabel="XP" onClaim={() => { showReward = false; }} title="Component Master!" description="You built all 28 composites" />
<DrawerMenu open={showDrawer} onClose={() => { showDrawer = false; }} items={sections.map(s => ({ id: s.id, icon: s.icon, label: s.label }))} activeId={section} onNavigate={(id) => { section = id; showDrawer = false; }} />
