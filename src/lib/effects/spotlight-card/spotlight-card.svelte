<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '$lib/animate';
  import { cn } from '$lib/utils';
  import * as Card from '$lib/components/ui/card/index.js';
  import type { ComponentType } from 'svelte';

  interface Props {
    title: string;
    description?: string;
    icon?: ComponentType;
    variant?: 'default' | 'dark';
    class?: string;
  }

  let {
    title,
    description,
    icon: Icon,
    variant = 'default',
    class: className
  }: Props = $props();

  let glowEl: HTMLDivElement;
  let cardEl = $state<HTMLDivElement>();
  let container: HTMLDivElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowEl,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 0.6, ease: 'premium-smooth' }
      );

      gsap.to(glowEl, {
        scale: 1.08,
        duration: 3,
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
  class={cn('relative', variant === 'dark' && 'bg-background/90', className)}
>
  <div
    bind:this={glowEl}
    class="pointer-events-none absolute -inset-8 rounded-full opacity-60 blur-3xl"
    style="background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);"
  ></div>

  <Card.Root bind:ref={cardEl} class="relative">
    <Card.Content class="flex flex-col items-center gap-4 py-8 text-center">
      {#if Icon}
        <Icon class="size-10" />
      {/if}
      <Card.Title class="text-2xl">{title}</Card.Title>
      {#if description}
        <Card.Description>{description}</Card.Description>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
