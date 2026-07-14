<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import { nav } from '$lib/stores/nav.svelte.js';
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Toaster from '$lib/components/ui/sonner/sonner.svelte';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import UserIcon from '@lucide/svelte/icons/user';

	let { children } = $props();

	const navItems = [
		{ icon: FootprintsIcon, label: 'Dashboard', route: 'dashboard' },
		{ icon: TimerIcon, label: 'Sessions', route: 'sessions' },
		{ icon: UserIcon, label: 'Profile', route: 'profile' },
	];

	let section = $state('dashboard');

	let gridEl: SVGSVGElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			gsap.to(gridEl, {
				x: 24, y: 24,
				duration: 25, ease: 'none', repeat: -1, yoyo: true,
			});
		}, gridEl);
		return () => ctx.revert();
	});

	function applyTheme() {
		const isDark = app.theme === 'dark' || (app.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', isDark);
		document.documentElement.dataset.colorScheme = app.colorScheme;
	}

	$effect(applyTheme);

	$effect(() => {
		if (app.theme !== 'system') return;
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => applyTheme();
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	});

	$effect(() => {
		if (demo.activeSession) demo.resumeSessionTimer();
		return () => demo.endSession();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

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

	<main class="relative z-10 flex-1 overflow-y-auto px-4 pb-20 pt-4">
		{@render children()}
	</main>

	<BottomNavigation items={navItems} activeRoute={nav.current} onSelect={(r) => nav.current = r} />
	<Toaster position="top-center" richColors />
</div>
