import { Fragment, type ComponentProps } from "react";

const keycap =
  "inline-flex items-center justify-center rounded-md bg-surface font-sans font-medium text-muted ring-1 ring-line";
const sizes = {
  sm: "h-5 min-w-5 px-1 text-[11px]",
  md: "h-6 min-w-6 px-1.5 text-xs",
};
const group = "inline-flex items-center gap-1 font-sans";
const joiner = "text-xs text-muted";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type KbdProps = ComponentProps<"kbd"> & {
  size?: keyof typeof sizes;
  /** Kombinasi tombol, dirender sebagai keycap terpisah. Menggantikan children. */
  keys?: string[];
  /** Teks di antara tombol pada kombinasi. */
  separator?: string;
};

export function Kbd({
  size = "md",
  keys = [],
  separator = "+",
  className,
  children,
  ...props
}: KbdProps) {
  if (keys.length === 0)
    return (
      <kbd className={cx(keycap, sizes[size], className)} {...props}>
        {children}
      </kbd>
    );

  return (
    <kbd className={cx(group, className)} {...props}>
      {keys.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <span className={joiner}>{separator}</span>}
          <kbd className={cx(keycap, sizes[size])}>{key}</kbd>
        </Fragment>
      ))}
    </kbd>
  );
}
