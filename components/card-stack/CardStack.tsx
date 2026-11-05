"use client";

import {
  Children,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const root = "w-full";
const stack =
  "relative grid touch-pan-y rounded-xl pb-4 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const card =
  "group col-start-1 row-start-1 origin-bottom overflow-hidden rounded-xl border border-line bg-surface transition-[translate,scale,opacity,background-color] duration-300 ease-out data-[depth=0]:z-30 data-[depth=0]:cursor-grab data-[depth=1]:z-20 data-[depth=1]:translate-y-2 data-[depth=1]:scale-[0.95] data-[depth=1]:bg-subtle data-[depth=2]:z-10 data-[depth=2]:translate-y-4 data-[depth=2]:scale-[0.9] data-[depth=2]:bg-subtle data-[depth=3]:translate-y-4 data-[depth=3]:scale-[0.9] data-[depth=3]:opacity-0 data-dragging:cursor-grabbing data-dragging:transition-none data-leaving:z-40 motion-reduce:transition-none";
const content =
  "h-full opacity-0 transition-opacity duration-300 ease-out group-data-leaving:opacity-100 group-data-[depth=0]:opacity-100 motion-reduce:transition-none";
const controls = "mt-3 flex items-center justify-between gap-3";
const navButton =
  "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[background-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const dots = "flex items-center gap-1.5";
const dot =
  "h-1.5 w-1.5 rounded-full bg-primary-line transition-all duration-300 ease-out data-[state=active]:w-5 data-[state=active]:bg-primary motion-reduce:transition-none";
const icon = "size-4";
const srOnly = "sr-only";

const FLING_MS = 450;
const SETTLE_MS = 250;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
/** Share of the stack width a drag must pass to throw the card. */
const SWIPE_RATIO = 0.25;
/** Pixels of movement before a press becomes a drag, so clicks inside cards still work. */
const DRAG_START = 4;
const MAX_DEPTH = 3;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fill {index} and {total} in a label. */
export const formatLabel = (template: string, index: number, total: number) =>
  template
    .replaceAll("{index}", String(index))
    .replaceAll("{total}", String(total));

const away = (direction: number) =>
  `translateX(${direction * 120}%) rotate(${direction * 14}deg)`;

function play(el: HTMLElement, keyframes: Keyframe[], duration: number) {
  if (reducedMotion() || typeof el.animate !== "function") return undefined;
  el.getAnimations().forEach((animation) => animation.finish());
  return el.animate(keyframes, { duration, easing: EASE });
}

/** Throw the card off to one side; it then fades in at the back of the stack. */
function fling(el: HTMLElement, direction: number) {
  const from = el.style.transform || "none";
  el.style.transform = "";
  delete el.dataset.dragging;
  el.dataset.leaving = "";
  const animation = play(
    el,
    [
      { transform: from, opacity: 1 },
      { opacity: 1, offset: 0.5 },
      { transform: away(direction), opacity: 0 },
    ],
    FLING_MS,
  );
  if (!animation) {
    delete el.dataset.leaving;
    return;
  }
  animation.onfinish = () => {
    delete el.dataset.leaving;
    play(el, [{ opacity: 0, offset: 0 }], SETTLE_MS);
  };
}

/** Slide a card back in from one side. */
const arrive = (el: HTMLElement, direction: number) =>
  play(
    el,
    [
      { transform: away(direction), opacity: 0 },
      { transform: "none", opacity: 1 },
    ],
    FLING_MS,
  );

/** Spring a dragged card back to the middle. */
function settle(el: HTMLElement) {
  const from = el.style.transform;
  el.style.transform = "";
  delete el.dataset.dragging;
  if (from) play(el, [{ transform: from }, { transform: "none" }], SETTLE_MS);
}

export type CardStackProps = ComponentProps<"div"> & {
  /** Accessible name of the stack region. */
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  /** Name of each card and the live position text. Accepts {index} and {total}. */
  cardLabel?: string;
};

export function CardStack({
  label = "Card stack",
  prevLabel = "Previous card",
  nextLabel = "Next card",
  cardLabel = "{index} of {total}",
  id,
  className,
  children,
  onKeyDown,
  ...props
}: CardStackProps) {
  const generatedId = useId();
  const stackId = `${id ?? generatedId}-cards`;
  const cards = Children.toArray(children);
  const total = cards.length;
  const [index, setIndex] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  const cardAt = (i: number) =>
    stackRef.current?.children[i] as HTMLElement | undefined;

  /** Step forward (throw the top card) or back (bring the last card in). */
  const go = (step: 1 | -1, direction = -1) => {
    if (total < 2) return;
    const target = (index + step + total) % total;
    const top = cardAt(index);
    const incoming = cardAt(target);
    if (step === 1 && top) fling(top, direction);
    if (step === -1 && incoming) arrive(incoming, direction);
    setIndex(target);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    const steps: Record<string, 1 | -1 | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const step = steps[event.key];
    if (step === undefined || event.defaultPrevented) return;
    event.preventDefault();
    go(step);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || total < 2) return;
    drag.current = { x: event.clientX, moved: false };
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const top = cardAt(index);
    if (!state || !top) return;
    const dx = event.clientX - state.x;
    if (!state.moved) {
      if (Math.abs(dx) < DRAG_START) return;
      state.moved = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      top.dataset.dragging = "";
    }
    top.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    drag.current = null;
    const top = cardAt(index);
    if (!state?.moved || !top) return;
    const dx = event.clientX - state.x;
    if (Math.abs(dx) > event.currentTarget.offsetWidth * SWIPE_RATIO)
      go(1, Math.sign(dx));
    else settle(top);
  };
  const handlePointerCancel = () => {
    const top = cardAt(index);
    if (drag.current?.moved && top) settle(top);
    drag.current = null;
  };

  return (
    <div
      id={id}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cx(root, className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        ref={stackRef}
        id={stackId}
        tabIndex={0}
        className={stack}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {cards.map((child, i) => {
          const depth = Math.min((i - index + total) % total, MAX_DEPTH);
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={formatLabel(cardLabel, i + 1, total)}
              data-depth={depth}
              inert={depth !== 0}
              className={card}
            >
              <div className={content}>{child}</div>
            </div>
          );
        })}
      </div>
      <div className={controls}>
        <button
          type="button"
          aria-label={prevLabel}
          aria-controls={stackId}
          disabled={total < 2}
          className={navButton}
          onClick={() => go(-1)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={icon}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div aria-hidden="true" className={dots}>
          {cards.map((_, i) => (
            <span
              key={i}
              data-state={i === index ? "active" : "inactive"}
              className={dot}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={nextLabel}
          aria-controls={stackId}
          disabled={total < 2}
          className={navButton}
          onClick={() => go(1)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={icon}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <p aria-live="polite" className={srOnly}>
        {formatLabel(cardLabel, index + 1, total)}
      </p>
    </div>
  );
}
