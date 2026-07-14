<script lang="ts">
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import XIcon from "@lucide/svelte/icons/x";
	import { gsap } from "$lib/animate/index.js";

	interface Props {
		value?: string;
		placeholder?: string;
		onSearch: (value: string) => void;
		onClear?: () => void;
		className?: string;
	}

	let {
		value = $bindable(""),
		placeholder = "Search...",
		onSearch,
		onClear = undefined,
		className,
	}: Props = $props();

	let iconEl: HTMLElement;

	function onFocus() {
		if (!iconEl) return;
		gsap.to(iconEl, {
			rotation: 15,
			scale: 1.1,
			duration: 0.25,
			ease: "power2.out",
		});
	}

	function onBlur() {
		if (!iconEl) return;
		gsap.to(iconEl, {
			rotation: 0,
			scale: 1,
			duration: 0.3,
			ease: "premium-spring",
		});
	}
</script>

<div class={cn("relative flex items-center", className)}>
	<div bind:this={iconEl} data-search-icon class="pointer-events-none absolute left-2.5 flex items-center">
		<SearchIcon class="size-4 text-muted-foreground" />
	</div>
	<Input
		type="search"
		bind:value
		{placeholder}
		oninput={() => onSearch(value)}
		onfocus={onFocus}
		onblur={onBlur}
		class="pl-8 pr-8"
	/>
	{#if value}
		<Button
			variant="ghost"
			size="icon-xs"
			class="absolute right-1"
			onclick={() => {
				value = "";
				onClear?.();
			}}
			aria-label="Clear search"
		>
			<XIcon />
		</Button>
	{/if}
</div>
