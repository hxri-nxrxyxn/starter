<script lang="ts">
import { cn } from '$lib/utils.js';
import { demo } from '$lib/stores/demo.svelte.js';
import ProgressRing from '$lib/components/patterns/progress-ring.svelte';

let { class: className }: { class?: string } = $props();
</script>

<div class={cn('grid place-items-center', className)}>
	<ProgressRing value={demo.progressPercent} size={160} strokeWidth={8} variant="default" />
	<div class="flex flex-col items-center pointer-events-none">
		<span class="font-display text-3xl font-bold tabular-nums">{demo.steps.toLocaleString()}</span>
		<span class="text-xs text-muted-foreground">of {demo.dailyGoal.toLocaleString()} steps</span>
	</div>
</div>
