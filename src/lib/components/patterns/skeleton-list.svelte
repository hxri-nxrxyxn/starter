<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
	import { onMount } from "svelte";
	import { gsap } from "$lib/animate/index.js";

	let {
		count = 5,
		itemHeight = "h-16",
		class: className,
	}: {
		count?: number;
		itemHeight?: string;
		class?: string;
	} = $props();

	const items = $derived(Array.from({ length: count }, (_, i) => i));

	let listEl: HTMLDivElement;

	onMount(() => {
		if (!listEl) return;
		const skeletons = listEl.querySelectorAll("[data-skeleton-shimmer]");
		skeletons.forEach((el) => {
			gsap.fromTo(el as HTMLElement,
				{ backgroundPosition: "200% 0" },
				{
					backgroundPosition: "-200% 0",
					duration: 1.5,
					repeat: -1,
					ease: "none",
				}
			);
		});
	});
</script>

<div bind:this={listEl} data-slot="skeleton-list" class={cn("flex flex-col gap-3", className)}>
	{#each items as item (item)}
		<div class="flex items-center gap-3">
			<Skeleton data-skeleton-shimmer class={cn("shrink-0 rounded-full", itemHeight, "aspect-square")} />
			<div class="flex flex-1 flex-col gap-2">
				<Skeleton data-skeleton-shimmer class={cn("h-3 w-3/5 rounded-md")} />
				<Skeleton data-skeleton-shimmer class={cn("h-2.5 w-4/5 rounded-md")} />
			</div>
		</div>
	{/each}
</div>
