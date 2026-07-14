<script lang="ts">
	import { cn } from "$lib/utils.js";
	import BottomNavigation from "./bottom-navigation.svelte";

	interface NavItem {
		icon: any;
		label: string;
		route: string;
		badge?: number;
	}

	let {
		bottomNavItems = [] as NavItem[],
		currentRoute = "",
		onNavigate = (_route: string) => {},
		safeArea = true,
		class: className,
		children,
	}: {
		bottomNavItems?: NavItem[];
		currentRoute?: string;
		onNavigate?: (route: string) => void;
		safeArea?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();

	const hasBottomNav = $derived(bottomNavItems.length > 0);
</script>

<div
	data-slot="app-shell"
	class={cn(
		"relative flex min-h-dvh flex-col bg-background text-foreground",
		safeArea && "pt-safe-top pb-safe-bottom",
		hasBottomNav && "pb-safe-bottom",
		className
	)}
>
	{@render children?.()}

	{#if hasBottomNav}
		<BottomNavigation
			items={bottomNavItems}
			activeRoute={currentRoute}
			onSelect={onNavigate}
		/>
	{/if}
</div>
