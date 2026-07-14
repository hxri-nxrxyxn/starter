<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import PlayIcon from '@lucide/svelte/icons/play';

	interface Props {
		headline: string;
		subheadline?: string;
		ctaLabel?: string;
		onCta?: () => void;
		secondaryLabel?: string;
		onSecondary?: () => void;
		class?: string;
	}

	let {
		headline,
		subheadline,
		ctaLabel,
		onCta,
		secondaryLabel,
		onSecondary,
		class: className,
	}: Props = $props();

	let sectionEl: HTMLElement | null = $state(null);
	let orb1: HTMLDivElement | null = $state(null);
	let orb2: HTMLDivElement | null = $state(null);
	let orb3: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!sectionEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: 'premium-smooth' });
			const title = sectionEl!.querySelector('[data-hero-title]');
			const subtitle = sectionEl!.querySelector('[data-hero-subtitle]');
			const ctaBtns = sectionEl!.querySelectorAll('[data-hero-cta]');

			tl.from(title, { opacity: 0, y: 30, duration: 0.6 }, 0);
			if (subtitle) tl.from(subtitle, { opacity: 0, y: 20, duration: 0.5 }, 0.15);
			if (ctaBtns.length) tl.from(ctaBtns, { opacity: 0, y: 15, duration: 0.4, stagger: 0.1 }, 0.3);

			const orbs = [orb1, orb2, orb3].filter(Boolean);
			orbs.forEach((orb) => {
				if (!orb) return;
				gsap.to(orb, {
					y: 'random(-20, 20)',
					x: 'random(-15, 15)',
					duration: 'random(3, 5)',
					ease: 'sine.inOut',
					yoyo: true,
					repeat: -1,
				});
			});
		}, sectionEl);
		return () => ctx.revert();
	});
</script>

<section
	bind:this={sectionEl}
	class={cn('relative flex min-h-[80vh] items-center justify-center overflow-hidden', className)}
>
	<div class="from-background via-background to-primary/5 absolute inset-0 bg-gradient-to-b"></div>

	<div
		bind:this={orb1}
		class="absolute left-1/4 top-1/4 size-64 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/10 blur-3xl"
	></div>
	<div
		bind:this={orb2}
		class="absolute right-1/4 top-1/3 size-48 rounded-full bg-gradient-to-bl from-blue-500/15 to-teal-500/10 blur-3xl"
	></div>
	<div
		bind:this={orb3}
		class="absolute bottom-1/4 left-1/3 size-56 rounded-full bg-gradient-to-tr from-pink-500/15 to-orange-500/10 blur-3xl"
	></div>

	<div class="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
		<h1
			data-hero-title
			class="from-foreground to-foreground/70 bg-gradient-to-b bg-clip-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
		>
			{headline}
		</h1>

		{#if subheadline}
			<p data-hero-subtitle class="text-muted-foreground max-w-xl text-base sm:text-lg">
				{subheadline}
			</p>
		{/if}

		<div class="flex flex-wrap items-center gap-3">
			{#if ctaLabel}
				<div data-hero-cta>
					<Button size="lg" onclick={onCta}>
						{ctaLabel}
						<ArrowRightIcon class="size-4" />
					</Button>
				</div>
			{/if}
			{#if secondaryLabel}
				<div data-hero-cta>
					<Button variant="outline" size="lg" onclick={onSecondary}>
						<PlayIcon class="size-4" />
						{secondaryLabel}
					</Button>
				</div>
			{/if}
		</div>
	</div>
</section>
