<script lang="ts">
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-grid tabular-nums";
  const layer = "col-start-1 row-start-1";
  const holder = "invisible col-start-1 row-start-1";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Exponential ease-out: fast at first, slowing down near the final number. */
  const easeOut = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

  /** Calls `callback` once, the first time the element is visible. Returns a cleanup function. */
  function whenVisible(element: Element, callback: () => void) {
    if (typeof IntersectionObserver === "undefined") {
      callback();
      return () => {};
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      callback();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children" | "prefix"> & {
    value: number;
    from?: number;
    /** Milliseconds from the start number to value. */
    duration?: number;
    decimals?: number;
    locale?: string;
    prefix?: string;
    suffix?: string;
  };

  let {
    value,
    from = 0,
    duration = 2000,
    decimals = 0,
    locale = "en-US",
    prefix = "",
    suffix = "",
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  // The number the animation last reached; the next run starts from here.
  let current = untrack(() => from);
  let display = $state(untrack(() => value));

  $effect(() => {
    const target = value;
    const ms = duration;
    if (!element || reducedMotion()) {
      current = target;
      display = target;
      return;
    }
    const start = current;
    let frame = 0;
    display = start;
    const stop = whenVisible(element, () => {
      let began: number | undefined;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began) / ms, 1);
        current = start + (target - start) * easeOut(progress);
        display = current;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  });

  const formatter = $derived(
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );
  const text = (n: number) => `${prefix}${formatter.format(n)}${suffix}`;
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{text(value)}</span><span
    aria-hidden="true"
    class={holder}>{text(value)}</span
  ><span aria-hidden="true" class={layer}>{text(display)}</span></span
>
