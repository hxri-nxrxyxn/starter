<script lang="ts">
	import { app } from '$lib/stores/app.svelte';
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Toaster from '$lib/components/ui/sonner/sonner.svelte';

	let { children } = $props();

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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary/0.03)_0%,transparent_70%)] bg-[length:200%_200%] pointer-events-none"></div>
{@render children()}
<Toaster position="top-center" richColors />
