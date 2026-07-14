<script lang="ts">
	import Leaderboard from '$lib/components/patterns/leaderboard.svelte';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import TrophyIcon from '@lucide/svelte/icons/trophy';
	import UsersIcon from '@lucide/svelte/icons/users';
	import GlobeIcon from '@lucide/svelte/icons/globe';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	interface LeaderboardEntry {
		rank: number;
		name: string;
		avatar?: string;
		value: string | number;
		isCurrentUser?: boolean;
	}

	const globalData: LeaderboardEntry[] = [
		{ rank: 1, name: 'Sarah Chen', value: '12,450 XP', isCurrentUser: false },
		{ rank: 2, name: 'Marcus Johnson', value: '11,230 XP' },
		{ rank: 3, name: 'Elena Rodriguez', value: '10,870 XP' },
		{ rank: 4, name: 'Alex Kim', value: '9,920 XP' },
		{ rank: 5, name: 'Jordan Lee', value: '8,450 XP' },
		{ rank: 6, name: 'Taylor Swift', value: '7,890 XP' },
		{ rank: 7, name: 'You', value: '7,340 XP', isCurrentUser: true },
		{ rank: 8, name: 'Casey Brown', value: '6,780 XP' },
		{ rank: 9, name: 'Riley Patel', value: '6,120 XP' },
		{ rank: 10, name: 'Morgan Williams', value: '5,670 XP' },
	];

	const friendsData: LeaderboardEntry[] = [
		{ rank: 1, name: 'Alex Kim', value: '9,920 XP' },
		{ rank: 2, name: 'You', value: '7,340 XP', isCurrentUser: true },
		{ rank: 3, name: 'Jamie Rivera', value: '6,450 XP' },
		{ rank: 4, name: 'Sam Taylor', value: '5,230 XP' },
	];

	const weeklyData: LeaderboardEntry[] = [
		{ rank: 1, name: 'You', value: '2,450 XP', isCurrentUser: true },
		{ rank: 2, name: 'Sarah Chen', value: '2,120 XP' },
		{ rank: 3, name: 'Marcus Johnson', value: '1,980 XP' },
		{ rank: 4, name: 'Elena Rodriguez', value: '1,650 XP' },
		{ rank: 5, name: 'Alex Kim', value: '1,320 XP' },
	];

	let contentEl: HTMLDivElement | null = $state(null);

	function animateContent() {
		if (!contentEl) return;
		const ctx = gsap.context(() => {
			gsap.from(contentEl!.querySelectorAll('[data-leaderboard-row]'), {
				opacity: 0,
				x: -15,
				duration: 0.3,
				stagger: 0.04,
				ease: 'premium-smooth',
			});
		}, contentEl);
		ctx.revert();
	}

	onMount(animateContent);
</script>

<div class={cn('flex flex-col gap-4', className)}>
	<div class="flex items-center gap-2">
		<TrophyIcon class="size-5 text-amber-500" />
		<h2 class="text-lg font-semibold">Leaderboard</h2>
	</div>
	<Tabs value="global" onValueChange={() => requestAnimationFrame(animateContent)}>
		<TabsList class="w-full">
			<TabsTrigger value="global" class="flex-1">
				<GlobeIcon class="mr-1.5 size-3.5" />
				Global
			</TabsTrigger>
			<TabsTrigger value="friends" class="flex-1">
				<UsersIcon class="mr-1.5 size-3.5" />
				Friends
			</TabsTrigger>
			<TabsTrigger value="weekly" class="flex-1">
				<TrophyIcon class="mr-1.5 size-3.5" />
				Weekly
			</TabsTrigger>
		</TabsList>
		<div bind:this={contentEl} class="mt-3">
			<TabsContent value="global">
				<Leaderboard entries={globalData} />
			</TabsContent>
			<TabsContent value="friends">
				<Leaderboard entries={friendsData} />
			</TabsContent>
			<TabsContent value="weekly">
				<Leaderboard entries={weeklyData} />
			</TabsContent>
		</div>
	</Tabs>
</div>
