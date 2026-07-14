<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import User from '@lucide/svelte/icons/user';
	import Mail from '@lucide/svelte/icons/mail';
	import Lock from '@lucide/svelte/icons/lock';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import Loader2 from '@lucide/svelte/icons/loader-2';

	interface Props {
		onSignup?: (data: { name: string; email: string; password: string }) => void;
		onLogin?: () => void;
		class?: string;
	}

	let {
		onSignup = undefined,
		onLogin = undefined,
		class: className = '',
	}: Props = $props();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let termsAccepted = $state(false);
	let loading = $state(false);
	let error = $state('');
	let formEl = $state<HTMLElement | null>(null);

	$effect(() => {
		if (!formEl) return;
		const ctx = gsap.context(() => {
			gsap.from(formEl, {
				opacity: 0,
				y: 20,
				duration: 0.45,
				ease: 'premium-smooth',
			});
		}, formEl);
		return () => ctx.revert();
	});

	function validateEmail(value: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';

		if (!name.trim()) {
			error = 'Name is required';
			return;
		}
		if (!email.trim()) {
			error = 'Email is required';
			return;
		}
		if (!validateEmail(email)) {
			error = 'Please enter a valid email address';
			return;
		}
		if (!password) {
			error = 'Password is required';
			return;
		}
		if (password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}
		if (!termsAccepted) {
			error = 'You must accept the terms and conditions';
			return;
		}

		loading = true;
		await new Promise((r) => setTimeout(r, 1200));
		loading = false;
		onSignup?.({ name, email, password });
	}
</script>

<Card.Root bind:ref={formEl} class={cn('w-full max-w-md', className)}>
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your details to get started</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit}>
			<div class="space-y-4">
				<div class="space-y-2">
					<label for="signup-name" class="text-sm font-medium">Full name</label>
					<div class="relative">
						<User class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="signup-name"
							type="text"
							placeholder="John Doe"
							class="pl-9"
							disabled={loading}
							bind:value={name}
						/>
					</div>
				</div>
				<div class="space-y-2">
					<label for="signup-email" class="text-sm font-medium">Email</label>
					<div class="relative">
						<Mail class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="signup-email"
							type="email"
							placeholder="you@example.com"
							class="pl-9"
							disabled={loading}
							bind:value={email}
						/>
					</div>
				</div>
				<div class="space-y-2">
					<label for="signup-password" class="text-sm font-medium">Password</label>
					<div class="relative">
						<Lock class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="signup-password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Create a password"
							class="pl-9 pr-9"
							disabled={loading}
							bind:value={password}
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
							tabindex="-1"
						>
							{#if showPassword}
								<EyeOff class="size-4" />
							{:else}
								<Eye class="size-4" />
							{/if}
						</button>
					</div>
				</div>
				<div class="space-y-2">
					<label for="signup-confirm-password" class="text-sm font-medium">Confirm password</label>
					<div class="relative">
						<Lock class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="signup-confirm-password"
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder="Repeat your password"
							class="pl-9 pr-9"
							disabled={loading}
							bind:value={confirmPassword}
						/>
						<button
							type="button"
							onclick={() => (showConfirmPassword = !showConfirmPassword)}
							class="text-muted-foreground hover:text-foreground absolute right-2.5 top-1/2 -translate-y-1/2"
							tabindex="-1"
						>
							{#if showConfirmPassword}
								<EyeOff class="size-4" />
							{:else}
								<Eye class="size-4" />
							{/if}
						</button>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<Checkbox id="signup-terms" bind:checked={termsAccepted} disabled={loading} />
					<label for="signup-terms" class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
						I accept the
						<button type="button" class="text-primary inline hover:underline">Terms and Conditions</button>
					</label>
				</div>
			</div>

			{#if error}
				<p class="text-destructive mt-3 text-xs">{error}</p>
			{/if}

			<Button type="submit" class="mt-4 w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="size-4 animate-spin" />
					Creating account…
				{:else}
					Create account
				{/if}
			</Button>
		</form>

		{#if onLogin}
			<p class="text-muted-foreground mt-4 text-center text-sm">
				Already have an account?
				<button type="button" onclick={onLogin} class="text-primary hover:underline">
					Log in
				</button>
			</p>
		{/if}
	</Card.Content>
</Card.Root>
