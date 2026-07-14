<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { cn } from "$lib/utils.js";

	interface Tip {
		title: string;
		description?: string;
		icon?: any;
	}

	interface Props {
		tips: Tip[];
		className?: string;
	}

	let { tips, className }: Props = $props();

	let scrollContainer: HTMLDivElement | undefined = $state();
	let currentIndex = $state(0);
	let totalSlides = $derived(tips.length);

	function scrollTo(index: number) {
		if (!scrollContainer) return;
		const child = scrollContainer.children[index] as HTMLElement | undefined;
		if (!child) return;
		child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
		currentIndex = index;
	}

	function onScroll() {
		if (!scrollContainer) return;
		const containerRect = scrollContainer.getBoundingClientRect();
		const center = containerRect.left + containerRect.width / 2;
		let closestIndex = 0;
		let closestDist = Infinity;
		for (let i = 0; i < scrollContainer.children.length; i++) {
			const child = scrollContainer.children[i] as HTMLElement;
			const childRect = child.getBoundingClientRect();
			const childCenter = childRect.left + childRect.width / 2;
			const dist = Math.abs(center - childCenter);
			if (dist < closestDist) {
				closestDist = dist;
				closestIndex = i;
			}
		}
		currentIndex = closestIndex;
	}

	function prev() {
		const next = Math.max(0, currentIndex - 1);
		scrollTo(next);
	}

	function next() {
		const next = Math.min(totalSlides - 1, currentIndex + 1);
		scrollTo(next);
	}
</script>

<div class={cn("relative", className)}>
	<div
		bind:this={scrollContainer}
		onscroll={onScroll}
		class="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
	>
		{#each tips as tip (tip.title)}
			{@const TipIcon = tip.icon}
			<div
				class="bg-card border-ring/10 ring-foreground/10 flex min-w-0 shrink-0 snap-start flex-col gap-2 rounded-xl border p-4 text-sm"
				class:w-72={tips.length > 1}
				class:w-full={tips.length === 1}
			>
				{#if TipIcon || tip.title}
					<div class="flex items-center gap-2">
						{#if TipIcon}
							<TipIcon class="size-4" />
						{/if}
						<p class="truncate font-medium">{tip.title}</p>
					</div>
				{/if}
				{#if tip.description}
					<p class="text-muted-foreground line-clamp-3 text-xs">{tip.description}</p>
				{/if}
			</div>
		{/each}
	</div>

	{#if totalSlides > 1}
		<div class="mt-3 flex items-center justify-between">
			<div class="flex gap-1.5">
				{#each tips as _, i (i)}
					<button
						class={cn(
							"size-2 rounded-full transition-colors",
							i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
						)}
						onclick={() => scrollTo(i)}
						aria-label="Go to tip {i + 1}"
					></button>
				{/each}
			</div>
			<div class="flex gap-1">
				<Button
					variant="ghost"
					size="icon-xs"
					disabled={currentIndex === 0}
					onclick={prev}
					aria-label="Previous tip"
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-xs"
					disabled={currentIndex === totalSlides - 1}
					onclick={next}
					aria-label="Next tip"
				>
					<ChevronRightIcon />
				</Button>
			</div>
		</div>
	{/if}
</div>
