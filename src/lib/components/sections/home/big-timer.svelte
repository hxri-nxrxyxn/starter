<script lang="ts">
import { cn } from '$lib/utils.js';

interface Props {
	value: number;
	label?: string;
	sub?: string;
	class?: string;
}

let { value, label = '', sub = '', class: className }: Props = $props();
</script>

<div class={cn('flex flex-col items-center gap-1', className)}>
	<span
		class="font-display font-bold leading-none tracking-tight text-foreground"
		style="font-size: 35vh;"
	>
		{value}
	</span>
	{#if label}
		<span class="text-xs text-muted-foreground">{label}</span>
	{/if}
	{#if sub}
		<span class="rounded-full border bg-muted px-3 py-1 text-xs tabular-nums text-muted-foreground">{sub}</span>
	{/if}
</div>
