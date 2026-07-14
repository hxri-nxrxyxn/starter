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

	const variantDot: Record<TimelineVariant, string> = {
		default: "bg-primary/10 text-primary",
		success: "bg-emerald-500/10 text-emerald-600",
		warning: "bg-amber-500/10 text-amber-600",
		error: "bg-red-500/10 text-red-600",
	};

	const variantLine: Record<TimelineVariant, string> = {
		default: "bg-border",
		success: "bg-emerald-500/20",
		warning: "bg-amber-500/20",
		error: "bg-red-500/20",
	};

	function getItemVariant(item: TimelineItem): TimelineVariant {
		return item.variant ?? "default";
	}
</script>

<div data-slot="timeline" class={cn("flex flex-col", className)}>
	{#each items as item, i (item.title)}
		{@const ItemIcon = item.icon}
		{@const variant = getItemVariant(item)}
		<div class="flex gap-3">
			<div class="flex flex-col items-center">
				<div
					class={cn(
						"flex size-6 shrink-0 items-center justify-center rounded-full",
						variantDot[variant]
					)}
				>
					{#if ItemIcon}
						<ItemIcon class="size-3" />
					{/if}
				</div>
				{#if i < items.length - 1}
					<div class={cn("mt-1 w-0.5 flex-1 rounded-full", variantLine[variant])}></div>
				{/if}
			</div>
			<div class="min-w-0 flex-1 pb-10 last:pb-0">
				<p class="text-sm font-medium leading-none">{item.title}</p>
				{#if item.description}
					<p class="text-muted-foreground mt-1 text-sm">{item.description}</p>
				{/if}
				{#if item.timestamp}
					<time class="text-muted-foreground mt-1 block text-xs">
						{typeof item.timestamp === "string"
							? item.timestamp
							: item.timestamp.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
					</time>
				{/if}
			</div>
		</div>
	{/each}
</div>
