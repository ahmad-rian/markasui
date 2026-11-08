"use client";

import {
  useEffect,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type PointerEvent,
} from "react";

const base =
  "group/highlight relative isolate overflow-hidden [--markas-hh-x:50%] [--markas-hh-y:50%] [--markas-hh-play:paused] data-[visible]:[--markas-hh-play:running] [&_mark]:rounded-md [&_mark]:bg-transparent [&_mark]:bg-[linear-gradient(to_right,color-mix(in_oklab,var(--markas-hh-color)_18%,transparent),color-mix(in_oklab,var(--markas-hh-color)_34%,transparent))] [&_mark]:[background-size:100%_100%] [&_mark]:bg-left [&_mark]:bg-no-repeat [&_mark]:box-decoration-clone [&_mark]:px-1 [&_mark]:text-ink [&_mark]:animate-[markas-highlight_var(--markas-hh-speed)_cubic-bezier(0.22,1,0.36,1)_0.3s_both_var(--markas-hh-play)] motion-reduce:[&_mark]:animate-none";
const layer = "pointer-events-none absolute inset-0";
const dim = "absolute inset-0 text-muted/20";
const glow =
  "absolute inset-0 text-[var(--markas-hh-color)] opacity-0 transition-opacity duration-300 ease-out [mask-image:radial-gradient(var(--markas-hh-radius)_circle_at_var(--markas-hh-x)_var(--markas-hh-y),black,transparent)] group-hover/highlight:opacity-100 motion-reduce:transition-none";
const content = "relative";
const variants = {
  dots: "bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]",
  grid: "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]",
};
const colors = {
  primary: "[--markas-hh-color:var(--markas-primary)]",
  success: "[--markas-hh-color:var(--markas-success)]",
  warning: "[--markas-hh-color:var(--markas-warning)]",
  danger: "[--markas-hh-color:var(--markas-danger)]",
};
const speeds = {
  slow: "[--markas-hh-speed:1.6s]",
  normal: "[--markas-hh-speed:1s]",
  fast: "[--markas-hh-speed:0.6s]",
};
const keyframes = "@keyframes markas-highlight{from{background-size:0% 100%}}";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Mark the root visible the first time it scrolls into view, which starts drawing the marks. */
function revealOnView(element: HTMLElement): (() => void) | undefined {
  const show = () => element.setAttribute("data-visible", "");
  if (typeof IntersectionObserver === "undefined") {
    show();
    return undefined;
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    show();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

/** Store the pointer position so the bright dots gather around it. */
function track(event: PointerEvent<HTMLDivElement>) {
  const root = event.currentTarget;
  const rect = root.getBoundingClientRect();
  root.style.setProperty("--markas-hh-x", `${event.clientX - rect.left}px`);
  root.style.setProperty("--markas-hh-y", `${event.clientY - rect.top}px`);
}

export type HeroHighlightProps = ComponentProps<"div"> & {
  /** dots: a dot grid; grid: thin grid lines. */
  variant?: keyof typeof variants;
  color?: keyof typeof colors;
  /** Distance between dots or lines in px. */
  spacing?: number;
  /** Radius of the glow around the pointer in px. */
  radius?: number;
  /** How fast each mark draws from left to right. */
  speed?: keyof typeof speeds;
};

export function HeroHighlight({
  variant = "dots",
  color = "primary",
  spacing = 16,
  radius = 160,
  speed = "normal",
  className,
  style,
  children,
  onPointerMove,
  ...props
}: HeroHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? revealOnView(ref.current) : undefined), []);
  const vars = {
    "--markas-hh-spacing": `${spacing}px`,
    "--markas-hh-radius": `${radius}px`,
  } as CSSProperties;
  const pattern = variants[variant] ?? variants.dots;
  return (
    <div
      ref={ref}
      {...props}
      className={cx(base, colors[color], speeds[speed], className)}
      style={{ ...vars, ...style }}
      onPointerMove={(event) => {
        track(event);
        onPointerMove?.(event);
      }}
    >
      <style>{keyframes}</style>
      <div aria-hidden="true" className={layer}>
        <div className={cx(dim, pattern)} />
        <div className={cx(glow, pattern)} />
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
