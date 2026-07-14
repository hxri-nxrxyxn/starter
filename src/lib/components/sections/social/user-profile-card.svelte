<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Calendar from '@lucide/svelte/icons/calendar';

	interface Props {
		name: string;
		username?: string;
		avatar?: string;
		bio?: string;
		followers?: number;
		following?: number;
		isOwn?: boolean;
		onEdit?: () => void;
		onFollow?: () => void;
		class?: string;
	}

	let {
		name: userName,
		username = '',
		avatar: avatarSrc = '',
		bio = '',
		followers = 0,
		following = 0,
		isOwn = false,
		onEdit = undefined,
		onFollow = undefined,
		class: className = '',
	}: Props = $props();

	let isFollowing = $state(false);
	let cardEl = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			gsap.from(cardEl, {
				opacity: 0,
				y: 24,
				duration: 0.45,
				ease: 'premium-smooth',
			});
		}, cardEl);
		return () => ctx.revert();
	});

	const initials = $derived(
		userName
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);

	const followerLabel = $derived(
		followers >= 1000 ? `${(followers / 1000).toFixed(1)}k` : String(followers)
	);
	const followingLabel = $derived(
		following >= 1000 ? `${(following / 1000).toFixed(1)}k` : String(following)
	);

	function handleFollow() {
		isFollowing = !isFollowing;
		onFollow?.();
	}
</script>

<Card.Root bind:ref={cardEl} class={cn('w-full max-w-sm overflow-hidden', className)}>

	<div class="relative px-(--card-spacing) pt-(--card-spacing)">
		<div class="flex items-end gap-3">
			<Avatar.Root size="lg" class="ring-background z-10 ring-2">
				{#if avatarSrc}
					<Avatar.Image src={avatarSrc} alt={userName} />
				{/if}
				<Avatar.Fallback>{initials}</Avatar.Fallback>
			</Avatar.Root>
			<div class="pb-1">
				<h3 class="text-base font-medium leading-tight">{userName}</h3>
				{#if username}
					<p class="text-muted-foreground text-sm">@{username}</p>
				{/if}
			</div>
		</div>
	</div>

	<Card.Content class="space-y-3 pt-3">
		{#if bio}
			<p class="text-sm leading-relaxed">{bio}</p>
		{/if}

		<div class="text-muted-foreground flex flex-wrap gap-3 text-xs">
			<span class="flex items-center gap-1">
				<MapPin class="size-3" />
				San Francisco, CA
			</span>
			<span class="flex items-center gap-1">
				<Calendar class="size-3" />
				Joined January 2024
			</span>
		</div>

		<div class="flex gap-4 text-sm">
			<span>
				<span class="text-foreground font-medium">{followerLabel}</span>
				<span class="text-muted-foreground ml-1">Followers</span>
			</span>
			<span>
				<span class="text-foreground font-medium">{followingLabel}</span>
				<span class="text-muted-foreground ml-1">Following</span>
			</span>
		</div>
	</Card.Content>

	<Card.Footer>
		{#if isOwn}
			<Button variant="outline" class="w-full" onclick={onEdit}>
				Edit Profile
			</Button>
		{:else}
			<Button
				variant={isFollowing ? 'outline' : 'default'}
				class="w-full"
				onclick={handleFollow}
			>
				{isFollowing ? 'Following' : 'Follow'}
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
