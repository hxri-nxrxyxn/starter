<script lang="ts">
import { cn } from '$lib/utils.js';
import { demo } from '$lib/stores/demo.svelte.js';
import ProgressRing from '$lib/components/patterns/progress-ring.svelte';

let { class: className }: { class?: string } = $props();
</script>

<div class={cn('relative', className)} style="width: 160px; height: 160px;">
	<ProgressRing value={demo.progressPercent} size={160} strokeWidth={8} variant="default" />
	<div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
		<span class="font-display text-3xl font-bold tabular-nums">{demo.steps.toLocaleString()}</span>
		<span class="text-xs text-muted-foreground whitespace-nowrap">of {demo.dailyGoal.toLocaleString()} steps</span>
	</div>
</div>
