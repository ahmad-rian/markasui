import type { ComponentProps } from "react";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]";
const ring =
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[markas-ripple_3.4s_ease-in-out_infinite] rounded-full border border-current bg-current/5 motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const keyframes =
  "@keyframes markas-ripple{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}";
const RING_DELAY_MS = 120;
const MAX_RINGS = 12;
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Lingkaran ke-i: makin luar makin besar dan makin pudar, dengan jeda supaya denyut merambat dari tengah. */
function makeRings(rings: number, size: number, gap: number) {
  const total = Math.max(0, Math.min(Math.trunc(rings), MAX_RINGS));
  return Array.from({ length: total }, (_, index) => ({
    width: `${size + index * gap}px`,
    height: `${size + index * gap}px`,
    opacity: Math.max(1, 6 - index) / 10,
    animationDelay: `${index * RING_DELAY_MS}ms`,
  }));
}

export type RippleBackgroundProps = ComponentProps<"div"> & {
  rings?: number;
  size?: number;
  gap?: number;
  color?: keyof typeof colors;
};

export function RippleBackground({
  rings = 6,
  size = 120,
  gap = 64,
  color = "muted",
  className,
  children,
  ...props
}: RippleBackgroundProps) {
  return (
    <div {...props} className={cx(base, className)}>
      <style>{keyframes}</style>
      <div aria-hidden="true" className={cx(layer, colors[color])}>
        {makeRings(rings, size, gap).map((style, index) => (
          <span key={index} className={ring} style={style} />
        ))}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
