let _section = $state('dashboard');

export const nav = {
	get current() { return _section; },
	set current(v: string) { _section = v; },
};
