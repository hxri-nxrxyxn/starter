<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { confetti, countUp } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import CoinsIcon from '@lucide/svelte/icons/coins';
	import StarIcon from '@lucide/svelte/icons/star';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		rewardAmount?: number;
		rewardLabel?: string;
		onClaim?: () => void;
		class?: string;
	}

	let {
		open,
		title = 'Reward Unlocked!',
		description = 'You earned a reward for your achievement.',
		rewardAmount = 100,
		rewardLabel = 'XP',
		onClaim = undefined,
		class: className,
	}: Props = $props();

	let contentEl: HTMLDivElement | null = $state(null);
	let checkEl: HTMLDivElement | null = $state(null);
	let titleEl: HTMLHeadingElement | null = $state(null);
	let descEl: HTMLParagraphElement | null = $state(null);
	let amountEl: HTMLSpanElement | null = $state(null);
	let claimBtnEl: HTMLElement | null = $state(null);

	$effect(() => {
		if (open && contentEl) {
			const tl = gsap.timeline({ ease: 'premium-smooth' });

			if (checkEl) {
				tl.fromTo(checkEl,
					{ scale: 0, rotation: -90, opacity: 0 },
					{ scale: 1.1, rotation: 0, opacity: 1, duration: 0.4, ease: 'premium-spring' }
				)
				.to(checkEl, { scale: 1, duration: 0.15, ease: 'power2.out' }, '-=0.1');
			}

			if (titleEl) tl.from(titleEl, { opacity: 0, y: 15, duration: 0.3 }, '-=0.15');
			if (descEl) tl.from(descEl, { opacity: 0, y: 10, duration: 0.25 }, '-=0.05');

			if (amountEl) {
				tl.call(() => {
					countUp(amountEl!, 0, rewardAmount, { suffix: ` ${rewardLabel}`, duration: 0.8 });
				}, undefined, '-=0.1');
			}

			if (claimBtnEl) {
				tl.fromTo(claimBtnEl,
					{ opacity: 0, scale: 0.8 },
					{ opacity: 1, scale: 1, duration: 0.35, ease: 'premium-bounce' },
					'-=0.1'
				);
			}

			confetti(contentEl, { count: 60, spread: 100, origin: { x: 50, y: 40 } });
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content bind:ref={contentEl} class={cn('sm:max-w-sm', className)}>
		<div class="flex flex-col items-center gap-4 py-4 text-center">
			<div bind:this={checkEl} class="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
				<CheckCircleIcon class="size-10 text-emerald-500" />
			</div>

			<div class="flex flex-col gap-1">
				<Dialog.Title>
					<h3 bind:this={titleEl} class="text-lg font-semibold">{title}</h3>
				</Dialog.Title>
				{#if description}
					<Dialog.Description>
						<p bind:this={descEl} class="text-muted-foreground text-sm">{description}</p>
					</Dialog.Description>
				{/if}
			</div>

			<div class="flex items-center gap-2">
				<CoinsIcon class="size-5 text-amber-500" />
				<span bind:this={amountEl} class="text-3xl font-bold">0 {rewardLabel}</span>
				<StarIcon class="size-5 text-amber-500" />
			</div>

			{#if onClaim}
				<Button bind:ref={claimBtnEl} class="w-full" size="lg" onclick={onClaim}>
					<SparklesIcon class="mr-2 size-4" />
					Claim Reward
				</Button>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
