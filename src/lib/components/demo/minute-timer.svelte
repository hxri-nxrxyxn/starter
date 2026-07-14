<script lang="ts">
import { gsap } from '$lib/animate/index.js';
import { cn } from '$lib/utils.js';
import { demo } from '$lib/stores/demo.svelte.js';
import { onMount } from 'svelte';
import TimerIcon from '@lucide/svelte/icons/timer';

let { class: className }: { class?: string } = $props();

let el: HTMLElement | null = $state(null);

const minutes = $derived(demo.minutes);
const isLow = $derived(minutes < 2);

onMount(() => {
	if (!el || minutes <= 0) return;
	const ctx = gsap.context(() => {
		gsap.to(el, {
			scale: 1.02,
			duration: 1,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
		});
	}, el);
	return () => ctx.revert();
});
</script>

<div
	bind:this={el}
	class={cn('flex flex-col items-center gap-1 transition-colors', isLow && 'text-amber-500', className)}
>
	<TimerIcon class={cn('size-5', isLow ? 'text-amber-500' : 'text-muted-foreground')} />
	<span class={cn('font-display text-5xl font-bold tabular-nums', isLow && 'text-amber-500')}>
		{minutes}
	</span>
	<span class={cn('text-xs', isLow ? 'text-amber-500' : 'text-muted-foreground')}>
		Minutes Available
	</span>
</div>
