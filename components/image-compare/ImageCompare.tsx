"use client";

import {
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

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

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const clamp = (value: number) => Math.min(100, Math.max(0, value));

export type ImageCompareProps = Omit<ComponentProps<"div">, "children"> & {
  /** Content shown on the start side (left or top): an img, svg, or any markup. */
  before: ReactNode;
  /** Content shown on the end side (right or bottom). */
  after: ReactNode;
  orientation?: keyof typeof orientations;
  /** Starting divider position in percent. */
  defaultPosition?: number;
  /** Percent moved per arrow key press. */
  step?: number;
  onPositionChange?: (position: number) => void;
  beforeLabel?: string;
  afterLabel?: string;
  sliderLabel?: string;
};

export function ImageCompare({
  before,
  after,
  orientation = "horizontal",
  defaultPosition = 50,
  step = 5,
  onPositionChange,
  beforeLabel = "Before",
  afterLabel = "After",
  sliderLabel = "Comparison position",
  className,
  style,
  ...props
}: ImageCompareProps) {
  const o = orientations[orientation];
  const vertical = orientation === "vertical";
  const [position, setPosition] = useState(clamp(defaultPosition));
  const [dragging, setDragging] = useState(false);
  const pressed = useRef(false);
  const handleRef = useRef<HTMLDivElement>(null);

  const move = (next: number) => {
    const value = clamp(next);
    setPosition(value);
    onPositionChange?.(value);
  };
  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    move(
      vertical
        ? ((event.clientY - rect.top) / rect.height) * 100
        : ((event.clientX - rect.left) / rect.width) * 100,
    );
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    pressed.current = true;
    handleRef.current?.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture?.(event.pointerId);
    fromPointer(event);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pressed.current) return;
    setDragging(true);
    fromPointer(event);
  };
  const release = () => {
    pressed.current = false;
    setDragging(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const flip = vertical ? -1 : 1;
    const moves: Record<string, number> = {
      ArrowRight: position + step,
      ArrowLeft: position - step,
      ArrowUp: position + step * flip,
      ArrowDown: position - step * flip,
      PageUp: position + PAGE_STEP,
      PageDown: position - PAGE_STEP,
      Home: 0,
      End: 100,
    };
    const next = moves[event.key];
    if (next === undefined) return;
    event.preventDefault();
    move(next);
  };

  return (
    <div
      role="group"
      {...props}
      data-orientation={orientation}
      data-dragging={dragging ? "" : undefined}
      className={cx(root, o.root, className)}
      style={{ ...style, "--position": `${position}%` } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <div className={layer}>
        {after}
        <span className={cx(label, o.after)}>{afterLabel}</span>
      </div>
      <div className={cx(layer, o.clip, motion)}>
        {before}
        <span className={cx(label, o.before)}>{beforeLabel}</span>
      </div>
      <div className={cx(divider, o.divider, motion)}>
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label={sliderLabel}
          aria-orientation={orientation}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}%`}
          className={handle}
          onKeyDown={onKeyDown}
        >
          <svg
            className={cx(iconClass, o.icon)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
