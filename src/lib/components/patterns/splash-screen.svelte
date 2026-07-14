<script lang="ts">
	import Spinner from "$lib/components/ui/spinner/spinner.svelte";
	import { cn } from "$lib/utils.js";
	import { onMount } from "svelte";

	interface Props {
		logo?: any;
		appName?: string;
		version?: string;
		loading?: boolean;
		onFinish?: () => void;
		className?: string;
	}

	let {
		logo: Logo = undefined,
		appName = "",
		version = "",
		loading = true,
		onFinish = undefined,
		className,
	}: Props = $props();

	onMount(() => {
		if (!loading && onFinish) {
			const timer = setTimeout(onFinish, 2500);
			return () => clearTimeout(timer);
		}
	});
</script>

<div
	class={cn(
		"fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground",
		className
	)}
>
	{#if Logo}
		<div class="splash-logo mb-6">
			<Logo class="size-16" />
		</div>
	{/if}

	{#if appName}
		<h1 class="mb-1 text-2xl font-bold">{appName}</h1>
	{/if}

	{#if version}
		<p class="mb-8 text-sm text-muted-foreground">v{version}</p>
	{/if}

	{#if loading}
		<Spinner class="size-6" aria-label="Loading" />
	{:else if onFinish}
		<button
			class="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
			onclick={onFinish}
		>
			Get Started
		</button>
	{/if}
</div>

<style>
	.splash-logo {
		animation: splash-pulse 2s ease-in-out infinite;
	}

	@keyframes splash-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
	}
</style>
