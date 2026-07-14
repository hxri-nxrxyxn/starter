<script lang="ts">
	import { HeroNumber, VariableText, GlassBlob, HeroWord, InfiniteRibbon, SpotlightCard } from '$lib/effects/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let { class: className }: { class?: string } = $props();

	let count = $state(8431);
	let textVal = $state('PROGRESS');
	let word = $state('FOCUS');

	const words = ['FOCUS', 'MOTION', 'ENERGY', 'FLOW', 'GROWTH'];
	const texts = ['PROGRESS', 'MOMENTUM', 'IMPACT', 'FORWARD'];
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">HeroNumber</h2>
	<p class="text-xs text-muted-foreground">Massive rolling digit counter. 70vh. Tap to change.</p>
	<div class="relative flex h-[75vh] flex-col items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
		<HeroNumber value={count} label={"Today's Steps"} />
	</div>
	<div class="flex flex-wrap gap-2">
		<Button size="sm" variant="outline" onclick={() => count = Math.floor(Math.random() * 50000)}>Random</Button>
		<Button size="sm" variant="outline" onclick={() => count += 100}>+100</Button>
		<Button size="sm" variant="outline" onclick={() => count = Math.max(0, count - 100)}>-100</Button>
	</div>

	<Separator />

	<h2 class="text-lg font-semibold tracking-tight">VariableText</h2>
	<p class="text-xs text-muted-foreground">Font-weight animation via Inter Variable. Staggered per character.</p>
	<div class="flex h-48 items-center justify-center rounded-xl border bg-muted/30">
		<VariableText text={textVal} loop fromWeight={200} toWeight={900} />
	</div>
	<div class="flex flex-wrap gap-2">
		{#each texts as t (t)}
			<Button size="sm" variant="outline" onclick={() => textVal = t}>{t}</Button>
		{/each}
	</div>

	<Separator />

	<h2 class="text-lg font-semibold tracking-tight">GlassBlob</h2>
	<p class="text-xs text-muted-foreground">Organic moving blurred blob — ambient background effect.</p>
	<div class="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
		<GlassBlob class="absolute inset-0" size={200} speed={1.5} />
		<span class="relative text-sm font-medium text-foreground">Content sits on top of the blob</span>
	</div>

	<Separator />

	<h2 class="text-lg font-semibold tracking-tight">SpotlightCard</h2>
	<p class="text-xs text-muted-foreground">Card illuminated on dark background with pulsing radial glow.</p>
	<div class="relative flex h-72 items-center justify-center overflow-hidden rounded-xl bg-background">
		<SpotlightCard
			title="Premium Feature"
			description="This card glows while everything else stays dark"
			variant="dark"
		/>
	</div>

	<Separator />

	<h2 class="text-lg font-semibold tracking-tight">HeroWord</h2>
	<p class="text-xs text-muted-foreground">Large faint background word — creates depth behind content.</p>
	<div class="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
		<HeroWord text={word} opacity={0.06} />
		<span class="relative text-sm font-medium text-foreground">Content overlaid on the word</span>
	</div>
	<div class="flex flex-wrap gap-2">
		{#each words as w (w)}
			<Button size="sm" variant="outline" onclick={() => word = w}>{w}</Button>
		{/each}
	</div>

	<Separator />

	<h2 class="text-lg font-semibold tracking-tight">InfiniteRibbon</h2>
	<p class="text-xs text-muted-foreground">Seamless scrolling marquee — infinite loop.</p>
	<div class="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
		<InfiniteRibbon text="CREATE " speed={20} opacity={0.06} fontSize={100} />
		<span class="absolute text-sm font-medium text-foreground">Content overlays the ribbon</span>
	</div>
</div>
