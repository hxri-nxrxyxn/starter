<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';

	interface SettingsItem {
		icon?: LucideIcon;
		label: string;
		description?: string;
		right?: LucideIcon;
		onClick?: () => void;
		variant?: 'default' | 'destructive';
	}

	interface Props {
		title?: string;
		description?: string;
		items: SettingsItem[];
		class?: string;
	}

	let {
		title = '',
		description = '',
		items,
		class: className,
	}: Props = $props();
</script>

<Card.Root data-slot="settings-section" class={cn('w-full', className)}>
	{#if title || description}
		<Card.Header>
			{#if title}
				<Card.Title>{title}</Card.Title>
			{/if}
			{#if description}
				<Card.Description>{description}</Card.Description>
			{/if}
		</Card.Header>
	{/if}

	<Card.Content class="flex flex-col p-0">
		{#each items as item (item.label)}
			{@const Icon = item.icon}
			{@const Right = item.right}
			{#if item.onClick}
				<Button
					variant="ghost"
					size="default"
					class={cn(
						'flex h-auto w-full items-center gap-3 rounded-none px-(--card-spacing) py-3 text-left',
						item.variant === 'destructive' && 'text-destructive'
					)}
					onclick={item.onClick}
				>
					{#if Icon}
						<Icon class="size-5 shrink-0" />
					{/if}
					<div class="flex min-w-0 flex-1 flex-col">
						<span class="text-sm font-medium">{item.label}</span>
						{#if item.description}
							<span class="text-muted-foreground text-xs">{item.description}</span>
						{/if}
					</div>
					{#if Right}
						<Right class="size-4 shrink-0 text-muted-foreground" />
					{/if}
				</Button>
			{:else}
				<div
					class={cn(
						'flex items-center gap-3 px-(--card-spacing) py-3',
						item.variant === 'destructive' && 'text-destructive'
					)}
				>
					{#if Icon}
						<Icon class="size-5 shrink-0" />
					{/if}
					<div class="flex min-w-0 flex-1 flex-col">
						<span class="text-sm font-medium">{item.label}</span>
						{#if item.description}
							<span class="text-muted-foreground text-xs">{item.description}</span>
						{/if}
					</div>
					{#if Right}
						<Right class="size-4 shrink-0 text-muted-foreground" />
					{/if}
				</div>
			{/if}

			{#if items[items.length - 1] !== item}
				<Separator />
			{/if}
		{/each}
	</Card.Content>
</Card.Root>
