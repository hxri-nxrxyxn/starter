<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CrownIcon from '@lucide/svelte/icons/crown';

	interface Props {
		title: string;
		description?: string;
		icon?: LucideIcon;
		actionLabel?: string;
		variant?: 'default' | 'compact';
		onAction?: () => void;
		class?: string;
	}

	let {
		title,
		description = '',
		icon,
		actionLabel = 'Upgrade Now',
		variant = 'default',
		onAction = undefined,
		class: className,
	}: Props = $props();

	// Fall back to CrownIcon if no icon is provided
	const IconComponent = $derived(icon ?? CrownIcon);
</script>

<Card.Card
	data-slot="premium-banner"
	class={cn(
		'border-0 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg ring-0',
		variant === 'compact' && 'p-2',
		className
	)}
>
	<Card.CardContent
		class={cn(
			'flex flex-col gap-3',
			variant === 'compact' ? 'flex-row items-center gap-3 p-2' : 'p-4'
		)}
	>
		<div
			class={cn(
				'flex shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20',
				variant === 'compact' ? 'size-8' : 'size-10'
			)}
		>
			<IconComponent
				class={cn('text-primary-foreground', variant === 'compact' ? 'size-4' : 'size-5')}
			/>
		</div>

		<div class={cn('min-w-0 flex-1', variant === 'compact' && 'flex items-center gap-3')}>
			<div>
				<h3
					class={cn(
						'font-semibold',
						variant === 'compact' ? 'text-sm' : 'text-base'
					)}
				>
					{title}
				</h3>
				{#if description && variant !== 'compact'}
					<p class="mt-0.5 text-sm text-primary-foreground/80">{description}</p>
				{/if}
			</div>

			{#if actionLabel && onAction}
				<Button
					variant="secondary"
					size={variant === 'compact' ? 'xs' : 'sm'}
					onclick={onAction}
					class={cn(
						'shrink-0',
						variant === 'compact' ? 'ml-auto' : 'self-start'
					)}
				>
					{actionLabel}
				</Button>
			{/if}
		</div>
	</Card.CardContent>
</Card.Card>
