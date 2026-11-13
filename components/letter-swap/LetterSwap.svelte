<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "relative inline-flex overflow-hidden";
  const letter = "relative inline-block whitespace-pre";
  const copies = {
    up: "absolute inset-x-0 top-full",
    down: "absolute inset-x-0 bottom-full",
  };

  const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
  /** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
  const TRIGGER = "a, button, label, [tabindex]";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Stagger rank of each letter. Random mode uses a fixed shuffled order (hash), the same on every render. */
  function ranks(count: number, random: boolean) {
    const order = [...Array(count).keys()];
    const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
    if (random) order.sort((a, b) => hash(a) - hash(b));
    const rank: number[] = [];
    order.forEach((index, position) => (rank[index] = position));
    return rank;
  }

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    text: string;
    mode?: "forward" | "pingpong" | "random";
    direction?: keyof typeof copies;
    stagger?: number;
    duration?: number;
  };

  let {
    text,
    mode = "forward",
    direction = "up",
    stagger = 30,
    duration = 400,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  const chars = $derived(Array.from(text));

  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { mode, direction, stagger, duration, count: chars.length };
    if (!element || reducedMotion()) return;
    const target = element.closest<HTMLElement>(TRIGGER) ?? element;
    const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
    const rank = ranks(letters.length, options.mode === "random");
    const shift = `translateY(${options.direction === "up" ? "-100%" : "100%"})`;
    let busyUntil = 0;

    // Pingpong: a CSS transition back and forth. Forward and random: one pass, then an invisible reset.
    const move = (enter: boolean) => {
      const now = performance.now();
      if (options.mode !== "pingpong") {
        if (!enter || now < busyUntil) return;
        busyUntil = now + options.duration + options.stagger * letters.length;
      }
      letters.forEach((el, i) => {
        const delay = rank[i]! * options.stagger;
        if (options.mode !== "pingpong") {
          el.animate?.([{ transform: "none" }, { transform: shift }], {
            duration: options.duration,
            delay,
            easing: EASING,
          });
          return;
        }
        el.style.transition = `transform ${options.duration}ms ${EASING} ${delay}ms`;
        el.style.transform = enter ? shift : "";
      });
    };
    const enter = () => move(true);
    const leave = () => move(false);
    target.addEventListener("pointerenter", enter);
    target.addEventListener("focusin", enter);
    target.addEventListener("pointerleave", leave);
    target.addEventListener("focusout", leave);
    return () => {
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("focusin", enter);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("focusout", leave);
      letters.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
      });
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{text}</span>{#each chars as char, index (index)}<span
      aria-hidden="true"
      data-letter=""
      class={letter}>{char}<span class={copies[direction]}>{char}</span></span
    >{/each}</span
>
