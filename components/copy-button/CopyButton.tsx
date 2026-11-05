"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
} from "react";

const wrapper = "contents";
const base =
  "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
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
const iconSizes = {
  sm: "size-8 rounded-md text-sm",
  md: "size-10 rounded-lg text-sm",
  lg: "size-12 rounded-lg text-base",
};
const iconStack = "grid size-4 shrink-0 place-items-center";
const copyIcon =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-50 group-data-[state=copied]:opacity-0 motion-reduce:transition-none";
const checkIcon =
  "col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-100 group-data-[state=copied]:opacity-100 motion-reduce:transition-none";
const checkPath =
  "[stroke-dasharray:24] [stroke-dashoffset:24] transition-[stroke-dashoffset] delay-100 duration-300 ease-out group-data-[state=copied]:[stroke-dashoffset:0] motion-reduce:transition-none";
const srOnly = "sr-only";

/** How long the check mark stays before the button returns to idle. */
const RESET_DELAY = 2000;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type CopyButtonProps = ComponentProps<"button"> & {
  /** Text written to the clipboard. */
  text: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  copyLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  text,
  variant = "primary",
  size = "md",
  copyLabel = "Copy",
  copiedLabel = "Copied",
  type = "button",
  className,
  children,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked or unavailable: stay idle so the check mark never lies.
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_DELAY);
  };

  return (
    <span className={wrapper}>
      <button
        type={type}
        data-state={copied ? "copied" : "idle"}
        onClick={handleClick}
        className={cx(
          base,
          variants[variant],
          children ? sizes[size] : iconSizes[size],
          className,
        )}
        {...props}
      >
        <span className={iconStack} aria-hidden="true">
          <svg
            className={copyIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
          </svg>
          <svg
            className={checkIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className={checkPath} d="m4 12 5 5L20 6" />
          </svg>
        </span>
        {children ?? <span className={srOnly}>{copyLabel}</span>}
      </button>
      <span role="status" className={srOnly}>
        {copied ? copiedLabel : ""}
      </span>
    </span>
  );
}
