import type { ComponentProps, CSSProperties } from "react";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_var(--markas-dot-size),transparent_calc(var(--markas-dot-size)_+_0.5px))] [background-size:var(--markas-dot-spacing)_var(--markas-dot-spacing)]";
const content = "relative";
const colors = {
  muted: "text-muted/50",
  primary: "text-primary/40",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type DotPatternProps = ComponentProps<"div"> & {
  spacing?: number;
  dotSize?: number;
  color?: keyof typeof colors;
  mask?: keyof typeof masks;
};

export function DotPattern({
  spacing = 16,
  dotSize = 1,
  color = "muted",
  mask = "none",
  className,
  style,
  children,
  ...props
}: DotPatternProps) {
  const vars = {
    "--markas-dot-spacing": `${spacing}px`,
    "--markas-dot-size": `${dotSize}px`,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cx(base, className)}
      style={{ ...vars, ...style }}
    >
      <div
        aria-hidden="true"
        className={cx(layer, colors[color], masks[mask])}
      />
      <div className={content}>{children}</div>
    </div>
  );
}
