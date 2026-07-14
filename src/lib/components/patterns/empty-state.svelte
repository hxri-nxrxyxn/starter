<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Props {
		icon?: any;
		title: string;
		description?: string;
		actionLabel?: string;
		onAction?: () => void;
		className?: string;
	}

	let {
		icon: Icon = undefined,
		title,
		description = "",
		actionLabel = "",
		onAction = undefined,
		className,
	}: Props = $props();

	let iconEl: HTMLElement | undefined = $state();

	onMount(() => {
		if (!iconEl) return;
		const ctx = gsap.context(() => {
			gsap.to(iconEl!, {
				y: -3,
				duration: 3,
				ease: "sine.inOut",
				repeat: -1,
				yoyo: true,
			});
		}, iconEl);
		return () => ctx.revert();
	});
</script>

<Card.Root
	data-slot="empty-state"
	class={cn("w-full", className)}
>
	<Card.Content class="flex flex-col items-center justify-center py-12 text-center">
		{#if Icon}
			<div bind:this={iconEl} class="mb-4">
				<Icon class="size-12 text-muted-foreground" />
			</div>
		{/if}
		<Card.Title class="text-lg">{title}</Card.Title>
		{#if description}
			<Card.Description class="mt-1 max-w-sm">{description}</Card.Description>
		{/if}
		{#if actionLabel && onAction}
			<Button
				variant="default"
				size="sm"
				class="mt-4"
				onclick={onAction}
			>
				{actionLabel}
			</Button>
		{/if}
	</Card.Content>
</Card.Root>
