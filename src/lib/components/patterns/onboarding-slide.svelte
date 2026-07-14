<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Choice {
		id: string;
		label: string;
		icon?: any;
		description?: string;
	}

	let {
		icon: Icon,
		title,
		description = "",
		actionLabel = "Continue",
		actionSecondary = undefined,
		onAction = undefined,
		onSecondary = undefined,
		choices = [] as Choice[],
		selected = "",
		onSelect = undefined as ((id: string) => void) | undefined,
		step = 1,
		totalSteps = 1,
		class: className,
	}: {
		icon?: any;
		title: string;
		description?: string;
		actionLabel?: string;
		actionSecondary?: string;
		onAction?: () => void;
		onSecondary?: () => void;
		choices?: Choice[];
		selected?: string;
		onSelect?: (id: string) => void;
		step?: number;
		totalSteps?: number;
		class?: string;
	} = $props();

	let el: HTMLElement | null = $state(null);

	onMount(() => {
		if (!el) return;
		const ctx = gsap.context(() => {
			gsap.from(el!.children, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: { amount: 0.25, from: "start" },
				ease: "premium-smooth",
				clearProps: "opacity,y",
			});
		}, el);
		return () => ctx.revert();
	});
</script>

<div
	bind:this={el}
	data-slot="onboarding-slide"
	class={cn(
		"flex min-h-80 w-full flex-col items-center justify-center gap-6 px-6 py-10 text-center",
		className
	)}
>
	{#if step && totalSteps > 1}
		<div class="flex items-center gap-1.5" data-onboarding-steps>
			{#each Array(totalSteps) as _, i}
				<div
					class={cn(
						"h-1.5 rounded-full transition-all duration-200",
						i + 1 === step
							? "w-6 bg-primary"
							: i + 1 < step
								? "w-1.5 bg-primary/40"
								: "w-1.5 bg-muted-foreground/20"
					)}
				></div>
			{/each}
		</div>
	{/if}

	{#if Icon}
		<div class="flex items-center justify-center">
			<Icon class="size-16 text-primary" />
		</div>
	{/if}

	<h2 class="text-2xl font-bold tracking-tight">{title}</h2>

	{#if description}
		<p class="text-muted-foreground mx-auto max-w-sm text-balance text-sm leading-relaxed">
			{description}
		</p>
	{/if}

	{#if choices.length > 0}
		<div class="flex w-full max-w-sm flex-col gap-2.5">
			{#each choices as choice (choice.id)}
				<button
					type="button"
					data-choice
					onclick={() => onSelect?.(choice.id)}
					class={cn(
						"flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-150",
						selected === choice.id
							? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
							: "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
					)}
				>
					{#if choice.icon}
						<choice.icon class="size-5 shrink-0" />
					{/if}
					<div class="min-w-0 flex-1">
						<span>{choice.label}</span>
						{#if choice.description}
							<p class="text-muted-foreground mt-0.5 text-xs font-normal">{choice.description}</p>
						{/if}
					</div>
					<div
						class={cn(
							"flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
							selected === choice.id ? "border-primary bg-primary" : "border-muted-foreground/30"
						)}
					>
						{#if selected === choice.id}
							<svg class="size-3 text-primary-foreground" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 8l3.5 3.5L13 4" />
							</svg>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	{/if}

	<div class="flex flex-col items-center gap-2">
		{#if onAction}
			<Button
				size="lg"
				class="min-w-40 px-8 py-5 text-base"
				onclick={onAction}
			>
				{actionLabel}
			</Button>
		{/if}
		{#if onSecondary}
			<button
				type="button"
				onclick={onSecondary}
				class="text-muted-foreground hover:text-foreground cursor-pointer text-sm font-medium transition-colors"
			>
				{actionSecondary}
			</button>
		{/if}
	</div>
</div>
