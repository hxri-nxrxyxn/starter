export type BlockedSite = 'instagram' | 'youtube';

class DemoStore {
	steps = $state(0)
	dailyGoal = $state(8000)
	minutes = $state(0)
	totalSteps = $state(0)
	streakDays = $state(0)
	level = $state(1)
	xp = $state(0)
	isOnboarded = $state(false)
	activeSession = $state<BlockedSite | null>(null)
	sessionRemaining = $state(0)
	sessionTotal = $state(0)

	constructor() {
		if (typeof localStorage === 'undefined') return;
		this.steps = Number(localStorage.getItem('demo-steps') || '0');
		this.minutes = Number(localStorage.getItem('demo-minutes') || '0');
		this.totalSteps = Number(localStorage.getItem('demo-total-steps') || '0');
		this.streakDays = Number(localStorage.getItem('demo-streak') || '0');
		this.level = Number(localStorage.getItem('demo-level') || '1');
		this.xp = Number(localStorage.getItem('demo-xp') || '0');
		this.isOnboarded = localStorage.getItem('demo-onboarded') === 'true';
	}

	get stepsToNextMinute() {
		const remainder = this.steps % 1000;
		return remainder === 0 ? 0 : 1000 - remainder;
	}

	get progressPercent() {
		return Math.min((this.steps / this.dailyGoal) * 100, 100);
	}

	formatDuration(seconds: number) {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	}

	addSteps(n: number) {
		const prevSteps = this.steps;
		this.steps += n;
		this.totalSteps += n;
		this.minutes = Math.floor(this.steps / 1000);
		this.xp = Math.floor(this.totalSteps / 1000) * 10;
		this.level = Math.floor(this.xp / 100) + 1;

		const crossedMilestone = prevSteps < 10000 && this.totalSteps >= 10000;
		this._save();
		return crossedMilestone;
	}

	startSession(site: BlockedSite, durationMinutes: number) {
		const available = Math.min(durationMinutes, this.minutes);
		if (available <= 0) return null;
		this.minutes -= available;
		this.activeSession = site;
		this.sessionTotal = available * 60;
		this.sessionRemaining = available * 60;
		this._save();
		return available;
	}

	private _sessionTimer: ReturnType<typeof setInterval> | null = null;

	resumeSessionTimer() {
		if (!this.activeSession || this.sessionRemaining <= 0) return;
		this._sessionTimer = setInterval(() => {
			this.sessionRemaining--;
			if (this.sessionRemaining <= 0) {
				this.endSession();
			}
		}, 1000);
	}

	endSession() {
		if (this._sessionTimer) {
			clearInterval(this._sessionTimer);
			this._sessionTimer = null;
		}
		this.activeSession = null;
		this.sessionRemaining = 0;
		this.sessionTotal = 0;
	}

	completeOnboarding() {
		this.isOnboarded = true;
		this._save();
	}

	private _save() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('demo-steps', String(this.steps));
		localStorage.setItem('demo-minutes', String(this.minutes));
		localStorage.setItem('demo-total-steps', String(this.totalSteps));
		localStorage.setItem('demo-streak', String(this.streakDays));
		localStorage.setItem('demo-level', String(this.level));
		localStorage.setItem('demo-xp', String(this.xp));
		localStorage.setItem('demo-onboarded', String(this.isOnboarded));
	}
}

export const demo = new DemoStore();
