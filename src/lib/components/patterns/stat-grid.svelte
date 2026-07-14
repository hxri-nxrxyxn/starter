<script lang="ts">
	import MetricCard from "./metric-card.svelte";
	import { cn } from "$lib/utils.js";

	interface StatItem {
		icon?: any;
		value: string | number;
		label: string;
		trend?: { value: string; positive: boolean };
	}

	interface Props {
		items: StatItem[];
		columns?: number;
		className?: string;
	}

	let { items, columns = 3, className }: Props = $props();
</script>

<div
	class={cn("grid gap-4 grid-cols-2", className)}
	style="--stat-columns: {columns}"
>
	{#each items as item (item.label)}
		<MetricCard icon={item.icon} value={item.value} label={item.label} trend={item.trend} />
	{/each}
</div>

<style>
	@media (min-width: 768px) {
		div {
			grid-template-columns: repeat(var(--stat-columns), minmax(0, 1fr));
		}
	}
</style>
