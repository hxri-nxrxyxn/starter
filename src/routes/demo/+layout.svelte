<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import UserIcon from '@lucide/svelte/icons/user';

	let { children } = $props();

	const navItems = [
		{ icon: FootprintsIcon, label: 'Dashboard', route: '/demo/dashboard' },
		{ icon: TimerIcon, label: 'Sessions', route: '/demo/sessions' },
		{ icon: UserIcon, label: 'Profile', route: '/demo/profile' },
	];

	let activeRoute = $derived($page.url.pathname);
	let isOnboarding = $derived($page.url.pathname.includes('/onboarding'));

	let gridEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			gsap.to(gridEl, {
				backgroundPosition: '64px 64px',
				duration: 20,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
			});
		}, gridEl);
		return () => ctx.revert();
	});

	$effect(() => {
		if (demo.activeSession) {
			demo.resumeSessionTimer();
		}
		return () => {
			demo.endSession();
		};
	});
</script>

<div class="flex h-dvh flex-col bg-background">
	<div
		bind:this={gridEl}
		class="pointer-events-none fixed inset-0 z-0 opacity-10"
		style="background-image: linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px); background-size: 48px 48px;"
	></div>
	<main class="relative z-10 flex-1 overflow-y-auto" class:px-4={!isOnboarding} class:pt-4={!isOnboarding} class:pb-20={!isOnboarding}>
		{@render children()}
	</main>
	{#if !isOnboarding}
		<BottomNavigation items={navItems} {activeRoute} onSelect={(r) => goto(r)} />
	{/if}
</div>
