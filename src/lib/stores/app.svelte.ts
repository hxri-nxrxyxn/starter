export type Theme = 'light' | 'dark' | 'system';
export type ColorScheme = 'neutral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal';

export interface AppUser {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	bio?: string;
	username?: string;
	followers: number;
	following: number;
	premium: boolean;
	createdAt: Date;
}

class AppStore {
	theme = $state<Theme>('light');
	colorScheme = $state<ColorScheme>('neutral');
	user = $state<AppUser | null>(null);
	isAuthenticated = $state(false);
	isOnline = $state(true);
	isLoading = $state(false);
	isOnboarded = $state(false);
	version = $state('1.0.0');

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('app-theme');
			if (saved) this.theme = saved as Theme;
			const savedScheme = localStorage.getItem('app-color-scheme');
			if (savedScheme) this.colorScheme = savedScheme as ColorScheme;
			const onboarded = localStorage.getItem('app-onboarded');
			if (onboarded === 'true') this.isOnboarded = true;
			this.isOnline = navigator.onLine;
			window.addEventListener('online', () => { this.isOnline = true; });
			window.addEventListener('offline', () => { this.isOnline = false; });
		}
	}

	setTheme(theme: Theme) {
		localStorage.setItem('app-theme', theme);
		this.theme = theme;
	}

	setColorScheme(scheme: ColorScheme) {
		localStorage.setItem('app-color-scheme', scheme);
		this.colorScheme = scheme;
	}

	setUser(user: AppUser | null) {
		this.user = user;
		this.isAuthenticated = !!user;
	}

	setOnboarded(v: boolean) {
		localStorage.setItem('app-onboarded', String(v));
		this.isOnboarded = v;
	}

	setLoading(v: boolean) {
		this.isLoading = v;
	}

	reset() {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('app-theme');
			localStorage.removeItem('app-color-scheme');
			localStorage.removeItem('app-onboarded');
		}
		this.theme = 'system';
		this.colorScheme = 'neutral';
		this.user = null;
		this.isAuthenticated = false;
		this.isOnboarded = false;
		this.isLoading = false;
	}
}

export const app = new AppStore();
