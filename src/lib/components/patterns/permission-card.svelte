<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Props {
		icon?: LucideIcon;
		title: string;
		description?: string;
		granted?: boolean;
		onGrant?: () => void;
		onDeny?: () => void;
		class?: string;
	}

	let {
		icon: Icon,
		title,
		description = '',
		granted = undefined,
		onGrant = undefined,
		onDeny = undefined,
		class: className,
	}: Props = $props();

	const statusLabel = $derived(
		granted === true ? 'Granted' : granted === false ? 'Denied' : undefined
	);

	const statusVariant = $derived(
		granted === true
			? ('default' as const)
			: granted === false
				? ('destructive' as const)
				: undefined
	);
</script>

<Card.Card data-slot="permission-card" class={cn(className)}>
	<Card.CardContent class="flex flex-col gap-3">
		<div class="flex items-start gap-3">
			{#if Icon}
				<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
					<Icon class="size-5" />
				</div>
			{/if}
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					<h3 data-slot="card-title" class="text-base font-medium leading-snug">
						{title}
					</h3>
					{#if statusLabel}
						<Badge variant={statusVariant}>{statusLabel}</Badge>
					{/if}
				</div>
				{#if description}
					<p class="text-muted-foreground mt-1 text-sm">{description}</p>
				{/if}
			</div>
		</div>

		{#if granted == null || !granted}
			<div class="flex gap-2">
				{#if onGrant}
					<Button size="sm" onclick={onGrant}>Allow</Button>
				{/if}
				{#if onDeny}
					<Button size="sm" variant="outline" onclick={onDeny}>Deny</Button>
				{/if}
			</div>
		{/if}
	</Card.CardContent>
</Card.Card>
