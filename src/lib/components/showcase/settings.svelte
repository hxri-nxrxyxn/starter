<script lang="ts">
	import { toast } from 'svelte-sonner';
	import ProfileEditForm from '$lib/components/sections/settings/profile-edit-form.svelte';
	import { PremiumUpsellPage, AppSettingsPage } from '$lib/components/sections/index.js';

	let { class: className }: { class?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">ProfileEditForm</h2>
	<ProfileEditForm onSave={(data) => toast(`Saved: ${data.name}`)} />
	<h2 class="text-lg font-semibold tracking-tight">PremiumUpsellPage</h2>
	<PremiumUpsellPage onSubscribe={(plan) => toast(`Subscribed to ${plan}`)} />
	<h2 class="text-lg font-semibold tracking-tight">AppSettingsPage</h2>
	<AppSettingsPage />
</div>
