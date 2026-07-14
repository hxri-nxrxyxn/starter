<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import UserProfileCard from '$lib/components/sections/social/user-profile-card.svelte';
	import LiveIndicator from '$lib/components/sections/social/live-indicator.svelte';
	import ShareSheet from '$lib/components/sections/social/share-sheet.svelte';

	let { class: className }: { class?: string } = $props();

	let showShare = $state(false);
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">UserProfileCard</h2>
	<UserProfileCard name="Sarah K." username="@sarah" bio="Building the future" followers={284} following={142} isOwn onEdit={() => toast('Edit profile')} />
	<h2 class="text-lg font-semibold tracking-tight">LiveIndicator</h2>
	<div class="flex items-center justify-center py-4">
		<LiveIndicator viewerCount={142} />
	</div>
	<h2 class="text-lg font-semibold tracking-tight">ShareSheet</h2>
	<Button onclick={() => showShare = true} variant="outline" class="w-full">Open ShareSheet</Button>
</div>

<ShareSheet open={showShare} onClose={() => { showShare = false; }} />
