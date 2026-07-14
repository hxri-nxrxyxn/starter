<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	interface Props {
		items: Array<{ id: string; title: string; description?: string; image?: string; badge?: string }>;
		autoRotateInterval?: number;
		onSelect?: (id: string) => void;
		class?: string;
	}

	let {
		items,
		autoRotateInterval = 4000,
		onSelect,
		class: className,
	}: Props = $props();

	let scrollContainer: HTMLDivElement | undefined = $state();
	let currentIndex = $state(0);
	let isHovering = $state(false);
	let activeItemEl: HTMLDivElement | null = $state(null);
	let autoTimer: ReturnType<typeof setInterval>;

	const totalSlides = $derived(items.length);

	onMount(() => {
		const ctx = gsap.context(() => {
			animateActive();
		});
		startAutoRotate();
		return () => {
			ctx.revert();
			if (autoTimer) clearInterval(autoTimer);
		};
	});

	function animateActive() {
		if (!scrollContainer) return;
		const active = scrollContainer.children[currentIndex] as HTMLElement;
		if (!active) return;
		gsap.fromTo(active, { opacity: 0.6, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'premium-smooth' });
	}

	function scrollTo(index: number) {
		if (!scrollContainer) return;
		const child = scrollContainer.children[index] as HTMLElement | undefined;
		if (!child) return;
		child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		currentIndex = index;
	}

	function onScroll() {
		if (!scrollContainer) return;
		const rect = scrollContainer.getBoundingClientRect();
		const center = rect.left + rect.width / 2;
		let closest = 0;
		let closestDist = Infinity;
		for (let i = 0; i < scrollContainer.children.length; i++) {
			const child = scrollContainer.children[i] as HTMLElement;
			const childRect = child.getBoundingClientRect();
			const childCenter = childRect.left + childRect.width / 2;
			const dist = Math.abs(center - childCenter);
			if (dist < closestDist) {
				closestDist = dist;
				closest = i;
			}
		}
		if (closest !== currentIndex) {
			currentIndex = closest;
		}
	}

	function prev() {
		scrollTo(Math.max(0, currentIndex - 1));
	}

	function next() {
		scrollTo(Math.min(totalSlides - 1, currentIndex + 1));
	}

	function startAutoRotate() {
		if (autoTimer) clearInterval(autoTimer);
		autoTimer = setInterval(() => {
			if (!isHovering) {
				const nextIdx = (currentIndex + 1) % totalSlides;
				scrollTo(nextIdx);
			}
		}, autoRotateInterval);
	}

	function onMouseEnter() {
		isHovering = true;
	}

	function onMouseLeave() {
		isHovering = false;
	}
</script>

<div
	role="region"
	class={cn('relative', className)}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
>
	<div
		bind:this={scrollContainer}
		onscroll={onScroll}
		class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
	>
		{#each items as item (item.id)}
			<button
				type="button"
				class="bg-card border-border group relative flex min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-xl border text-left"
				class:w-72={items.length > 1}
				class:w-full={items.length === 1}
				onclick={() => onSelect?.(item.id)}
			>
				{#if item.image}
					<img src={item.image} alt={item.title} class="h-32 w-full object-cover" />
				{/if}
				<div class="flex flex-col gap-1.5 p-4">
					<div class="flex items-center gap-2">
						<h3 class="truncate text-sm font-medium">{item.title}</h3>
						{#if item.badge}
							<Badge variant="secondary" class="shrink-0 text-[10px]">{item.badge}</Badge>
						{/if}
					</div>
					{#if item.description}
						<p class="text-muted-foreground line-clamp-2 text-xs">{item.description}</p>
					{/if}
				</div>
			</button>
		{/each}
	</div>

	{#if totalSlides > 1}
		<div class="mt-3 flex items-center justify-between">
			<div class="flex gap-1.5">
				{#each items as _, i (i)}
					<button
						class={cn(
							'size-2 rounded-full transition-colors',
							i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
						)}
						onclick={() => scrollTo(i)}
						aria-label="Go to item {i + 1}"
					></button>
				{/each}
			</div>
			<div class="flex gap-1">
				<Button
					variant="ghost"
					size="icon-xs"
					disabled={currentIndex === 0}
					onclick={prev}
					aria-label="Previous"
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-xs"
					disabled={currentIndex === totalSlides - 1}
					onclick={next}
					aria-label="Next"
				>
					<ChevronRightIcon />
				</Button>
			</div>
		</div>
	{/if}
</div>
