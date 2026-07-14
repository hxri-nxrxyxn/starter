<script lang="ts">
	import { UserProfileCard, LeaderboardPanel, AppSettingsPage } from '$lib/components/sections/index.js';
	import StatGrid from '$lib/components/patterns/stat-grid.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import FlameIcon from '@lucide/svelte/icons/flame';
	import CrownIcon from '@lucide/svelte/icons/crown';

	let pageEl: HTMLElement | null = $state(null);

	onMount(() => {
		if (!pageEl) return;
		const ctx = gsap.context(() => {
			const entries = pageEl!.querySelectorAll('[data-entry]');
			gsap.from(entries, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: 0.08,
				ease: 'premium-smooth',
			});
		}, pageEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={pageEl} class="flex flex-col gap-4">
	<div data-entry>
		<UserProfileCard
			name="Walker"
			username="@stepscroller"
			bio="One step at a time"
			followers={142}
			following={89}
			isOwn={true}
		/>
	</div>

	<div data-entry>
		<StatGrid
			columns={4}
			items={[
				{ value: demo.totalSteps.toLocaleString(), label: 'Total Steps', icon: FootprintsIcon },
				{ value: Math.floor(demo.totalSteps / 1000).toString(), label: 'Minutes Earned', icon: TimerIcon },
				{ value: demo.streakDays.toString(), label: 'Best Streak', icon: FlameIcon },
				{ value: demo.level.toString(), label: 'Level', icon: CrownIcon },
			]}
		/>
	</div>

	<div data-entry>
		<LeaderboardPanel />
	</div>

	<div data-entry>
		<Separator />
	</div>

	<div data-entry>
		<AppSettingsPage />
	</div>
</div>
