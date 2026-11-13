<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "flex overflow-hidden";
  const copy = "flex shrink-0 justify-around gap-4";
  const orientations = {
    horizontal: { root: "flex-row", copy: "min-w-full flex-row pr-4" },
    vertical: { root: "flex-col", copy: "min-h-full flex-col pb-4" },
  };
  const fades = {
    horizontal: "mask-x-from-85%",
    vertical: "mask-y-from-85%",
  };
  const COPIES = [0, 1];
  const MS_PER_SECOND = 1000;

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Moves every copy by its own size, forever. Pauses while hovered, while focus is inside,
   * or while the marquee is off screen. Returns a cleanup function.
   */
  function startMarquee(
    element: HTMLElement,
    options: {
      vertical: boolean;
      reverse: boolean;
      duration: number;
      pauseOnHover: boolean;
    },
  ) {
    const axis = options.vertical ? "Y" : "X";
    const animations = Array.from(element.children).flatMap(
      (child) =>
        child.animate?.(
          [
            { transform: `translate${axis}(0)` },
            { transform: `translate${axis}(-100%)` },
          ],
          {
            duration: options.duration * MS_PER_SECOND,
            iterations: Infinity,
            direction: options.reverse ? "reverse" : "normal",
          },
        ) ?? [],
    );
    const state = { hover: false, focus: false, hidden: false };
    const sync = () => {
      const paused =
        (options.pauseOnHover && state.hover) || state.focus || state.hidden;
      for (const animation of animations)
        if (paused) animation.pause();
        else animation.play();
    };
    const listeners: [string, () => void][] = [
      ["mouseenter", () => ((state.hover = true), sync())],
      ["mouseleave", () => ((state.hover = false), sync())],
      ["focusin", () => ((state.focus = true), sync())],
      ["focusout", () => ((state.focus = false), sync())],
    ];
    for (const [type, listener] of listeners)
      element.addEventListener(type, listener);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            state.hidden = !entries.some((entry) => entry.isIntersecting);
            sync();
          });
    observer?.observe(element);

    return () => {
      observer?.disconnect();
      for (const [type, listener] of listeners)
        element.removeEventListener(type, listener);
      for (const animation of animations) animation.cancel();
    };
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    vertical?: boolean;
    reverse?: boolean;
    /** Seconds for one full loop. */
    duration?: number;
    pauseOnHover?: boolean;
    fade?: boolean;
    children?: Snippet;
  };

  let {
    vertical = false,
    reverse = false,
    duration = 20,
    pauseOnHover = true,
    fade = true,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let element = $state<HTMLDivElement>();
  const orientation = $derived(vertical ? "vertical" : "horizontal");

  $effect(() => {
    const options = { vertical, reverse, duration, pauseOnHover };
    if (!element || reducedMotion()) return;
    return startMarquee(element, options);
  });
</script>

<div
  bind:this={element}
  {...rest}
  class={[
    root,
    orientations[orientation].root,
    fade && fades[orientation],
    className,
  ]}
>
  {#each COPIES as index (index)}
    <div
      aria-hidden={index > 0 ? "true" : undefined}
      inert={index > 0}
      class={[copy, orientations[orientation].copy]}
    >
      {@render children?.()}
    </div>
  {/each}
</div>
