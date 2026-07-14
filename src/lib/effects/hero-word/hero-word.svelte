<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';

  interface Props {
    text: string;
    size?: number;
    opacity?: number;
    speed?: number;
    class?: string;
  }

  let {
    text,
    size = 300,
    opacity = 0.02,
    speed = 1,
    class: className
  }: Props = $props();

  let wordEl: HTMLSpanElement;
  let container: HTMLDivElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.to(wordEl, {
        y: 10 * speed,
        duration: 8 / speed,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<div
  bind:this={container}
  class={cn('pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden', className)}
>
  <span
    bind:this={wordEl}
    class="font-display font-black leading-none tracking-tighter text-foreground"
    style="font-size: {size}px; opacity: {opacity};"
  >
    {text}
  </span>
</div>
