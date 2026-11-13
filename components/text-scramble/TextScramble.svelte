<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-grid tabular-nums";
  const layer = "col-start-1 row-start-1";
  const holder = "invisible col-start-1 row-start-1";

  const charsets = {
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!@$%&*+=<>/?{}[]",
    binary: "01",
  };

  /** Random letters change at most every 50 ms, so it reads as an effect, not a flicker. */
  const FRAME = 50;
  /** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
  const TRIGGER = "a, button, label, [tabindex]";

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Deterministic random (Park-Miller): the same scrambled letters on every run and in every framework. */
  function scrambler(text: string, charset: string) {
    const chars = Array.from(text);
    let seed = 1;
    const pick = () => {
      seed = (seed * 48271) % 2147483647;
      return charset[seed % charset.length];
    };
    return (revealed: number) =>
      chars
        .map((char, i) => (i < revealed || char.trim() === "" ? char : pick()))
        .join("");
  }

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    text: string;
    trigger?: "hover" | "view" | "mount";
    charset?: keyof typeof charsets;
    duration?: number;
    delay?: number;
  };

  let {
    text,
    trigger = "hover",
    charset = "letters",
    duration = 800,
    delay = 0,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  // The visible text while scrambling; the real text otherwise.
  let display = $state<string>();

  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { text, trigger, duration, delay };
    const set = charsets[charset];
    display = undefined;
    if (!element || reducedMotion()) return;
    const total = Array.from(options.text).length;
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    // Scramble every letter, then reveal from left to right until the real text is whole again.
    const run = (wait: number) => {
      if (frame) return;
      const scramble = scrambler(options.text, set);
      let began: number | undefined;
      let last = -FRAME;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began - wait) / options.duration, 1);
        if (now - last >= FRAME || progress >= 1) {
          last = now;
          display = scramble(Math.max(Math.floor(progress * total), 0));
        }
        frame = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      frame = requestAnimationFrame(tick);
    };

    const target = element.closest<HTMLElement>(TRIGGER) ?? element;
    const hover = () => run(0);
    if (options.trigger === "hover") {
      target.addEventListener("pointerenter", hover);
      target.addEventListener("focusin", hover);
    } else {
      display = scrambler(options.text, set)(0);
      if (
        options.trigger === "mount" ||
        typeof IntersectionObserver === "undefined"
      )
        run(options.delay);
      else {
        // Scrambled while off screen, then decoded once when it scrolls into view.
        observer = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          run(options.delay);
        });
        observer.observe(element);
      }
    }
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      target.removeEventListener("pointerenter", hover);
      target.removeEventListener("focusin", hover);
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{text}</span><span aria-hidden="true" class={holder}
    >{text}</span
  ><span aria-hidden="true" class={layer}>{display ?? text}</span></span
>
