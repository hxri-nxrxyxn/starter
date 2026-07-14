<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";
	import ImageIcon from "@lucide/svelte/icons/image";
	import MapPinIcon from "@lucide/svelte/icons/map-pin";
	import SmileIcon from "@lucide/svelte/icons/smile";
	import XIcon from "@lucide/svelte/icons/x";
	import Loader2Icon from "@lucide/svelte/icons/loader-2";

	interface Props {
		placeholder?: string;
		maxLength?: number;
		onSubmit?: (content: string) => void;
		class?: string;
	}

	let {
		placeholder = "What's on your mind?",
		maxLength = 280,
		onSubmit,
		class: className,
	}: Props = $props();

	let content = $state("");
	let loading = $state(false);
	let composerEl: HTMLDivElement | null = $state(null);

	const charsLeft = $derived(maxLength - content.length);
	const isNearLimit = $derived(charsLeft <= 20);
	const isOverLimit = $derived(charsLeft < 0);
	const canSubmit = $derived(content.trim().length > 0 && !isOverLimit);

	async function handleSubmit() {
		if (!canSubmit || loading) return;
		loading = true;
		try {
			await onSubmit?.(content.trim());
			content = "";
		} finally {
			loading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
			handleSubmit();
		}
	}

	onMount(() => {
		if (!composerEl) return;
		const ctx = gsap.context(() => {
			gsap.from(composerEl!, { opacity: 0, y: 20, duration: 0.35, ease: "premium-smooth" });
		}, composerEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={composerEl} class={cn("rounded-xl border bg-card p-3", className)}>
	<div class="flex gap-3">
		<Avatar.Root size="sm" class="mt-1 shrink-0">
			<Avatar.Fallback>U</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-1 flex-col gap-2">
			<Textarea
				bind:value={content}
				{placeholder}
				class="min-h-[80px] resize-none border-none bg-transparent p-0 text-sm focus-visible:ring-0"
				onkeydown={handleKeydown}
			/>
			{#if content.length > 0}
				<div class="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
					<ImageIcon class="size-4 text-muted-foreground" />
					<span class="flex-1 text-xs text-muted-foreground">Add media (optional)</span>
					<Button variant="ghost" size="icon-xs" onclick={() => {}}>
						<XIcon class="size-3" />
					</Button>
				</div>
			{/if}
		</div>
	</div>
	<div class="mt-3 flex items-center justify-between border-t pt-3">
		<div class="flex items-center gap-1">
			<Button variant="ghost" size="icon-sm" class="text-muted-foreground">
				<ImageIcon class="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm" class="text-muted-foreground">
				<MapPinIcon class="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm" class="text-muted-foreground">
				<SmileIcon class="size-4" />
			</Button>
		</div>
		<div class="flex items-center gap-3">
			<span
				class={cn(
					"text-xs tabular-nums",
					isOverLimit && "font-semibold text-destructive",
					isNearLimit && !isOverLimit && "text-amber-500",
					!isNearLimit && "text-muted-foreground"
				)}
			>
				{charsLeft}
			</span>
			<Button size="sm" disabled={!canSubmit} onclick={handleSubmit}>
				{#if loading}
					<Loader2Icon class="size-4 animate-spin" />
				{/if}
				Post
			</Button>
		</div>
	</div>
</div>
