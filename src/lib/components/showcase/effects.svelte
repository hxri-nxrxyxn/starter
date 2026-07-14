<script lang="ts">
	import { HeroNumber, VariableText, GlassBlob, HeroWord, InfiniteRibbon, SpotlightCard } from '$lib/effects/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { gsap } from '$lib/animate/index.js';

	let { class: className }: { class?: string } = $props();

	let count = $state(8431);
	let textVal = $state('PROGRESS');
	let word = $state('FOCUS');
	let pageEl: HTMLDivElement | null = $state(null);

	const words = ['FOCUS', 'MOTION', 'ENERGY', 'FLOW', 'GROWTH'];
	const texts = ['PROGRESS', 'MOMENTUM', 'IMPACT', 'FORWARD'];

	onMount(() => {
		if (!pageEl) return;
		const ctx = gsap.context(() => {
			gsap.from(pageEl!.querySelectorAll('[data-anim]'), {
				opacity: 0, y: 30, duration: 0.5, stagger: 0.15, ease: 'premium-smooth',
			});
		}, pageEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={pageEl} class="flex flex-col gap-4">
	<div data-anim class="relative h-[80vh] w-full overflow-hidden">
		<GlassBlob size={400} speed={1.2} class="absolute inset-0" />
		<div class="relative z-10 flex h-full flex-col items-center justify-center">
			<HeroNumber value={count} />
			<div class="mt-4 flex gap-2">
				<Button size="sm" variant="outline" onclick={() => count = Math.floor(Math.random() * 50000)}>Random</Button>
				<Button size="sm" variant="outline" onclick={() => count += 1000}>+1000</Button>
			</div>
		</div>
	</div>

	<div data-anim class="relative h-[50vh] w-full overflow-hidden rounded-xl bg-muted/10">
		<HeroWord text={word} opacity={0.04} />
		<GlassBlob size={300} speed={0.8} class="absolute inset-0" />
		<div class="relative z-10 flex h-full flex-col items-center justify-center gap-3">
			<VariableText text={textVal} loop fromWeight={200} toWeight={900} />
			<div class="flex gap-2">
				{#each texts as t (t)}
					<Button size="xs" variant="ghost" onclick={() => textVal = t}>{t}</Button>
				{/each}
			</div>
		</div>
	</div>

	<div data-anim class="relative h-[60vh] w-full overflow-hidden rounded-xl bg-background">
		<SpotlightCard title="Premium Feature" description="A glowing card on dark background with continuous pulse" variant="dark" />
	</div>

	<div data-anim class="relative h-40 w-full overflow-hidden">
		<InfiniteRibbon text="CREATE MOMENTUM " speed={18} opacity={0.05} fontSize={80} />
	</div>

	<div data-anim class="flex flex-wrap gap-2 pb-4">
		{#each words as w (w)}
			<Button size="xs" variant="ghost" onclick={() => word = w}>{w}</Button>
		{/each}
	</div>
</div>
