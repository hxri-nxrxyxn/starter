<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import Music2Icon from '@lucide/svelte/icons/music-2';
	import Gamepad2Icon from '@lucide/svelte/icons/gamepad-2';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import Code2Icon from '@lucide/svelte/icons/code-2';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import PaletteIcon from '@lucide/svelte/icons/palette';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import DumbbellIcon from '@lucide/svelte/icons/dumbbell';

	interface Category {
		id: string;
		label: string;
		icon?: any;
		color?: string;
	}

	interface Props {
		categories?: Category[];
		onSelect?: (id: string) => void;
		class?: string;
	}

	const defaultCategories: Category[] = [
		{ id: 'music', label: 'Music', icon: Music2Icon, color: 'bg-red-100 text-red-600' },
		{ id: 'gaming', label: 'Gaming', icon: Gamepad2Icon, color: 'bg-blue-100 text-blue-600' },
		{ id: 'reading', label: 'Reading', icon: BookOpenIcon, color: 'bg-green-100 text-green-600' },
		{ id: 'coding', label: 'Coding', icon: Code2Icon, color: 'bg-purple-100 text-purple-600' },
		{ id: 'photography', label: 'Photography', icon: CameraIcon, color: 'bg-yellow-100 text-yellow-600' },
		{ id: 'art', label: 'Art', icon: PaletteIcon, color: 'bg-pink-100 text-pink-600' },
		{ id: 'travel', label: 'Travel', icon: GlobeIcon, color: 'bg-teal-100 text-teal-600' },
		{ id: 'fitness', label: 'Fitness', icon: DumbbellIcon, color: 'bg-orange-100 text-orange-600' },
	];

	let {
		categories = defaultCategories,
		onSelect,
		class: className,
	}: Props = $props();

	let selectedId = $state<string | null>(null);
	let gridEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!gridEl) return;
		const ctx = gsap.context(() => {
			const items = gridEl!.querySelectorAll('[data-category-item]');
			gsap.from(items, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				ease: 'premium-smooth',
				stagger: 0.05,
			});
		}, gridEl);
		return () => ctx.revert();
	});
</script>

<div
	bind:this={gridEl}
	class={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4', className)}
>
	{#each categories as cat (cat.id)}
		{@const CatIcon = cat.icon}
		<button
			type="button"
			data-category-item
			class={cn(
				'border-border bg-card flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
				selectedId === cat.id
					? 'ring-ring ring-2 ring-offset-2'
					: 'hover:bg-muted/50'
			)}
			onclick={() => {
				selectedId = cat.id;
				onSelect?.(cat.id);
			}}
		>
			<div class={cn('flex size-12 items-center justify-center rounded-lg', cat.color || 'bg-muted')}>
				{#if CatIcon}
					<CatIcon class="size-5" />
				{/if}
			</div>
			<span class="text-xs font-medium">{cat.label}</span>
		</button>
	{/each}
</div>
