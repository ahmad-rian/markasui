<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "block";
  const line = "block";
  const lineCut = "block overflow-hidden pb-[0.12em] -mb-[0.12em]";
  const cut = "inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]";
  const unit = "inline-block whitespace-pre";
  const lineUnit = "block";

  const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
  const offsets = { up: "translateY(120%)", down: "translateY(-120%)" };

  type From = "first" | "last" | "center" | "random";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    /** A line break (\n) splits the text into several lines. */
    text: string;
    split?: "chars" | "words" | "lines";
    direction?: keyof typeof offsets;
    from?: From;
    stagger?: number;
    duration?: number;
    delay?: number;
  };

  let {
    text,
    split = "words",
    direction = "up",
    from = "first",
    stagger = 60,
    duration = 700,
    delay = 0,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  const lines = $derived(text.split("\n"));

  // Hide every unit behind the cut line, then reveal them in turn once the text scrolls into view.
  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { from, stagger, duration, delay, split, lines };
    const offset = offsets[direction];
    if (!element || reducedMotion()) return;
    const units = [...element.querySelectorAll<HTMLElement>("[data-unit]")];
    const rank = ranks(units.length, options.from);
    units.forEach((el) => (el.style.transform = offset));
    const reveal = () =>
      units.forEach((el, i) => {
        el.animate?.([{ transform: offset }, { transform: "none" }], {
          duration: options.duration,
          delay: options.delay + rank[i]! * options.stagger,
          easing: EASING,
          fill: "backwards",
        });
        el.style.transform = "";
      });
    if (typeof IntersectionObserver === "undefined") return reveal();
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      reveal();
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      units.forEach((el) => (el.style.transform = ""));
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{lines.join(" ")}</span><span aria-hidden="true"
    >{#each lines as lineText, l (l)}{#if split === "lines"}<span
          class={lineCut}
          ><span data-unit="" class={lineUnit}>{lineText}</span></span
        >{:else}<span class={line}
          >{#each lineText.split(" ") as word, w (w)}{#if w > 0}{" "}{/if}<span
              class={cut}
              >{#if split === "words"}<span data-unit="" class={unit}
                  >{word}</span
                >{:else}{#each Array.from(word) as char, c (c)}<span
                    data-unit=""
                    class={unit}>{char}</span
                  >{/each}{/if}</span
            >{/each}</span
        >{/if}{/each}</span
  ></span
>
