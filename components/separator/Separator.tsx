import type { ComponentProps } from "react";

const roots = {
  horizontal: "h-px w-full shrink-0 bg-line",
  vertical: "w-px shrink-0 self-stretch bg-line",
};
const labeledRoots = {
  horizontal: "flex w-full items-center gap-3 text-xs text-muted",
  vertical:
    "flex shrink-0 flex-col items-center gap-2 self-stretch text-xs text-muted",
};
const lines = {
  horizontal: "h-px flex-1 bg-line",
  vertical: "w-px flex-1 bg-line",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

type Orientation = keyof typeof roots;

export type SeparatorProps = Omit<ComponentProps<"div">, "children"> & {
  orientation?: Orientation;
  /** Hanya hiasan visual (role="none"). Matikan bila garis memisahkan bagian yang bermakna. */
  decorative?: boolean;
  /** Teks di tengah garis, misalnya "or". */
  label?: string;
};

export function Separator({
  orientation = "horizontal",
  decorative = true,
  label,
  className,
  ...props
}: SeparatorProps) {
  const semantics = decorative
    ? { role: "none" }
    : {
        role: "separator",
        "aria-orientation": orientation,
        "aria-label": label || undefined,
      };

  if (!label)
    return (
      <div
        {...semantics}
        className={cx(roots[orientation], className)}
        {...props}
      />
    );

  return (
    <div
      {...semantics}
      className={cx(labeledRoots[orientation], className)}
      {...props}
    >
      <span className={lines[orientation]} />
      <span>{label}</span>
      <span className={lines[orientation]} />
    </div>
  );
}
