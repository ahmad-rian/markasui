<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "pointer-events-none z-50 w-full";
  const bar = "h-full w-full origin-left";
  const targets = {
    page: "fixed inset-x-0 top-0",
    parent: "sticky top-0 left-0",
  };
  const sizes = {
    sm: "h-0.5",
    md: "h-1",
    lg: "h-1.5",
  };
  const colors = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };

  /**
   * Fills the bar with the scroll position of the page or the parent element. Updates are batched
   * per frame. Returns a cleanup function.
   */
  function trackScroll(
    element: HTMLElement,
    fill: HTMLElement,
    target: keyof typeof targets,
  ) {
    const scroller = target === "parent" ? element.parentElement : null;
    const source = scroller ?? document.documentElement;
    const events: EventTarget = scroller ?? window;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = source.scrollHeight - source.clientHeight;
      const progress =
        max > 0 ? Math.min(Math.max(source.scrollTop / max, 0), 1) : 0;
      fill.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    events.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      events.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Follow the whole page, or the closest scrolling parent element. */
    target?: keyof typeof targets;
    color?: keyof typeof colors;
    size?: keyof typeof sizes;
  };

  let {
    target = "page",
    color = "primary",
    size = "sm",
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLDivElement>();
  let fill = $state<HTMLDivElement>();

  $effect(() => {
    const source = target;
    if (!element || !fill) return;
    return trackScroll(element, fill, source);
  });
</script>

<div
  bind:this={element}
  aria-hidden="true"
  {...rest}
  class={[root, targets[target], sizes[size], className]}
>
  <div
    bind:this={fill}
    class={[bar, colors[color]]}
    style="transform: scaleX(0)"
  ></div>
</div>
