<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils.js";

	interface Action {
		icon: any;
		label: string;
		onClick?: () => void;
	}

	interface Props {
		actions: Action[];
		columns?: number;
		className?: string;
	}

	let { actions, columns = 4, className }: Props = $props();
</script>

<div
	class={cn("grid gap-2", className)}
	style="--action-columns: {columns}"
>
	{#each actions as action (action.label)}
		{@const Icon = action.icon}
		<Button
			variant="ghost"
			class="flex-col gap-1.5 py-4 h-auto"
			onclick={action.onClick}
		>
			<Icon data-icon="inline-start" />
			<span class="text-xs">{action.label}</span>
		</Button>
	{/each}
</div>

<style>
	div {
		grid-template-columns: repeat(var(--action-columns), minmax(0, 1fr));
	}
</style>
