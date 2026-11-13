<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base = "relative isolate overflow-hidden";
  const layer = "pointer-events-none absolute inset-0";
  const meteor =
    "absolute rounded-full bg-current [transform:rotate(var(--markas-meteor-angle))] animate-[markas-meteor_6s_linear_infinite] motion-reduce:animate-none before:absolute before:top-1/2 before:left-1/2 before:w-(--markas-meteor-tail) before:-translate-y-1/2 before:rounded-full before:bg-linear-to-r before:from-current before:to-transparent";
  const content = "relative";
  const colors = {
    muted: "text-muted",
    ink: "text-ink",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  const variants = {
    rain: { meteor: "size-px before:h-px", count: 20, tail: [40, 60] as const },
    comet: {
      meteor: "size-1 shadow-[0_0_8px_2px_currentColor] before:h-0.5",
      count: 6,
      tail: [100, 80] as const,
    },
  };
  /** Minimum duration and extra range in seconds. */
  const speeds = { slow: [9, 6], normal: [5, 4], fast: [2, 3] } as const;
  const keyframes =
    "@keyframes markas-meteor{0%{transform:rotate(var(--markas-meteor-angle)) translateX(0);opacity:1}70%{opacity:1}to{transform:rotate(var(--markas-meteor-angle)) translateX(-640px);opacity:0}}";

  /** Park-Miller: integer math only, so every framework draws the same meteors. */
  const MODULUS = 2147483647;
  const MULTIPLIER = 48271;
  const MAX_METEORS = 60;
  const MAX_ANGLE = 180;

  type Variant = keyof typeof variants;

  function makeMeteors(
    variant: Variant,
    count: number,
    seed: number,
    speed: keyof typeof speeds,
  ) {
    let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
    const next = () => (state = (state * MULTIPLIER) % MODULUS);
    const total = Math.max(0, Math.min(Math.trunc(count), MAX_METEORS));
    const [minTail, tailRange] = variants[variant].tail;
    const [minSeconds, secondsRange] = speeds[speed] ?? speeds.normal;
    return Array.from({ length: total }, () => {
      const seconds = minSeconds + (next() % secondsRange);
      const left = next() % 100;
      const top = (next() % 70) - 10;
      const opacity = ((next() % 5) + 5) / 10;
      const delay = -(next() % (seconds * 10)) * 100;
      const tail = minTail + (next() % tailRange);
      return `left: ${left}%; top: ${top}%; opacity: ${opacity}; animation-duration: ${seconds}s; animation-delay: ${delay}ms; --markas-meteor-tail: ${tail}px`;
    });
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    variant?: Variant;
    count?: number;
    angle?: number;
    speed?: keyof typeof speeds;
    color?: keyof typeof colors;
    seed?: number;
    children?: Snippet;
  };

  let {
    variant = "rain",
    count,
    angle = 35,
    speed = "normal",
    color = "primary",
    seed = 3,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const key = $derived<Variant>(variant in variants ? variant : "rain");
  const turn = $derived(
    180 + Math.max(0, Math.min(Math.trunc(angle), MAX_ANGLE)),
  );
  const items = $derived(
    makeMeteors(key, count ?? variants[key].count, seed, speed),
  );
</script>

<div {...rest} class={[base, className]}>
  {@html `<style>${keyframes}</style>`}
  <div
    aria-hidden="true"
    class={[layer, colors[color] ?? colors.primary]}
    style="--markas-meteor-angle: {turn}deg"
  >
    {#each items as style, index (index)}
      <span class={[meteor, variants[key].meteor]} {style}></span>
    {/each}
  </div>
  <div class={content}>{@render children?.()}</div>
</div>
