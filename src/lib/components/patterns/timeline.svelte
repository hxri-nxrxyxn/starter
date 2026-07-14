<script lang="ts">
	import { cn } from "$lib/utils.js";

	type TimelineVariant = "default" | "success" | "warning" | "error";

	interface TimelineItem {
		icon?: any;
		title: string;
		description?: string;
		timestamp?: string | Date;
		variant?: TimelineVariant;
	}

	let {
		items = [] as TimelineItem[],
		class: className,
	}: {
		items: TimelineItem[];
		class?: string;
	} = $props();

	const variantStyles: Record<TimelineVariant, string> = {
		default: "border-primary bg-primary/10 text-primary",
		success: "border-emerald-500 bg-emerald-500/10 text-emerald-600",
		warning: "border-amber-500 bg-amber-500/10 text-amber-600",
		error: "border-red-500 bg-red-500/10 text-red-600",
	};

	const variantLineStyles: Record<TimelineVariant, string> = {
		default: "bg-primary/20",
		success: "bg-emerald-500/20",
		warning: "bg-amber-500/20",
		error: "bg-red-500/20",
	};

	function getItemVariant(item: TimelineItem): TimelineVariant {
		return item.variant ?? "default";
	}
</script>

<div data-slot="timeline" class={cn("flex flex-col", className)}>
	{#each items as item (item.title)}
		{@const ItemIcon = item.icon}
		<div class="flex gap-3">
			<div class="flex flex-col items-center">
				{#if items[0] !== item}
					<div
						class={cn(
							"h-2 w-0.5",
							variantLineStyles[getItemVariant(item)]
						)}
					></div>
				{:else}
					<div class="h-2"></div>
				{/if}

				<div
					class={cn(
						"flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-background",
						variantStyles[getItemVariant(item)]
					)}
				>
					{#if ItemIcon}
						<ItemIcon class="size-3" />
					{/if}
				</div>

				{#if items[items.length - 1] !== item}
					<div
						class={cn(
							"flex-1 w-0.5",
							variantLineStyles[getItemVariant(item)]
						)}
					></div>
				{:else}
					<div class="h-2"></div>
				{/if}
			</div>

			<div class="min-w-0 flex-1 pb-6 last:pb-0">
				<div class="flex items-center gap-2">
					<h4 class="text-sm font-medium">{item.title}</h4>
					{#if item.timestamp}
						<time class="text-muted-foreground shrink-0 text-xs">
							{typeof item.timestamp === "string"
								? item.timestamp
								: item.timestamp.toLocaleDateString()}
						</time>
					{/if}
				</div>
				{#if item.description}
					<p class="text-muted-foreground mt-0.5 text-sm">{item.description}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>
