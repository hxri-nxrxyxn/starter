<script lang="ts">
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';

  interface Props {
    text: string;
    fromWeight?: number;
    toWeight?: number;
    duration?: number;
    stagger?: number;
    loop?: boolean;
    onComplete?: () => void;
    class?: string;
  }

  let {
    text,
    fromWeight = 200,
    toWeight = 900,
    duration = 2,
    stagger = 0.05,
    loop = false,
    onComplete,
    class: className
  }: Props = $props();

  let charEls: HTMLSpanElement[] = [];

  let characters = $derived(text.split(''));

  let tween: gsap.core.Timeline | null = null;

  $effect(() => {
    const _ = text;
    charEls = [];

    requestAnimationFrame(() => {
      const targets = charEls.filter(Boolean);
      if (targets.length === 0) return;

      tween?.kill();

      const tl = gsap.timeline({ onComplete });

      targets.forEach((el, i) => {
        tl.fromTo(el,
          { '--wght': fromWeight, rotation: -5, opacity: 0 },
          { '--wght': toWeight, rotation: 3, opacity: 1, duration, ease: 'premium-smooth' },
          i * stagger
        );
        if (loop) {
          tl.to(el, { '--wght': fromWeight, rotation: 0, duration: duration * 0.5, ease: 'sine.inOut' });
          tl.to(el, { '--wght': toWeight, rotation: 3, duration: duration * 0.5, ease: 'sine.inOut' });
        }
      });

      tween = tl;
    });

    return () => {
      tween?.kill();
      tween = null;
    };
  });
</script>

<p class={cn('text-6xl font-bold tracking-tight', className)}>
  {#each characters as char, i (i)}
    <span
      class="inline-block"
      style="font-variation-settings: 'wght' var(--wght, {fromWeight}); --wght: {fromWeight};"
      bind:this={charEls[i]}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  {/each}
</p>
