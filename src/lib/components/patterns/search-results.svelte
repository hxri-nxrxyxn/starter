<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { cn } from '$lib/utils.js';
	import SearchIcon from '@lucide/svelte/icons/search';
	import FileIcon from '@lucide/svelte/icons/file';

	interface ResultItem {
		id: string;
		title: string;
		description?: string;
		icon?: LucideIcon;
		image?: string;
		badge?: string;
	}

	interface Props {
		query: string;
		results: ResultItem[];
		loading?: boolean;
		total?: number;
		onSelect: (item: ResultItem) => void;
		class?: string;
	}

	let {
		query,
		results,
		loading = false,
		total,
		onSelect,
		class: className,
	}: Props = $props();

	const showEmpty = $derived(!loading && results.length === 0 && query.length > 0);
	const showResults = $derived(results.length > 0);
</script>

<div class={cn('flex flex-col gap-2', className)}>
	{#if total !== undefined && showResults}
		<p class="text-muted-foreground px-1 text-xs">
			{total} result{total !== 1 ? 's' : ''} for "<span class="font-medium text-foreground">{query}</span>"
		</p>
	{/if}

	{#if loading}
		<div class="flex flex-col gap-2">
			{#each Array(3) as _, i (i)}
				<Card.Root>
					<Card.Content class="flex items-start gap-3">
						<Skeleton class="size-10 shrink-0 rounded-lg" />
						<div class="flex min-w-0 flex-1 flex-col gap-1.5">
							<Skeleton class="h-4 w-3/4 rounded" />
							<Skeleton class="h-3 w-1/2 rounded" />
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	{:else if showEmpty}
		<Card.Root>
			<Card.Content class="flex flex-col items-center justify-center py-12 text-center">
				<div class="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
					<SearchIcon class="size-6 text-muted-foreground" />
				</div>
				<Card.Title class="text-lg">No results found</Card.Title>
				<Card.Description class="mt-1 max-w-sm">
					No results for "<span class="font-medium text-foreground">{query}</span>". Try adjusting your search.
				</Card.Description>
			</Card.Content>
		</Card.Root>
	{:else if showResults}
		<div class="flex flex-col gap-2">
			{#each results as item (item.id)}
				{@const ItemIcon = item.icon}
				<button
					type="button"
					class="w-full text-left"
					onclick={() => onSelect(item)}
				>
					<Card.Root class="hover:bg-muted/50 cursor-pointer transition-colors">
						<Card.Content class="flex items-start gap-3">
							{#if item.image}
								<img
									src={item.image}
									alt={item.title}
									class="size-10 shrink-0 rounded-lg object-cover"
								/>
							{:else if ItemIcon}
								<div class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
									<ItemIcon class="size-4" />
								</div>
							{:else}
								<div class="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
									<FileIcon class="size-4 text-muted-foreground" />
								</div>
							{/if}
							<div class="flex min-w-0 flex-1 flex-col gap-0.5">
								<div class="flex items-center gap-2">
									<p class="truncate text-sm font-medium">{item.title}</p>
									{#if item.badge}
										<Badge variant="secondary" class="shrink-0">{item.badge}</Badge>
									{/if}
								</div>
								{#if item.description}
									<p class="text-muted-foreground line-clamp-2 text-xs">{item.description}</p>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>
				</button>
			{/each}
		</div>
	{/if}
</div>
