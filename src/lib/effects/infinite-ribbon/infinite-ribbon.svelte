<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';

  interface Props {
    text: string;
    speed?: number;
    direction?: 'left' | 'right';
    fontSize?: number;
    opacity?: number;
    repeat?: number;
    class?: string;
  }

  let {
    text,
    speed = 30,
    direction = 'left',
    fontSize = 120,
    opacity = 0.03,
    repeat = 4,
    class: className
  }: Props = $props();

  let ribbonEl: HTMLDivElement;
  let container: HTMLDivElement;

  let copies = $derived(Array.from({ length: repeat }, (_, i) => i));

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.to(ribbonEl, {
        xPercent: direction === 'left' ? -50 : 50,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    }, container);

    return () => ctx.revert();
  });
</script>

<div
  bind:this={container}
  class={cn('overflow-hidden', className)}
>
  <div bind:this={ribbonEl} class="flex whitespace-nowrap">
    {#each copies as i (i)}
      <span
        class="font-display font-black leading-none tracking-tighter text-foreground"
        style="font-size: {fontSize}px; opacity: {opacity};"
      >
        {text}&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    {/each}
  </div>
</div>
