<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';

	let { children } = $props();
	let bg: HTMLDivElement;

	function applyTheme() {
		const isDark = app.theme === 'dark' || (app.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.toggle('dark', isDark);
		document.documentElement.dataset.colorScheme = app.colorScheme;
	}

	$effect(applyTheme);

	$effect(() => {
		if (app.theme !== 'system') return;
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => applyTheme();
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	});

	onMount(() => {
		if (!bg) return;
		const ctx = gsap.context(() => {
			gsap.to(bg, {
				backgroundPosition: '50% 50%',
				duration: 20,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
			});
		}, bg);
		return () => ctx.revert();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div bind:this={bg} class="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary/0.03)_0%,transparent_70%)] bg-[length:200%_200%] pointer-events-none"></div>
{@render children()}
