<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';

	interface NavItem {
		icon: LucideIcon;
		label: string;
		route: string;
		badge?: number;
	}

	interface Props {
		items: NavItem[];
		activeRoute: string;
		onSelect: (route: string) => void;
		class?: string;
	}

	let {
		items = [],
		activeRoute = '',
		onSelect,
		class: className,
	}: Props = $props();

	let nav: HTMLElement | undefined = $state();

	function animateTab(btn: HTMLElement) {
		const icon = btn.querySelector('svg');
		const label = btn.querySelector('span:last-child');
		const tl = gsap.timeline({ defaults: { ease: 'premium-spring' } });
		if (icon) {
			tl.fromTo(icon, { scale: 1 }, { scale: 1.2, duration: 0.12 })
			 .to(icon, { scale: 1, duration: 0.2 });
		}
		if (label) {
			tl.fromTo(label, { opacity: 0.5 }, { opacity: 1, duration: 0.2 }, '-=0.1');
		}
	}

	$effect(() => {
		const el = nav;
		const route = activeRoute;
		if (!el) return;
		const activeBtn = el.querySelector(`[data-route="${route}"]`) as HTMLElement | null;
		if (activeBtn) animateTab(activeBtn);
	});
</script>

<nav
	bind:this={nav}
	data-slot="bottom-navigation"
	class={cn(
		'fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-background px-2 pb-safe-bottom pt-1 shadow-lg',
		className
	)}
>
	{#each items as item (item.route)}
		{@const Icon = item.icon}
		<button
			type="button"
			data-route={item.route}
			data-slot="bottom-nav-item"
			class={cn(
				'relative flex flex-1 flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-colors',
				activeRoute === item.route
					? 'text-primary'
					: 'text-muted-foreground hover:text-foreground'
			)}
			onclick={() => onSelect(item.route)}
			aria-current={activeRoute === item.route ? 'page' : undefined}
		>
			<span class="relative">
				<Icon class="size-5" />
				{#if item.badge != null && item.badge > 0}
					<span
						class="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
					>
						{item.badge > 99 ? '99+' : item.badge}
					</span>
				{/if}
			</span>
			<span class="max-w-full truncate">{item.label}</span>
		</button>
	{/each}
</nav>
