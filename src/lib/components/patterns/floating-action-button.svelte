<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	type Position = "br" | "bl" | "tr" | "tl";

	let {
		icon = PlusIcon,
		label = "",
		variant = "default" as "default" | "link" | "secondary" | "destructive" | "outline" | "ghost",
		onClick = () => {},
		position = "br" as Position,
		class: className,
	}: {
		icon?: any;
		label?: string;
		variant?: "default" | "link" | "secondary" | "destructive" | "outline" | "ghost";
		onClick?: () => void;
		position?: Position;
		class?: string;
	} = $props();

	const positionClasses = {
		br: "bottom-6 right-6",
		bl: "bottom-6 left-6",
		tr: "top-6 right-6",
		tl: "top-6 left-6",
	} as const;

	const IconComponent = $derived(icon);
	let fab: HTMLElement | null = $state(null);

	onMount(() => {
		if (!fab) return;
		const ctx = gsap.context(() => {
			gsap.fromTo(fab!,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.2 }
			);
		}, fab);
		return () => ctx.revert();
	});
</script>

<Button
	bind:ref={fab}
	data-slot="floating-action-button"
	variant={variant}
	size={label ? "default" : "icon-lg"}
	class={cn(
		"fixed z-50 rounded-full shadow-xl",
		label ? "gap-2 px-5 py-3 h-auto" : "size-14",
		positionClasses[position],
		className
	)}
	onclick={onClick}
>
	<IconComponent class={cn("shrink-0", label ? "size-5" : "size-6")} />
	{#if label}
		<span class="text-sm font-semibold">{label}</span>
	{/if}
</Button>
