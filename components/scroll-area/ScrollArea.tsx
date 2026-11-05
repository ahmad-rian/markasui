import type { ComponentProps } from "react";

const base =
  "rounded-lg [scrollbar-color:var(--markas-line)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-track]:bg-transparent";
const orientations = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type ScrollAreaProps = ComponentProps<"div"> & {
  orientation?: keyof typeof orientations;
  label?: string;
};

export function ScrollArea({
  orientation = "vertical",
  label = "Scrollable content",
  className,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      data-orientation={orientation}
      className={cx(base, orientations[orientation], className)}
      {...props}
    />
  );
}
