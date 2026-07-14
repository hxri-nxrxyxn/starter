<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	interface ActionItem {
		icon?: any;
		label: string;
		variant?: "default" | "destructive";
		onClick: () => void;
	}

	interface Props {
		open: boolean;
		title?: string;
		actions: ActionItem[];
		onClose?: () => void;
		className?: string;
	}

	let {
		open,
		title = "",
		actions,
		onClose = undefined,
		className,
	}: Props = $props();
</script>

<Sheet.Root bind:open>
	<Sheet.Content
		side="bottom"
		class={cn("", className)}
	>
		<Sheet.Header>
			{#if title}
				<Sheet.Title>{title}</Sheet.Title>
			{/if}
		</Sheet.Header>
		<div class="flex flex-col gap-1 px-4 pb-4">
			{#each actions as action (action.label)}
				<Button
					variant="ghost"
					class="w-full justify-start gap-3"
					onclick={() => {
						action.onClick?.();
					}}
				>
					{#if action.icon}
						{@const Icon = action.icon}
						<Icon class="size-4 shrink-0" />
					{/if}
					<span class={cn(action.variant === "destructive" && "text-destructive")}>
						{action.label}
					</span>
				</Button>
			{/each}
		</div>
	</Sheet.Content>
</Sheet.Root>
