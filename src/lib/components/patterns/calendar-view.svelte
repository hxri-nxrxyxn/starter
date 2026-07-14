<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils.js";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	interface CalendarEvent {
		date: number;
		title: string;
		variant?: string;
	}

	interface Props {
		year?: number;
		month?: number;
		events?: CalendarEvent[];
		onDateClick?: (date: Date) => void;
		className?: string;
	}

	let {
		year = new Date().getFullYear(),
		month = new Date().getMonth() + 1,
		events = [],
		onDateClick,
		className
	}: Props = $props();

	let offset = $state(0);

	let currentYear = $derived.by(() => {
		const d = new Date(year, month - 1 + offset, 1);
		return d.getFullYear();
	});

	let currentMonth = $derived.by(() => {
		const d = new Date(year, month - 1 + offset, 1);
		return d.getMonth() + 1;
	});

	let today = $derived(new Date());
	let daysInMonth = $derived(new Date(currentYear, currentMonth, 0).getDate());
	let firstDayOfMonth = $derived(new Date(currentYear, currentMonth - 1, 1).getDay());

	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	let calendarDays = $derived.by(() => {
		const days: Array<{ day: number; isToday: boolean; events: CalendarEvent[] }> = [];
		const todayDate = today.getDate();
		const todayMonth = today.getMonth() + 1;
		const todayYear = today.getFullYear();

		for (let d = 1; d <= daysInMonth; d++) {
			const isToday = d === todayDate && currentMonth === todayMonth && currentYear === todayYear;
			const dayEvents = events.filter((e) => e.date === d);
			days.push({ day: d, isToday, events: dayEvents });
		}

		return days;
	});

	function previousMonth() {
		offset -= 1;
	}

	function nextMonth() {
		offset += 1;
	}

	function todayTitle() {
		const date = new Date(currentYear, currentMonth - 1);
		return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
	}
</script>

<div class={cn("flex flex-col gap-3", className)}>
	<div class="flex items-center justify-between">
		<Button variant="ghost" size="icon-xs" onclick={previousMonth} aria-label="Previous month">
			<ChevronLeftIcon class="size-4" />
		</Button>
		<h3 class="text-sm font-semibold">{todayTitle()}</h3>
		<Button variant="ghost" size="icon-xs" onclick={nextMonth} aria-label="Next month">
			<ChevronRightIcon class="size-4" />
		</Button>
	</div>

	<div class="grid grid-cols-7 gap-1 text-center text-xs">
		{#each dayNames as name (name)}
			<div class="text-muted-foreground py-1 font-medium">{name}</div>
		{/each}

		{#each Array(firstDayOfMonth) as _, i (i)}
			<div></div>
		{/each}

		{#each calendarDays as day (day.day)}
			<button
				type="button"
				class={cn(
					"relative flex aspect-square items-center justify-center rounded-md text-sm transition-colors hover:bg-muted",
					day.isToday && "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
				)}
				onclick={() => onDateClick?.(new Date(currentYear, currentMonth - 1, day.day))}
				aria-label={`${day.day} ${todayTitle()}`}
			>
				{day.day}
				{#if day.events.length > 0}
					<span class="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
						{#each day.events.slice(0, 3) as event (event.date + event.title)}
							<span
								class={cn("inline-block size-1 rounded-full", event.variant === "destructive" ? "bg-destructive" : "bg-primary")}
							></span>
						{/each}
						{#if day.events.length > 3}
							<span class="text-muted-foreground text-[10px]">+{day.events.length - 3}</span>
						{/if}
					</span>
				{/if}
			</button>
		{/each}
	</div>
</div>
