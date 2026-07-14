<script lang="ts">
	import GreetingCard from '$lib/components/patterns/greeting-card.svelte';
	import StatGrid from '$lib/components/patterns/stat-grid.svelte';
	import ChartCard from '$lib/components/patterns/chart-card.svelte';
	import ActivityCard from '$lib/components/patterns/activity-card.svelte';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import FlameIcon from '@lucide/svelte/icons/flame';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import UsersIcon from '@lucide/svelte/icons/users';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import BrainIcon from '@lucide/svelte/icons/brain';

	interface Props {
		name?: string;
		class?: string;
	}

	let { name = 'Creator', class: className }: Props = $props();

	let stats = [
		{ icon: EyeIcon, value: '12.4K', label: 'Views', trend: { value: '+12%', positive: true } },
		{ icon: UsersIcon, value: '847', label: 'Followers', trend: { value: '+5.2%', positive: true } },
		{ icon: HeartIcon, value: '3.2K', label: 'Likes', trend: { value: '+8.1%', positive: true } },
		{ icon: TrendingUpIcon, value: '891', label: 'Shares', trend: { value: '-2.4%', positive: false } },
	];

	let activities = [
		{ icon: FootprintsIcon, title: 'New video published', description: 'Tutorial: Getting Started with Svelte 5', timestamp: new Date(Date.now() - 25 * 60000), badge: 'New' },
		{ icon: HeartIcon, title: 'Milestone reached', description: '3K likes on your latest post', timestamp: new Date(Date.now() - 3 * 3600000), badge: 'Hot' },
		{ icon: ZapIcon, title: 'Engagement spike', description: 'Activity up 40% in the last hour', timestamp: new Date(Date.now() - 5 * 3600000) },
		{ icon: BrainIcon, title: 'Content insight available', description: 'Your audience prefers short-form videos', timestamp: new Date(Date.now() - 86400000) },
	];

	let chartValues = [35, 50, 28, 72, 65, 88, 92];
	let dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

	let sectionEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!sectionEl) return;
		const ctx = gsap.context(() => {
			const sections = sectionEl!.querySelectorAll('[data-section]');
			gsap.from(sections, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: 0.1,
				ease: 'premium-smooth',
			});
		}, sectionEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={sectionEl} class={cn('flex flex-col gap-4', className)}>
	<GreetingCard {name} streak={12} quote="Create something amazing today." />
	<div data-section>
		<h3 class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider">Overview</h3>
		<StatGrid items={stats} columns={4} />
	</div>
	<div data-section class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<ChartCard title="Weekly Progress" icon={TrendingUpIcon} period="weekly">
				<div class="flex items-end justify-between gap-2" data-chart>
					{#each chartValues as val, i (i)}
						<div class="flex flex-1 flex-col items-center gap-1">
							<div
								data-chart-bar
								class="bg-primary w-full rounded-sm"
								style="height: {val * 2}px"
							></div>
							<span class="text-muted-foreground text-xs">{dayLabels[i]}</span>
						</div>
					{/each}
				</div>
			</ChartCard>
		</div>
		<div data-section>
			<h3 class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wider">Recent Activity</h3>
			<div class="flex flex-col gap-2">
				{#each activities as activity (activity.title)}
					<ActivityCard icon={activity.icon} title={activity.title} description={activity.description} timestamp={activity.timestamp} badge={activity.badge} variant="compact" />
				{/each}
			</div>
		</div>
	</div>
</div>
