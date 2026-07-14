<script lang="ts">
	import AppShell from './app-shell.svelte';
	import type { Snippet } from 'svelte';

	type Tab = {
		id: string;
		label: string;
		icon: any;
	};

	let {
		tabs = [] as Tab[],
		activeTab = $bindable('home'),
		onTabChange,
		children,
		class: className = ''
	}: {
		tabs?: Tab[];
		activeTab?: string;
		onTabChange?: (id: string) => void;
		children: Snippet;
		class?: string;
	} = $props();

	const navItems = $derived(
		tabs.map((t) => ({ icon: t.icon, label: t.label, route: t.id }))
	);

	function handleNavigate(route: string) {
		activeTab = route;
		onTabChange?.(route);
	}
</script>

<AppShell
	bottomNavItems={navItems}
	currentRoute={activeTab}
	onNavigate={handleNavigate}
	class={className}
>
	{@render children()}
</AppShell>
