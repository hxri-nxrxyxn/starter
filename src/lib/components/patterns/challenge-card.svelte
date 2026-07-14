<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props {
		icon?: LucideIcon;
		title: string;
		description?: string;
		progress: number;
		progressMax: number;
		reward?: string;
		daysLeft?: number;
		completed?: boolean;
		onJoin?: () => void;
		class?: string;
	}

	let {
		icon: Icon,
		title,
		description = '',
		progress,
		progressMax,
		reward = '',
		daysLeft = undefined,
		completed = false,
		onJoin = undefined,
		class: className,
	}: Props = $props();

	const progressPercent = $derived(Math.round((progress / progressMax) * 100));
</script>

<Card.Card data-slot="challenge-card" class={cn(className)}>
	<Card.CardContent class="flex flex-col gap-3">
		<div class="flex items-start gap-3">
			{#if Icon}
				<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
					<Icon class="size-5" />
				</div>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<h3 data-slot="card-title" class="text-base font-medium leading-snug">
						{title}
					</h3>
					{#if completed}
						<Badge variant="secondary">Completed</Badge>
					{/if}
				</div>
				{#if description}
					<p class="text-muted-foreground mt-1 text-sm">{description}</p>
				{/if}
			</div>
		</div>

		<div class="flex items-center gap-2">
			<Progress value={progress} max={progressMax} class="flex-1" />
			<span class="text-muted-foreground shrink-0 text-xs">{progressPercent}%</span>
		</div>

		<div class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-2">
				{#if reward}
					<span class="text-muted-foreground text-xs">Reward: {reward}</span>
				{/if}
				{#if daysLeft != null && !completed}
					<Badge variant="outline">{daysLeft}d left</Badge>
				{/if}
			</div>

			{#if !completed && onJoin}
				<Button size="sm" onclick={onJoin}>Join</Button>
			{/if}
		</div>
	</Card.CardContent>
</Card.Card>
