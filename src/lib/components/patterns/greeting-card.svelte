<script lang="ts">
	import SunriseIcon from "@lucide/svelte/icons/sunrise";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonStarIcon from "@lucide/svelte/icons/moon-star";
	import FlameIcon from "@lucide/svelte/icons/flame";
	import * as Card from "$lib/components/ui/card";
	import * as Avatar from "$lib/components/ui/avatar";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Props {
		name: string;
		avatar?: string;
		streak?: number;
		quote?: string;
		class?: string;
	}

	let { name, avatar, streak, quote, class: className }: Props = $props();

	let hour = $state(new Date().getHours());

	$effect(() => {
		const interval = setInterval(() => {
			hour = new Date().getHours();
		}, 60000);
		return () => clearInterval(interval);
	});

	let greeting = $derived(
		hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
	);

	let cardEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: "premium-smooth" });
			tl.from(cardEl!, { opacity: 0, y: 20, duration: 0.4 }, 0);
			const avatar = cardEl!.querySelector('[data-greeting-avatar]');
			const flame = cardEl!.querySelector('[data-greeting-flame]');
			const footer = cardEl!.querySelector('[data-greeting-footer]');
			if (avatar) tl.from(avatar, { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)" }, 0.05);
			if (flame) tl.from(flame, { scale: 0, opacity: 0, duration: 0.25, ease: "back.out(2)" }, 0.15);
			if (footer) tl.from(footer, { opacity: 0, y: 10, duration: 0.3 }, 0.2);
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<Card.Root bind:ref={cardEl} class={cn('overflow-hidden', className)}>
	<Card.Content class="flex items-center gap-3">
		<div data-greeting-avatar>
		<Avatar.Root class="size-10">
			{#if avatar}
				<Avatar.Image src={avatar} alt={name} />
			{/if}
			<Avatar.Fallback>{name.charAt(0).toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
		</div>
		<div class="flex flex-col gap-0.5">
			<div class="flex items-center gap-1.5">
				{#if hour < 12}
					<SunriseIcon class="size-4 text-amber-500" />
				{:else if hour < 17}
					<SunIcon class="size-4 text-amber-500" />
				{:else}
					<MoonStarIcon class="size-4 text-indigo-400" />
				{/if}
				<span class="text-muted-foreground text-xs">{greeting}</span>
			</div>
			<p class="text-base font-medium">{name}</p>
		</div>
		{#if streak !== undefined}
			<div data-greeting-flame class="ml-auto flex items-center gap-1 text-sm">
				<FlameIcon class="size-4 text-orange-500" />
				<span class="font-medium">{streak}</span>
			</div>
		{/if}
	</Card.Content>
	{#if quote}
		<Card.Footer data-greeting-footer class="text-muted-foreground text-xs italic leading-relaxed">
			&ldquo;{quote}&rdquo;
		</Card.Footer>
	{/if}
</Card.Root>
