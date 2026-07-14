<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { nav } from '$lib/stores/nav.svelte.js';
	import { app } from '$lib/stores/app.svelte';
	import { demo } from '$lib/stores/demo.svelte.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import StatGrid from '$lib/components/patterns/stat-grid.svelte';
	import QuickActionGrid from '$lib/components/patterns/quick-action-grid.svelte';
	import ActivityCard from '$lib/components/patterns/activity-card.svelte';
	import AchievementCard from '$lib/components/patterns/achievement-card.svelte';
	import SectionHeader from '$lib/components/patterns/section-header.svelte';
	import { BigTimer } from '$lib/components/sections/index.js';
	import SessionOverlay from '$lib/components/demo/session-overlay.svelte';
	import { gsap, buttonPress } from '$lib/animate/index.js';
	import FootprintsIcon from '@lucide/svelte/icons/footprints';
	import CameraIcon from '@lucide/svelte/icons/camera';
	import PlayIcon from '@lucide/svelte/icons/play';
	import FlameIcon from '@lucide/svelte/icons/flame';
	import CrownIcon from '@lucide/svelte/icons/crown';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import TrophyIcon from '@lucide/svelte/icons/trophy';
	import ActivityIcon from '@lucide/svelte/icons/activity';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import TimerIcon from '@lucide/svelte/icons/timer';
	import TargetIcon from '@lucide/svelte/icons/target';
	import { Sun, Moon, Monitor } from '@lucide/svelte';

	let section = $derived(nav.current);

	let pageEl: HTMLElement | null = $state(null);
	let showShare = $state(false);

	let onboardingStep = $state(demo.isOnboarded ? 0 : 1);
	let onboardingGoal = $state(8000);

	const activities = [
		{ icon: FootprintsIcon, title: 'Morning Walk', description: '1,240 steps', timestamp: new Date(Date.now() - 3600000), badge: 'Walk' },
		{ icon: FootprintsIcon, title: 'Evening Stroll', description: '890 steps', timestamp: new Date(Date.now() - 7200000), badge: 'Walk' },
	];

	let totalSteps5k = $derived(Math.min(demo.totalSteps, 5000));
	let totalSteps42k = $derived(Math.min(demo.totalSteps, 42195));

	function handleTakeWalk() {
		const steps = Math.floor(Math.random() * 1001) + 500;
		demo.addSteps(steps);
		toast.success(`Walked ${steps} steps!`, { description: demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes !== 1 ? 's' : ''} earned` : undefined });
	}

	function handleStartSession(siteId: 'instagram' | 'youtube') {
		demo.startSession(siteId, 5);
	}

	function completeOnboarding() {
		demo.dailyGoal = onboardingGoal;
		demo.completeOnboarding();
		onboardingStep = 0;
	}

	function skipToEnd() {
		onboardingStep = 4;
	}

	function nextStep() {
		if (onboardingStep < 4) onboardingStep++;
	}

	onMount(() => {
		if (!pageEl) return;
		const ctx = gsap.context(() => {
			const entries = pageEl!.querySelectorAll('[data-entry]');
			gsap.from(entries, { opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: 'premium-smooth' });
			document.querySelectorAll('[data-btn-press]').forEach(el => buttonPress(el as HTMLElement));
		}, pageEl);
		return () => ctx.revert();
	});
</script>

{#if onboardingStep > 0}
	<div class="flex min-h-full flex-col">
		<div class="flex items-center justify-between px-1 py-2">
			<div class="flex gap-1">
				{#each Array(4) as _, i (i)}
					<div class={cn("size-2 rounded-full transition-colors", i + 1 === onboardingStep ? "bg-primary" : "bg-muted-foreground/30")}></div>
				{/each}
			</div>
			{#if onboardingStep < 4}
				<button onclick={skipToEnd} class="text-xs text-muted-foreground hover:text-foreground">Skip</button>
			{/if}
		</div>

		<div class="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
			{#if onboardingStep === 1}
				<FootprintsIcon class="size-12 text-foreground" />
				<h2 class="font-display text-4xl font-bold">Move to Earn</h2>
				<p class="max-w-sm text-muted-foreground">Walk to earn screen time. Every 1000 steps unlocks 1 minute on your favorite apps.</p>
				<Button class="w-full" size="lg" onclick={nextStep}>Get Started</Button>

			{:else if onboardingStep === 2}
				<TargetIcon class="size-12 text-foreground" />
				<h2 class="text-2xl font-bold">Set Your Daily Goal</h2>
				<div class="flex w-full flex-col gap-3">
					{#each [5000, 8000, 10000] as goal (goal)}
						<button
							onclick={() => onboardingGoal = goal}
							class={cn("w-full rounded-xl border p-4 text-left transition-colors", onboardingGoal === goal && "border-primary bg-primary/5")}
						>
							<span class="text-lg font-bold">{goal.toLocaleString()}</span>
							<span class="ml-2 text-sm text-muted-foreground">steps per day</span>
						</button>
					{/each}
				</div>
				<Button class="w-full" size="lg" disabled={!onboardingGoal} onclick={nextStep}>Continue</Button>

			{:else if onboardingStep === 3}
				<SparklesIcon class="size-12 text-foreground" />
				<h2 class="text-2xl font-bold">Almost There</h2>
				<p class="max-w-sm text-muted-foreground">StepScroller tracks your steps to convert them into screen time.</p>
				<div class="flex w-full flex-col gap-2">
					<Button class="w-full" size="lg" onclick={nextStep}>Allow Access</Button>
					<Button variant="outline" class="w-full" onclick={nextStep}>Skip</Button>
				</div>

			{:else if onboardingStep === 4}
				<SparklesIcon class="size-12 text-foreground" />
				<h2 class="text-2xl font-bold">You're All Set!</h2>
				<p class="max-w-sm text-muted-foreground">Walk {onboardingGoal.toLocaleString()} steps daily to earn screen time.</p>
				<Button class="w-full" size="lg" onclick={completeOnboarding}>Start Walking</Button>
			{/if}
		</div>
	</div>

{:else}
	<div bind:this={pageEl} class="flex flex-col gap-4">
		{#if section === 'dashboard'}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<Avatar.Root class="size-9">
						<Avatar.Fallback class="text-xs">W</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="text-sm font-medium leading-tight">Walker</p>
						<p class="text-xs text-muted-foreground">Day {demo.streakDays + 1} of your streak</p>
					</div>
				</div>
				<Button variant="outline" size="xs" data-btn-press onclick={() => { app.setTheme(app.theme === 'light' ? 'dark' : app.theme === 'dark' ? 'system' : 'light'); }}>
					{#if app.theme === 'dark'}<Sun class="size-4" />{:else if app.theme === 'system'}<Monitor class="size-4" />{:else}<Moon class="size-4" />{/if}
				</Button>
			</div>

			<div data-entry class="flex flex-col items-center py-6">
				<BigTimer value={demo.minutes} label="minutes earned" sub="{demo.steps.toLocaleString()} today · {demo.totalSteps.toLocaleString()} total · Level {demo.level}" />
			</div>

			<div data-entry>
				<SectionHeader title="Quick Actions" />
				<QuickActionGrid columns={3} actions={[
					{ icon: FootprintsIcon, label: 'Take a Walk', onClick: handleTakeWalk },
					{ icon: CameraIcon, label: 'Unlock Instagram', onClick: () => nav.current = 'sessions' },
					{ icon: PlayIcon, label: 'Unlock YouTube', onClick: () => nav.current = 'sessions' },
				]} />
			</div>

			<div data-entry>
				<StatGrid columns={4} items={[
					{ value: demo.level.toString(), label: 'Level', icon: CrownIcon },
					{ value: `${demo.xp} XP`, label: 'Experience', icon: ZapIcon },
					{ value: demo.streakDays.toString(), label: 'Day Streak', icon: FlameIcon, trend: { value: '+1', positive: true } },
					{ value: demo.totalSteps.toLocaleString(), label: 'Total Steps', icon: ActivityIcon },
				]} />
			</div>

			<div data-entry class="flex flex-col gap-2">
				<SectionHeader title="Recent Activity" />
				{#each activities as a (a.title)}
					<ActivityCard icon={a.icon} title={a.title} description={a.description} timestamp={a.timestamp} badge={a.badge} />
				{/each}
			</div>

			<div data-entry class="flex flex-col gap-2">
				<SectionHeader title="Achievements" />
				<AchievementCard icon={FootprintsIcon} title="First Steps" description="Take your first 1,000 steps" unlocked={demo.totalSteps >= 1000} rarity="common" />
				<AchievementCard icon={TrophyIcon} title="5k Club" description="Walk 5,000 total steps" unlocked={demo.totalSteps >= 5000} progress={totalSteps5k} progressMax={5000} rarity="rare" />
				<AchievementCard icon={SparklesIcon} title="Marathon" description="Walk a full marathon (42,195 steps)" unlocked={demo.totalSteps >= 42195} progress={totalSteps42k} progressMax={42195} rarity="epic" />
			</div>

		{:else if section === 'sessions'}
			<div class="flex items-center justify-between">
				<h1 class="text-xl font-bold">Unlock Apps</h1>
				<div class="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-sm font-medium tabular-nums">
					<TimerIcon class="size-3.5 text-muted-foreground" />
					{demo.minutes} min
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h2 class="text-lg font-semibold tracking-tight">Blocked Apps</h2>
				<div class="flex flex-col gap-3">
					<Card.Root>
						<Card.Content class="flex items-center gap-4 py-5">
							<div class="flex size-12 items-center justify-center rounded-xl bg-muted">
								<CameraIcon class="size-6 text-muted-foreground" />
							</div>
							<div class="flex flex-1 flex-col gap-0.5">
								<p class="text-sm font-semibold">Instagram</p>
								<span class="text-muted-foreground text-xs">
									{demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes === 1 ? '' : 's'} available` : 'Out of minutes'}
								</span>
							</div>
							<div class="flex items-center gap-2">
								{#if demo.minutes <= 0}
									<Badge variant="secondary">Out of minutes</Badge>
								{:else}
									<Button size="sm" disabled={!!demo.activeSession} onclick={() => handleStartSession('instagram')}>
										<TimerIcon data-icon="inline-start" />
										Start 5min
									</Button>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Content class="flex items-center gap-4 py-5">
							<div class="flex size-12 items-center justify-center rounded-xl bg-muted">
								<PlayIcon class="size-6 text-muted-foreground" />
							</div>
							<div class="flex flex-1 flex-col gap-0.5">
								<p class="text-sm font-semibold">YouTube</p>
								<span class="text-muted-foreground text-xs">
									{demo.minutes > 0 ? `${demo.minutes} minute${demo.minutes === 1 ? '' : 's'} available` : 'Out of minutes'}
								</span>
							</div>
							<div class="flex items-center gap-2">
								{#if demo.minutes <= 0}
									<Badge variant="secondary">Out of minutes</Badge>
								{:else}
									<Button size="sm" disabled={!!demo.activeSession} onclick={() => handleStartSession('youtube')}>
										<TimerIcon data-icon="inline-start" />
										Start 5min
									</Button>
								{/if}
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>

			{#if demo.minutes <= 0 && !demo.activeSession}
				<div class="flex flex-col items-center gap-2 py-12 text-center">
					<TimerIcon class="size-8 text-muted-foreground/40" />
					<p class="text-sm font-medium text-muted-foreground/60">No minutes available</p>
					<p class="text-xs text-muted-foreground/40">Walk to earn screen time — 1000 steps = 1 minute</p>
				</div>
			{/if}

		{:else if section === 'profile'}
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-3">
					<Avatar.Root class="size-12">
						<Avatar.Fallback>W</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="text-base font-semibold">Walker</p>
						<p class="text-xs text-muted-foreground">@stepscroller</p>
					</div>
				</div>

				<StatGrid columns={4} items={[
					{ value: demo.totalSteps.toLocaleString(), label: 'Total Steps', icon: FootprintsIcon },
					{ value: Math.floor(demo.totalSteps / 1000).toString(), label: 'Minutes Earned', icon: TimerIcon },
					{ value: demo.streakDays.toString(), label: 'Best Streak', icon: FlameIcon },
					{ value: demo.level.toString(), label: 'Level', icon: CrownIcon },
				]} />
			</div>
		{/if}

		<div class="pb-16"></div>
	</div>
{/if}

{#if demo.activeSession}
	<SessionOverlay />
{/if}
