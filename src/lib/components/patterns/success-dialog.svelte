<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
	import { gsap } from "$lib/animate/index.js";

	interface Props {
		open: boolean;
		title: string;
		description?: string;
		actionLabel?: string;
		onAction?: () => void;
		icon?: any;
		className?: string;
	}

	let {
		open,
		title,
		description = "",
		actionLabel = "Continue",
		onAction = undefined,
		icon: Icon = CheckCircleIcon,
		className,
	}: Props = $props();

	let dialogEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		if (open && dialogEl) {
			const ctx = gsap.context(() => {
				const tl = gsap.timeline({ ease: "premium-smooth" });
				const iconEl = dialogEl!.querySelector("[data-success-icon]");
				const titleEl = dialogEl!.querySelector("[data-success-title]");
				const descEl = dialogEl!.querySelector("[data-success-description]");
				if (iconEl) {
					tl.fromTo(iconEl,
						{ scale: 0, rotation: -90, opacity: 0 },
						{ scale: 1.1, rotation: 0, opacity: 1, duration: 0.4, ease: "premium-spring" }
					)
					.to(iconEl, { scale: 1, duration: 0.15, ease: "power2.out" }, "-=0.1");
				}
				if (titleEl) tl.from(titleEl, { opacity: 0, y: 10, duration: 0.3 }, "-=0.1");
				if (descEl) tl.from(descEl, { opacity: 0, y: 8, duration: 0.25 }, "-=0.05");
			}, dialogEl);
			return () => ctx.revert();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content bind:ref={dialogEl} class={cn("sm:max-w-sm", className)}>
		<Dialog.Header class="items-center text-center">
			<Icon data-success-icon class="size-12 text-emerald-500" />
			<Dialog.Title data-success-title class="text-lg">{title}</Dialog.Title>
			{#if description}
				<Dialog.Description data-success-description>{description}</Dialog.Description>
			{/if}
		</Dialog.Header>
		{#if onAction}
			<Dialog.Footer class="justify-center">
				<Button
					variant="default"
					size="sm"
					class="w-full"
					onclick={onAction}
				>
					{actionLabel}
				</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
