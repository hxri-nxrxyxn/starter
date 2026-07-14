<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { demo } from '$lib/stores/demo.svelte.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import TargetIcon from '@lucide/svelte/icons/target';
	import BellIcon from '@lucide/svelte/icons/bell';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import CrownIcon from '@lucide/svelte/icons/crown';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import HeartIcon from '@lucide/svelte/icons/heart';
	import CheckCircleIcon from '@lucide/svelte/icons/check-circle';

	let step = $state(1);
	let dailyGoal = $state(8000);

	let stepContent: HTMLElement | null = $state(null);
	let iconEl: HTMLElement | null = $state(null);

	$effect(() => {
		const el = stepContent;
		if (!el) return;
		const ctx = gsap.context(() => {
			gsap.from(el, { opacity: 0, y: 10, duration: 0.35, ease: 'premium-smooth' });
			gsap.from(el.querySelectorAll('[data-entry]'), {
				opacity: 0,
				y: 12,
				duration: 0.3,
				stagger: 0.07,
				ease: 'premium-smooth',
			});
		}, el);
		return () => ctx.revert();
	});

	$effect(() => {
		const el = iconEl;
		if (!el) return;
		const ctx = gsap.context(() => {
			gsap.to(el, { y: -5, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
		}, el);
		return () => ctx.revert();
	});

	function handleComplete() {
		demo.dailyGoal = dailyGoal;
		demo.completeOnboarding();
		goto('/demo/dashboard', { replaceState: true });
	}

	const goals = [5000, 8000, 10000];
</script>

<div class="relative flex min-h-full flex-col">
	<div class="flex items-center justify-between px-1 py-3">
		<div class="flex gap-1.5">
			{#each [1, 2, 3, 4] as dot (dot)}
				<div
					class={cn(
						'h-1.5 rounded-full transition-all duration-300',
						step === dot
							? 'w-6 bg-primary'
							: step > dot
								? 'w-1.5 bg-primary/50'
								: 'w-1.5 bg-muted-foreground/20'
					)}
				></div>
			{/each}
		</div>
		{#if step < 4}
			<Button variant="ghost" size="sm" onclick={() => step++}>
				Skip
			</Button>
		{/if}
	</div>

	<div class="flex flex-1 items-center justify-center px-4 pb-8">
		{#if step === 1}
			<div bind:this={stepContent} class="flex flex-col items-center gap-6 text-center">
				<div bind:this={iconEl} class="text-primary">
					<FootprintsIcon class="size-12" />
				</div>
				<div class="flex flex-col gap-2">
					<h1 class="font-display text-4xl font-bold">Move to Earn</h1>
					<p class="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed">
						Walk to earn screen time. Every 1000 steps unlocks 1 minute on your favorite apps.
					</p>
				</div>
				<div class="mt-auto w-full pt-8">
					<Button class="w-full" size="lg" onclick={() => step++}>
						Get Started
					</Button>
				</div>
			</div>
		{:else if step === 2}
			<div bind:this={stepContent} class="flex w-full flex-col gap-6">
				<div class="flex flex-col gap-1 text-center">
					<h2 class="text-2xl font-bold">Set Your Daily Goal</h2>
					<p class="text-muted-foreground text-sm">Choose how many steps you want to walk daily</p>
				</div>
				<div class="flex flex-col gap-3">
					{#each goals as goal (goal)}
						<Card.Root
							data-entry
							class={cn(
								'cursor-pointer transition-all duration-200',
								dailyGoal === goal
									? 'border-primary bg-primary/5'
									: 'hover:border-primary/50'
							)}
							onclick={() => (dailyGoal = goal)}
						>
							<Card.Content class="flex items-center gap-4 py-5">
								<div
									class={cn(
										'flex size-10 items-center justify-center rounded-lg',
										dailyGoal === goal ? 'bg-primary text-primary-foreground' : 'bg-muted'
									)}
								>
									{#if goal === 5000}
										<ZapIcon class="size-5" />
									{:else if goal === 8000}
										<TargetIcon class="size-5" />
									{:else}
										<CrownIcon class="size-5" />
									{/if}
								</div>
								<div class="flex flex-col">
									<span class="font-display text-xl font-bold tabular-nums">
										{goal.toLocaleString()}
									</span>
									<span class="text-muted-foreground text-xs">steps per day</span>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
				<div class="mt-auto pt-4">
					<Button class="w-full" size="lg" disabled={!dailyGoal} onclick={() => step++}>
						Continue
					</Button>
				</div>
			</div>
		{:else if step === 3}
			<div bind:this={stepContent} class="flex w-full flex-col items-center gap-6 text-center">
				<div data-entry class="text-primary">
					<BellIcon class="size-12" />
				</div>
				<div data-entry class="flex flex-col gap-1">
					<h2 class="text-2xl font-bold">Almost There</h2>
					<p class="text-muted-foreground text-sm">We need one permission to track your steps</p>
				</div>
				<Card.Root data-entry class="w-full text-left">
					<Card.Content class="flex items-center gap-4 py-5">
						<div class="flex size-10 items-center justify-center rounded-lg bg-muted">
							<HeartIcon class="size-5 text-primary" />
						</div>
						<div class="flex flex-col gap-0.5">
							<span class="font-medium">Motion & Fitness</span>
							<span class="text-muted-foreground text-xs leading-relaxed">
								StepScroller tracks your steps to convert them into screen time.
							</span>
						</div>
					</Card.Content>
				</Card.Root>
				<div data-entry class="mt-auto flex w-full flex-col gap-3 pt-4">
					<Button class="w-full" size="lg" onclick={() => step++}>
						Allow Access
					</Button>
					<Button variant="outline" class="w-full" onclick={() => step++}>
						Skip
					</Button>
				</div>
			</div>
		{:else if step === 4}
			<div bind:this={stepContent} class="flex flex-col items-center gap-6 text-center">
				<div data-entry class="text-emerald-500">
					<CheckCircleIcon class="size-16" />
				</div>
				<div data-entry class="flex flex-col gap-1">
					<h2 class="text-2xl font-bold">You're All Set!</h2>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Walk {dailyGoal.toLocaleString()} steps daily to earn screen time.
					</p>
				</div>
				<div data-entry class="mt-auto flex w-full flex-col gap-2 pt-8">
					<Button class="w-full" size="lg" onclick={handleComplete}>
						<SparklesIcon class="size-4" />
						Start Walking
					</Button>
				</div>
			</div>
		{/if}
	</div>
</div>
