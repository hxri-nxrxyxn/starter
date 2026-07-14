<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Props {
		title: string;
		description?: string;
		icon?: any;
		period?: "daily" | "weekly" | "monthly" | "yearly";
		onPeriodChange?: (p: string) => void;
		children: Snippet;
		className?: string;
	}

	let {
		title,
		description,
		icon: Icon,
		period = "monthly",
		onPeriodChange,
		children,
		className
	}: Props = $props();

	let periods = [
		{ value: "daily", label: "Day" },
		{ value: "weekly", label: "Week" },
		{ value: "monthly", label: "Month" },
		{ value: "yearly", label: "Year" }
	] as const;

	let chartEl: HTMLDivElement;

	onMount(() => {
		if (!chartEl) return;
		const bars = chartEl.querySelectorAll("[data-chart-bar]");
		if (bars.length) {
			gsap.from(bars, {
				scaleY: 0,
				transformOrigin: "bottom center",
				duration: 0.5,
				stagger: 0.06,
				ease: "premium-bounce",
			});
		}
	});
</script>

<Card.Root class={cn("", className)}>
	<Card.Header>
		<div class="flex items-start justify-between gap-4">
			<div class="flex min-w-0 flex-1 flex-col gap-1">
				<div class="flex items-center gap-2">
					{#if Icon}
						<Icon class="size-4 text-muted-foreground" />
					{/if}
					<Card.Title class="truncate text-sm">{title}</Card.Title>
				</div>
				{#if description}
					<Card.Description class="text-xs">{description}</Card.Description>
				{/if}
			</div>
			<div class="flex shrink-0 gap-1">
				{#each periods as p (p.value)}
					<Button
						variant={period === p.value ? "default" : "ghost"}
						size="xs"
						onclick={() => {
							period = p.value;
							onPeriodChange?.(p.value);
						}}
						aria-pressed={period === p.value}
					>
						{p.label}
					</Button>
				{/each}
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<div bind:this={chartEl}>
			{@render children()}
		</div>
	</Card.Content>
</Card.Root>
