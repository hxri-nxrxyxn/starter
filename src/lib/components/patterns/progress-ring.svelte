<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { gsap } from "$lib/animate/index.js";
	import { onMount } from "svelte";

	interface Props {
		value: number;
		size?: number;
		strokeWidth?: number;
		variant?: "default" | "success" | "warning";
		showLabel?: boolean;
		className?: string;
	}

	let {
		value,
		size = 64,
		strokeWidth = 5,
		variant = "default",
		showLabel = true,
		className,
	}: Props = $props();

	const center = $derived(size / 2);
	const radius = $derived(center - strokeWidth / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const clampedValue = $derived(Math.max(0, Math.min(100, value)));
	const offset = $derived(circumference - (clampedValue / 100) * circumference);

	const trackColor = "var(--color-muted)";
	const indicatorColor = $derived.by(() => {
		switch (variant) {
			case "success":
				return "var(--color-emerald-500)";
			case "warning":
				return "var(--color-amber-500)";
			default:
				return "var(--color-primary)";
		}
	});

	let svgEl: SVGSVGElement;

	onMount(() => {
		if (!svgEl) return;
		const circle = svgEl.querySelector("circle:last-child") as SVGCircleElement;
		if (!circle) return;
		const r = parseFloat(circle.getAttribute("r") ?? "0");
		const circ = 2 * Math.PI * r;
		gsap.set(circle, { strokeDashoffset: circ });
		const obj = { value: 0 };
		gsap.to(obj, {
			value: clampedValue,
			duration: 0.8,
			ease: "premium-smooth",
			onUpdate: () => {
				const off = circ - (obj.value / 100) * circ;
				circle.setAttribute("stroke-dashoffset", String(off));
			},
		});
	});
</script>

<svg
	bind:this={svgEl}
	data-slot="progress-ring"
	class={cn("shrink-0 -rotate-90", className)}
	width={size}
	height={size}
	viewBox={`0 0 ${size} ${size}`}
	role="progressbar"
	aria-valuenow={clampedValue}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<circle
		cx={center}
		cy={center}
		r={radius}
		fill="none"
		stroke={trackColor}
		stroke-width={strokeWidth}
	/>
	<circle
		cx={center}
		cy={center}
		r={radius}
		fill="none"
		stroke={indicatorColor}
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-dasharray={circumference}
		stroke-dashoffset={circumference}
	/>
</svg>
{#if showLabel}
	<span
		class="sr-only"
		aria-hidden="true"
	>
		{clampedValue}%
	</span>
{/if}
