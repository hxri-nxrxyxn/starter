<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils.js';
	import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CrownIcon from '@lucide/svelte/icons/crown';

	interface Props {
		name: string;
		username?: string;
		avatar?: string;
		bio?: string;
		followers?: number;
		following?: number;
		isPremium?: boolean;
		onEdit?: () => void;
		class?: string;
	}

	let {
		name,
		username = '',
		avatar = '',
		bio = '',
		followers = undefined,
		following = undefined,
		isPremium = false,
		onEdit = undefined,
		class: className,
	}: Props = $props();

	const initials = $derived(
		name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	);
</script>

<div data-slot="profile-header" class={cn('flex flex-col gap-4', className)}>
	<div class="flex items-start gap-4">
		<Avatar class="size-20">
			{#if avatar}
				<AvatarImage src={avatar} alt={name} />
			{/if}
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>

		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<h2 class="truncate text-xl font-bold">{name}</h2>
				{#if isPremium}
					<Badge variant="default" class="gap-1">
						<CrownIcon class="size-3" />
						Premium
					</Badge>
				{/if}
			</div>
			{#if username}
				<p class="text-muted-foreground text-sm">@{username}</p>
			{/if}
			{#if bio}
				<p class="mt-1 text-sm">{bio}</p>
			{/if}
		</div>

		{#if onEdit}
			<Button variant="outline" size="sm" onclick={onEdit} class="shrink-0">
				Edit Profile
			</Button>
		{/if}
	</div>

	{#if followers != null || following != null}
		<div class="flex gap-4 text-sm">
			{#if followers != null}
				<span class="text-muted-foreground">
					<strong class="text-foreground">{followers}</strong> followers
				</span>
			{/if}
			{#if following != null}
				<span class="text-muted-foreground">
					<strong class="text-foreground">{following}</strong> following
				</span>
			{/if}
		</div>
	{/if}
</div>
