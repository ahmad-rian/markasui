<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const base =
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-strong",
    secondary: "border border-line bg-surface text-ink hover:bg-subtle",
    ghost: "text-ink hover:bg-subtle",
    danger: "bg-danger text-on-primary hover:bg-danger/90",
  };
  const sizes = {
    sm: "h-8 rounded-md px-3 text-sm",
    md: "h-10 rounded-lg px-4 text-sm",
    lg: "h-12 rounded-lg px-6 text-base",
  };
  const sheen =
    "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent";
  const sheenVariants = {
    primary: "via-on-primary/30",
    secondary: "via-primary/10",
    ghost: "via-primary/10",
    danger: "via-on-primary/30",
  };

  /** The sheen sweeps across in the first 60% of each cycle, then rests off the button. */
  const SWEEP = [
    { translate: "0 0" },
    { translate: "300% 0", offset: 0.6 },
    { translate: "300% 0" },
  ];
  const DEFAULT_DURATION = 2400;

  const reducedMotion = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  type Props = HTMLButtonAttributes & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Length of one shimmer cycle in milliseconds. */
    duration?: number;
    children?: Snippet;
  };

  let {
    variant = "primary",
    size = "md",
    duration = DEFAULT_DURATION,
    type = "button",
    class: className,
    children,
    ...rest
  }: Props = $props();

  let sheenElement = $state<HTMLSpanElement>();

  $effect(() => {
    const element = sheenElement;
    const button = element?.parentElement;
    const cycle = duration;
    if (!element || !button || typeof element.animate !== "function") return;
    if (reducedMotion()) return;
    const animation = element.animate(SWEEP, {
      duration: cycle,
      iterations: Infinity,
      easing: "ease-in-out",
    });
    if (typeof IntersectionObserver === "undefined")
      return () => animation.cancel();
    // Pause while the button is off screen.
    const observer = new IntersectionObserver(([entry]) =>
      entry?.isIntersecting ? animation.play() : animation.pause(),
    );
    observer.observe(button);
    return () => {
      observer.disconnect();
      animation.cancel();
    };
  });
</script>

<button
  {type}
  class={[base, variants[variant], sizes[size], className]}
  {...rest}
>
  {@render children?.()}
  <span
    bind:this={sheenElement}
    class={[sheen, sheenVariants[variant]]}
    aria-hidden="true"
  ></span>
</button>
