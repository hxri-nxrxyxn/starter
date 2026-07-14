<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";
	import HeartIcon from "@lucide/svelte/icons/heart";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";

	interface Comment {
		id: string;
		username: string;
		avatar?: string;
		text: string;
		timestamp: Date;
		likes: number;
		liked?: boolean;
	}

	interface Props {
		comments?: Comment[];
		onAddComment?: (text: string) => void;
		onLikeComment?: (id: string) => void;
		class?: string;
	}

	let {
		comments = [],
		onAddComment,
		onLikeComment,
		class: className,
	}: Props = $props();

	function cloneComments() { return [...comments]; }
	let items = $state.raw(cloneComments());
	let inputValue = $state("");
	let sectionEl: HTMLDivElement | undefined = $state();
	let commentEls: HTMLDivElement[] = [];

	function commentRef(node: HTMLDivElement) {
		commentEls.push(node);
		return () => {
			commentEls = commentEls.filter((el) => el !== node);
		};
	}

	function relativeTime(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		if (diffMins < 1) return "Just now";
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		const diffDays = Math.floor(diffHours / 24);
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	}

	function handleLikeComment(id: string) {
		items = items.map((c) =>
			c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
		);
		onLikeComment?.(id);
	}

	function handleAddComment() {
		const text = inputValue.trim();
		if (!text) return;
		const newComment: Comment = {
			id: `comment-${Date.now()}`,
			username: "You",
			text,
			timestamp: new Date(),
			likes: 0,
			liked: false,
		};
		items = [...items, newComment];
		inputValue = "";
		onAddComment?.(text);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleAddComment();
		}
	}

	const commentTimes = $derived.by(() => items.map((c) => relativeTime(c.timestamp)));

	onMount(() => {
		if (commentEls.length === 0) return;
		const ctx = gsap.context(() => {
			gsap.from(commentEls, {
				opacity: 0,
				y: 12,
				duration: 0.3,
				stagger: 0.04,
				ease: "premium-smooth",
			});
		}, sectionEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={sectionEl} class={cn("flex flex-col", className)}>
	<div class="flex items-center gap-2 px-4 py-3">
		<MessageCircleIcon class="size-4 text-muted-foreground" />
		<h3 class="text-sm font-semibold">Comments</h3>
		<span class="text-xs text-muted-foreground">({items.length})</span>
	</div>
	<Separator />
	<div class="flex-1 space-y-0 overflow-y-auto">
		{#each items as comment, i (comment.id)}
			<div {@attach commentRef} class="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/30">
				<Avatar.Root size="sm" class="mt-0.5 shrink-0">
					{#if comment.avatar}
						<Avatar.Image src={comment.avatar} alt={comment.username} />
					{/if}
					<Avatar.Fallback class="text-[10px]">{comment.username.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="min-w-0 flex-1">
					<div class="flex items-baseline gap-2">
						<span class="text-xs font-semibold">{comment.username}</span>
						<span class="text-[11px] text-muted-foreground">{commentTimes[i]}</span>
					</div>
					<p class="mt-0.5 text-sm leading-relaxed">{comment.text}</p>
					<div class="mt-1 flex items-center gap-3">
						<Button
							variant="ghost"
							size="xs"
							class="gap-1 text-muted-foreground"
							onclick={() => handleLikeComment(comment.id)}
						>
							<HeartIcon
								class="size-3"
								fill={comment.liked ? "currentColor" : "none"}
							/>
							<span class="text-[11px]">{comment.likes}</span>
						</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<Separator />
	<div class="flex items-center gap-2 px-4 py-3">
		<Avatar.Root size="sm" class="shrink-0">
			<Avatar.Fallback class="text-[10px]">U</Avatar.Fallback>
		</Avatar.Root>
		<Input
			bind:value={inputValue}
			placeholder="Add a comment..."
			class="h-8 text-sm"
			onkeydown={handleKeydown}
		/>
		<Button
			size="sm"
			disabled={!inputValue.trim()}
			onclick={handleAddComment}
			class="shrink-0"
		>
			Send
		</Button>
	</div>
</div>
