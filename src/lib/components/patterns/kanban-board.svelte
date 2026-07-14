<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { cn } from "$lib/utils.js";
	import GripVerticalIcon from "@lucide/svelte/icons/grip-vertical";

	interface ColumnItem {
		id: string;
		title: string;
		description?: string;
		badge?: string;
	}

	interface Column {
		id: string;
		title: string;
		items: ColumnItem[];
	}

	interface Props {
		columns: Column[];
		onItemClick?: (columnId: string, itemId: string) => void;
		className?: string;
	}

	let {
		columns,
		onItemClick,
		className
	}: Props = $props();
</script>

<div class={cn("flex gap-4 overflow-x-auto pb-2", className)}>
	{#each columns as column (column.id)}
		<div class="flex w-72 shrink-0 flex-col gap-3">
			<Card.Root class="flex-1">
				<Card.Header class="pb-0">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<GripVerticalIcon class="size-4 text-muted-foreground" />
							<Card.Title class="text-sm font-semibold">{column.title}</Card.Title>
						</div>
						<Badge variant="secondary" class="size-5 rounded-full px-1 text-xs tabular-nums">
							{column.items.length}
						</Badge>
					</div>
				</Card.Header>
				<Separator class="my-3" />
				<Card.Content class="flex flex-col gap-2">
					{#if column.items.length === 0}
						<p class="text-muted-foreground py-4 text-center text-xs">No items</p>
					{:else}
						{#each column.items as item (item.id)}
							<button
								type="button"
								class="w-full text-left"
								onclick={() => onItemClick?.(column.id, item.id)}
							>
								<div
									class={cn(
										"hover:bg-muted/50 rounded-lg border p-3 transition-colors",
										onItemClick ? "cursor-pointer" : ""
									)}
								>
									<div class="flex items-start justify-between gap-2">
										<p class="truncate text-sm font-medium">{item.title}</p>
										{#if item.badge}
											<Badge variant="outline" class="shrink-0">{item.badge}</Badge>
										{/if}
									</div>
									{#if item.description}
										<p class="text-muted-foreground mt-1 line-clamp-2 text-xs">{item.description}</p>
									{/if}
								</div>
							</button>
						{/each}
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	{/each}
</div>
