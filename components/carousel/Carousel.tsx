"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
} from "react";

const root = "w-full";
const viewport =
  "relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden";
const slideClass = "min-w-0 shrink-0 snap-start";
const perViews = {
  1: "basis-full",
  2: "basis-[calc((100%-1rem)/2)]",
  3: "basis-[calc((100%-2rem)/3)]",
};
const controls = "mt-3 flex items-center gap-2";
const dots = "flex items-center";
const dot =
  "group inline-flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const dotMark =
  "h-2 w-2 rounded-full bg-faint transition-all duration-150 ease-out group-data-[state=active]:w-4 group-data-[state=active]:bg-primary motion-reduce:transition-none";
const buttons = "ml-auto flex items-center gap-2";
const navButton =
  "inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const icon = "size-4";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Isi placeholder {index} dan {total} pada label. */
export const formatLabel = (template: string, index: number, total: number) =>
  template
    .replaceAll("{index}", String(index))
    .replaceAll("{total}", String(total));

type Position = { index: number; atStart: boolean; atEnd: boolean };

/** Baca slide terdekat dan apakah viewport sudah di ujung kiri atau kanan. */
function readPosition(viewportEl: HTMLElement): Position {
  const slides = Array.from(viewportEl.children) as HTMLElement[];
  const left = viewportEl.scrollLeft;
  const index = slides.reduce(
    (best, slide, i) =>
      Math.abs(slide.offsetLeft - left) <
      Math.abs((slides[best]?.offsetLeft ?? 0) - left)
        ? i
        : best,
    0,
  );
  return {
    index,
    atStart: left <= 1,
    atEnd: left + viewportEl.clientWidth >= viewportEl.scrollWidth - 1,
  };
}

export type CarouselProps = ComponentProps<"div"> & {
  label?: string;
  perView?: keyof typeof perViews;
  showDots?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  slideLabel?: string;
  dotLabel?: string;
};

export function Carousel({
  label = "Carousel",
  perView = 1,
  showDots = false,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  slideLabel = "{index} of {total}",
  dotLabel = "Go to slide {index}",
  id,
  className,
  children,
  onKeyDown,
  ...props
}: CarouselProps) {
  const generatedId = useId();
  const carouselId = id ?? generatedId;
  const viewportId = `${carouselId}-viewport`;
  const slides = Children.toArray(children);
  const total = slides.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({
    index: 0,
    atStart: true,
    atEnd: total <= 1,
  });

  const sync = useCallback(() => {
    if (viewportRef.current) setPosition(readPosition(viewportRef.current));
  }, []);

  useEffect(sync, [sync, total]);

  const goTo = (index: number) => {
    const viewportEl = viewportRef.current;
    const target = viewportEl?.children[index] as HTMLElement | undefined;
    if (viewportEl && target) viewportEl.scrollTo({ left: target.offsetLeft });
  };
  const step = (direction: 1 | -1) =>
    goTo(Math.min(Math.max(position.index + direction, 0), total - 1));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    const directions: Record<string, 1 | -1 | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const direction = directions[event.key];
    if (direction === undefined || event.defaultPrevented) return;
    event.preventDefault();
    step(direction);
  };

  return (
    <div
      id={carouselId}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cx(root, className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div
        ref={viewportRef}
        id={viewportId}
        tabIndex={0}
        className={viewport}
        onScroll={sync}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={formatLabel(slideLabel, index + 1, total)}
            className={cx(slideClass, perViews[perView])}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className={controls}>
        {showDots && (
          <div className={dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={formatLabel(dotLabel, index + 1, total)}
                aria-controls={viewportId}
                aria-current={index === position.index ? "true" : undefined}
                data-state={index === position.index ? "active" : "inactive"}
                className={dot}
                onClick={() => goTo(index)}
              >
                <span aria-hidden="true" className={dotMark} />
              </button>
            ))}
          </div>
        )}
        <div className={buttons}>
          <button
            type="button"
            aria-label={previousLabel}
            aria-controls={viewportId}
            disabled={position.atStart}
            className={navButton}
            onClick={() => step(-1)}
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
          <button
            type="button"
            aria-label={nextLabel}
            aria-controls={viewportId}
            disabled={position.atEnd}
            className={navButton}
            onClick={() => step(1)}
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
      </div>
    </div>
  );
}
