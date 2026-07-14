<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import CrownIcon from '@lucide/svelte/icons/crown';
	import CheckIcon from '@lucide/svelte/icons/check';
	import StarIcon from '@lucide/svelte/icons/star';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import XIcon from '@lucide/svelte/icons/x';

	interface Props {
		onSubscribe?: (planId: string) => void;
		class?: string;
	}

	let { onSubscribe = undefined, class: className }: Props = $props();

	interface Feature {
		label: string;
		included: boolean;
	}

	interface Plan {
		id: string;
		name: string;
		price: string;
		period: string;
		description: string;
		features: Feature[];
		popular?: boolean;
		cta: string;
	}

	const plans: Plan[] = [
		{
			id: 'free',
			name: 'Free',
			price: '$0',
			period: '/month',
			description: 'Get started with basic features',
			features: [
				{ label: 'Up to 5 projects', included: true },
				{ label: 'Basic analytics', included: true },
				{ label: 'Community support', included: true },
				{ label: 'Advanced reports', included: false },
				{ label: 'Priority support', included: false },
				{ label: 'Custom branding', included: false },
			],
			cta: 'Get Started',
		},
		{
			id: 'pro',
			name: 'Pro',
			price: '$12',
			period: '/month',
			description: 'For creators who need more power',
			features: [
				{ label: 'Unlimited projects', included: true },
				{ label: 'Advanced analytics', included: true },
				{ label: 'Priority support', included: true },
				{ label: 'Custom branding', included: true },
				{ label: 'Team collaboration', included: true },
				{ label: 'API access', included: false },
			],
			popular: true,
			cta: 'Subscribe Now',
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			price: '$49',
			period: '/month',
			description: 'For teams and organizations',
			features: [
				{ label: 'Unlimited projects', included: true },
				{ label: 'Advanced analytics', included: true },
				{ label: 'Dedicated support', included: true },
				{ label: 'Custom branding', included: true },
				{ label: 'Team collaboration', included: true },
				{ label: 'API access', included: true },
			],
			cta: 'Contact Sales',
		},
	];

	let gridEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			gsap.from(gridEl!.querySelectorAll('[data-plan-card]'), {
				opacity: 0,
				y: 30,
				duration: 0.45,
				stagger: 0.1,
				ease: 'premium-smooth',
			});
		}, gridEl);
		return () => ctx.revert();
	});
</script>

<div class={cn('flex flex-col gap-6', className)}>
	<div class="flex flex-col items-center gap-2 text-center">
		<div class="flex items-center gap-2">
			<CrownIcon class="size-6 text-amber-500" />
			<h2 class="text-2xl font-bold">Upgrade Your Experience</h2>
		</div>
		<p class="text-muted-foreground max-w-md text-sm">
			Choose the plan that best fits your needs. Unlock premium features and take your content to the next level.
		</p>
	</div>

	<div
		bind:this={gridEl}
		class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3"
	>
		{#each plans as plan (plan.id)}
			<Card.Root
				data-plan-card
				class={cn(
					'relative flex flex-col',
					plan.popular && 'ring-primary ring-2 shadow-md'
				)}
			>
				{#if plan.popular}
					<div class="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
						<Badge class="bg-primary text-primary-foreground gap-1 px-3 py-1">
							<StarIcon class="size-3" />
							Popular
						</Badge>
					</div>
				{/if}
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						{plan.name}
					</Card.Title>
					<div class="mt-2 flex items-baseline gap-1">
						<span class="text-3xl font-bold">{plan.price}</span>
						<span class="text-muted-foreground text-sm">{plan.period}</span>
					</div>
					<Card.Description class="mt-1">{plan.description}</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-1 flex-col gap-4">
					<div class="flex flex-col gap-2">
						{#each plan.features as feature (feature.label)}
							<div class="flex items-center gap-2">
								{#if feature.included}
									<CheckIcon class="size-4 shrink-0 text-emerald-500" />
								{:else}
									<XIcon class="size-4 shrink-0 text-muted-foreground/40" />
								{/if}
								<span class={cn(
									'text-sm',
									feature.included ? 'text-foreground' : 'text-muted-foreground/60'
								)}>
									{feature.label}
								</span>
							</div>
						{/each}
					</div>
				</Card.Content>
				<Card.Footer>
					<Button
						class="w-full"
						variant={plan.popular ? 'default' : 'outline'}
						onclick={() => onSubscribe?.(plan.id)}
					>
						{#if plan.popular}
							<SparklesIcon class="mr-2 size-4" />
						{/if}
						{plan.cta}
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
