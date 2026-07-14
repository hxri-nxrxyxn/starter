<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";
	import HeartIcon from "@lucide/svelte/icons/heart";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import Share2Icon from "@lucide/svelte/icons/share-2";
	import PlayIcon from "@lucide/svelte/icons/play";
	import Music2Icon from "@lucide/svelte/icons/music-2";
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";

	interface Props {
		thumbnail?: string;
		title: string;
		username?: string;
		avatar?: string;
		likes?: number;
		comments?: number;
		shares?: number;
		liked?: boolean;
		onLike?: () => void;
		onComment?: () => void;
		onShare?: () => void;
		onProfile?: () => void;
		class?: string;
	}

	let {
		thumbnail,
		title,
		username,
		avatar,
		likes = 0,
		comments = 0,
		shares = 0,
		liked: initialLiked = false,
		onLike,
		onComment,
		onShare,
		onProfile,
		class: className,
	}: Props = $props();

	function initLiked() { return initialLiked; }
	let liked = $state(initLiked());
	let likeAdjustment = $state(0);
	let heartEl: HTMLElement | undefined = $state();
	let cardEl: HTMLDivElement | null = $state(null);

	const displayLikes = $derived(likes + likeAdjustment);

	function handleLike() {
		liked = !liked;
		likeAdjustment = likeAdjustment + (liked ? 1 : -1);
		if (heartEl) {
			gsap.fromTo(
				heartEl,
				{ scale: 1 },
				{ scale: 1.35, duration: 0.25, ease: "premium-bounce", overwrite: "auto" }
			);
		}
		onLike?.();
	}

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			gsap.from(cardEl!, { opacity: 0, y: 24, scale: 0.95, duration: 0.4, ease: "premium-smooth" });
		}, cardEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={cardEl} class={cn("group relative overflow-hidden rounded-xl bg-card", className)}>
	<div class="relative aspect-[9/16] w-full overflow-hidden bg-muted">
		{#if thumbnail}
			<img
				src={thumbnail}
				alt={title}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		{/if}
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
		<div class="absolute inset-0 flex items-center justify-center">
			<div
				class="flex size-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-transform duration-200 hover:scale-110"
			>
				<PlayIcon class="ml-0.5 size-6 text-white" />
			</div>
		</div>
		{#if username}
			<div class="absolute bottom-3 left-3 right-3 flex items-center gap-2">
				<button onclick={onProfile} class="shrink-0" type="button">
					<Avatar.Root size="sm">
						{#if avatar}
							<Avatar.Image src={avatar} alt={username} />
						{/if}
						<Avatar.Fallback class="text-[10px]">{username.charAt(0).toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
				</button>
				<span class="truncate text-sm font-medium text-white drop-shadow-sm">{username}</span>
			</div>
		{/if}
	</div>
	<Card.Content class="space-y-2 pt-2">
		<h3 class="line-clamp-2 text-sm font-semibold leading-tight">{title}</h3>
		<div class="flex items-center gap-0.5">
			<Button variant="ghost" size="sm" class="gap-1 text-muted-foreground" onclick={handleLike}>
				<span bind:this={heartEl}><HeartIcon class="size-4" fill={liked ? "currentColor" : "none"} /></span>
				<span class="text-xs">{likes + (liked && !initialLiked ? 1 : 0)}</span>
			</Button>
			<Button variant="ghost" size="sm" class="gap-1 text-muted-foreground" onclick={onComment}>
				<MessageCircleIcon class="size-4" />
				<span class="text-xs">{comments}</span>
			</Button>
			<Button variant="ghost" size="sm" class="gap-1 text-muted-foreground" onclick={onShare}>
				<Share2Icon class="size-4" />
				<span class="text-xs">{shares}</span>
			</Button>
			<div class="ml-auto">
				<Button variant="ghost" size="icon-sm" class="text-muted-foreground">
					<BookmarkIcon class="size-4" />
				</Button>
			</div>
		</div>
	</Card.Content>
</div>
