<script lang="ts">
  import { tick } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "relative inline-flex overflow-hidden align-bottom";
  const unit = "inline-block whitespace-pre";

  const EASE_IN = "cubic-bezier(0.55, 0, 1, 0.45)";
  const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
  const WORD_SEPARATOR = "\n";

  type From = "first" | "last" | "center" | "random";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Splits a phrase into letters, or into words with the space after them. */
  const splitText = (text: string, split: "chars" | "words") =>
    split === "chars" ? Array.from(text) : text.split(/(?<= )/);

  /** Stagger rank of each unit from the starting point. Random uses a fixed shuffled order (hash). */
  function ranks(count: number, from: From) {
    const order = [...Array(count).keys()];
    const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
    if (from === "random") order.sort((a, b) => hash(a) - hash(b));
    const rank: number[] = [];
    order.forEach((index, position) => {
      const middle = Math.abs(index - (count - 1) / 2);
      rank[index] =
        from === "last"
          ? count - 1 - index
          : from === "center"
            ? middle
            : position;
    });
    return rank;
  }

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    words: string[];
    split?: "chars" | "words";
    from?: From;
    interval?: number;
    stagger?: number;
    duration?: number;
    pauseOnHover?: boolean;
  };

  let {
    words,
    split = "chars",
    from = "first",
    interval = 2500,
    stagger = 25,
    duration = 400,
    pauseOnHover = true,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  let index = $state(0);
  const key = $derived(words.join(WORD_SEPARATOR));
  // Modulo keeps the index valid when the list of words changes.
  const parts = $derived(
    splitText(words[index % Math.max(words.length, 1)] ?? "", split),
  );
  const units = (host: HTMLElement) => [
    ...host.querySelectorAll<HTMLElement>("[data-unit]"),
  ];

  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { from, interval, stagger, duration, pauseOnHover, split };
    const count = key.split(WORD_SEPARATOR).length;
    const host = element;
    index = 0;
    if (!host || count < 2 || reducedMotion()) return;
    let hovered = false;
    let busy = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    // The new word rises in unit by unit, and the width of the wrapper follows smoothly.
    const enter = (width: number) => {
      const list = units(host);
      const rank = ranks(list.length, options.from);
      list.forEach((el, i) =>
        el.animate?.(
          [
            { transform: "translateY(100%)", opacity: 0 },
            { transform: "none", opacity: 1 },
          ],
          {
            duration: options.duration,
            delay: rank[i]! * options.stagger,
            easing: EASE_OUT,
            fill: "backwards",
          },
        ),
      );
      host.animate?.(
        [{ width: `${width}px` }, { width: `${host.offsetWidth}px` }],
        { duration: options.duration, easing: EASE_OUT },
      );
    };

    // The old word leaves upward, then the next one is rendered. Paused on hover, off screen, or in a hidden tab.
    const next = () => {
      if (busy || (hovered && options.pauseOnHover) || document.hidden) return;
      busy = true;
      const list = units(host);
      const rank = ranks(list.length, options.from);
      const exits = list.map((el, i) =>
        el.animate?.(
          [
            { transform: "none", opacity: 1 },
            { transform: "translateY(-100%)", opacity: 0 },
          ],
          {
            duration: options.duration,
            delay: rank[i]! * options.stagger,
            easing: EASE_IN,
            fill: "forwards",
          },
        ),
      );
      Promise.all(exits.map((animation) => animation?.finished))
        .then(async () => {
          const width = host.offsetWidth;
          index = (index + 1) % count;
          await tick();
          enter(width);
        })
        .catch(() => {})
        .finally(() => (busy = false));
    };
    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            clearInterval(timer);
            if (entries.some((entry) => entry.isIntersecting))
              timer = setInterval(next, options.interval);
          });
    if (observer) observer.observe(host);
    else timer = setInterval(next, options.interval);
    return () => {
      observer?.disconnect();
      clearInterval(timer);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{words.join(", ")}</span
  >{#each parts as part, i (`${index}-${i}`)}<span
      aria-hidden="true"
      data-unit=""
      class={unit}>{part}</span
    >{/each}</span
>
