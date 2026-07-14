<script lang="ts">
	import ChartCard from '$lib/components/patterns/chart-card.svelte';
	import MetricCard from '$lib/components/patterns/metric-card.svelte';
	import ActivityCard from '$lib/components/patterns/activity-card.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	type Period = 'daily' | 'weekly' | 'monthly';

	let period = $state<Period>('weekly');

	const periods: Array<{ value: Period; label: string }> = [
		{ value: 'daily', label: 'Day' },
		{ value: 'weekly', label: 'Week' },
		{ value: 'monthly', label: 'Month' },
	];

	const dataByPeriod: Record<Period, { views: string; likes: string; comments: string; shares: string; chartData: number[]; topContent: Array<{ title: string; description: string; timestamp: Date; badge: string | number }> }> = {
		daily: {
			views: '1,245', likes: '342', comments: '58', shares: '127',
			chartData: [120, 85, 200, 150, 90, 210, 180, 140, 95, 175, 160, 130],
			topContent: [
				{ title: '5-Minute Morning Routine', description: 'Today\'s top performer with 342 views', timestamp: new Date(Date.now() - 2 * 3600000), badge: '342' },
				{ title: 'Quick React vs Svelte', description: 'Rapid engagement spike', timestamp: new Date(Date.now() - 4 * 3600000), badge: '210' },
			],
		},
		weekly: {
			views: '8,430', likes: '2,156', comments: '423', shares: '891',
			chartData: [950, 1200, 880, 1450, 1100, 1650, 1200],
			topContent: [
				{ title: 'Svelte 5 Deep Dive', description: 'Weekly best with 1,650 views', timestamp: new Date(Date.now() - 86400000), badge: '1.6K' },
				{ title: 'CSS Grid Masterclass', description: 'Second highest this week', timestamp: new Date(Date.now() - 2 * 86400000), badge: '1.2K' },
				{ title: 'TypeScript Tips & Tricks', description: 'Steady performer all week', timestamp: new Date(Date.now() - 3 * 86400000), badge: '880' },
			],
		},
		monthly: {
			views: '32,400', likes: '8,120', comments: '1,890', shares: '3,240',
			chartData: [5200, 6100, 4800, 7200, 5900, 8200, 6800, 7400, 6300, 9100, 7800, 8500],
			topContent: [
				{ title: 'Complete Svelte Course', description: 'Monthly best-seller with 9,100 views', timestamp: new Date(Date.now() - 5 * 86400000), badge: '9.1K' },
				{ title: 'Building a Design System', description: 'Consistent high engagement', timestamp: new Date(Date.now() - 10 * 86400000), badge: '7.4K' },
				{ title: 'Animations with GSAP', description: 'Popular among returning viewers', timestamp: new Date(Date.now() - 15 * 86400000), badge: '6.8K' },
				{ title: 'State Management in 2026', description: 'Trending topic boost', timestamp: new Date(Date.now() - 20 * 86400000), badge: '6.3K' },
			],
		},
	};

	let currentData = $derived(dataByPeriod[period]);

	let sectionEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!sectionEl) return;
		const ctx = gsap.context(() => {
			const sections = sectionEl!.querySelectorAll('[data-animate]');
			gsap.from(sections, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: 0.08,
				ease: 'premium-smooth',
			});
		}, sectionEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={sectionEl} class={cn('flex flex-col gap-4', className)}>
	<div data-animate class="flex items-center justify-between">
		<h2 class="text-lg font-semibold">Content Analytics</h2>
		<div class="flex gap-1 rounded-lg bg-muted p-1">
			{#each periods as p (p.value)}
				<button
					type="button"
					onclick={() => period = p.value}
					class={cn(
						'rounded-md px-3 py-1 text-xs font-medium transition-colors',
						period === p.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
					)}
				>
					{p.label}
				</button>
			{/each}
		</div>
	</div>

	<div data-animate class="grid grid-cols-2 gap-3 lg:grid-cols-4">
		<MetricCard icon={EyeIcon} value={currentData.views} label="Views" variant="compact" />
		<MetricCard icon={HeartIcon} value={currentData.likes} label="Likes" variant="compact" />
		<MetricCard icon={MessageCircleIcon} value={currentData.comments} label="Comments" variant="compact" />
		<MetricCard icon={TrendingUpIcon} value={currentData.shares} label="Shares" variant="compact" />
	</div>

	<div data-animate class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<ChartCard title="Engagement Trend" icon={TrendingUpIcon} period={period}>
				<div class="flex items-end justify-between gap-1" data-chart>
					{#each currentData.chartData as val, i (i)}
						<div
							data-chart-bar
							class="bg-primary w-full rounded-sm"
							style="height: {Math.round(val / (period === 'monthly' ? 100 : period === 'weekly' ? 20 : 3))}px"
						></div>
					{/each}
				</div>
			</ChartCard>
		</div>
		<div>
			<div class="flex items-center justify-between">
				<h3 class="text-muted-foreground text-xs font-medium uppercase tracking-wider">Top Content</h3>
			</div>
			<Separator class="my-2" />
			<div class="flex flex-col gap-2">
				{#each currentData.topContent as item (item.title)}
					<ActivityCard title={item.title} description={item.description} timestamp={item.timestamp} badge={item.badge} variant="compact" />
				{/each}
			</div>
		</div>
	</div>
</div>
