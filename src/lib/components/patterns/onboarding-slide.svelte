<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils.js";

	interface Props {
		illustration?: any;
		icon?: any;
		title: string;
		description?: string;
		className?: string;
	}

	let {
		illustration: Illustration = undefined,
		icon: Icon = undefined,
		title,
		description = "",
		className,
	}: Props = $props();
</script>

<Card.Root
	data-slot="onboarding-slide"
	class={cn("w-full", className)}
>
	<Card.Content class="flex flex-col items-center justify-center px-6 py-10 text-center">
		{#if Illustration}
			<div class="mb-8 flex items-center justify-center">
				<Illustration class="w-full max-w-xs" />
			</div>
		{:else if Icon}
			<div class="mb-6 flex items-center justify-center">
				<Icon class="size-16 text-primary" />
			</div>
		{/if}

		<Card.Title class="text-xl">{title}</Card.Title>

		{#if description}
			<Card.Description class="mt-2 max-w-sm text-balance">
				{description}
			</Card.Description>
		{/if}
	</Card.Content>
</Card.Root>
