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
	let iconWrapper: HTMLDivElement | undefined = $state();
	let iconEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: 'premium-smooth' });
			tl.from(cardEl!, { opacity: 0, y: 15, duration: 0.4 }, 0);
			if (iconWrapper && unlocked) {
				tl.fromTo(iconWrapper!, { scale: 0, rotation: -15 }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(2)' }, 0.05);
			}
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Card
	bind:ref={cardEl}
	data-slot="achievement-card"
	class={cn(
		!unlocked && '[&_svg]:text-muted-foreground [&_.card-title]:text-muted-foreground',
		className
	)}
>
	<Card.CardContent class="flex flex-col gap-2">
		<div class="flex items-start gap-2">
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
			<div class="min-w-0 flex-1">
				<h3
					data-slot="card-title"
					class={cn('truncate text-sm font-medium', !unlocked && 'text-muted-foreground')}
				>
					{title}
				</h3>
				{#if description}
					<p class={cn('mt-0.5 truncate text-xs', !unlocked ? 'text-muted-foreground' : '')}>
						{description}
					</p>
				{/if}
				<div class="mt-1">
					<Badge variant={rarityVariant[rarity]} class="text-[10px]">{rarityLabel}</Badge>
				</div>
			</div>
		</div>
		{#if progress != null && progressMax != null}
			<div class="flex items-center gap-2">
				<Progress value={progress} max={progressMax} class="flex-1" />
				<span class="text-muted-foreground shrink-0 text-[10px]">
					{progress}/{progressMax}
				</span>
			</div>
		{/if}
	</Card.CardContent>
</Card.Card>
