<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import TrophyIcon from "@lucide/svelte/icons/trophy";
	import MedalIcon from "@lucide/svelte/icons/medal";

	interface LeaderboardEntry {
		rank: number;
		name: string;
		avatar?: string;
		value: string | number;
		isCurrentUser?: boolean;
	}

	let {
		entries = [] as LeaderboardEntry[],
		class: className,
	}: {
		entries: LeaderboardEntry[];
		class?: string;
	} = $props();

	function getInitials(name: string): string {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<div data-slot="leaderboard" class={cn("flex flex-col gap-1", className)}>
	{#each entries as entry (entry.rank)}
		<div
			data-slot="leaderboard-row"
			class={cn(
				"flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
				entry.isCurrentUser && "bg-muted"
			)}
		>
			<div class="flex w-8 shrink-0 items-center justify-center text-sm font-bold">
				{#if entry.rank === 1}
					<TrophyIcon class="size-5 text-amber-500" />
				{:else if entry.rank === 2}
					<MedalIcon class="size-5 text-gray-400" />
				{:else if entry.rank === 3}
					<MedalIcon class="size-5 text-amber-700" />
				{:else}
					<span class="text-muted-foreground">{entry.rank}</span>
				{/if}
			</div>

			<Avatar class="size-8">
				{#if entry.avatar}
					<AvatarImage src={entry.avatar} alt={entry.name} />
				{/if}
				<AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
			</Avatar>

			<div class="min-w-0 flex-1">
				<span class="block truncate text-sm font-medium">{entry.name}</span>
			</div>

			<span class="shrink-0 text-sm font-semibold">{entry.value}</span>

			{#if entry.isCurrentUser}
				<Badge variant="outline" class="text-xs">You</Badge>
			{/if}
		</div>
	{/each}
</div>
