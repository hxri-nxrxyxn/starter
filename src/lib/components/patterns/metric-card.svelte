<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils.js";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import TrendingDownIcon from "@lucide/svelte/icons/trending-down";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Trend {
		value: string;
		positive: boolean;
	}

	interface Props {
		icon?: any;
		value: string | number;
		label: string;
		trend?: Trend;
		variant?: "default" | "compact";
		className?: string;
	}

	let {
		icon: Icon,
		value: rawValue,
		label,
		trend,
		variant = "default",
		className
	}: Props = $props();

	let cardEl: HTMLDivElement | null = $state(null);
	let valueEl: HTMLParagraphElement | undefined = $state();
	let labelEl: HTMLSpanElement | undefined = $state();
	let trendEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: "premium-smooth" });
			tl.from(cardEl!, { opacity: 0, y: 15, duration: 0.4 }, 0);
			if (valueEl) tl.from(valueEl!, { opacity: 0, y: 10, duration: 0.3 }, 0.1);
			if (labelEl) tl.from(labelEl!, { opacity: 0, duration: 0.2 }, 0.2);
			if (trendEl) tl.from(trendEl!, { opacity: 0, x: -8, duration: 0.3 }, 0.25);
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Root bind:ref={cardEl} data-metric-card data-size={variant === "compact" ? "sm" : "default"} class={cn("", className)}>
	<Card.Content>
		<div class="flex items-start justify-between">
			<div class="flex flex-col gap-1">
				{#if variant === "default"}
					<span bind:this={labelEl} class="text-muted-foreground text-xs">{label}</span>
					<p bind:this={valueEl} data-metric-value class="text-2xl font-semibold tracking-tight">{rawValue}</p>
				{:else}
					<p bind:this={valueEl} data-metric-value class="text-lg font-semibold tracking-tight">{rawValue}</p>
					<span bind:this={labelEl} class="text-muted-foreground text-xs">{label}</span>
				{/if}
			</div>
			{#if Icon}
				<div class="bg-muted flex size-8 items-center justify-center rounded-lg">
					<Icon class="size-4" />
				</div>
			{/if}
		</div>
		{#if trend}
			<div bind:this={trendEl} data-metric-trend class="mt-2 flex items-center gap-1.5">
				<Badge variant="secondary" class={trend.positive ? "text-emerald-600" : "text-red-600"}>
					{#if trend.positive}
						<TrendingUpIcon class="size-3" />
					{:else}
						<TrendingDownIcon class="size-3" />
					{/if}
					{trend.value}
				</Badge>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
