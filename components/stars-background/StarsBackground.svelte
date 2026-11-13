<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base = "relative isolate overflow-hidden";
  const layer = "pointer-events-none absolute inset-0";
  const star =
    "absolute rounded-full bg-current animate-[markas-twinkle_3s_ease-in-out_infinite] motion-reduce:animate-none";
  const content = "relative";
  const colors = {
    muted: "text-muted",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  const keyframes = "@keyframes markas-twinkle{50%{opacity:.15}}";

  /** Park-Miller: integer math only, so every framework draws the same stars. */
  const MODULUS = 2147483647;
  const MULTIPLIER = 48271;
  const MAX_STARS = 400;

  function makeStars(count: number, seed: number) {
    let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
    const next = () => (state = (state * MULTIPLIER) % MODULUS);
    const total = Math.max(0, Math.min(Math.trunc(count), MAX_STARS));
    return Array.from({ length: total }, () => {
      const size = next() % 5 === 0 ? 2 : 1;
      const left = (next() % 10000) / 100;
      const top = (next() % 10000) / 100;
      const opacity = ((next() % 6) + 4) / 10;
      const delay = (next() % 30) * 100;
      const duration = (next() % 3) + 2;
      return `left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; opacity: ${opacity}; animation-delay: ${delay}ms; animation-duration: ${duration}s`;
    });
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    count?: number;
    seed?: number;
    color?: keyof typeof colors;
    children?: Snippet;
  };

  let {
    count = 80,
    seed = 7,
    color = "primary",
    class: className,
    children,
    ...rest
  }: Props = $props();

  const items = $derived(makeStars(count, seed));
</script>

<div {...rest} class={[base, className]}>
  {@html `<style>${keyframes}</style>`}
  <div aria-hidden="true" class={[layer, colors[color]]}>
    {#each items as style, index (index)}
      <span class={star} {style}></span>
    {/each}
  </div>
  <div class={content}>{@render children?.()}</div>
</div>
