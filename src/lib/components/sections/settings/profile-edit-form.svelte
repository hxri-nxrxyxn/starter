<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import SaveIcon from '@lucide/svelte/icons/save';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';

	interface UserData {
		name: string;
		bio: string;
		avatar?: string;
	}

	interface Props {
		user?: UserData;
		onSave?: (data: UserData) => void;
		class?: string;
	}

	let {
		user = { name: '', bio: '', avatar: '' },
		onSave = undefined,
		class: className,
	}: Props = $props();

	let name = $state(user.name || '');
	let bio = $state(user.bio || '');
	let website = $state('');
	let twitter = $state('');
	let isSaving = $state(false);
	let avatarPreview = $state(user.avatar || '');

	let cardEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!cardEl) return;
		const ctx = gsap.context(() => {
			const elements = cardEl!.querySelectorAll('[data-animate-field]');
			gsap.from(elements, {
				opacity: 0,
				y: 15,
				duration: 0.35,
				stagger: 0.06,
				ease: 'premium-smooth',
			});
		}, cardEl);
		return () => ctx.revert();
	});

	async function handleSave() {
		if (!onSave) return;
		isSaving = true;
		await onSave({ name, bio, avatar: avatarPreview });
		setTimeout(() => { isSaving = false; }, 800);
	}

	function handleAvatarChange() {
		avatarPreview = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
	}
</script>

<Card.Root bind:ref={cardEl} class={cn('', className)}>
	<Card.Header>
		<Card.Title>Edit Profile</Card.Title>
		<Card.Description>Update your public profile information</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-6">
		<div data-animate-field class="flex justify-center">
			<div class="relative">
				<Avatar.Root class="size-20">
					{#if avatarPreview}
						<Avatar.Image src={avatarPreview} alt={name || 'Profile'} />
					{/if}
					<Avatar.Fallback class="text-lg">{(name || 'U').charAt(0).toUpperCase()}</Avatar.Fallback>
				</Avatar.Root>
				<button
					type="button"
					onclick={handleAvatarChange}
					class="bg-primary text-primary-foreground hover:bg-primary/90 absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full transition-colors"
					aria-label="Change avatar"
				>
					<CameraIcon class="size-3.5" />
				</button>
			</div>
		</div>

		<div data-animate-field class="flex flex-col gap-2">
			<label for="profile-name" class="text-sm font-medium">Name</label>
			<Input id="profile-name" bind:value={name} placeholder="Your name" />
		</div>

		<div data-animate-field class="flex flex-col gap-2">
			<label for="profile-bio" class="text-sm font-medium">Bio</label>
			<Textarea id="profile-bio" bind:value={bio} placeholder="Tell us about yourself" rows={3} />
		</div>

		<div data-animate-field class="flex flex-col gap-2">
			<label for="profile-website" class="text-sm font-medium">Website</label>
			<div class="relative">
				<GlobeIcon class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input id="profile-website" bind:value={website} placeholder="https://example.com" class="pl-9" />
			</div>
		</div>

		<div data-animate-field class="flex flex-col gap-2">
			<label for="profile-twitter" class="text-sm font-medium">Social</label>
			<div class="relative">
				<MessageCircleIcon class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input id="profile-twitter" bind:value={twitter} placeholder="@username" class="pl-9" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="justify-end">
		<Button onclick={handleSave} disabled={isSaving}>
			{#if isSaving}
				<Loader2Icon class="mr-2 size-4 animate-spin" />
				Saving...
			{:else}
				<SaveIcon class="mr-2 size-4" />
				Save Changes
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
