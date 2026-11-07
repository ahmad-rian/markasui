<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId, useTemplateRef } from "vue";

const props = withDefaults(
  defineProps<{
    /** What a child does when let go: glide on, stop, or spring back. */
    release?: "inertia" | "stay" | "return";
    /** Largest random tilt in degrees for children without data-rotate. */
    rotate?: number;
    /** Changes the scattered starting spots. */
    seed?: number;
    /** Description read for each child by screen readers. */
    hintLabel?: string;
  }>(),
  {
    release: "inertia",
    rotate: 6,
    seed: 1,
    hintLabel: "Drag to move, or use the arrow keys. Escape puts it back",
  },
);

const base =
  "relative isolate overflow-hidden [&>*]:absolute [&>*]:cursor-grab [&>*]:touch-none [&>*]:select-none [&>*]:transition-[translate,scale,box-shadow] [&>*]:duration-500 [&>*]:ease-[cubic-bezier(0.34,1.56,0.64,1)] [&>*]:focus-visible:outline-2 [&>*]:focus-visible:outline-offset-2 [&>*]:focus-visible:outline-primary [&>[data-dragging]]:scale-105 [&>[data-dragging]]:cursor-grabbing [&>[data-dragging]]:shadow-overlay [&>[data-dragging]]:transition-[scale,box-shadow] [&>[data-dragging]]:duration-150 [&>[data-gliding]]:transition-none motion-reduce:[&>*]:transition-none!";

type DragRelease = "inertia" | "stay" | "return";
type Options = {
  release: DragRelease;
  rotate: number;
  seed: number;
  hint: string;
};

const KEY_STEP = 10;
const KEY_STEP_LARGE = 50;
const FRICTION = 0.9;
const BOUNCE = 0.4;
const MIN_SPEED = 0.2;
const MAX_SPEED = 24;
const FRAME_MS = 16;
const IDLE_MS = 80;
const INTERACTIVE = "a,button,input,select,textarea,label";
const KEYS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
/** Same number for the same seed and index in every framework. */
const rand = (seed: number, n: number) => {
  const x = Math.sin(seed * 78.233 + n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Scatter the children, then let pointer and keyboard move each one inside the area.
 * data-x and data-y (percent) and data-rotate (deg) on a child override the seeded spot.
 */
function startDrag(root: HTMLElement, o: Options) {
  const items = () =>
    [...root.children].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.hidden,
    );
  const pos = new Map<HTMLElement, [number, number]>();
  let top = 0;
  let frame = 0;
  let drag: {
    el: HTMLElement;
    sx: number;
    sy: number;
    lim: number[];
    vx: number;
    vy: number;
    lx: number;
    ly: number;
    t: number;
  } | null = null;

  items().forEach((el, i) => {
    const d = el.dataset;
    const x = Number(d.x ?? Math.round(rand(o.seed, i * 3) * 100));
    const y = Number(d.y ?? Math.round(rand(o.seed, i * 3 + 1) * 100));
    const r = Number(
      d.rotate ?? Math.round((rand(o.seed, i * 3 + 2) * 2 - 1) * o.rotate),
    );
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
    el.style.transform = `translate(-${x}%, -${y}%)`;
    el.style.rotate = `${r}deg`;
    if (!el.hasAttribute("tabindex")) el.tabIndex = 0;
    el.setAttribute("aria-describedby", o.hint);
    top = i + 1;
  });

  const at = (el: HTMLElement) => pos.get(el) ?? [0, 0];
  const set = (el: HTMLElement, x: number, y: number) => {
    pos.set(el, [x, y]);
    el.style.translate = `${x}px ${y}px`;
  };
  const raise = (el: HTMLElement) => (el.style.zIndex = String(++top));
  /** Offsets that keep the child inside, measured from where it is drawn now. */
  const limits = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const c = root.getBoundingClientRect();
    const [x = 0, y = 0] = getComputedStyle(el)
      .translate.split(" ")
      .map((v) => parseFloat(v) || 0);
    return [
      c.left - r.left + x,
      c.right - r.right + x,
      c.top - r.top + y,
      c.bottom - r.bottom + y,
    ];
  };
  const item = (target: EventTarget | null) =>
    items().find((el) => el.contains(target as Node));

  const glide = (el: HTMLElement, vx: number, vy: number, lim: number[]) => {
    el.dataset.gliding = "";
    const step = () => {
      const [a, b, c, d] = lim;
      let [x, y] = at(el);
      x += vx;
      y += vy;
      if (x < a! || x > b!) vx *= -BOUNCE;
      if (y < c! || y > d!) vy *= -BOUNCE;
      vx *= FRICTION;
      vy *= FRICTION;
      set(el, clamp(x, a!, b!), clamp(y, c!, d!));
      if (Math.hypot(vx, vy) > MIN_SPEED) frame = requestAnimationFrame(step);
      else delete el.dataset.gliding;
    };
    frame = requestAnimationFrame(step);
  };

  const down = (e: PointerEvent) => {
    const el = item(e.target);
    const control = (e.target as Element).closest?.(INTERACTIVE);
    if (
      !el ||
      e.button !== 0 ||
      (control && control !== el && el.contains(control))
    )
      return;
    cancelAnimationFrame(frame);
    for (const other of items()) delete other.dataset.gliding;
    el.setPointerCapture?.(e.pointerId);
    el.dataset.dragging = "";
    raise(el);
    const [x, y] = at(el);
    const { clientX: px, clientY: py, timeStamp: t } = e;
    drag = {
      el,
      sx: px - x,
      sy: py - y,
      lim: limits(el),
      vx: 0,
      vy: 0,
      lx: px,
      ly: py,
      t,
    };
  };
  const move = (e: PointerEvent) => {
    if (!drag) return;
    const [a, b, c, d] = drag.lim;
    const dt = Math.max(e.timeStamp - drag.t, 1);
    set(
      drag.el,
      clamp(e.clientX - drag.sx, a!, b!),
      clamp(e.clientY - drag.sy, c!, d!),
    );
    drag.vx = ((e.clientX - drag.lx) / dt) * FRAME_MS;
    drag.vy = ((e.clientY - drag.ly) / dt) * FRAME_MS;
    drag.lx = e.clientX;
    drag.ly = e.clientY;
    drag.t = e.timeStamp;
  };
  const up = (e: PointerEvent) => {
    if (!drag) return;
    const { el, lim, t } = drag;
    const fresh = e.timeStamp - t > IDLE_MS ? 0 : 1;
    const vx = drag.vx * fresh;
    const vy = drag.vy * fresh;
    drag = null;
    delete el.dataset.dragging;
    if (o.release === "return") set(el, 0, 0);
    else if (o.release === "inertia" && !still())
      glide(
        el,
        clamp(vx, -MAX_SPEED, MAX_SPEED),
        clamp(vy, -MAX_SPEED, MAX_SPEED),
        lim,
      );
  };
  const key = (e: KeyboardEvent) => {
    const el = items().find((i) => i === e.target);
    const dir = KEYS[e.key];
    if (!el) return;
    const [x, y] = at(el);
    if (e.key === "Escape" && (x || y)) set(el, 0, 0);
    else if (dir) {
      const [a, b, c, d] = limits(el);
      const step = e.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
      set(
        el,
        clamp(x + dir[0] * step, a!, b!),
        clamp(y + dir[1] * step, c!, d!),
      );
    } else return;
    e.preventDefault();
    raise(el);
  };
  const focus = (e: FocusEvent) => {
    const el = item(e.target);
    if (el) raise(el);
  };

  const listeners = [
    ["pointerdown", down],
    ["pointermove", move],
    ["pointerup", up],
    ["pointercancel", up],
    ["keydown", key],
    ["focusin", focus],
  ] as [string, (e: Event) => void][];
  for (const [type, fn] of listeners) root.addEventListener(type, fn);
  return () => {
    cancelAnimationFrame(frame);
    for (const [type, fn] of listeners) root.removeEventListener(type, fn);
  };
}

const hint = useId();
const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
let stop = () => {};
onMounted(() => {
  if (rootEl.value)
    stop = startDrag(rootEl.value, {
      release: props.release,
      rotate: props.rotate,
      seed: props.seed,
      hint,
    });
});
onBeforeUnmount(() => stop());
</script>

<template>
  <div ref="rootRef" :class="base">
    <slot />
    <span :id="hint" hidden>{{ props.hintLabel }}</span>
  </div>
</template>
