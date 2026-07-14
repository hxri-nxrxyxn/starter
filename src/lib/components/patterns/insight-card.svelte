<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import XIcon from '@lucide/svelte/icons/x';
	import InfoIcon from '@lucide/svelte/icons/info';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import { cn } from '$lib/utils.js';

	interface Props {
		title: string;
		description: string;
		icon?: LucideIcon;
		variant?: 'info' | 'warning' | 'success';
		onDismiss?: () => void;
		onAction?: () => void;
		actionLabel?: string;
		class?: string;
	}

	let {
		icon: CustomIcon,
		title,
		description,
		variant = 'info',
		onDismiss,
		onAction,
		actionLabel,
		class: className,
	}: Props = $props();

	const borderClass = $derived(
		variant === 'warning'
			? 'border-amber-500/30'
			: variant === 'success'
				? 'border-emerald-500/30'
				: 'border-sky-500/30'
	);

	const iconClass = $derived(
		variant === 'warning'
			? 'text-amber-500'
			: variant === 'success'
				? 'text-emerald-500'
				: 'text-sky-500'
	);

	const DefaultIcon = $derived(
		variant === 'warning'
			? TriangleAlertIcon
			: variant === 'success'
				? CircleCheckIcon
				: InfoIcon
	);
</script>

<Card.Root class={cn('overflow-hidden', borderClass, className)}>
	<Card.Content class="flex gap-3">
		<div class={cn('mt-0.5 shrink-0', iconClass)}>
			{#if CustomIcon}
				<CustomIcon class="size-5" />
			{:else}
				<DefaultIcon class="size-5" />
			{/if}
		</div>
		<div class="flex min-w-0 flex-1 flex-col gap-1">
			<div class="flex items-start justify-between gap-2">
				<p class="truncate text-sm font-medium">{title}</p>
				{#if onDismiss}
					<Button variant="ghost" size="xs" onclick={onDismiss} aria-label="Dismiss" class="shrink-0">
						<XIcon />
					</Button>
				{/if}
			</div>
			<p class="text-muted-foreground text-xs">{description}</p>
			{#if onAction && actionLabel}
				<div class="mt-2">
					<Button variant="outline" size="sm" onclick={onAction}>
						{actionLabel}
					</Button>
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
