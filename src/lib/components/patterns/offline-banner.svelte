<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Alert } from "$lib/components/ui/alert/index.js";
	import { AlertTitle } from "$lib/components/ui/alert/index.js";
	import { AlertDescription } from "$lib/components/ui/alert/index.js";
	import WifiOffIcon from "@lucide/svelte/icons/wifi-off";
	import { app } from "$lib/stores/app.svelte.js";

	let {
		class: className,
	}: {
		class?: string;
	} = $props();
</script>

{#if !app.isOnline}
	<Alert
		variant="destructive"
		class={cn("rounded-none border-x-0 border-t-0", className)}
		role="alert"
	>
		<WifiOffIcon class="size-4" />
		<AlertTitle>You are offline</AlertTitle>
		<AlertDescription>Some features may be unavailable until you reconnect.</AlertDescription>
	</Alert>
{/if}
