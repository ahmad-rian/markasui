import type { ComponentProps, CSSProperties } from "react";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-grid-size)_var(--markas-grid-size)]";
const cell =
  "absolute bg-current animate-[markas-grid-cell_4s_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/20",
  primary: "text-primary/15",
  success: "text-success/30",
  warning: "text-warning/30",
  danger: "text-danger/30",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};
const keyframes = "@keyframes markas-grid-cell{50%{opacity:.4}}";
const CELL_DELAY_MS = 800;
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Posisi satu sel sorotan di dalam garis grid (kolom, baris mulai dari 0). */
const cellStyle = (
  [col, row]: [number, number],
  size: number,
  index: number,
) => ({
  left: `${col * size + 1}px`,
  top: `${row * size + 1}px`,
  width: `${size - 1}px`,
  height: `${size - 1}px`,
  animationDelay: `${index * CELL_DELAY_MS}ms`,
});

export type GridPatternProps = ComponentProps<"div"> & {
  cellSize?: number;
  cells?: [number, number][];
  color?: keyof typeof colors;
  mask?: keyof typeof masks;
};

export function GridPattern({
  cellSize = 32,
  cells = [],
  color = "muted",
  mask = "none",
  className,
  style,
  children,
  ...props
}: GridPatternProps) {
  const vars = { "--markas-grid-size": `${cellSize}px` } as CSSProperties;

  return (
    <div
      {...props}
      className={cx(base, className)}
      style={{ ...vars, ...style }}
    >
      <style>{keyframes}</style>
      <div aria-hidden="true" className={cx(layer, colors[color], masks[mask])}>
        {cells.map((position, index) => (
          <span
            key={position.join("-")}
            className={cell}
            style={cellStyle(position, cellSize, index)}
          />
        ))}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
