<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { gsap, ScrollTrigger } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	interface Props {
		value: number;
		label: string;
		prefix?: string;
		suffix?: string;
		duration?: number;
		class?: string;
	}

	let {
		value,
		label,
		prefix = '',
		suffix = '',
		duration = 2,
		class: className,
	}: Props = $props();

	let displayValue = $state(0);
	let counterEl: HTMLDivElement | null = $state(null);

	function formatNumber(n: number): string {
		if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
		if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
		return Math.floor(n).toLocaleString();
	}

	const formatted = $derived(`${prefix}${formatNumber(displayValue)}${suffix}`);

	onMount(() => {
		if (!counterEl) return;
		const ctx = gsap.context(() => {
			const obj = { val: 0 };
			gsap.to(obj, {
				val: value,
				duration,
				ease: 'premium-smooth',
				scrollTrigger: {
					trigger: counterEl!,
					start: 'top 85%',
					toggleActions: 'play none none reverse',
				},
				onUpdate() {
					displayValue = obj.val;
				},
			});
		}, counterEl);
		return () => ctx.revert();
	});
</script>

<div
	bind:this={counterEl}
	class={cn('flex flex-col items-center gap-1', className)}
>
	<span class="text-4xl font-bold tracking-tight sm:text-5xl">{formatted}</span>
	<span class="text-muted-foreground text-sm">{label}</span>
</div>
