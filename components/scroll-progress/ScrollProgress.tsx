"use client";

import { useEffect, useRef, type ComponentProps } from "react";

const root = "pointer-events-none z-50 w-full";
const bar = "h-full w-full origin-left";
const targets = {
  page: "fixed inset-x-0 top-0",
  parent: "sticky top-0 left-0",
};
const sizes = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-1.5",
};
const colors = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/**
 * Isi bar sesuai posisi gulir halaman atau elemen induk. Pembaruan digabung per frame.
 * Mengembalikan fungsi pelepas.
 */
function trackScroll(
  element: HTMLElement,
  fill: HTMLElement,
  target: keyof typeof targets,
) {
  const scroller = target === "parent" ? element.parentElement : null;
  const source = scroller ?? document.documentElement;
  const events: EventTarget = scroller ?? window;
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = source.scrollHeight - source.clientHeight;
    const progress =
      max > 0 ? Math.min(Math.max(source.scrollTop / max, 0), 1) : 0;
    fill.style.transform = `scaleX(${progress})`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  events.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    events.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

export type ScrollProgressProps = Omit<ComponentProps<"div">, "children"> & {
  target?: keyof typeof targets;
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
};

export function ScrollProgress({
  target = "page",
  color = "primary",
  size = "sm",
  className,
  ...props
}: ScrollProgressProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !fillRef.current) return;
    return trackScroll(rootRef.current, fillRef.current, target);
  }, [target]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      {...props}
      className={cx(root, targets[target], sizes[size], className)}
    >
      <div
        ref={fillRef}
        className={cx(bar, colors[color])}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
