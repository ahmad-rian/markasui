"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const wrapper = "contents";
const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};
const fill =
  "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-data-[state=complete]:scale-x-100 group-data-[state=holding]:scale-x-100 group-data-[state=holding]:duration-(--hold-duration) group-data-[state=holding]:ease-linear";
const fillVariants = {
  primary: "bg-on-primary/25",
  secondary: "bg-primary/10",
  ghost: "bg-primary/10",
  danger: "bg-on-primary/25",
};
const srOnly = "sr-only";

const HOLD_KEYS = new Set([" ", "Enter"]);

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

type HoldState = "idle" | "holding" | "complete";

export type HoldButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** How long the button must be held, in milliseconds. */
  duration?: number;
  /** Hidden hint read by screen readers. */
  holdLabel?: string;
  /** Called once the hold reaches the full duration. */
  onComplete?: () => void;
};

export function HoldButton({
  variant = "primary",
  size = "md",
  duration = 1500,
  holdLabel = "Press and hold to confirm",
  onComplete,
  type = "button",
  className,
  style,
  children,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  onBlur,
  ...props
}: HoldButtonProps) {
  const hintId = useId();
  const [state, setState] = useState<HoldState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const start = () => {
    if (state !== "idle") return;
    setState("holding");
    timer.current = setTimeout(() => {
      setState("complete");
      onComplete?.();
    }, duration);
  };
  const cancel = () => {
    clearTimeout(timer.current);
    setState("idle");
  };

  return (
    <span className={wrapper}>
      <button
        type={type}
        data-state={state}
        aria-describedby={hintId}
        style={
          { ...style, "--hold-duration": `${duration}ms` } as CSSProperties
        }
        className={cx(base, variants[variant], sizes[size], className)}
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
          onPointerDown?.(event);
          if (event.button === 0) start();
        }}
        onPointerUp={(event: PointerEvent<HTMLButtonElement>) => {
          onPointerUp?.(event);
          cancel();
        }}
        onPointerLeave={(event: PointerEvent<HTMLButtonElement>) => {
          onPointerLeave?.(event);
          cancel();
        }}
        onPointerCancel={(event: PointerEvent<HTMLButtonElement>) => {
          onPointerCancel?.(event);
          cancel();
        }}
        onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
          onKeyDown?.(event);
          if (!HOLD_KEYS.has(event.key)) return;
          event.preventDefault();
          if (!event.repeat) start();
        }}
        onKeyUp={(event: KeyboardEvent<HTMLButtonElement>) => {
          onKeyUp?.(event);
          if (HOLD_KEYS.has(event.key)) cancel();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          cancel();
        }}
        onContextMenu={(event) => event.preventDefault()}
        {...props}
      >
        <span className={cx(fill, fillVariants[variant])} aria-hidden="true" />
        {children}
      </button>
      <span id={hintId} className={srOnly}>
        {holdLabel}
      </span>
    </span>
  );
}
