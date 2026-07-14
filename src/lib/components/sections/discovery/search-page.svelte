<script lang="ts">
	import SearchHeader from '$lib/components/patterns/search-header.svelte';
	import SearchResults from '$lib/components/patterns/search-results.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import XIcon from '@lucide/svelte/icons/x';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	interface Props {
		onSelect?: (item: any) => void;
		class?: string;
	}

	let { onSelect, class: className }: Props = $props();

	const trendingTags = ['#design', '#svelte', '#typescript', '#tailwind', '#gsap', '#animation', '#ui', '#ux'];

	let recentSearches = $state<string[]>(['dashboard templates', 'dark mode', 'data viz']);
	let searchQuery = $state('');
	let searchResults = $state<any[]>([]);
	let isLoading = $state(false);

	let rootEl: HTMLDivElement | null = $state(null);
	let trendingEl: HTMLDivElement | null = $state(null);
	let recentEl: HTMLDivElement | null = $state(null);
	let resultsEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!rootEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: 'premium-smooth' });
			const children = rootEl!.querySelectorAll('[data-enter]');
			tl.from(children, { opacity: 0, y: 15, duration: 0.4, stagger: 0.06 }, 0);
		}, rootEl);
		return () => ctx.revert();
	});

	let timeout: ReturnType<typeof setTimeout>;

	function handleSearch(query: string) {
		searchQuery = query;
		if (timeout) clearTimeout(timeout);
		if (!query.trim()) {
			searchResults = [];
			isLoading = false;
			return;
		}
		isLoading = true;
		timeout = setTimeout(() => {
			searchResults = [
				{ id: '1', title: `${query} result 1`, description: 'First matching result', badge: 'Popular' },
				{ id: '2', title: `${query} result 2`, description: 'Second matching result' },
				{ id: '3', title: `${query} result 3`, description: 'Third matching result', badge: 'New' },
			];
			isLoading = false;
			if (!recentSearches.includes(query)) {
				recentSearches = [query, ...recentSearches].slice(0, 10);
			}
		}, 600);
	}

	function removeRecent(search: string) {
		recentSearches = recentSearches.filter((s) => s !== search);
	}

	function clearRecent() {
		recentSearches = [];
	}
</script>

<div bind:this={rootEl} class={cn('flex flex-col gap-6', className)}>
	<div data-enter>
		<SearchHeader value={searchQuery} onSearch={handleSearch} placeholder="Search patterns, components..." />
	</div>

	{#if searchQuery}
		<div data-enter bind:this={resultsEl}>
			<SearchResults query={searchQuery} results={searchResults} loading={isLoading} onSelect={(item) => onSelect?.(item)} />
		</div>
	{:else}
		<div data-enter class="flex flex-col gap-4">
			<div class="flex items-center gap-2">
				<TrendingUpIcon class="size-4 text-muted-foreground" />
				<h3 class="text-sm font-medium">Trending</h3>
			</div>
			<div
				bind:this={trendingEl}
				class="flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{#each trendingTags as tag (tag)}
					<button
						type="button"
						onclick={() => handleSearch(tag.replace('#', ''))}
						class="snap-start"
					>
						<Badge variant="secondary" class="cursor-pointer whitespace-nowrap text-xs">{tag}</Badge>
					</button>
				{/each}
			</div>
		</div>

		<Separator data-enter />

		{#if recentSearches.length > 0}
			<div data-enter bind:this={recentEl} class="flex flex-col gap-3">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<ClockIcon class="size-4 text-muted-foreground" />
						<h3 class="text-sm font-medium">Recent</h3>
					</div>
					<Button variant="ghost" size="xs" onclick={clearRecent}>
						Clear all
					</Button>
				</div>
				<div class="flex flex-col gap-1">
					{#each recentSearches as search (search)}
						<div class="group flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/50">
							<button
								type="button"
								class="flex-1 text-left text-sm"
								onclick={() => handleSearch(search)}
							>
								{search}
							</button>
							<Button
								variant="ghost"
								size="icon-xs"
								class="opacity-0 group-hover:opacity-100"
								onclick={() => removeRecent(search)}
								aria-label="Remove {search}"
							>
								<XIcon class="size-3" />
							</Button>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>
