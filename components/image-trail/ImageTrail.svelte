<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type ImageTrailVariant = "fade" | "scale" | "rotate" | "stack";

  const base = "relative isolate overflow-hidden";
  const layerClass =
    "pointer-events-none absolute inset-0 -z-10 [&>*]:absolute [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2 [&>*]:opacity-0 motion-reduce:hidden";
  const dotClass = "block size-4 rounded-full bg-primary";

  const still = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  type Frame = { opacity: number; transform?: string; offset?: number };

  /** Keyframes per variant. The angle comes from the trail counter, so every run looks the same. */
  function frames(variant: ImageTrailVariant, n: number): Frame[] {
    const turn = ((n * 47) % 70) - 35;
    if (variant === "scale")
      return [
        { opacity: 1, transform: "scale(0)" },
        { opacity: 1, transform: "scale(1)", offset: 0.25 },
        { opacity: 0, transform: "scale(0.2)" },
      ];
    if (variant === "rotate")
      return [
        { opacity: 0, transform: `rotate(${turn}deg) scale(.6)` },
        {
          opacity: 1,
          transform: `rotate(${turn / 2}deg) scale(1)`,
          offset: 0.2,
        },
        { opacity: 0, transform: "rotate(0deg) translateY(32px) scale(.9)" },
      ];
    if (variant === "stack")
      return [
        { opacity: 0, transform: `rotate(${turn / 3}deg) scale(1.4)` },
        { opacity: 1, transform: `rotate(${turn / 3}deg) scale(1)` },
      ];
    return [{ opacity: 1 }, { opacity: 0 }];
  }

  type TrailOptions = {
    threshold: number;
    variant: ImageTrailVariant;
    max: number;
    duration: number;
    autoplay: boolean;
  };

  /** Run `tick` on every frame while the element is on screen and the tab is visible. */
  function whileVisible(element: Element, tick: (now: number) => void) {
    let frame = 0;
    let seen = false;
    const run = (now: number) => {
      tick(now);
      frame = requestAnimationFrame(run);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (seen && !document.hidden) frame = requestAnimationFrame(run);
    };
    const observer = new IntersectionObserver(([entry]) => {
      seen = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(frame);
    };
  }

  /** Clone the next item to (x, y) once the pointer has travelled `threshold` px. At most `max` clones live at once. */
  function createTrail(
    root: HTMLElement,
    source: HTMLElement,
    layer: HTMLElement,
    options: TrailOptions,
  ) {
    const { threshold, variant, max, duration } = options;
    let last: { x: number; y: number } | null = null;
    let count = 0;
    let inside = false;

    const spawn = (x: number, y: number) => {
      const items = source.children;
      if (!items.length) return;
      if (last && Math.hypot(x - last.x, y - last.y) < threshold) return;
      last = { x, y };
      if (layer.children.length >= max) layer.firstElementChild?.remove();
      const item = items[count % items.length]!.cloneNode(true) as HTMLElement;
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      layer.append(item);
      const stack = variant === "stack";
      const animation = item.animate?.(frames(variant, count), {
        duration: stack ? duration * 0.4 : duration,
        easing: "cubic-bezier(.2,.7,.3,1)",
        fill: "forwards",
      });
      if (animation && !stack) animation.onfinish = () => item.remove();
      count++;
    };

    const move = (event: PointerEvent) => {
      if (still()) return;
      inside = true;
      const rect = root.getBoundingClientRect();
      spawn(event.clientX - rect.left, event.clientY - rect.top);
    };
    const leave = () => {
      inside = false;
      last = null;
      if (variant !== "stack") return;
      for (const item of [...layer.children]) {
        const out = item.animate?.([{ opacity: 1 }, { opacity: 0 }], {
          duration: 300,
          fill: "forwards",
        });
        if (out) out.onfinish = () => item.remove();
        else item.remove();
      }
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    const stopAuto =
      options.autoplay && !still() && typeof IntersectionObserver === "function"
        ? whileVisible(root, (now) => {
            if (inside) return;
            const t = now / 1100;
            const { width, height } = root.getBoundingClientRect();
            spawn(
              width * (0.5 + 0.36 * Math.sin(t)),
              height * (0.5 + 0.3 * Math.sin(2 * t)),
            );
          })
        : null;

    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      stopAuto?.();
      layer.replaceChildren();
    };
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Elements that appear along the trail, cloned in order. A small primary dot when empty. */
    items?: Snippet;
    /** Distance in px the pointer travels before the next item appears. */
    threshold?: number;
    /** How each item enters and leaves. */
    variant?: ImageTrailVariant;
    /** Most items on screen at once. */
    max?: number;
    /** Life of one item in ms. */
    duration?: number;
    /** Draws a figure-eight trail on its own while visible and the pointer is elsewhere. */
    autoplay?: boolean;
    children?: Snippet;
  };

  let {
    items,
    threshold = 40,
    variant = "fade",
    max = 12,
    duration = 800,
    autoplay = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let root = $state<HTMLDivElement>();
  let source = $state<HTMLDivElement>();
  let layer = $state<HTMLDivElement>();

  $effect(() => {
    const options = { threshold, variant, max, duration, autoplay };
    if (root && source && layer)
      return createTrail(root, source, layer, options);
  });
</script>

<div {...rest} bind:this={root} class={[base, className]}>
  <div bind:this={source} hidden>
    {#if items}{@render items()}{:else}<span class={dotClass}></span>{/if}
  </div>
  <div bind:this={layer} aria-hidden="true" class={layerClass}></div>
  {@render children?.()}
</div>
