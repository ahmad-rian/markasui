<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline";
  const letter =
    "transition-[font-variation-settings,font-weight] duration-200 ease-out motion-reduce:transition-none";

  /** One breath of the wave (ms) and the phase step between letters (radians). */
  const WAVE_PERIOD = 2400;
  const WAVE_PHASE = 0.45;

  const reducedMotion = () =>
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Sets the weight through the wght axis of a variable font, with font-weight as a fallback. */
  const setWeight = (el: HTMLElement, value: number) => {
    el.style.fontVariationSettings = `'wght' ${value}`;
    el.style.fontWeight = String(value);
  };

  type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    text: string;
    radius?: number;
    min?: number;
    max?: number;
    wave?: boolean;
  };

  let {
    text,
    radius = 120,
    min = 300,
    max = 800,
    wave = false,
    class: className,
    ...rest
  }: Props = $props();

  let element = $state<HTMLSpanElement>();
  const chars = $derived(Array.from(text));

  $effect(() => {
    // Read every prop up front so the effect reruns when one changes.
    const options = { radius, min, max, wave, count: chars.length };
    if (!element || reducedMotion()) return;
    const host = element;
    const letters = [...host.querySelectorAll<HTMLElement>("[data-letter]")];
    const set = (values: number[]) =>
      letters.forEach((el, i) => setWeight(el, values[i]!));
    let pointer: { x: number; y: number } | undefined;
    let visible = false;
    let frame = 0;

    // The letter closest to the cursor is boldest; outside the radius it goes back to min. Without a cursor, wave breathes.
    const draw = (now: number) => {
      frame = 0;
      const span = options.max - options.min;
      const near = pointer
        ? letters.map((el) => {
            const rect = el.getBoundingClientRect();
            const distance = Math.hypot(
              pointer!.x - (rect.left + rect.width / 2),
              pointer!.y - (rect.top + rect.height / 2),
            );
            return Math.min(distance / options.radius, 1);
          })
        : [];
      if (near.some((t) => t < 1))
        return set(
          near.map((t) =>
            Math.round(
              options.min + span * (0.5 + 0.5 * Math.cos(Math.PI * t)),
            ),
          ),
        );
      if (!options.wave) return set(letters.map(() => options.min));
      set(
        letters.map((_, i) =>
          Math.round(
            options.min +
              span *
                (0.5 -
                  0.5 *
                    Math.cos(
                      (now / WAVE_PERIOD) * 2 * Math.PI - i * WAVE_PHASE,
                    )),
          ),
        ),
      );
      if (visible) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const out = () => {
      pointer = undefined;
      schedule();
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            cancelAnimationFrame(frame);
            frame = 0;
            schedule();
          });
    visible = !observer;
    observer?.observe(host);
    schedule();
    addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", out);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", out);
      set(letters.map(() => options.min));
    };
  });
</script>

<span bind:this={element} {...rest} class={[root, className]}
  ><span class="sr-only">{text}</span>{#each chars as char, index (index)}<span
      aria-hidden="true"
      data-letter=""
      class={letter}
      style:font-variation-settings="'wght' {min}"
      style:font-weight={min}>{char}</span
    >{/each}</span
>
