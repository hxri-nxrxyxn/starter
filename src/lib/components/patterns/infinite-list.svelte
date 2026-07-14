<script lang="ts">
	import { Spinner } from "$lib/components/ui/spinner/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	interface Props {
		items: any[];
		loadMore: () => Promise<void>;
		hasMore: boolean;
		loading?: boolean;
		renderItem: Snippet<[item: any, index: number]>;
		className?: string;
	}

	let {
		items,
		loadMore,
		hasMore,
		loading = false,
		renderItem,
		className
	}: Props = $props();

	function sentinelAttachment(node: HTMLDivElement) {
		let observer: IntersectionObserver | null = null;

		function setup() {
			if (!hasMore) return;
			observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					if (entry?.isIntersecting && hasMore && !loading) {
						loadMore();
					}
				},
				{ threshold: 0.1 }
			);
			observer.observe(node);
		}

		setup();

		return () => {
			observer?.disconnect();
			observer = null;
		};
	}
</script>

<div class={cn("flex flex-col gap-2", className)}>
	{#each items as item, index (typeof item === "object" && item !== null ? item.id ?? item : index)}
		{@render renderItem(item, index)}
	{/each}

	{#if hasMore}
		<div {@attach sentinelAttachment} class="flex justify-center py-4">
			{#if loading}
				<Spinner class="size-5" />
			{/if}
		</div>
	{/if}
</div>
