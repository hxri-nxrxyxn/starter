<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { cn } from '$lib/utils.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import StarIcon from '@lucide/svelte/icons/star';

	interface Testimonial {
		quote: string;
		name: string;
		role?: string;
		avatar?: string;
		rating?: number;
	}

	interface Props {
		testimonials?: Testimonial[];
		class?: string;
	}

	const defaultTestimonials: Testimonial[] = [
		{
			quote: 'This template completely transformed our workflow. The pre-built patterns saved us weeks of development time.',
			name: 'Sarah Chen',
			role: 'Lead Developer',
			rating: 5,
		},
		{
			quote: 'The animations are stunning and the code is incredibly clean. Best SvelteKit starter I have ever used.',
			name: 'Marcus Johnson',
			role: 'UX Engineer',
			rating: 5,
		},
		{
			quote: 'From idea to production in record time. The component library is comprehensive and well-documented.',
			name: 'Emily Rodriguez',
			role: 'Product Designer',
			rating: 4,
		},
		{
			quote: 'Type safety throughout, beautiful defaults, and everything just works. Highly recommended.',
			name: 'Alex Kim',
			role: 'Full-Stack Developer',
			rating: 5,
		},
	];

	let {
		testimonials = defaultTestimonials,
		class: className,
	}: Props = $props();

	let currentIndex = $state(0);
	let cardEl: HTMLDivElement | null = $state(null);
	let autoTimer: ReturnType<typeof setInterval>;

	const current = $derived(testimonials[currentIndex]);
	const totalSlides = $derived(testimonials.length);

	onMount(() => {
		startAutoRotate();
		return () => {
			if (autoTimer) clearInterval(autoTimer);
		};
	});

	function startAutoRotate() {
		if (autoTimer) clearInterval(autoTimer);
		autoTimer = setInterval(() => {
			const next = (currentIndex + 1) % totalSlides;
			goTo(next);
		}, 5000);
	}

	function goTo(index: number) {
		if (index === currentIndex) return;
		if (autoTimer) clearInterval(autoTimer);

		if (!cardEl) {
			currentIndex = index;
			startAutoRotate();
			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				ease: 'premium-smooth',
				onComplete() {
					ctx.revert();
					startAutoRotate();
				},
			});
			tl.to(cardEl, { opacity: 0, y: -10, duration: 0.15 }, 0);
			tl.call(() => { currentIndex = index; });
			tl.fromTo(cardEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 0.15);
		}, cardEl);
	}
</script>

<div class={cn('flex flex-col items-center gap-6', className)}>
	<div
		bind:this={cardEl}
		class="bg-card border-border relative flex w-full max-w-2xl flex-col items-center gap-4 rounded-xl border p-8 text-center"
	>
		<div class="text-muted-foreground/30 text-6xl leading-none">&ldquo;</div>
		<blockquote class="text-lg leading-relaxed">{current.quote}</blockquote>

		{#if current.rating}
			<div class="flex gap-1">
				{#each Array(5) as _, i (i)}
					<StarIcon
						class={cn('size-4', i < (current.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30')}
					/>
				{/each}
			</div>
		{/if}

		<div class="flex items-center gap-3">
			<Avatar.Root>
				{#if current.avatar}
					<Avatar.Image src={current.avatar} alt={current.name} />
				{/if}
				<Avatar.Fallback class="text-xs">{current.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}</Avatar.Fallback>
			</Avatar.Root>
			<div class="text-left">
				<p class="text-sm font-medium">{current.name}</p>
				{#if current.role}
					<p class="text-muted-foreground text-xs">{current.role}</p>
				{/if}
			</div>
		</div>
	</div>

	{#if totalSlides > 1}
		<div class="flex gap-2">
			{#each testimonials as _, i (i)}
				<button
					class={cn(
						'size-2 rounded-full transition-colors',
						i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
					)}
					onclick={() => goTo(i)}
					aria-label="Go to testimonial {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>
