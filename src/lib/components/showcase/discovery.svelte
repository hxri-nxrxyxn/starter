<script lang="ts">
	import { toast } from 'svelte-sonner';
	import SearchPage from '$lib/components/sections/discovery/search-page.svelte';
	import TrendingCarousel from '$lib/components/sections/discovery/trending-carousel.svelte';

	let { class: className }: { class?: string } = $props();

	const trendingItems = [
		{ id: '1', title: 'Morning Routine', description: 'Start your day right', badge: 'Trending' },
		{ id: '2', title: 'Svelte 5 Deep Dive', description: 'All about runes', badge: 'New' },
		{ id: '3', title: 'GSAP Animation Tips', description: 'Premium eases guide', badge: 'Popular' },
	];
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">SearchPage</h2>
	<SearchPage onSelect={(item) => toast(`Selected: ${item.title}`)} />
	<h2 class="text-lg font-semibold tracking-tight">TrendingCarousel</h2>
	<TrendingCarousel items={trendingItems} onSelect={(id) => toast(`Trending: ${id}`)} />
</div>
