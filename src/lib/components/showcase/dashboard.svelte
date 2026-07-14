<script lang="ts">
	import CreatorDashboard from '$lib/components/sections/dashboard/creator-dashboard.svelte';
	import ContentAnalytics from '$lib/components/sections/dashboard/content-analytics.svelte';
	import StreakCalendar from '$lib/components/sections/dashboard/streak-calendar.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">CreatorDashboard</h2>
	<CreatorDashboard />
	<h2 class="text-lg font-semibold tracking-tight">ContentAnalytics</h2>
	<ContentAnalytics />
	<h2 class="text-lg font-semibold tracking-tight">StreakCalendar</h2>
	<StreakCalendar />
</div>
