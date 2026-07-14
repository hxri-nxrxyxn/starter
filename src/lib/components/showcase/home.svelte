<script lang="ts">
	import { toast } from 'svelte-sonner';
	import HeroSection from '$lib/components/sections/home/hero-section.svelte';
	import { BigTimer, AnimatedStatCounter, FeatureGrid, TestimonialCarousel } from '$lib/components/sections/index.js';

	let { class: className }: { class?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="-mx-4 -mt-4">
		<HeroSection
			headline="28 Composites Ready"
			subheadline="Svelte 5 · shadcn-svelte · GSAP — copy-paste into any app"
			ctaLabel="Explore"
			onCta={() => toast('App Starter ready!')}
		/>
	</div>
	<h2 class="text-lg font-semibold tracking-tight">BigTimer</h2>
	<BigTimer value={28} label="section composites" sub="40 pattern components · 0 errors" />
	<h2 class="text-lg font-semibold tracking-tight">AnimatedStatCounter</h2>
	<AnimatedStatCounter value={2840} label="Components Built" />
	<h2 class="text-lg font-semibold tracking-tight">FeatureGrid</h2>
	<FeatureGrid />
	<h2 class="text-lg font-semibold tracking-tight">TestimonialCarousel</h2>
	<TestimonialCarousel />
</div>
