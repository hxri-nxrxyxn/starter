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
let contentEl: HTMLElement | null = $state(null);
let glowEl: HTMLElement | null = $state(null);
let timerEl: HTMLElement | null = $state(null);

onMount(() => {
	if (!overlayEl) return;
	const ctx = gsap.context(() => {
		gsap.from(overlayEl, { opacity: 0, duration: 0.25, ease: 'power2.out' });
		if (contentEl) {
			gsap.from(contentEl.querySelectorAll('[data-anim]'), {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: 0.1,
				ease: 'power2.out',
			});
		}
		if (glowEl) {
			gsap.to(glowEl, {
				scale: 1.15,
				opacity: 0.6,
				duration: 2.5,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
			});
		}
	}, overlayEl);

	return () => ctx.revert();
});

$effect(() => {
	if (!timerEl || !glowEl) return;
	const isLow = demo.sessionRemaining < 30 && demo.sessionRemaining > 0;
	gsap.to(timerEl, {
		color: isLow ? 'var(--color-amber-500)' : 'var(--color-foreground)',
		duration: 0.3,
		ease: 'power2.out',
		overwrite: 'auto',
	});
	gsap.to(glowEl, {
		duration: isLow ? 0.8 : 2.5,
		overwrite: 'auto',
	});
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
		class={cn('fixed inset-0 z-50 flex flex-col items-center justify-center bg-background', className)}
	>
		<button
			onclick={endSession}
			class="absolute right-4 top-4 z-10 p-2 text-muted-foreground hover:text-foreground"
			aria-label="End session"
		>
			<XIcon class="size-6" />
		</button>

		<div bind:this={contentEl} class="relative flex flex-col items-center">
			<div
				bind:this={glowEl}
				class="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
			></div>

			<div data-anim class="relative z-10 mb-4 flex flex-col items-center gap-2">
				{#if demo.activeSession === 'instagram'}
					<CameraIcon class="size-8 text-muted-foreground" />
				{:else if demo.activeSession === 'youtube'}
					<PlaySquareIcon class="size-8 text-muted-foreground" />
				{/if}
				<span class="text-sm font-medium text-muted-foreground">Unlocked</span>
			</div>

			<span
				bind:this={timerEl}
				data-anim
				class="font-display font-bold tabular-nums leading-none tracking-tight text-foreground"
				style="font-size: 38vh;"
			>
				{demo.formatDuration(demo.sessionRemaining)}
			</span>

			<div data-anim class="relative z-10 mt-8">
				<Button variant="destructive" onclick={endSession}>End Session</Button>
			</div>
		</div>
	</div>
{/if}
