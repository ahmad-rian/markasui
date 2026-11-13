<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base = "relative isolate overflow-hidden";
  const layer =
    "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]";
  const ring =
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[markas-ripple_3.4s_ease-in-out_infinite] rounded-full border border-current bg-current/5 motion-reduce:animate-none";
  const content = "relative";
  const colors = {
    muted: "text-muted",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  const keyframes =
    "@keyframes markas-ripple{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}";
  const RING_DELAY_MS = 120;
  const MAX_RINGS = 12;

  /** Ring i: the further out, the larger and fainter, with a delay so the pulse travels from the center. */
  function makeRings(rings: number, size: number, gap: number) {
    const total = Math.max(0, Math.min(Math.trunc(rings), MAX_RINGS));
    return Array.from({ length: total }, (_, index) => {
      const diameter = size + index * gap;
      const opacity = Math.max(1, 6 - index) / 10;
      return `width: ${diameter}px; height: ${diameter}px; opacity: ${opacity}; animation-delay: ${index * RING_DELAY_MS}ms`;
    });
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    rings?: number;
    size?: number;
    gap?: number;
    color?: keyof typeof colors;
    children?: Snippet;
  };

  let {
    rings = 6,
    size = 120,
    gap = 64,
    color = "muted",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const items = $derived(makeRings(rings, size, gap));
</script>

<div {...rest} class={[base, className]}>
  {@html `<style>${keyframes}</style>`}
  <div aria-hidden="true" class={[layer, colors[color]]}>
    {#each items as style, index (index)}
      <span class={ring} {style}></span>
    {/each}
  </div>
  <div class={content}>{@render children?.()}</div>
</div>
