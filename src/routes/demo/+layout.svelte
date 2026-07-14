<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';
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
	<main class="flex-1 overflow-y-auto" class:px-4={!isOnboarding} class:pt-4={!isOnboarding} class:pb-20={!isOnboarding}>
		{@render children()}
	</main>
	{#if !isOnboarding}
		<BottomNavigation items={navItems} {activeRoute} onSelect={(r) => goto(r)} />
	{/if}
</div>
