<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { gsap } from '$lib/animate/index.js';
	import { onMount } from 'svelte';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FlameIcon from '@lucide/svelte/icons/flame';

	interface Props {
		year?: number;
		month?: number;
		streakData?: number[];
		class?: string;
	}

	let {
		year = new Date().getFullYear(),
		month = new Date().getMonth(),
		streakData = [],
		class: className,
	}: Props = $props();

	let displayYear = $state(year ?? new Date().getFullYear());
	let displayMonth = $state(month ?? new Date().getMonth() + 1);
	let today = $state(new Date());

	let monthLabel = $derived(
		new Date(displayYear, displayMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
	);

	let daysInMonth = $derived(new Date(displayYear, displayMonth + 1, 0).getDate());
	let firstDayOfWeek = $derived(new Date(displayYear, displayMonth, 1).getDay());
	let dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	let emptyCells = $derived(firstDayOfWeek);

	let calendarDays = $derived.by(() => {
		const days: Array<{ day: number; isStreak: boolean; isToday: boolean; isPast: boolean }> = [];
		for (let d = 1; d <= daysInMonth; d++) {
			const date = new Date(displayYear, displayMonth, d);
			const isToday = date.toDateString() === today.toDateString();
			const isStreak = streakData.includes(d);
			const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
			days.push({ day: d, isStreak, isToday, isPast });
		}
		return days;
	});

	let streakCount = $derived(streakData.length);

	function prevMonth() {
		if (displayMonth === 0) {
			displayMonth = 11;
			displayYear--;
		} else {
			displayMonth--;
		}
	}

	function nextMonth() {
		if (displayMonth === 11) {
			displayMonth = 0;
			displayYear++;
		} else {
			displayMonth++;
		}
	}

	let calendarEl: HTMLDivElement | null = $state(null);

	onMount(() => {
		if (!calendarEl) return;
		const ctx = gsap.context(() => {
			gsap.from(calendarEl!.querySelectorAll('[data-day]'), {
				scale: 0,
				opacity: 0,
				duration: 0.25,
				stagger: 0.02,
				ease: 'back.out(1.5)',
			});
		}, calendarEl);
		return () => ctx.revert();
	});

	$effect(() => {
		displayYear;
		displayMonth;
		if (!calendarEl) return;
		const ctx = gsap.context(() => {
			gsap.from(calendarEl!.querySelectorAll('[data-day]'), {
				scale: 0,
				opacity: 0,
				duration: 0.2,
				stagger: 0.015,
				ease: 'back.out(1.5)',
			});
		}, calendarEl);
		return () => ctx.revert();
	});
</script>

<div bind:this={calendarEl} class={cn('flex flex-col gap-3', className)}>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<FlameIcon class="size-5 text-orange-500" />
			<span class="text-lg font-semibold">{monthLabel}</span>
		</div>
		<div class="flex gap-1">
			<Button variant="ghost" size="icon-sm" onclick={prevMonth}>
				<ChevronLeftIcon class="size-4" />
			</Button>
			<Button variant="ghost" size="icon-sm" onclick={nextMonth}>
				<ChevronRightIcon class="size-4" />
			</Button>
		</div>
	</div>

	<div class="grid grid-cols-7 gap-1">
		{#each dayLabels as label (label)}
			<div class="text-muted-foreground text-center text-xs font-medium">{label}</div>
		{/each}
		{#each Array(emptyCells) as _, i (i)}
			<div></div>
		{/each}
		{#each calendarDays as day (day.day)}
			<div
				data-day
				class={cn(
					'flex aspect-square items-center justify-center rounded-full text-sm transition-colors',
					day.isToday && 'ring-primary ring-2 ring-offset-2',
					day.isStreak && 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
					!day.isStreak && day.isPast && 'text-muted-foreground/40',
					!day.isStreak && !day.isPast && 'text-muted-foreground',
					!day.isStreak && !day.isPast && day.isToday && 'text-foreground'
				)}
			>
				{day.day}
			</div>
		{/each}
	</div>

	<div class="flex items-center justify-between text-xs text-muted-foreground">
		<div class="flex items-center gap-2">
			<div class="size-3 rounded-full bg-orange-100 dark:bg-orange-900/40"></div>
			<span>Streak day</span>
		</div>
		<div class="flex items-center gap-1.5 font-medium">
			<FlameIcon class="size-3.5 text-orange-500" />
			<span>{streakCount} day streak</span>
		</div>
	</div>
</div>
