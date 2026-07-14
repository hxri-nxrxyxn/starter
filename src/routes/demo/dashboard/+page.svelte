<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import StatGrid from '$lib/components/patterns/stat-grid.svelte';
	import QuickActionGrid from '$lib/components/patterns/quick-action-grid.svelte';
	import ActivityCard from '$lib/components/patterns/activity-card.svelte';
	import AchievementCard from '$lib/components/patterns/achievement-card.svelte';
	import SectionHeader from '$lib/components/patterns/section-header.svelte';
	import SessionOverlay from '$lib/components/demo/session-overlay.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { gsap } from '$lib/animate/index.js';
	import { demo } from '$lib/stores/demo.svelte.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import PlayIcon from '@lucide/svelte/icons/play';
	import FlameIcon from '@lucide/svelte/icons/flame';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import CrownIcon from '@lucide/svelte/icons/crown';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import TargetIcon from '@lucide/svelte/icons/target';
	import TrophyIcon from '@lucide/svelte/icons/trophy';
	import ActivityIcon from '@lucide/svelte/icons/activity';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';

	const activities = [
		{ icon: FootprintsIcon, title: 'Morning Walk', description: '1,240 steps', timestamp: new Date(Date.now() - 3600000), badge: 'Walk' },
		{ icon: FootprintsIcon, title: 'Evening Stroll', description: '890 steps', timestamp: new Date(Date.now() - 7200000), badge: 'Walk' },
	];

	let showMockWalk = $state(false);

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

	function handleTakeWalk() {
		const steps = Math.floor(Math.random() * 1001) + 500;
		demo.addSteps(steps);
		toast.success(`Walked ${steps} steps!`, { description: demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes !== 1 ? 's' : ''} earned` : undefined });
	}

	let totalSteps5k = $derived(Math.min(demo.totalSteps, 5000));
	let totalSteps42k = $derived(Math.min(demo.totalSteps, 42195));
</script>

<div bind:this={pageEl} class="flex flex-col gap-4">
	<div data-entry class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<Avatar.Root class="size-9">
				<Avatar.Fallback class="text-xs">W</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<p class="text-sm font-medium leading-tight">Walker</p>
				<p class="text-xs text-muted-foreground">Day {demo.streakDays + 1} of your streak</p>
			</div>
		</div>
	</div>

	<div data-entry class="flex flex-col items-center gap-4 py-6">
		<div class="flex flex-col items-center gap-1">
			<span
				class="font-display font-bold leading-none tracking-tight text-foreground"
				style="font-size: 35vh;"
			>
				{demo.minutes}
			</span>
			<span class="text-xs text-muted-foreground">minutes earned</span>
		</div>
		<div class="flex flex-wrap items-center justify-center gap-2">
			<div class="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs tabular-nums">
				<FootprintsIcon class="size-3 text-muted-foreground" />
				<span class="font-medium">{demo.steps.toLocaleString()}</span>
				<span class="text-muted-foreground">today</span>
			</div>
			<div class="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs tabular-nums">
				<TrophyIcon class="size-3 text-muted-foreground" />
				<span class="font-medium">{demo.totalSteps.toLocaleString()}</span>
				<span class="text-muted-foreground">total</span>
			</div>
			<div class="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs">
				<FlameIcon class="size-3 text-muted-foreground" />
				<span class="font-medium">{demo.level}</span>
				<span class="text-muted-foreground">level</span>
			</div>
		</div>
	</div>

	<div data-entry>
		<SectionHeader title="Quick Actions" />
		<QuickActionGrid
			columns={3}
			actions={[
				{ icon: FootprintsIcon, label: 'Take a Walk', onClick: handleTakeWalk },
				{ icon: CameraIcon, label: 'Unlock Instagram', onClick: () => goto('/demo/sessions') },
				{ icon: PlayIcon, label: 'Unlock YouTube', onClick: () => goto('/demo/sessions') },
			]}
		/>
	</div>

	<div data-entry>
		<StatGrid
			columns={4}
			items={[
				{ value: demo.level.toString(), label: 'Level', icon: CrownIcon },
				{ value: `${demo.xp} XP`, label: 'Experience', icon: ZapIcon },
				{ value: demo.streakDays.toString(), label: 'Day Streak', icon: FlameIcon, trend: { value: '+1', positive: true } },
				{ value: demo.totalSteps.toLocaleString(), label: 'Total Steps', icon: ActivityIcon },
			]}
		/>
	</div>

	<div data-entry class="flex flex-col gap-2">
		<SectionHeader title="Recent Activity" />
		{#each activities as a (a.title)}
			<ActivityCard icon={a.icon} title={a.title} description={a.description} timestamp={a.timestamp} badge={a.badge} />
		{/each}
	</div>

	<div data-entry class="flex flex-col gap-2">
		<SectionHeader title="Achievements" />
		<AchievementCard icon={FootprintsIcon} title="First Steps" description="Take your first 1,000 steps" unlocked={demo.totalSteps >= 1000} rarity="common" />
		<AchievementCard icon={TrophyIcon} title="5k Club" description="Walk 5,000 total steps" unlocked={demo.totalSteps >= 5000} progress={totalSteps5k} progressMax={5000} rarity="rare" />
		<AchievementCard icon={SparklesIcon} title="Marathon" description="Walk a full marathon (42,195 steps)" unlocked={demo.totalSteps >= 42195} progress={totalSteps42k} progressMax={42195} rarity="epic" />
	</div>

	<div class="h-4"></div>
</div>

{#if demo.activeSession}
	<SessionOverlay />
{/if}
