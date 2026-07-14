<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	interface Props {
		viewerCount?: number;
		label?: string;
		class?: string;
	}

	let {
		viewerCount = 0,
		label = 'LIVE',
		class: className = '',
	}: Props = $props();

	let dotEl = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!dotEl) return;
		const ctx = gsap.context(() => {
			gsap.to(dotEl, {
				scale: 1.5,
				opacity: 0,
				duration: 1.2,
				repeat: -1,
				ease: 'power1.inOut',
			});
		}, dotEl);
		return () => ctx.revert();
	});
</script>

<div
	class={cn('bg-destructive/10 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium', className)}
>
	<span class="relative flex size-2">
		<span
			bind:this={dotEl}
			class="bg-destructive absolute inline-flex h-full w-full rounded-full opacity-75"
		></span>
		<span class="bg-destructive relative inline-flex size-2 rounded-full"></span>
	</span>
	<span class="text-destructive">{label}</span>
	{#if viewerCount > 0}
		<span class="text-muted-foreground ml-0.5">{viewerCount}</span>
	{/if}
</div>
