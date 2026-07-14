<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';

  interface Props {
    size?: number;
    color?: string;
    secondary?: string;
    speed?: number;
    blur?: number;
    opacity?: number;
    class?: string;
  }

  let {
    size = 400,
    color = 'var(--color-primary)',
    secondary = 'var(--color-ring)',
    speed = 1,
    blur = 80,
    opacity = 0.15,
    class: className
  }: Props = $props();

  let container: HTMLDivElement;
  let blob1: HTMLDivElement;
  let blob2: HTMLDivElement;
  let blob3: HTMLDivElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.to(blob1, {
        x: gsap.utils.random(-30, 30) * speed,
        y: gsap.utils.random(-20, 20) * speed,
        scale: 1.15,
        duration: gsap.utils.random(4, 6),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      gsap.to(blob2, {
        x: gsap.utils.random(-25, 25) * speed * -1,
        y: gsap.utils.random(-30, 30) * speed,
        scale: 1.1,
        duration: gsap.utils.random(5, 7),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      gsap.to(blob3, {
        x: gsap.utils.random(-20, 20) * speed,
        y: gsap.utils.random(-20, 20) * speed * -1,
        scale: 1.2,
        duration: gsap.utils.random(3, 5),
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
  class={cn('pointer-events-none absolute', className)}
  style="width: {size}px; height: {size}px;"
>
  <div
    bind:this={blob1}
    class="absolute rounded-full"
    style="width: {size}px; height: {size * 0.8}px; background: {color}; filter: blur({blur}px); opacity: {opacity};"
  ></div>
  <div
    bind:this={blob2}
    class="absolute rounded-full"
    style="width: {size * 0.7}px; height: {size * 0.9}px; background: {secondary}; filter: blur({blur}px); opacity: {opacity};"
  ></div>
  <div
    bind:this={blob3}
    class="absolute rounded-full"
    style="width: {size * 0.5}px; height: {size * 0.7}px; background: {color}; filter: blur({blur}px); opacity: {opacity * 0.7};"
  ></div>
</div>
