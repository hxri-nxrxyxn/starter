<script lang="ts">
	import ChallengeCard from '$lib/components/patterns/challenge-card.svelte';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import GiftIcon from '@lucide/svelte/icons/gift';
	import FlameIcon from '@lucide/svelte/icons/flame';
	import TargetIcon from '@lucide/svelte/icons/target';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	interface Challenge {
		icon: any;
		title: string;
		description: string;
		progress: number;
		progressMax: number;
		reward: string;
		daysLeft?: number;
		completed?: boolean;
	}

	const daily: Challenge[] = [
		{ icon: FlameIcon, title: '3 Video Uploads', description: 'Upload three short-form videos today', progress: 2, progressMax: 3, reward: '100 XP', daysLeft: 1 },
		{ icon: TargetIcon, title: 'Engage with 10 Posts', description: 'Like and comment on 10 community posts', progress: 7, progressMax: 10, reward: '50 XP', daysLeft: 1 },
		{ icon: GiftIcon, title: 'Daily Login Streak', description: 'Log in for 7 consecutive days', progress: 5, progressMax: 7, reward: '200 XP', daysLeft: 1 },
	];

	const weekly: Challenge[] = [
		{ icon: FlameIcon, title: '1K Total Views', description: 'Reach 1,000 total views across all content', progress: 847, progressMax: 1000, reward: '500 XP', daysLeft: 4 },
		{ icon: TargetIcon, title: 'Gain 50 Followers', description: 'Grow your follower count by 50', progress: 32, progressMax: 50, reward: '300 XP', daysLeft: 5 },
		{ icon: GiftIcon, title: 'Post 5 Times', description: 'Publish at least 5 pieces of content', progress: 3, progressMax: 5, reward: '250 XP', daysLeft: 3 },
	];

	const allChallenges: Challenge[] = [
		...daily.map(c => ({ ...c, daysLeft: 1 })),
		...weekly.map(c => ({ ...c, daysLeft: c.daysLeft })),
		{ icon: FlameIcon, title: '30-Day Creator Streak', description: 'Maintain activity for 30 consecutive days', progress: 18, progressMax: 30, reward: '2,000 XP', daysLeft: 12 },
		{ icon: TargetIcon, title: '100 Subscribers', description: 'Reach 100 subscriber milestone', progress: 100, progressMax: 100, reward: '1,000 XP', completed: true },
		{ icon: GiftIcon, title: 'First 10K Views', description: 'Achieve 10,000 total lifetime views', progress: 6200, progressMax: 10000, reward: 'Premium Badge', daysLeft: 20 },
	];

	let gridEl: HTMLDivElement | null = $state(null);

	function animateGrid() {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			gsap.from(gridEl!.querySelectorAll('[data-challenge]'), {
				opacity: 0,
				y: 20,
				duration: 0.35,
				stagger: 0.06,
				ease: 'premium-smooth',
			});
		}, gridEl);
		ctx.revert();
	}

	onMount(animateGrid);
</script>

<div class={cn('flex flex-col gap-4', className)}>
	<Tabs value="daily" onValueChange={() => requestAnimationFrame(animateGrid)}>
		<TabsList class="w-full">
			<TabsTrigger value="daily" class="flex-1">Daily</TabsTrigger>
			<TabsTrigger value="weekly" class="flex-1">Weekly</TabsTrigger>
			<TabsTrigger value="all" class="flex-1">All</TabsTrigger>
		</TabsList>
		<div bind:this={gridEl} class="mt-4">
			<TabsContent value="daily">
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each daily as challenge (challenge.title)}
						<div data-challenge>
							<ChallengeCard icon={challenge.icon} title={challenge.title} description={challenge.description} progress={challenge.progress} progressMax={challenge.progressMax} reward={challenge.reward} daysLeft={challenge.daysLeft} />
						</div>
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="weekly">
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each weekly as challenge (challenge.title)}
						<div data-challenge>
							<ChallengeCard icon={challenge.icon} title={challenge.title} description={challenge.description} progress={challenge.progress} progressMax={challenge.progressMax} reward={challenge.reward} daysLeft={challenge.daysLeft} />
						</div>
					{/each}
				</div>
			</TabsContent>
			<TabsContent value="all">
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each allChallenges as challenge (challenge.title)}
						<div data-challenge>
							<ChallengeCard icon={challenge.icon} title={challenge.title} description={challenge.description} progress={challenge.progress} progressMax={challenge.progressMax} reward={challenge.reward} daysLeft={challenge.daysLeft} completed={challenge.completed} />
						</div>
					{/each}
				</div>
			</TabsContent>
		</div>
	</Tabs>
</div>
