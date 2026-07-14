<script lang="ts">
	import BottomSheetActionList from '$lib/components/patterns/bottom-sheet-action-list.svelte';
	import { cn } from '$lib/utils.js';
	import Link from '@lucide/svelte/icons/link';
	import Globe from '@lucide/svelte/icons/globe';
	import Users from '@lucide/svelte/icons/users';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import Mail from '@lucide/svelte/icons/mail';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	interface Props {
		open: boolean;
		url?: string;
		title?: string;
		onClose?: () => void;
		class?: string;
	}

	let {
		open,
		url = typeof window !== 'undefined' ? window.location.href : '',
		title = 'Check this out',
		onClose = undefined,
		class: className = '',
	}: Props = $props();

	let copied = $state(false);

	const copyLinkIcon = $derived(copied ? Check : Copy);

	const shareActions = $derived.by(() => {
		const encodedUrl = encodeURIComponent(url!);
		const encodedTitle = encodeURIComponent(title);

		const items: Array<{
			icon: any;
			label: string;
			variant?: 'default' | 'destructive';
			onClick: () => void;
		}> = [
			{
				icon: copyLinkIcon,
				label: copied ? 'Copied!' : 'Copy Link',
				onClick: async () => {
					try {
						await navigator.clipboard.writeText(url!);
					} catch {
						const ta = document.createElement('textarea');
						ta.value = url!;
						document.body.appendChild(ta);
						ta.select();
						document.execCommand('copy');
						document.body.removeChild(ta);
					}
					copied = true;
					setTimeout(() => (copied = false), 2000);
				},
			},
			{
				icon: Globe,
				label: 'Share via Web',
				onClick: () => {
					window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
				},
			},
			{
				icon: Users,
				label: 'Share with Friends',
				onClick: () => {
					window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
				},
			},
			{
				icon: MessageCircle,
				label: 'Share via WhatsApp',
				onClick: () => {
					window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank');
				},
			},
			{
				icon: Mail,
				label: 'Share via Email',
				onClick: () => {
					window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, '_blank');
				},
			},
		];

		if (typeof navigator !== 'undefined' && 'share' in navigator) {
			items.unshift({
				icon: Link,
				label: 'Share…',
				onClick: async () => {
					try {
						await navigator.share({ title, url: url! });
					} catch {
						// user cancelled
					}
				},
			});
		}

		return items;
	});
</script>

<BottomSheetActionList
	open={open}
	title="Share"
	actions={shareActions}
	onClose={onClose}
	className={cn(className)}
/>
