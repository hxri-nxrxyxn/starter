<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import FlameIcon from "@lucide/svelte/icons/flame";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Props {
		count: number;
		goal?: number;
		label?: string;
		className?: string;
	}

	let {
		count,
		goal = 0,
		label = "day streak",
		className,
	}: Props = $props();

	const clampedGoal = $derived(Math.max(0, goal));
	const progress = $derived(clampedGoal > 0 ? Math.min(count / clampedGoal, 1) : 0);
	const progressPercent = $derived(Math.round(progress * 100));

	let cardEl: HTMLDivElement | null = $state(null);
	let flameEl: HTMLDivElement | undefined = $state();
	let countEl: HTMLSpanElement | undefined = $state();
	let barEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: "premium-smooth" });
			tl.from(cardEl!, { opacity: 0, y: 20, duration: 0.4 }, 0);
			if (flameEl) {
				tl.fromTo(flameEl!, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0.05);
			}
			if (countEl) tl.from(countEl!, { opacity: 0, y: 10, duration: 0.3 }, 0.15);
			if (barEl) tl.from(barEl!, { scaleX: 0, transformOrigin: "left center", duration: 0.4 }, 0.2);
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Root
	bind:ref={cardEl}
	data-slot="streak-widget"
	class={cn("w-full", className)}
>
	<Card.Content class="flex flex-col items-center gap-2 py-6 text-center">
		<div bind:this={flameEl}>
		<FlameIcon
			class={cn(
				"size-10",
				count > 0 ? "text-primary" : "text-muted-foreground"
			)}
		/>
		</div>
		<div class="flex flex-col">
			<span bind:this={countEl} class="text-3xl font-bold tabular-nums">{count}</span>
			<span class="text-sm text-muted-foreground">{label}</span>
		</div>
		{#if clampedGoal > 0}
			<div class="mt-1 flex w-full max-w-40 items-center gap-2">
				<div class="bg-muted h-2 flex-1 overflow-hidden rounded-full">
				<div
					bind:this={barEl}
					class="bg-primary h-full rounded-full"
					style="width: {progressPercent}%"
				></div>
				</div>
				<span class="text-xs text-muted-foreground tabular-nums">
					{count}/{clampedGoal}
				</span>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
