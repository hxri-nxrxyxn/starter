<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

	let {
		onRefresh = async () => {},
		disabled = false,
		children,
		class: className,
	}: {
		onRefresh: () => Promise<void>;
		disabled?: boolean;
		children?: import("svelte").Snippet;
		class?: string;
	} = $props();

	let pullDistance = $state(0);
	let isRefreshing = $state(false);
	let startY = $state(0);

	const threshold = 80;
	const maxPullDistance = 120;
	const resistance = 2.5;

	let scrollTopValue = $state(0);
	let iconEl: HTMLDivElement | undefined = $state();

	function containerRefAttachment(node: HTMLDivElement) {
		function onScroll() {
			scrollTopValue = node.scrollTop;
		}
		node.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			node.removeEventListener("scroll", onScroll);
		};
	}

	function handleTouchStart(e: TouchEvent) {
		if (disabled || isRefreshing) return;
		if (scrollTopValue > 0) return;
		startY = e.touches[0].clientY;
	}

	function handleTouchMove(e: TouchEvent) {
		if (disabled || isRefreshing) return;
		const currentY = e.touches[0].clientY;
		const delta = currentY - startY;

		if (delta <= 0) {
			pullDistance = 0;
			return;
		}

		if (scrollTopValue > 0) {
			pullDistance = 0;
			return;
		}

		pullDistance = Math.min(delta / resistance, maxPullDistance);
		if (iconEl) {
			gsap.to(iconEl, {
				rotation: pullProgress * 360,
				scale: 1 + pullProgress * 0.15,
				duration: 0.2,
				ease: "none",
				overwrite: "auto",
			});
		}
	}

	async function handleTouchEnd() {
		if (disabled || isRefreshing) return;

		if (pullDistance >= threshold) {
			isRefreshing = true;
			if (iconEl) {
				gsap.to(iconEl, {
					rotation: 720,
					duration: 1,
					repeat: -1,
					ease: "none",
				});
			}
			try {
				await onRefresh();
			} finally {
				isRefreshing = false;
				pullDistance = 0;
				if (iconEl) gsap.killTweensOf(iconEl);
			}
		} else {
			pullDistance = 0;
		}
	}

	const pullProgress = $derived(Math.min(pullDistance / threshold, 1));
	const opacity = $derived(pullProgress);
</script>

<div
	{@attach containerRefAttachment}
	data-slot="pull-to-refresh-container"
	class={cn("relative overflow-auto overscroll-contain", className)}
	role="region"
	aria-label="Pull to refresh"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
>
	{#if pullDistance > 0 || isRefreshing}
		<div
			class="flex items-center justify-center gap-2 overflow-hidden transition-[height] duration-200 ease-out"
			style="height: {isRefreshing ? 60 : pullDistance + 20}px; opacity: {opacity}"
		>
			{#if isRefreshing}
				<div bind:this={iconEl}><RefreshCwIcon class="size-5 shrink-0 text-primary" /></div>
				<span class="text-sm text-muted-foreground">Refreshing...</span>
			{:else}
				<div bind:this={iconEl}><RefreshCwIcon
					class="size-5 shrink-0 text-muted-foreground"
				/></div>
				<span class="text-sm text-muted-foreground">
					{pullDistance >= threshold ? "Release to refresh" : "Pull to refresh"}
				</span>
			{/if}
		</div>
	{/if}

	{@render children?.()}
</div>
