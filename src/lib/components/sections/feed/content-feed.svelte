<script lang="ts">
	import PullToRefreshContainer from "$lib/components/patterns/pull-to-refresh-container.svelte";
	import InfiniteList from "$lib/components/patterns/infinite-list.svelte";
	import VideoCard from "./video-card.svelte";
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
	import { cn } from "$lib/utils.js";
	import HeartIcon from "@lucide/svelte/icons/heart";

	interface VideoItem {
		id: string;
		thumbnail: string;
		title: string;
		username: string;
		avatar: string;
		likes: number;
		comments: number;
		shares: number;
	}

	interface Props {
		class?: string;
	}

	let {
		class: className,
	}: Props = $props();

	const allMockVideos: VideoItem[] = [
		{ id: "v1", thumbnail: "", title: "Sunset over the coastline", username: "nature_lover", avatar: "", likes: 142, comments: 23, shares: 12 },
		{ id: "v2", thumbnail: "", title: "Quick pasta recipe anyone can make", username: "chef_easy", avatar: "", likes: 89, comments: 45, shares: 67 },
		{ id: "v3", thumbnail: "", title: "Morning routine 2026", username: "daily_grind", avatar: "", likes: 234, comments: 56, shares: 34 },
		{ id: "v4", thumbnail: "", title: "City walk through Tokyo at night", username: "wanderlust", avatar: "", likes: 567, comments: 89, shares: 123 },
		{ id: "v5", thumbnail: "", title: "How to style a blazer 3 ways", username: "fashion_tips", avatar: "", likes: 78, comments: 12, shares: 45 },
		{ id: "v6", thumbnail: "", title: "Guitar cover – Hotel California", username: "music_vibes", avatar: "", likes: 345, comments: 67, shares: 23 },
		{ id: "v7", thumbnail: "", title: "5 min full body stretch", username: "fit_fam", avatar: "", likes: 456, comments: 34, shares: 89 },
		{ id: "v8", thumbnail: "", title: "Building a desk from scratch", username: "diy_master", avatar: "", likes: 123, comments: 78, shares: 56 },
		{ id: "v9", thumbnail: "", title: "Corgi puppy first snow", username: "pet_daily", avatar: "", likes: 891, comments: 123, shares: 234 },
		{ id: "v10", thumbnail: "", title: "Minimalist workspace tour", username: "workspace_zen", avatar: "", likes: 67, comments: 11, shares: 9 },
	];

	let videos = $state<VideoItem[]>(allMockVideos.slice(0, 3));
	let loading = $state(false);
	let pageIndex = $state(1);

	const hasMore = $derived(videos.length < allMockVideos.length);

	async function loadMore() {
		if (loading || !hasMore) return;
		loading = true;
		await new Promise((r) => setTimeout(r, 600));
		const nextItems = allMockVideos.slice(pageIndex * 3, pageIndex * 3 + 3);
		videos = [...videos, ...nextItems];
		pageIndex++;
		loading = false;
	}

	async function handleRefresh() {
		videos = allMockVideos.slice(0, 3);
		pageIndex = 1;
		loading = false;
	}

	function handleLike() {}

	function handleComment() {}

	function handleShare() {}

	function handleProfile() {}
</script>

<div class={cn("", className)}>
	<PullToRefreshContainer onRefresh={handleRefresh}>
		{#snippet children()}
			<div class="space-y-4 px-4 py-4">
				<InfiniteList items={videos} {hasMore} {loading} {loadMore}>
					{#snippet renderItem(item: VideoItem, index: number)}
						<VideoCard
							thumbnail={item.thumbnail}
							title={item.title}
							username={item.username}
							avatar={item.avatar}
							likes={item.likes}
							comments={item.comments}
							shares={item.shares}
							onLike={handleLike}
							onComment={handleComment}
							onShare={handleShare}
							onProfile={handleProfile}
						/>
					{/snippet}
				</InfiniteList>
				{#if loading}
					<div class="space-y-3">
						{#each Array(3) as _, i (i)}
							<div class="space-y-2 rounded-xl bg-card p-3">
								<Skeleton class="aspect-[9/16] w-full rounded-lg" />
								<Skeleton class="h-4 w-3/4" />
								<Skeleton class="h-3 w-1/2" />
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/snippet}
	</PullToRefreshContainer>
</div>
