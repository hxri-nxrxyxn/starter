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

	let gridEl: SVGSVGElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			gsap.to(gridEl, {
				x: 24,
				y: 24,
				duration: 25,
				ease: 'none',
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
	<svg
		bind:this={gridEl}
		class="pointer-events-none fixed inset-0 z-0 h-full w-full text-foreground opacity-[0.09]"
		style="transform: perspective(500px) rotateX(9deg) scale(0.95);"
		preserveAspectRatio="none"
	>
		<defs>
			<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
				<path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" stroke-width="0.5" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid)" />
	</svg>
	<main class="relative z-10 flex-1 overflow-y-auto" class:px-4={!isOnboarding} class:pt-4={!isOnboarding} class:pb-20={!isOnboarding}>
		{@render children()}
	</main>
	{#if !isOnboarding}
		<BottomNavigation items={navItems} {activeRoute} onSelect={(r) => goto(r)} />
	{/if}
</div>
