import type { ComponentProps } from "react";

const base = "animate-pulse bg-subtle motion-reduce:animate-none";
const shapes = {
  rect: "rounded-md",
  circle: "rounded-full",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type SkeletonProps = ComponentProps<"div"> & {
  shape?: keyof typeof shapes;
};

export function Skeleton({
  shape = "rect",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(base, shapes[shape], className)}
      {...props}
    />
  );
}
