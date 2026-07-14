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

  let container: HTMLParagraphElement;
  let charEls: HTMLSpanElement[] = $state([]);

  let characters = $derived(text.split(''));

  let tween: gsap.core.Tween | gsap.core.Timeline | null = null;

  $effect(() => {
    const _ = text;
    charEls = [];

    const frame = requestAnimationFrame(() => {
      const targets = charEls.filter(Boolean);
      if (targets.length === 0) return;

      tween?.kill();

      const vars: gsap.TweenVars = {
        fontWeight: toWeight,
        rotation: () => gsap.utils.random(-3, 3),
        duration,
        ease: 'premium-smooth',
        stagger,
        onComplete
      };

      if (loop) {
        vars.yoyo = true;
        vars.repeat = -1;
      }

      tween = gsap.fromTo(targets, { fontWeight: fromWeight, rotation: 0 }, vars);
    });

    return () => {
      cancelAnimationFrame(frame);
      tween?.kill();
      tween = null;
    };
  });
</script>

<p bind:this={container} class={cn('text-6xl font-bold tracking-tight', className)}>
  {#each characters as char, i (char)}
    <span
      class="inline-block"
      style="font-variation-settings: 'wght' {fromWeight};"
      bind:this={charEls[i]}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  {/each}
</p>
