<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { LoginForm, SignupForm, OTPForm } from '$lib/components/sections/index.js';

	let { class: className }: { class?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	<h2 class="text-lg font-semibold tracking-tight">LoginForm</h2>
	<LoginForm onLogin={() => toast('Logged in!')} onForgotPassword={() => toast('Password reset')} />
	<h2 class="text-lg font-semibold tracking-tight">SignupForm</h2>
	<SignupForm onSignup={() => toast('Signed up!')} />
	<h2 class="text-lg font-semibold tracking-tight">OTPForm</h2>
	<OTPForm onVerify={() => toast('Verified!')} />
</div>
