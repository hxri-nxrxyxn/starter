<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.js';

	onMount(() => {
		goto('/demo', { replaceState: true });
	});
</script>

<div class="flex h-dvh items-center justify-center">
	<Spinner class="size-6" />
</div>
