import type { ComponentProps, CSSProperties } from "react";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_60%)]";
const plane = "absolute inset-0 [transform:rotateX(var(--markas-retro-angle))]";
const grid =
  "absolute -top-full -left-[150%] h-[400%] w-[400%] animate-[markas-retro-grid_1s_linear_infinite] bg-[linear-gradient(to_right,currentColor_1px,transparent_0),linear-gradient(to_bottom,currentColor_1px,transparent_0)] [background-size:var(--markas-retro-cell)_var(--markas-retro-cell)] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/40",
  primary: "text-primary/30",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const keyframes =
  "@keyframes markas-retro-grid{from{transform:translateY(calc(var(--markas-retro-cell)*-1))}to{transform:translateY(0)}}";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type RetroGridProps = ComponentProps<"div"> & {
  cellSize?: number;
  angle?: number;
  color?: keyof typeof colors;
};

export function RetroGrid({
  cellSize = 60,
  angle = 65,
  color = "muted",
  className,
  style,
  children,
  ...props
}: RetroGridProps) {
  const vars = {
    "--markas-retro-cell": `${cellSize}px`,
    "--markas-retro-angle": `${angle}deg`,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cx(base, className)}
      style={{ ...vars, ...style }}
    >
      <style>{keyframes}</style>
      <div aria-hidden="true" className={cx(layer, colors[color])}>
        <div className={plane}>
          <div className={grid} />
        </div>
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
