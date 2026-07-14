<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";
	import PlusIcon from "@lucide/svelte/icons/plus";

	interface Story {
		id: string;
		username: string;
		avatar?: string;
		seen?: boolean;
		hasStory?: boolean;
	}

	interface Props {
		stories: Story[];
		onStoryClick?: (id: string) => void;
		class?: string;
	}

	let {
		stories,
		onStoryClick,
		class: className,
	}: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let itemEls: HTMLDivElement[] = $state([]);

	function itemRef(node: HTMLDivElement) {
		itemEls.push(node);
		return () => {
			itemEls = itemEls.filter((el) => el !== node);
		};
	}

	onMount(() => {
		if (!containerEl || itemEls.length === 0) return;
		const ctx = gsap.context(() => {
			gsap.from(itemEls, {
				opacity: 0,
				x: -20,
				duration: 0.35,
				stagger: 0.05,
				ease: "premium-smooth",
			});
		}, containerEl);
		return () => ctx.revert();
	});
</script>

<div
	bind:this={containerEl}
	class={cn("flex gap-4 overflow-x-auto overscroll-x-contain px-4 py-2 scrollbar-none", className)}
	style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;"
>
	<div
		role="button"
		tabindex="0"
		class="flex shrink-0 cursor-pointer flex-col items-center gap-1"
		style="scroll-snap-align: start;"
		onclick={() => onStoryClick?.("__your_story__")}
		onkeydown={(e) => e.key === 'Enter' && onStoryClick?.("__your_story__")}
	>
		<div class="relative flex size-16 items-center justify-center rounded-full bg-muted">
			<Avatar.Root size="lg" class="size-14">
				<Avatar.Fallback class="bg-primary text-primary-foreground">Y</Avatar.Fallback>
			</Avatar.Root>
			<div class="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
				<PlusIcon class="size-3" />
			</div>
		</div>
		<span class="max-w-16 truncate text-[11px] text-muted-foreground">Your Story</span>
	</div>

	{#each stories as story (story.id)}
		{@const hasUnseenStory = story.hasStory && !story.seen}
		<div
			{@attach itemRef}
			role="button"
			tabindex="0"
			class="flex shrink-0 cursor-pointer flex-col items-center gap-1"
			style="scroll-snap-align: start;"
			onclick={() => onStoryClick?.(story.id)}
			onkeydown={(e) => e.key === 'Enter' && onStoryClick?.(story.id)}
		>
			<div
				class="flex items-center justify-center rounded-full p-0.5"
				style={hasUnseenStory
					? "background: conic-gradient(#3b82f6, #8b5cf6, #ec4899, #3b82f6)"
					: story.seen ? "border: 2px solid hsl(var(--border))" : "border: 2px solid hsl(var(--border))"}
			>
				<Avatar.Root size="lg" class="size-14 border-2 border-background">
					{#if story.avatar}
						<Avatar.Image src={story.avatar} alt={story.username} />
					{/if}
					<Avatar.Fallback>{story.username.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
			</div>
			<span class="max-w-16 truncate text-[11px] text-muted-foreground">{story.username}</span>
		</div>
	{/each}
</div>
