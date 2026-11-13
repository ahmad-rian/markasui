<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base =
    "relative overflow-hidden [&>*]:absolute [&>*]:top-0 [&>*]:left-0 [&>*]:transition-colors [&>*]:duration-300 motion-reduce:[&>*]:transition-none";
  const toneClasses =
    "[&>[data-tone=primary]]:text-primary [&>[data-tone=success]]:text-success [&>[data-tone=warning]]:text-warning [&>[data-tone=danger]]:text-danger [&>[data-tone=ink]]:text-ink [&>[data-tone=muted]]:text-muted";

  type ScreensaverEffect = "tone" | "squash" | "none";
  type ScreensaverTone =
    "primary" | "success" | "warning" | "danger" | "ink" | "muted";
  type Options = {
    speed: number;
    effect: ScreensaverEffect;
    tones: ScreensaverTone[];
    seed: number;
    pauseOnHover: boolean;
  };

  const KNOWN_TONES = [
    "primary",
    "success",
    "warning",
    "danger",
    "ink",
    "muted",
  ];
  const QUARTER = Math.PI / 2;
  const MAX_STEP_S = 0.05;
  const SQUASH_MS = 260;

  /** Same number for the same seed and index in every framework. */
  const rand = (seed: number, n: number) => {
    const x = Math.sin(seed * 78.233 + n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const still = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /**
   * Place each child at a seeded spot, then bounce it off the walls at `speed` px per second.
   * Runs only while the area is on screen, the tab is visible, and nothing inside is hovered or focused.
   */
  function startScreensaver(root: HTMLElement, o: Options) {
    const tones = o.tones.filter((t) => KNOWN_TONES.includes(t));
    const items = ([...root.children] as HTMLElement[]).map((el, i) => {
      const angle =
        (0.2 + 0.6 * rand(o.seed, i * 4)) * QUARTER +
        Math.floor(rand(o.seed, i * 4 + 1) * 4) * QUARTER;
      const x = rand(o.seed, i * 4 + 2) * (root.clientWidth - el.offsetWidth);
      const y = rand(o.seed, i * 4 + 3) * (root.clientHeight - el.offsetHeight);
      const item = {
        el,
        x: Math.max(0, Math.round(x)),
        y: Math.max(0, Math.round(y)),
        vx: Math.cos(angle) * o.speed,
        vy: Math.sin(angle) * o.speed,
        tone: i,
      };
      if (o.effect === "tone" && tones.length)
        el.dataset.tone = tones[i % tones.length];
      else delete el.dataset.tone;
      el.style.translate = `${item.x}px ${item.y}px`;
      return item;
    });
    if (still()) return () => {};

    const bump = (item: (typeof items)[number], sideways: boolean) => {
      if (o.effect === "tone" && tones.length)
        item.el.dataset.tone = tones[++item.tone % tones.length];
      if (o.effect === "squash")
        item.el.animate?.(
          [
            { scale: "1" },
            { scale: sideways ? "0.8 1.15" : "1.15 0.8" },
            { scale: "1" },
          ],
          { duration: SQUASH_MS, easing: "ease-out" },
        );
    };
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, MAX_STEP_S) : 0;
      last = now;
      for (const item of items) {
        const maxX = Math.max(0, root.clientWidth - item.el.offsetWidth);
        const maxY = Math.max(0, root.clientHeight - item.el.offsetHeight);
        item.x += item.vx * dt;
        item.y += item.vy * dt;
        const sideways =
          (item.x <= 0 && item.vx < 0) || (item.x >= maxX && item.vx > 0);
        const upright =
          (item.y <= 0 && item.vy < 0) || (item.y >= maxY && item.vy > 0);
        if (sideways) item.vx = -item.vx;
        if (upright) item.vy = -item.vy;
        if (sideways || upright) bump(item, sideways);
        item.x = Math.min(Math.max(item.x, 0), maxX);
        item.y = Math.min(Math.max(item.y, 0), maxY);
        item.el.style.translate = `${item.x}px ${item.y}px`;
      }
      frame = requestAnimationFrame(tick);
    };

    const state = { hover: false, focus: false, visible: true };
    const sync = () => {
      const run =
        state.visible &&
        !state.focus &&
        !(o.pauseOnHover && state.hover) &&
        !document.hidden;
      cancelAnimationFrame(frame);
      last = 0;
      if (run) frame = requestAnimationFrame(tick);
    };
    const on = (key: "hover" | "focus", value: boolean) => () => {
      state[key] = value;
      sync();
    };
    const listeners = [
      ["pointerenter", on("hover", true)],
      ["pointerleave", on("hover", false)],
      ["focusin", on("focus", true)],
      ["focusout", on("focus", false)],
    ] as [string, (e: Event) => void][];
    for (const [type, fn] of listeners) root.addEventListener(type, fn);
    document.addEventListener("visibilitychange", sync);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver(([entry]) => {
            state.visible = !!entry?.isIntersecting;
            sync();
          });
    observer?.observe(root);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      for (const [type, fn] of listeners) root.removeEventListener(type, fn);
    };
  }

  const DEFAULT_TONES: ScreensaverTone[] = [
    "primary",
    "success",
    "warning",
    "danger",
  ];

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Travel speed in px per second. */
    speed?: number;
    /** What happens on each wall hit: switch to the next tone, squash and stretch, or nothing. */
    effect?: ScreensaverEffect;
    /** Color tokens cycled by the tone effect. Children should use currentColor. */
    tones?: ScreensaverTone[];
    /** Changes the starting spots and directions. */
    seed?: number;
    /** Stops while the pointer is over the area. */
    pauseOnHover?: boolean;
    children?: Snippet;
  };

  let {
    speed = 80,
    effect: wallEffect = "tone",
    tones = DEFAULT_TONES,
    seed = 1,
    pauseOnHover = true,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let root = $state<HTMLDivElement>();

  $effect(() => {
    const options = {
      speed,
      effect: wallEffect,
      tones: [...tones],
      seed,
      pauseOnHover,
    };
    if (root) return startScreensaver(root, options);
  });
</script>

<div bind:this={root} {...rest} class={[base, toneClasses, className]}>
  {@render children?.()}
</div>
