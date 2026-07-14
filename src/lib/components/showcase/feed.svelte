<script lang="ts">
	import { toast } from 'svelte-sonner';
	import StoryCircle from '$lib/components/sections/feed/story-circle.svelte';
	import VideoCard from '$lib/components/sections/feed/video-card.svelte';
	import PostComposer from '$lib/components/sections/feed/post-composer.svelte';
	import CommentSection from '$lib/components/sections/feed/comment-section.svelte';

	let { class: className, onShare }: { class?: string; onShare?: () => void } = $props();

	const storyItems = [
		{ id: '1', username: 'You', avatar: '', hasStory: false },
		{ id: '2', username: 'Sarah', avatar: '', hasStory: true, seen: false },
		{ id: '3', username: 'Mike', avatar: '', hasStory: true, seen: true },
		{ id: '4', username: 'Emma', avatar: '', hasStory: true, seen: false },
		{ id: '5', username: 'Alex', avatar: '', hasStory: false },
	];

	const video = {
		title: 'Morning Routine 2026',
		username: 'fitness_guru',
		likes: 2840,
		comments: 142,
		shares: 58,
	};
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">StoryCircle</h2>
	<StoryCircle stories={storyItems} onStoryClick={(id) => toast(`Story ${id}`)} />
	<h2 class="text-lg font-semibold tracking-tight">VideoCard</h2>
	<VideoCard {...video} onLike={() => toast('Liked!')} onComment={() => toast('Comments')} onShare={onShare} />
	<h2 class="text-lg font-semibold tracking-tight">PostComposer</h2>
	<PostComposer onSubmit={(c) => toast(`Posted: ${c.slice(0, 30)}...`)} />
	<h2 class="text-lg font-semibold tracking-tight">CommentSection</h2>
	<CommentSection onAddComment={(t) => toast(`Comment: ${t}`)} />
</div>
