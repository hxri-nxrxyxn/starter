<script lang="ts">
import { gsap } from '$lib/animate/index.js';
import { cn } from '$lib/utils.js';
import { demo } from '$lib/stores/demo.svelte.js';
import { onMount } from 'svelte';
import { Button } from '$lib/components/ui/button/index.js';
import FootprintsIcon from '@lucide/svelte/icons/footprints';
import Loader2Icon from '@lucide/svelte/icons/loader-2';

interface Props {
	onWalkComplete?: (stepsAdded: number) => void;
	class?: string;
}

let { onWalkComplete, class: className }: Props = $props();

let loading = $state(false);
let badgeSteps: number | null = $state(null);
let badgeEl: HTMLElement | null = $state(null);

let mounted = true;
onMount(() => {
	return () => {
		mounted = false;
	};
});

$effect(() => {
	if (badgeSteps === null || !badgeEl) return;
	const tl = gsap.timeline();
	tl.fromTo(
		badgeEl,
		{ opacity: 0, y: 0, scale: 0 },
		{ opacity: 1, y: -20, scale: 1, duration: 0.5, ease: 'premium-bounce' },
	)
		.to(badgeEl, { opacity: 0, y: -40, duration: 0.4, ease: 'power2.out' })
		.call(() => {
			badgeSteps = null;
		});
	return () => {
		tl.kill();
	};
});

async function handleWalk() {
	if (loading) return;
	loading = true;
	await new Promise((r) => setTimeout(r, 2000));
	if (!mounted) return;
	const stepsAdded = Math.floor(Math.random() * 1001) + 500;
	demo.addSteps(stepsAdded);
	badgeSteps = stepsAdded;
	onWalkComplete?.(stepsAdded);
	loading = false;
}
</script>

<div class={cn('relative inline-flex', className)}>
	<Button onclick={handleWalk} disabled={loading}>
		{#if loading}
			<Loader2Icon data-icon="inline-start" class="animate-spin" />
			Walking...
		{:else}
			<FootprintsIcon data-icon="inline-start" />
			Take a Walk
		{/if}
	</Button>
	{#if badgeSteps !== null}
		<span
			bind:this={badgeEl}
			class="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none font-display text-lg font-bold text-emerald-500"
		>
			+{badgeSteps}
		</span>
	{/if}
</div>
