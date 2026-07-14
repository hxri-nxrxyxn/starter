<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

	interface Props {
		icon?: LucideIcon;
		title: string;
		description?: string;
		unlocked?: boolean;
		progress?: number;
		progressMax?: number;
		rarity?: Rarity;
		class?: string;
	}

	let {
		icon: Icon,
		title,
		description = '',
		unlocked = false,
		progress = undefined,
		progressMax = undefined,
		rarity = 'common',
		class: className,
	}: Props = $props();

	const rarityVariant: Record<Rarity, 'secondary' | 'default' | 'destructive' | 'outline'> = {
		common: 'secondary',
		rare: 'default',
		epic: 'destructive',
		legendary: 'outline',
	};

	const rarityLabel = $derived(rarity.charAt(0).toUpperCase() + rarity.slice(1));

	let cardEl: HTMLDivElement | null = $state(null);
	let iconEl: HTMLDivElement | undefined = $state();
	let progressEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: 'premium-smooth' });
			tl.from(cardEl!, { opacity: 0, y: 15, duration: 0.4 }, 0);
			if (iconEl) tl.from(iconEl!, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, 0.05);
			if (progressEl) tl.from(progressEl!, { opacity: 0, y: 8, duration: 0.25 }, 0.2);
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Card
	bind:ref={cardEl}
	data-slot="achievement-card"
	class={cn(
		!unlocked && 'opacity-60',
		className
	)}
>
	<Card.Content class="flex flex-col gap-2">
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0 flex-1">
				<div class="flex items-center gap-2">
					{#if Icon}
						<div
							bind:this={iconEl}
							class={cn(
								'flex size-8 shrink-0 items-center justify-center rounded-lg',
								unlocked ? 'bg-muted' : 'bg-muted/50'
							)}
						>
							<Icon class="size-4" />
						</div>
					{/if}
					<Badge variant={rarityVariant[rarity]} class="text-[10px] leading-none">{rarityLabel}</Badge>
				</div>
				<p class="mt-1.5 truncate text-lg font-semibold tracking-tight">{title}</p>
				{#if description}
					<span class="text-muted-foreground mt-0.5 block truncate text-xs">{description}</span>
				{/if}
			</div>
		</div>
		{#if progress != null && progressMax != null}
			<div bind:this={progressEl} class="flex items-center gap-2">
				<Progress value={progress} max={progressMax} class="flex-1" />
				<span class="text-muted-foreground shrink-0 text-xs tabular-nums">
					{progress}/{progressMax}
				</span>
			</div>
		{/if}
	</Card.Content>
</Card.Card>
