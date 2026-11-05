"use client";

import { useState, type ComponentProps, type MouseEvent } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-subtle data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";
const variants = {
  default: "bg-transparent",
  outline: "border border-line bg-surface",
};
const sizes = {
  sm: "h-8 min-w-8 px-2",
  md: "h-9 min-w-9 px-2.5",
  lg: "h-10 min-w-10 px-3",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type ToggleProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};

export function Toggle({
  variant = "default",
  size = "md",
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  className,
  type = "button",
  ...props
}: ToggleProps) {
  const [internal, setInternal] = useState(defaultPressed);
  const isPressed = pressed ?? internal;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    setInternal(!isPressed);
    onPressedChange?.(!isPressed);
  };

  return (
    <button
      type={type}
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      onClick={handleClick}
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
