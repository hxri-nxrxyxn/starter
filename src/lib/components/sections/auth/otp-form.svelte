<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
import { cn } from '$lib/utils.js';
import { gsap } from '$lib/animate/index.js';
import { onMount } from 'svelte';
import Loader2 from '@lucide/svelte/icons/loader-2';
import Timer from '@lucide/svelte/icons/timer';

interface Props {
	onVerify?: (otp: string) => void;
	onResend?: () => void;
	email?: string;
	class?: string;
}

let {
	onVerify = undefined,
	onResend = undefined,
	email = '',
	class: className = '',
}: Props = $props();

const DIGIT_COUNT = 6;
let digits = $state<string[]>(Array(DIGIT_COUNT).fill(''));
let inputRefs = $state<(HTMLElement | null)[]>([]);
let loading = $state(false);
let error = $state('');
let resendCooldown = $state(30);
let canResend = $derived(resendCooldown === 0);

let formEl = $state<HTMLElement | null>(null);
let digitsContainer = $state<HTMLElement | null>(null);

let resendInterval: ReturnType<typeof setInterval> | undefined;

$effect(() => {
	if (resendCooldown > 0) {
		resendInterval = setInterval(() => {
			resendCooldown -= 1;
		}, 1000);
	}
	return () => {
		if (resendInterval) clearInterval(resendInterval);
	};
});

$effect(() => {
	if (!digitsContainer) return;
	const ctx = gsap.context(() => {
		gsap.from(digitsContainer!.children, {
			opacity: 0,
			y: 16,
			stagger: 0.06,
			duration: 0.35,
			ease: 'premium-smooth',
		});
	}, digitsContainer);
	return () => ctx.revert();
});

function refCapture(node: HTMLElement, index: number) {
	inputRefs[index] = node;
	return {
		destroy() {
			inputRefs[index] = null;
		},
	};
}

function handleDigitInput(index: number) {
	if (digits[index] && index < DIGIT_COUNT - 1) {
		const next = inputRefs[index + 1] as HTMLInputElement | null;
		next?.focus();
	}
	const otp = digits.join('');
	if (otp.length === DIGIT_COUNT) {
		handleVerify(otp);
	}
}

function handleKeyDown(index: number, e: KeyboardEvent) {
	if (e.key === 'Backspace' && !digits[index] && index > 0) {
		const prev = inputRefs[index - 1] as HTMLInputElement | null;
		prev?.focus();
	}
}

function handlePaste(e: ClipboardEvent) {
	e.preventDefault();
	const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, DIGIT_COUNT);
	if (!pasted) return;
	for (let i = 0; i < pasted.length; i++) {
		digits[i] = pasted[i];
	}
	const nextIndex = pasted.length < DIGIT_COUNT ? pasted.length : DIGIT_COUNT - 1;
	const target = inputRefs[nextIndex] as HTMLInputElement | null;
	target?.focus();
}

async function handleVerify(otp?: string) {
	const code = otp ?? digits.join('');
	if (code.length !== DIGIT_COUNT) {
		error = 'Please enter the complete code';
		return;
	}
	error = '';
	loading = true;
	await new Promise((r) => setTimeout(r, 1000));
	loading = false;
	onVerify?.(code);
}

function handleResend() {
	if (!canResend) return;
	resendCooldown = 30;
	onResend?.();
}
</script>

<div bind:this={formEl} class={cn('w-full max-w-sm', className)}>
	<div class="mb-6 text-center">
		<h3 class="text-lg font-medium">Verify your identity</h3>
		<p class="text-muted-foreground mt-1 text-sm">
			Enter the code sent to
			<span class="text-foreground font-medium">{email}</span>
		</p>
	</div>

	{#if error}
		<p class="text-destructive mb-4 text-center text-xs">{error}</p>
	{/if}

	<div bind:this={digitsContainer} class="flex items-center justify-center gap-2">
		{#each Array(DIGIT_COUNT) as _, i (i)}
			<input
				type="text"
				inputmode="numeric"
				maxlength={1}
				class="border-border focus:border-ring focus:ring-ring/50 size-10 rounded-lg border text-center text-lg font-semibold outline-none focus:ring-3"
				bind:value={digits[i]}
				oninput={() => handleDigitInput(i)}
				onkeydown={(e) => handleKeyDown(i, e)}
				onpaste={i === 0 ? handlePaste : undefined}
				disabled={loading}
				use:refCapture={i}
			/>
		{/each}
	</div>

	<Button class="mt-6 w-full" onclick={() => handleVerify()} disabled={loading}>
		{#if loading}
			<Loader2 class="size-4 animate-spin" />
			Verifying…
		{:else}
			Verify code
		{/if}
	</Button>

	<div class="mt-4 flex items-center justify-center gap-1.5 text-sm">
		<Timer class="text-muted-foreground size-4" />
		{#if canResend}
			<button type="button" onclick={handleResend} class="text-primary hover:underline">
				Resend code
			</button>
		{:else}
			<span class="text-muted-foreground">
				Resend in {resendCooldown}s
			</span>
		{/if}
	</div>
</div>
