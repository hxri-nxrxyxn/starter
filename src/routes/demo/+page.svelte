<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { demo } from '$lib/stores/demo.svelte.js';

	onMount(() => {
		goto(demo.isOnboarded ? '/demo/dashboard' : '/demo/onboarding', { replaceState: true });
	});
</script>

<div class="flex min-h-dvh items-center justify-center">
	<Spinner />
</div>
