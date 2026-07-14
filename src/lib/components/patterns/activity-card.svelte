<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { cn } from '$lib/utils.js';

	interface Props {
		icon?: LucideIcon;
		title: string;
		description?: string;
		timestamp?: string | Date;
		badge?: string | number;
		variant?: 'default' | 'compact';
		class?: string;
	}

	let {
		icon: Icon,
		title,
		description,
		timestamp,
		badge: badgeValue,
		variant = 'default',
		class: className,
	}: Props = $props();

	const formattedTime = $derived.by(() => {
		if (!timestamp) return '';
		const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		const diffDays = Math.floor(diffHours / 24);
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	});
</script>

<Card.Root data-size={variant === 'compact' ? 'sm' : 'default'} class={cn('', className)}>
	<Card.Content class="flex items-start gap-3">
		{#if Icon}
			<div class="bg-muted mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
				<Icon class="size-4" />
			</div>
		{/if}
		<div class="flex min-w-0 flex-1 flex-col gap-0.5">
			<div class="flex items-center gap-2">
				<p class="truncate text-sm font-medium">{title}</p>
				{#if badgeValue !== undefined}
					<Badge variant="secondary" class="shrink-0">{badgeValue}</Badge>
				{/if}
			</div>
			{#if description}
				<p class="text-muted-foreground line-clamp-2 text-xs">{description}</p>
			{/if}
		</div>
		{#if formattedTime}
			<span class="text-muted-foreground mt-0.5 shrink-0 text-xs">{formattedTime}</span>
		{/if}
	</Card.Content>
</Card.Root>
