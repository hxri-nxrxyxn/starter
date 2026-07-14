<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import UsersIcon from '@lucide/svelte/icons/users';
	import BarChart3Icon from '@lucide/svelte/icons/bar-chart-3';

	interface Feature {
		icon: any;
		title: string;
		description: string;
	}

	interface Props {
		features?: Feature[];
		class?: string;
	}

	const defaultFeatures: Feature[] = [
		{ icon: ZapIcon, title: 'Lightning Fast', description: 'Built on Svelte 5 with optimized rendering and minimal bundle size for instant load times.' },
		{ icon: ShieldIcon, title: 'Type Safe', description: 'Full TypeScript support with strict types across the entire codebase.' },
		{ icon: SparklesIcon, title: 'Beautiful Animations', description: 'GSAP-powered animations for smooth, premium interactions out of the box.' },
		{ icon: ClockIcon, title: 'Quick Setup', description: 'Get started in minutes with pre-built patterns and components.' },
		{ icon: UsersIcon, title: 'Team Ready', description: 'Built with collaboration in mind — consistent patterns and clear conventions.' },
		{ icon: BarChart3Icon, title: 'Performance', description: 'Optimized for Core Web Vitals with lazy loading and code splitting.' },
	];

	let {
		features = defaultFeatures,
		class: className,
	}: Props = $props();

	let gridEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>(gridEl!.querySelectorAll('[data-feature-card]'));
			gsap.from(cards, {
				opacity: 0,
				y: 30,
				duration: 0.5,
				ease: 'premium-smooth',
				stagger: 0.08,
				scrollTrigger: {
					trigger: gridEl!,
					start: 'top 85%',
				},
			});
		}, gridEl);
		return () => ctx.revert();
	});
</script>

<div
	bind:this={gridEl}
	class={cn('grid gap-6 sm:grid-cols-2 md:grid-cols-3', className)}
>
	{#each features as feature (feature.title)}
		{@const FeatureIcon = feature.icon}
		<Card.Root data-feature-card>
			<Card.Content class="flex flex-col gap-3 p-6">
				<div class="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
					{#if FeatureIcon}
						<FeatureIcon class="text-primary size-5" />
					{/if}
				</div>
				<Card.Title class="text-base">{feature.title}</Card.Title>
				<Card.Description class="text-sm">{feature.description}</Card.Description>
			</Card.Content>
		</Card.Root>
	{/each}
</div>
