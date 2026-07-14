<script lang="ts">
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';

  interface Props {
    value: number;
    label?: string;
    suffix?: string;
    variant?: 'default' | 'bold' | 'thin';
    duration?: number;
    class?: string;
  }

  let {
    value,
    label,
    suffix,
    variant = 'default',
    duration = 1.2,
    class: className
  }: Props = $props();

  let container: HTMLDivElement;
  let numberEl: HTMLSpanElement;
  let displayValue = $state(0);
  let prevVal = 0;

  let formatted = $derived.by(() => {
    const n = Math.round(displayValue);
    const base = n.toLocaleString();
    return suffix ? `${base}${suffix}` : base;
  });

  let weight = $derived.by(() => {
    switch (variant) {
      case 'bold': return '900';
      case 'thin': return '300';
      default: return '700';
    }
  });

  $effect(() => {
    const start = prevVal;
    prevVal = value;

    const obj = { val: start };
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'premium-bounce',
      onUpdate() { displayValue = obj.val; },
      onComplete() { displayValue = value; }
    });

    let pulse: gsap.core.Tween | null = null;
    if (numberEl) {
      pulse = gsap.fromTo(
        numberEl,
        { scale: 1 },
        { scale: 1.05, duration: 0.3, ease: 'premium-spring', yoyo: true, repeat: 1 }
      );
    }

    return () => {
      tween.kill();
      pulse?.kill();
    };
  });
</script>

<div bind:this={container} class={cn('flex flex-col items-center gap-2', className)}>
  <span
    bind:this={numberEl}
    class="inline-block font-display leading-none text-foreground"
    style="font-size: 70vh; font-weight: {weight}; text-shadow: 0 0.03em 0.08em hsl(0 0% 0% / 0.12);"
  >
    {formatted}
  </span>
  {#if label}
    <span class="text-xs text-muted-foreground">{label}</span>
  {/if}
</div>
