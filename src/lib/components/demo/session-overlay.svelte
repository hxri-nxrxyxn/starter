<script lang="ts">
import { gsap } from '$lib/animate/index.js';
import { cn } from '$lib/utils.js';
import { demo } from '$lib/stores/demo.svelte.js';
import { onMount, onDestroy } from 'svelte';
import { Button } from '$lib/components/ui/button/index.js';
import CameraIcon from '@lucide/svelte/icons/camera';
import PlaySquareIcon from '@lucide/svelte/icons/play-square';
import XIcon from '@lucide/svelte/icons/x';

let { class: className }: { class?: string } = $props();

let overlayEl: HTMLElement | null = $state(null);
let timerEl: HTMLElement | null = $state(null);
let contentEl: HTMLElement | null = $state(null);

onMount(() => {
	if (!overlayEl) return;
	const ctx = gsap.context(() => {
		gsap.from(overlayEl, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'premium-smooth' });
		if (contentEl) {
			gsap.from(contentEl.children, {
				opacity: 0,
				y: 15,
				scale: 0.95,
				duration: 0.35,
				stagger: 0.08,
				ease: 'premium-smooth',
			});
		}
	}, overlayEl);
	return () => ctx.revert();
});

let pulseTween: gsap.core.Tween | null = $state(null);

$effect(() => {
	if (!timerEl) return;
	const shouldPulse = demo.sessionRemaining < 30 && demo.sessionRemaining > 0;
	if (shouldPulse && !pulseTween) {
		pulseTween = gsap.to(timerEl, {
			scale: 1.05,
			duration: 0.5,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
		});
	} else if (!shouldPulse && pulseTween) {
		pulseTween.kill();
		pulseTween = null;
		gsap.set(timerEl, { scale: 1 });
	}
	return () => {
		if (pulseTween) {
			pulseTween.kill();
			pulseTween = null;
		}
	};
});

function endSession() {
	demo.endSession();
}

onDestroy(() => {
	demo.endSession();
});
</script>

{#if demo.activeSession}
	<div
		bind:this={overlayEl}
		role="dialog"
		aria-modal="true"
		class={cn('fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background/80 backdrop-blur-sm', className)}
	>
		<button onclick={endSession} class="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground">
			<XIcon class="size-6" />
		</button>

		<div bind:this={contentEl} class="flex flex-col items-center gap-8">
			<div class="flex flex-col items-center gap-2">
				{#if demo.activeSession === 'instagram'}
					<CameraIcon class="size-12 text-pink-500" />
				{:else if demo.activeSession === 'youtube'}
					<PlaySquareIcon class="size-12 text-red-500" />
				{/if}
				<span class="text-lg font-medium text-muted-foreground">Unlocked</span>
			</div>

			<span
				bind:this={timerEl}
				class={cn('font-display text-7xl font-bold tabular-nums', demo.sessionRemaining < 30 && 'text-amber-500')}
			>
				{demo.formatDuration(demo.sessionRemaining)}
			</span>

			<Button variant="destructive" onclick={endSession}>End Session</Button>
		</div>
	</div>
{/if}
