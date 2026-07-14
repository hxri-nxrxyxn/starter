<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$lib/utils.js";

	interface Props {
		title: string;
		href?: string;
		onSeeAll?: () => void;
		className?: string;
	}

	let { title, href, onSeeAll, className }: Props = $props();
</script>

<div class={cn("flex items-center justify-between", className)}>
	<h2 class="text-lg font-semibold">{title}</h2>
	{#if href || onSeeAll}
		<Button
			variant="ghost"
			size="sm"
			{href}
			onclick={onSeeAll}
		>
			See all
			<ArrowRightIcon data-icon="inline-end" />
		</Button>
	{/if}
</div>
