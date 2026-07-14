<script lang="ts">
	import ChallengeSection from '$lib/components/sections/gamification/challenge-section.svelte';
	import LeaderboardPanel from '$lib/components/sections/gamification/leaderboard-panel.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">ChallengeSection</h2>
	<ChallengeSection />
	<h2 class="text-lg font-semibold tracking-tight">LeaderboardPanel</h2>
	<LeaderboardPanel />
</div>
