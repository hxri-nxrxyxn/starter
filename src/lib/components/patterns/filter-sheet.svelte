<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	interface FilterOption {
		value: string;
		label: string;
	}

	interface FilterGroup {
		id: string;
		label: string;
		options: FilterOption[];
	}

	interface Props {
		open: boolean;
		title?: string;
		filters: FilterGroup[];
		selectedFilters: Record<string, string[]>;
		onFilterChange: (filterId: string, values: string[]) => void;
		onClear?: () => void;
		onApply?: () => void;
		className?: string;
	}

	let {
		open,
		title = "Filters",
		filters,
		selectedFilters,
		onFilterChange,
		onClear = undefined,
		onApply = undefined,
		className,
	}: Props = $props();

	function toggleFilter(filterId: string, value: string) {
		const current = selectedFilters[filterId] ?? [];
		const updated = current.includes(value)
			? current.filter((v) => v !== value)
			: [...current, value];
		onFilterChange(filterId, updated);
	}

	function isSelected(filterId: string, value: string): boolean {
		return (selectedFilters[filterId] ?? []).includes(value);
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Content
		side="bottom"
		class={cn("", className)}
	>
		<Sheet.Header>
			<Sheet.Title>{title}</Sheet.Title>
		</Sheet.Header>
		<div class="flex flex-col gap-4 overflow-y-auto px-4 pb-4">
			{#each filters as filter, filterIndex (filter.id)}
				<div class="flex flex-col gap-2">
					<span class="text-sm font-medium">{filter.label}</span>
					<div class="flex flex-wrap gap-2">
						{#each filter.options as option (option.value)}
							<Badge
								variant={isSelected(filter.id, option.value) ? "default" : "outline"}
								class="cursor-pointer select-none"
								role="checkbox"
								aria-checked={isSelected(filter.id, option.value) ? "true" : "false"}
								tabindex={0}
								onclick={() => toggleFilter(filter.id, option.value)}
								onkeydown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										toggleFilter(filter.id, option.value);
									}
								}}
							>
								{option.label}
							</Badge>
						{/each}
					</div>
				</div>
				{#if filterIndex < filters.length - 1}
					<Separator />
				{/if}
			{/each}
		</div>
		{#if onClear || onApply}
			<Sheet.Footer class="flex-row gap-2 px-4 pb-4">
				{#if onClear}
					<Button
						variant="outline"
						class="flex-1"
						onclick={onClear}
					>
						Clear
					</Button>
				{/if}
				{#if onApply}
					<Button
						variant="default"
						class="flex-1"
						onclick={onApply}
					>
						Apply
					</Button>
				{/if}
			</Sheet.Footer>
		{/if}
	</Sheet.Content>
</Sheet.Root>
