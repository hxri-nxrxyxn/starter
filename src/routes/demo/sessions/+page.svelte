<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import type { BlockedSite } from '$lib/stores/demo.svelte.js';
	import SessionOverlay from '$lib/components/demo/session-overlay.svelte';
	import MinuteTimer from '$lib/components/demo/minute-timer.svelte';
	import EmptyState from '$lib/components/patterns/empty-state.svelte';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import PlayIcon from '@lucide/svelte/icons/play';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';

	const sites = [
		{ id: 'instagram' as BlockedSite, name: 'Instagram', icon: CameraIcon, color: 'text-pink-500' },
		{ id: 'youtube' as BlockedSite, name: 'YouTube', icon: PlayIcon, color: 'text-red-500' },
	];

	let listEl: HTMLElement | null = $state(null);

	onMount(() => {
		if (!listEl) return;
		const ctx = gsap.context(() => {
			const cards = listEl!.querySelectorAll('[data-site-card]');
			gsap.from(cards, {
				opacity: 0,
				y: 20,
				duration: 0.35,
				stagger: 0.1,
				ease: 'premium-smooth',
			});
		}, listEl);
		return () => ctx.revert();
	});

	function handleStartSession(siteId: BlockedSite) {
		demo.startSession(siteId, 5);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold">Unlock Apps</h1>
		<MinuteTimer />
	</div>

	<div bind:this={listEl} class="flex flex-col gap-3">
		{#each sites as site (site.id)}
			{@const SiteIcon = site.icon}
			<Card.Root data-site-card>
				<Card.Content class="flex items-center gap-4 py-5">
					<div class={cn('flex size-12 items-center justify-center rounded-xl bg-muted', site.color)}>
						<SiteIcon class="size-6" />
					</div>
					<div class="flex flex-1 flex-col gap-0.5">
						<span class="font-semibold">{site.name}</span>
						<span class="text-muted-foreground text-xs">
							{demo.minutes > 0
								? `${demo.minutes} minute${demo.minutes === 1 ? '' : 's'} available`
								: 'Out of minutes'}
						</span>
					</div>
					<div class="flex items-center gap-2">
						{#if demo.minutes <= 0}
							<Badge variant="secondary">Out of minutes</Badge>
						{:else}
							<Button
								size="sm"
								disabled={demo.minutes <= 0 || !!demo.activeSession}
								onclick={() => handleStartSession(site.id)}
							>
								<TimerIcon class="size-3.5" />
								Start 5min
							</Button>
						{/if}
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	{#if demo.minutes <= 0 && !demo.activeSession}
		<EmptyState
			icon={SparklesIcon}
			title="No minutes available"
			description="Go for a walk to earn screen time. Every 1000 steps unlocks 1 minute."
		/>
	{/if}
</div>

{#if demo.activeSession}
	<SessionOverlay />
{/if}
