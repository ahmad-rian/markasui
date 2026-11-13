<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "group/compare relative isolate grid overflow-hidden rounded-xl select-none [&_img]:pointer-events-none";
  const layer = "relative col-start-1 row-start-1 min-w-0 bg-surface";
  const motion =
    "duration-200 ease-out group-data-dragging/compare:transition-none motion-reduce:transition-none";
  const label =
    "pointer-events-none absolute rounded-full border border-line bg-surface/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-sm";
  const divider = "pointer-events-none absolute z-10 bg-surface";
  const handle =
    "pointer-events-auto absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full border border-line bg-surface text-ink shadow-overlay transition-[scale] duration-150 ease-out group-data-dragging/compare:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const iconClass = "size-5";
  const orientations = {
    horizontal: {
      root: "cursor-ew-resize touch-pan-y",
      clip: "[clip-path:inset(0_calc(100%_-_var(--position))_0_0)] transition-[clip-path]",
      divider:
        "inset-y-0 left-(--position) w-0.5 -translate-x-1/2 transition-[left]",
      before: "top-3 left-3",
      after: "top-3 right-3",
      icon: "",
    },
    vertical: {
      root: "cursor-ns-resize touch-pan-x",
      clip: "[clip-path:inset(0_0_calc(100%_-_var(--position))_0)] transition-[clip-path]",
      divider:
        "inset-x-0 top-(--position) h-0.5 -translate-y-1/2 transition-[top]",
      before: "top-3 left-3",
      after: "bottom-3 left-3",
      icon: "rotate-90",
    },
  };

  const PAGE_STEP = 10;

  const clamp = (value: number) => Math.min(100, Math.max(0, value));

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    /** Content shown on the start side (left or top): an img, svg, or any markup. */
    before?: Snippet;
    /** Content shown on the end side (right or bottom). */
    after?: Snippet;
    orientation?: keyof typeof orientations;
    /** Divider position in percent, bindable with bind:position. */
    position?: number;
    /** Percent moved per arrow key press. */
    step?: number;
    onPositionChange?: (position: number) => void;
    beforeLabel?: string;
    afterLabel?: string;
    sliderLabel?: string;
  };

  let {
    before,
    after,
    orientation = "horizontal",
    position = $bindable(50),
    step = 5,
    onPositionChange,
    beforeLabel = "Before",
    afterLabel = "After",
    sliderLabel = "Comparison position",
    class: className,
    style,
    ...rest
  }: Props = $props();

  const o = $derived(orientations[orientation]);
  const vertical = $derived(orientation === "vertical");
  const current = $derived(clamp(position));
  let dragging = $state(false);
  let handleEl = $state<HTMLDivElement>();
  let pressed = false;

  function move(next: number) {
    position = clamp(next);
    onPositionChange?.(position);
  }

  function fromPointer(
    event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    move(
      vertical
        ? ((event.clientY - rect.top) / rect.height) * 100
        : ((event.clientX - rect.left) / rect.width) * 100,
    );
  }

  function onpointerdown(
    event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    if (event.button !== 0) return;
    event.preventDefault();
    pressed = true;
    handleEl?.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture?.(event.pointerId);
    fromPointer(event);
  }

  function onpointermove(
    event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    if (!pressed) return;
    dragging = true;
    fromPointer(event);
  }

  function release() {
    pressed = false;
    dragging = false;
  }

  function onkeydown(event: KeyboardEvent) {
    const flip = vertical ? -1 : 1;
    const at = current;
    const moves: Record<string, number> = {
      ArrowRight: at + step,
      ArrowLeft: at - step,
      ArrowUp: at + step * flip,
      ArrowDown: at - step * flip,
      PageUp: at + PAGE_STEP,
      PageDown: at - PAGE_STEP,
      Home: 0,
      End: 100,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    move(next);
  }
</script>

<div
  role="group"
  {...rest}
  data-orientation={orientation}
  data-dragging={dragging ? "" : undefined}
  class={[root, o.root, className]}
  style={`${style ? `${style}; ` : ""}--position: ${current}%`}
  {onpointerdown}
  {onpointermove}
  onpointerup={release}
  onpointercancel={release}
>
  <div class={layer}>
    {@render after?.()}
    <span class={[label, o.after]}>{afterLabel}</span>
  </div>
  <div class={[layer, o.clip, motion]}>
    {@render before?.()}
    <span class={[label, o.before]}>{beforeLabel}</span>
  </div>
  <div class={[divider, o.divider, motion]}>
    <div
      bind:this={handleEl}
      role="slider"
      tabindex="0"
      aria-label={sliderLabel}
      aria-orientation={orientation}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(current)}
      aria-valuetext={`${Math.round(current)}%`}
      class={handle}
      {onkeydown}
    >
      <svg
        class={[iconClass, o.icon]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
      </svg>
    </div>
  </div>
</div>
