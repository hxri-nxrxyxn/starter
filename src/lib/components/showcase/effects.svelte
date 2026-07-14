<script lang="ts">
	import { HeroNumber, VariableText, GlassBlob, HeroWord, InfiniteRibbon, SpotlightCard } from '$lib/effects/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { gsap } from '$lib/animate/index.js';

	let count = $state(8431);
	let textVal = $state('PROGRESS');
	let word = $state('FOCUS');
	let pageEl: HTMLDivElement | null = $state(null);

	const words = ['FOCUS', 'MOTION', 'ENERGY', 'FLOW', 'GROWTH'];
	const texts = ['PROGRESS', 'MOMENTUM', 'IMPACT', 'FORWARD'];

	onMount(() => {
		if (!pageEl) return;
		gsap.context(() => {
			gsap.from(pageEl!.querySelectorAll('[data-anim]'), {
				opacity: 0, y: 30, duration: 0.5, stagger: 0.15, ease: 'premium-smooth',
			});
		}, pageEl);
	});
</script>

<div bind:this={pageEl} class="-mx-4 flex flex-col gap-4">
	<div data-anim class="relative h-dvh overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%);">
		<GlassBlob size={500} speed={1.5} class="absolute inset-0" />
		<div class="relative z-10 flex h-full flex-col items-center justify-center gap-4">
			<HeroNumber value={count} label="STEPS TODAY" />
			<div class="flex gap-2">
				<Button size="sm" variant="outline" onclick={() => count = Math.floor(Math.random() * 50000)}>Random</Button>
				<Button size="sm" variant="outline" onclick={() => count += 1000}>+1000</Button>
			</div>
		</div>
	</div>

	<div data-anim class="relative h-[60vh] overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%);">
		<HeroWord text={word} opacity={0.04} />
		<GlassBlob size={400} speed={0.8} class="absolute inset-0" />
		<div class="relative z-10 flex h-full flex-col items-center justify-center gap-6">
			<VariableText text={textVal} loop fromWeight={200} toWeight={900} />
			<div class="flex gap-2">
				{#each texts as t (t)}
					<Button size="xs" variant="ghost" onclick={() => textVal = t}>{t}</Button>
				{/each}
				{#each words as w (w)}
					<Button size="xs" variant="ghost" onclick={() => word = w}>{w}</Button>
				{/each}
			</div>
		</div>
	</div>

	<div data-anim class="relative h-[70vh] overflow-hidden bg-black" style="width: 100vw; margin-left: calc(-50vw + 50%);">
		<SpotlightCard title="Premium Feature" description="A glowing card on a dark background with a pulsing radial glow" variant="dark" />
	</div>

	<div data-anim class="relative h-32 overflow-hidden" style="width: 100vw; margin-left: calc(-50vw + 50%);">
		<InfiniteRibbon text="CREATE MOMENTUM " speed={15} opacity={0.06} fontSize={100} />
	</div>
</div>
