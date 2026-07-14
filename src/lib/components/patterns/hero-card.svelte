<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	interface Props {
		headline: string;
		description?: string;
		illustration?: LucideIcon;
		icon?: LucideIcon;
		ctaLabel?: string;
		onCta?: () => void;
		variant?: 'default' | 'compact';
		class?: string;
	}

	let {
		headline,
		description,
		illustration: Illustration,
		icon: Icon,
		ctaLabel,
		onCta,
		variant = 'default',
		class: className,
	}: Props = $props();

	let cardEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: 'premium-smooth' });
			tl.from(cardEl!, { opacity: 0, y: 25, duration: 0.5 }, 0);
			const title = cardEl!.querySelector('[data-hero-title]');
			const desc = cardEl!.querySelector('[data-hero-subtitle]');
			const illustration = cardEl!.querySelector('[data-hero-image]');
			const cta = cardEl!.querySelector('[data-hero-cta]');
			if (title) tl.from(title, { opacity: 0, y: 15, duration: 0.4 }, 0.08);
			if (desc) tl.from(desc, { opacity: 0, y: 12, duration: 0.35 }, 0.14);
			if (illustration) tl.from(illustration, { opacity: 0, scale: 0.9, duration: 0.4 }, 0.1);
			if (cta) tl.from(cta, { opacity: 0, y: 10, duration: 0.3 }, 0.22);
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Root bind:ref={cardEl} data-size={variant === 'compact' ? 'sm' : 'default'} class={cn('overflow-hidden', className)}>
	{#if variant === 'compact'}
		<Card.Content class="flex items-start gap-4">
			<div class="flex min-w-0 flex-1 flex-col gap-2">
				<div class="flex items-center gap-2">
					{#if Icon}
						<div class="bg-muted flex size-8 shrink-0 items-center justify-center rounded-lg">
							<Icon class="size-4" />
						</div>
					{/if}
					<Card.Title data-hero-title class="truncate text-lg font-semibold">{headline}</Card.Title>
				</div>
				{#if description}
					<Card.Description data-hero-subtitle class="line-clamp-2 text-xs">{description}</Card.Description>
				{/if}
				{#if ctaLabel && onCta}
					<div data-hero-cta class="mt-1">
						<Button variant="default" size="sm" onclick={onCta}>
							{ctaLabel}
						</Button>
					</div>
				{/if}
			</div>
			{#if Illustration}
				<div data-hero-image class="shrink-0">
					<Illustration class="size-16" />
				</div>
			{/if}
		</Card.Content>
	{:else}
		<div class="flex flex-col md:flex-row">
			<div class="flex flex-1 flex-col gap-3 p-6">
				{#if Icon}
					<div class="bg-muted flex size-10 items-center justify-center rounded-lg">
						<Icon class="size-5" />
					</div>
				{/if}
				<Card.Title data-hero-title class="text-2xl font-bold tracking-tight">{headline}</Card.Title>
				{#if description}
					<Card.Description data-hero-subtitle class="max-w-lg text-sm">{description}</Card.Description>
				{/if}
				{#if ctaLabel && onCta}
					<div data-hero-cta class="mt-2">
						<Button variant="default" onclick={onCta}>
							{ctaLabel}
						</Button>
					</div>
				{/if}
			</div>
			{#if Illustration}
				<div data-hero-image class="bg-muted/30 flex items-center justify-center p-6 md:w-64">
					<Illustration class="size-24 md:size-32" />
				</div>
			{/if}
		</div>
	{/if}
</Card.Root>