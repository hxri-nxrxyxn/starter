<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import type { BlockedSite } from '$lib/stores/demo.svelte.js';
	import SessionOverlay from '$lib/components/demo/session-overlay.svelte';
	import { LeaderboardPanel } from '$lib/components/sections/index.js';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import PlayIcon from '@lucide/svelte/icons/play';
	import TimerIcon from '@lucide/svelte/icons/timer';

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
		<div class="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-sm font-medium tabular-nums">
			<TimerIcon class="size-3.5 text-muted-foreground" />
			{demo.minutes} min
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-lg font-semibold tracking-tight">Blocked Apps</h2>
		<div bind:this={listEl} class="flex flex-col gap-3">
			<Card.Root data-site-card>
				<Card.Content class="flex items-center gap-4 py-5">
					<div class="flex size-12 items-center justify-center rounded-xl bg-muted">
						<CameraIcon class="size-6 text-muted-foreground" />
					</div>
					<div class="flex flex-1 flex-col gap-0.5">
						<p class="text-sm font-semibold">Instagram</p>
						<span class="text-muted-foreground text-xs">
							{demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes === 1 ? '' : 's'} available` : 'Out of minutes'}
						</span>
					</div>
					<div class="flex items-center gap-2">
						{#if demo.minutes <= 0}
							<Badge variant="secondary">Out of minutes</Badge>
						{:else}
							<Button size="sm" disabled={!!demo.activeSession} onclick={() => handleStartSession('instagram')}>
								<TimerIcon data-icon="inline-start" />
								Start 5min
							</Button>
						{/if}
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root data-site-card>
				<Card.Content class="flex items-center gap-4 py-5">
					<div class="flex size-12 items-center justify-center rounded-xl bg-muted">
						<PlayIcon class="size-6 text-muted-foreground" />
					</div>
					<div class="flex flex-1 flex-col gap-0.5">
						<p class="text-sm font-semibold">YouTube</p>
						<span class="text-muted-foreground text-xs">
							{demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes === 1 ? '' : 's'} available` : 'Out of minutes'}
						</span>
					</div>
					<div class="flex items-center gap-2">
						{#if demo.minutes <= 0}
							<Badge variant="secondary">Out of minutes</Badge>
						{:else}
							<Button size="sm" disabled={!!demo.activeSession} onclick={() => handleStartSession('youtube')}>
								<TimerIcon data-icon="inline-start" />
								Start 5min
							</Button>
						{/if}
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>

	<LeaderboardPanel />

	{#if demo.minutes <= 0 && !demo.activeSession}
		<div class="flex flex-col items-center gap-2 py-12 text-center">
			<TimerIcon class="size-8 text-muted-foreground/40" />
			<p class="text-sm font-medium text-muted-foreground/60">No minutes available</p>
			<p class="text-xs text-muted-foreground/40">Walk to earn screen time — 1000 steps = 1 minute</p>
		</div>
	{/if}
</div>

{#if demo.activeSession}
	<SessionOverlay />
{/if}
