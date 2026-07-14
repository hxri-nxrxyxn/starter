<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import Mail from '@lucide/svelte/icons/mail';
	import Lock from '@lucide/svelte/icons/lock';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';
	import Globe from '@lucide/svelte/icons/globe';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Loader2 from '@lucide/svelte/icons/loader-2';

	interface Props {
		onLogin?: (email: string, password: string) => void;
		onForgotPassword?: () => void;
		class?: string;
	}

	let {
		onLogin = undefined,
		onForgotPassword = undefined,
		class: className = '',
	}: Props = $props();

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
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

		loading = true;
		await new Promise((r) => setTimeout(r, 1200));
		loading = false;
		onLogin?.(email, password);
	}

	function handleSocialLogin(provider: string) {
		loading = true;
		setTimeout(() => {
			loading = false;
			onLogin?.(`${provider}@example.com`, 'social-login');
		}, 1200);
	}
</script>

<Card.Root bind:ref={formEl} class={cn('w-full max-w-md', className)}>
	<Card.Header>
		<Card.Title>Welcome back</Card.Title>
		<Card.Description>Sign in to your account to continue</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit}>
			<div class="space-y-4">
				<div class="space-y-2">
					<label for="login-email" class="text-sm font-medium">Email</label>
					<div class="relative">
						<Mail class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="login-email"
							type="email"
							placeholder="you@example.com"
							class="pl-9"
							disabled={loading}
							bind:value={email}
						/>
					</div>
				</div>
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<label for="login-password" class="text-sm font-medium">Password</label>
						{#if onForgotPassword}
							<button type="button" onclick={onForgotPassword} class="text-primary text-xs hover:underline">
								Forgot password?
							</button>
						{/if}
					</div>
					<div class="relative">
						<Lock class="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
						<Input
							id="login-password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter your password"
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
			</div>

			{#if error}
				<p class="text-destructive mt-3 text-xs">{error}</p>
			{/if}

			<Button type="submit" class="mt-4 w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="size-4 animate-spin" />
					Signing in…
				{:else}
					Sign in
				{/if}
			</Button>
		</form>

		<div class="mt-4 flex items-center gap-3">
			<Separator class="flex-1" />
			<span class="text-muted-foreground text-xs">or continue with</span>
			<Separator class="flex-1" />
		</div>

		<div class="mt-4 grid grid-cols-2 gap-3">
			<Button variant="outline" onclick={() => handleSocialLogin('google')} disabled={loading}>
				<Globe class="size-4" />
				Google
			</Button>
			<Button variant="outline" onclick={() => handleSocialLogin('github')} disabled={loading}>
				<GitBranch class="size-4" />
				GitHub
			</Button>
		</div>
	</Card.Content>
</Card.Root>
