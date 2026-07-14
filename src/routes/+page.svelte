<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';

	import Home from '$lib/components/showcase/home.svelte';
	import Auth from '$lib/components/showcase/auth.svelte';
	import Feed from '$lib/components/showcase/feed.svelte';
	import Social from '$lib/components/showcase/social.svelte';
	import Discovery from '$lib/components/showcase/discovery.svelte';
	import Dashboard from '$lib/components/showcase/dashboard.svelte';
	import Gamification from '$lib/components/showcase/gamification.svelte';
	import Settings from '$lib/components/showcase/settings.svelte';
	import Shell from '$lib/components/showcase/shell.svelte';
	import { RewardPopup } from '$lib/components/sections/index.js';

	import {
		Activity, Star, Users, MessageCircle, Search, Layout, Layers, Trophy, Settings as SettingsIcon, Grid3x3,
		Sun, Moon, Monitor
	} from '@lucide/svelte';

	let section = $state('home');
	let showReward = $state(false);
	let mainEl: HTMLElement | undefined = $state();

	const tabs = [
		{ id: 'home', component: Home, icon: Star },
		{ id: 'auth', component: Auth, icon: Users },
		{ id: 'feed', component: Feed, icon: Activity },
		{ id: 'social', component: Social, icon: MessageCircle },
		{ id: 'discovery', component: Discovery, icon: Search },
		{ id: 'dashboard', component: Dashboard, icon: Layout },
		{ id: 'gamification', component: Gamification, icon: Trophy },
		{ id: 'settings', component: Settings, icon: SettingsIcon },
		{ id: 'shell', component: Shell, icon: Grid3x3 },
	];

	let activeTab = $derived(tabs.find(t => t.id === section) ?? tabs[0]);

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
					{t.id}
				</button>
			{/each}
		</div>
	</header>

	<main bind:this={mainEl} class="flex-1 overflow-y-auto p-4">
		<activeTab.component />
		<div class="pb-16"></div>
	</main>
</div>

<RewardPopup open={showReward} rewardAmount={500} rewardLabel="XP" onClaim={() => { showReward = false; }} title="Component Master!" description="You built all 28 composites" />
