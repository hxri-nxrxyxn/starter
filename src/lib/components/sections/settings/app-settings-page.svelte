<script lang="ts">
	import SettingsSection from '$lib/components/patterns/settings-section.svelte';
	import ColorThemeSwitcher from '$lib/components/patterns/color-theme-switcher.svelte';
	import { app } from '$lib/stores/app.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import BellIcon from '@lucide/svelte/icons/bell';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import UserIcon from '@lucide/svelte/icons/user';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import InfoIcon from '@lucide/svelte/icons/info';
	import SmartphoneIcon from '@lucide/svelte/icons/smartphone';
	import CrownIcon from '@lucide/svelte/icons/crown';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const themes = [
		{ value: 'light' as const, icon: SunIcon, label: 'Light' },
		{ value: 'dark' as const, icon: MoonIcon, label: 'Dark' },
		{ value: 'system' as const, icon: MonitorIcon, label: 'System' },
	];

	let pushEnabled = $state(true);
	let emailEnabled = $state(false);
	let smsEnabled = $state(false);

	let sectionEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!sectionEl) return;
		const ctx = gsap.context(() => {
			const sections = sectionEl!.querySelectorAll('[data-settings-section]');
			gsap.from(sections, {
				opacity: 0,
				y: 20,
				duration: 0.4,
				stagger: 0.1,
				ease: 'premium-smooth',
			});
		}, sectionEl);
		return () => ctx.revert();
	});

	function cycleTheme() {
		const idx = themes.findIndex(t => t.value === app.theme);
		app.setTheme(themes[(idx + 1) % themes.length].value);
	}
</script>

<div bind:this={sectionEl} class={cn('flex flex-col gap-6', className)}>
	<div>
		<h2 class="text-lg font-semibold">Settings</h2>
		<p class="text-muted-foreground text-sm">Manage your app preferences</p>
	</div>

	<div data-settings-section>
		<SettingsSection
			title="Appearance"
			description="Customize how the app looks"
			items={[
				{
					icon: themes.find(t => t.value === app.theme)?.icon ?? MonitorIcon,
					label: 'Theme',
					description: `Current: ${app.theme.charAt(0).toUpperCase() + app.theme.slice(1)}`,
					onClick: cycleTheme,
				},
			]}
		/>
		<div class="px-(--card-spacing) pb-4">
			<ColorThemeSwitcher />
		</div>
	</div>

	<div data-settings-section>
		<SettingsSection
			title="Notifications"
			description="Control notification preferences"
			items={[]}
		/>
		<div class="flex flex-col px-(--card-spacing) pb-1">
			<div class="flex items-center justify-between py-2">
				<div class="flex items-center gap-3">
					<BellIcon class="size-5 shrink-0 text-muted-foreground" />
					<div class="flex flex-col">
						<span class="text-sm font-medium">Push Notifications</span>
						<span class="text-muted-foreground text-xs">Receive push alerts</span>
					</div>
				</div>
				<Switch bind:checked={pushEnabled} />
			</div>
			<Separator />
			<div class="flex items-center justify-between py-2">
				<div class="flex items-center gap-3">
					<SmartphoneIcon class="size-5 shrink-0 text-muted-foreground" />
					<div class="flex flex-col">
						<span class="text-sm font-medium">Email Notifications</span>
						<span class="text-muted-foreground text-xs">Receive email updates</span>
					</div>
				</div>
				<Switch bind:checked={emailEnabled} />
			</div>
			<Separator />
			<div class="flex items-center justify-between py-2">
				<div class="flex items-center gap-3">
					<SmartphoneIcon class="size-5 shrink-0 text-muted-foreground" />
					<div class="flex flex-col">
						<span class="text-sm font-medium">SMS Notifications</span>
						<span class="text-muted-foreground text-xs">Receive text messages</span>
					</div>
				</div>
				<Switch bind:checked={smsEnabled} />
			</div>
		</div>
	</div>

	<div data-settings-section>
		<SettingsSection
			title="Account"
			items={[
				{ icon: UserIcon, label: 'Edit Profile', description: 'Update your personal information', right: InfoIcon, onClick: () => {} },
				{ icon: ShieldIcon, label: 'Privacy', description: 'Manage privacy settings', right: InfoIcon, onClick: () => {} },
				{ icon: CrownIcon, label: 'Premium', description: 'Upgrade to premium plan', right: InfoIcon, onClick: () => {} },
				{ icon: LogOutIcon, label: 'Sign Out', description: 'Log out of your account', variant: 'destructive', onClick: () => { app.reset(); } },
			]}
		/>
	</div>

	<div data-settings-section>
		<SettingsSection
			title="About"
			items={[
				{ icon: InfoIcon, label: 'Version', description: `v${app.version}` },
			]}
		/>
	</div>
</div>
