<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import BottomNavigation from '$lib/components/patterns/bottom-navigation.svelte';
	import DrawerMenu from '$lib/components/sections/shell/drawer-menu.svelte';
	import { Footprints, Timer, User, Star, Users, Activity, MessageCircle, Search, Layout, Trophy, Settings, Grid3x3 } from '@lucide/svelte';

	let { class: className }: { class?: string } = $props();

	let navDemo = $state('dashboard');
	let showDrawer = $state(false);

	const drawerItems = [
		{ id: 'home', icon: Star, label: 'Home' },
		{ id: 'auth', icon: Users, label: 'Auth' },
		{ id: 'feed', icon: Activity, label: 'Feed' },
		{ id: 'social', icon: MessageCircle, label: 'Social' },
	];
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">BottomNavigation</h2>
	<BottomNavigation items={[
		{ icon: Footprints, label: 'Dashboard', route: 'dashboard' },
		{ icon: Timer, label: 'Sessions', route: 'sessions' },
		{ icon: User, label: 'Profile', route: 'profile' },
	]} activeRoute={navDemo} onSelect={(r) => { navDemo = r; toast(`Nav: ${r}`); }} />
	<h2 class="text-lg font-semibold tracking-tight">DrawerMenu</h2>
	<Button onclick={() => showDrawer = true} variant="outline" class="w-full">Open DrawerMenu</Button>
</div>

<DrawerMenu open={showDrawer} onClose={() => { showDrawer = false; }} items={drawerItems} activeId="home" onNavigate={(id) => { toast(`Navigate: ${id}`); showDrawer = false; }} />
