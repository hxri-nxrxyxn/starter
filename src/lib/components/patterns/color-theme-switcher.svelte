<script lang="ts">
	import { app, type ColorScheme } from '$lib/stores/app.svelte';
	import { cn } from '$lib/utils.js';

	let { class: className = '' }: { class?: string } = $props();

	const themes: Array<{ id: ColorScheme; label: string; color: string }> = [
		{ id: 'neutral', label: 'Neutral', color: '#737373' },
		{ id: 'blue', label: 'Blue', color: '#3b82f6' },
		{ id: 'green', label: 'Green', color: '#22c55e' },
		{ id: 'purple', label: 'Purple', color: '#a855f7' },
		{ id: 'orange', label: 'Orange', color: '#f97316' },
		{ id: 'rose', label: 'Rose', color: '#f43f5e' },
		{ id: 'teal', label: 'Teal', color: '#14b8a6' },
	];
</script>

<div class={cn('flex flex-wrap gap-2', className)}>
	{#each themes as t (t.id)}
		<button
			type="button"
			onclick={() => app.setColorScheme(t.id)}
			class={cn(
				'size-7 rounded-full border-2 transition-all',
				app.colorScheme === t.id
					? 'border-ring shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--ring)]'
					: 'border-transparent opacity-70 hover:opacity-100'
			)}
			style="background: {t.color}"
			title={t.label}
			aria-label={t.label}
		> </button>
	{/each}
</div>
