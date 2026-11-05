import type { ComponentProps, ReactNode } from "react";

const base =
  "group inline-grid font-medium whitespace-nowrap perspective-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";
const sizes = {
  sm: "h-8 rounded-md text-sm",
  md: "h-10 rounded-lg text-sm",
  lg: "h-12 rounded-lg text-base",
};
const inner =
  "grid rounded-[inherit] transition-transform duration-500 ease-out transform-3d group-hover:rotate-x-180 group-focus-visible:rotate-x-180 motion-reduce:transition-none";
const face =
  "col-start-1 row-start-1 inline-flex items-center justify-center gap-2 rounded-[inherit] backface-hidden";
const facePadding = {
  sm: "px-3",
  md: "px-4",
  lg: "px-6",
};
const variants = {
  primary: "bg-primary text-on-primary",
  secondary: "border border-line bg-surface text-ink",
  ghost: "text-ink",
  danger: "bg-danger text-on-primary",
};
const backVariants = {
  primary: "rotate-x-180 bg-primary-strong text-on-primary",
  secondary: "rotate-x-180 border border-primary-line bg-primary-soft text-ink",
  ghost: "rotate-x-180 bg-subtle text-ink",
  danger: "rotate-x-180 bg-danger text-on-primary",
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type FlipButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Text on the back face, shown on hover and focus. Falls back to the label. */
  backLabel?: ReactNode;
};

export function FlipButton({
  variant = "primary",
  size = "md",
  backLabel,
  type = "button",
  className,
  children,
  ...props
}: FlipButtonProps) {
  return (
    <button type={type} className={cx(base, sizes[size], className)} {...props}>
      <span className={inner}>
        <span className={cx(face, facePadding[size], variants[variant])}>
          {children}
        </span>
        <span
          className={cx(face, facePadding[size], backVariants[variant])}
          aria-hidden="true"
        >
          {backLabel || children}
        </span>
      </span>
    </button>
  );
}
