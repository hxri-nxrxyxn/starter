<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";

	interface Props {
		icon?: any;
		title: string;
		description?: string;
		retryLabel?: string;
		onRetry?: () => void;
		className?: string;
	}

	let {
		icon: Icon = AlertTriangleIcon,
		title,
		description = "",
		retryLabel = "Try again",
		onRetry = undefined,
		className,
	}: Props = $props();
</script>

<Card.Root
	data-slot="error-state"
	class={cn("w-full border-destructive/30", className)}
>
	<Card.Content class="flex flex-col items-center justify-center py-12 text-center">
		<div class="mb-4">
			<Icon class="size-12 text-destructive" />
		</div>
		<Card.Title class="text-lg">{title}</Card.Title>
		{#if description}
			<Card.Description class="mt-1 max-w-sm">{description}</Card.Description>
		{/if}
		{#if onRetry}
			<Button
				variant="destructive"
				size="sm"
				class="mt-4"
				onclick={onRetry}
			>
				{retryLabel}
			</Button>
		{/if}
	</Card.Content>
</Card.Root>
