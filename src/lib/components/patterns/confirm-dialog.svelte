<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { cn } from "$lib/utils.js";

	interface Props {
		open: boolean;
		title: string;
		description?: string;
		confirmLabel?: string;
		cancelLabel?: string;
		variant?: "default" | "destructive";
		onConfirm: () => void;
		onCancel?: () => void;
		className?: string;
	}

	let {
		open,
		title,
		description = "",
		confirmLabel = "Confirm",
		cancelLabel = "Cancel",
		variant = "default",
		onConfirm,
		onCancel = undefined,
		className,
	}: Props = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class={cn(className)}>
		<AlertDialog.Header>
			<AlertDialog.Title>{title}</AlertDialog.Title>
			{#if description}
				<AlertDialog.Description>{description}</AlertDialog.Description>
			{/if}
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				variant="outline"
				onclick={onCancel}
			>
				{cancelLabel}
			</AlertDialog.Cancel>
			<AlertDialog.Action
				variant={variant === "destructive" ? "destructive" : "default"}
				onclick={onConfirm}
			>
				{confirmLabel}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
