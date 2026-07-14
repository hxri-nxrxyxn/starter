<script lang="ts">
	import { cn } from "$lib/utils.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import type { Snippet } from "svelte";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface HeroSection {
		image?: string;
		icon?: any;
		title: string;
		subtitle?: string;
		badge?: string;
	}

	interface MetadataItem {
		label: string;
		value: string;
	}

	interface ActionItem {
		icon?: any;
		label: string;
		variant?: string;
		onClick?: () => void;
	}

	let {
		hero = undefined,
		metadata = undefined,
		actions = undefined,
		children,
		class: className,
	}: {
		hero?: HeroSection;
		metadata?: MetadataItem[];
		actions?: ActionItem[];
		children?: Snippet;
		class?: string;
	} = $props();

	let pageEl: HTMLDivElement | undefined = $state();
	let metadataEl: HTMLDListElement | undefined = $state();
	let actionsEl: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!pageEl) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ ease: "premium-smooth" });
			tl.from(pageEl!, { opacity: 0, y: 20, duration: 0.4 }, 0);
			const heroCard = pageEl!.querySelector("[data-detail-hero]");
			if (heroCard) tl.from(heroCard, { opacity: 0, y: 15, duration: 0.35 }, 0.05);
			if (metadataEl) {
				const items = metadataEl.querySelectorAll("div");
				tl.from(items, { opacity: 0, y: 10, duration: 0.3, stagger: 0.04 }, 0.15);
			}
			if (actionsEl) tl.from(actionsEl, { opacity: 0, y: 10, duration: 0.3 }, 0.3);
		}, pageEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={pageEl} data-slot="detail-page" class={cn("flex flex-col gap-6", className)}>
	{#if hero}
		<Card.Card data-detail-hero>
			{#if hero.image}
				<img
					src={hero.image}
					alt={hero.title}
					class="h-48 w-full object-cover"
				/>
			{/if}
			<Card.CardHeader>
				<Card.CardAction>
					{#if hero.badge}
						<Badge variant="outline">{hero.badge}</Badge>
					{/if}
				</Card.CardAction>
				<div class="flex items-center gap-2">
					{#if hero.icon}
						<hero.icon class="size-5" />
					{/if}
					<div>
						<Card.CardTitle>{hero.title}</Card.CardTitle>
						{#if hero.subtitle}
							<Card.CardDescription>{hero.subtitle}</Card.CardDescription>
						{/if}
					</div>
				</div>
			</Card.CardHeader>
		</Card.Card>
	{/if}

	{#if metadata && metadata.length > 0}
		<dl bind:this={metadataEl} class="grid grid-cols-2 gap-x-6 gap-y-4">
			{#each metadata as item (item.label)}
				<div class="rounded-lg bg-muted/50 px-3 py-2.5">
					<dt class="text-muted-foreground text-xs">{item.label}</dt>
					<dd class="mt-0.5 text-lg font-semibold tracking-tight">{item.value}</dd>
				</div>
			{/each}
		</dl>
		<Separator />
	{/if}

	{@render children?.()}

	{#if actions && actions.length > 0}
		<Separator />
		<div bind:this={actionsEl} class="flex flex-wrap gap-2">
			{#each actions as action (action.label)}
				<Button
					variant={(action.variant ?? "default") as any}
					onclick={action.onClick}
				>
					{#if action.icon}
						<action.icon data-icon="inline-start" />
					{/if}
					{action.label}
				</Button>
			{/each}
		</div>
	{/if}
</div>
