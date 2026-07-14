<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import UserIcon from '@lucide/svelte/icons/user';
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';

	interface NavItem {
		id: string;
		icon: any;
		label: string;
	}

	interface UserInfo {
		name: string;
		avatar?: string;
		email?: string;
	}

	interface Props {
		open: boolean;
		onClose?: () => void;
		items: NavItem[];
		activeId?: string;
		onNavigate?: (id: string) => void;
		user?: UserInfo;
		class?: string;
	}

	let {
		open,
		onClose = undefined,
		items,
		activeId = '',
		onNavigate = undefined,
		user = undefined,
		class: className,
	}: Props = $props();

	let navEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		if (open && navEl) {
			const ctx = gsap.context(() => {
				const items = navEl!.querySelectorAll('[data-nav-item]');
				gsap.from(items, {
					opacity: 0,
					x: -20,
					duration: 0.3,
					stagger: 0.04,
					ease: 'premium-smooth',
				});
			}, navEl);
			return () => ctx.revert();
		}
	});
</script>

<Sheet.Root
	open={open}
	onOpenChange={(o: boolean) => { if (!o) onClose?.(); }}
>
	<Sheet.Content side="left" class="flex flex-col p-0" showCloseButton={false}>
		{#if user}
			<div class="flex items-center gap-3 border-b px-4 py-4">
				<Avatar.Root class="size-10">
					{#if user.avatar}
						<Avatar.Image src={user.avatar} alt={user.name} />
					{/if}
					<Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex min-w-0 flex-1 flex-col">
					<span class="truncate text-sm font-medium">{user.name}</span>
					{#if user.email}
						<span class="text-muted-foreground truncate text-xs">{user.email}</span>
					{/if}
				</div>
			</div>
		{/if}

		<div bind:this={navEl} class="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
			{#each items as item (item.id)}
				{@const Icon = item.icon}
				<button
					data-nav-item
					type="button"
					onclick={() => onNavigate?.(item.id)}
					class={cn(
						'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
						activeId === item.id
							? 'bg-muted text-foreground font-medium'
							: 'text-muted-foreground hover:bg-muted hover:text-foreground'
					)}
				>
					<Icon class="size-4 shrink-0" />
					{item.label}
				</button>
			{/each}
		</div>

		<div class="border-t p-2">
			<button
				type="button"
				onclick={() => onNavigate?.('settings')}
				class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
			>
				<SettingsIcon class="size-4 shrink-0" />
				Settings
			</button>
			<button
				type="button"
				onclick={() => onNavigate?.('help')}
				class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
			>
				<HelpCircleIcon class="size-4 shrink-0" />
				Help
			</button>
			<Separator class="my-1" />
			<button
				type="button"
				onclick={() => onNavigate?.('logout')}
				class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
			>
				<LogOutIcon class="size-4 shrink-0" />
				Log Out
			</button>
		</div>
	</Sheet.Content>
</Sheet.Root>
