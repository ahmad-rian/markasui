"use client";

import { useEffect, useRef, type ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
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
const icon = "size-4 shrink-0";
const divider = "h-4 w-px bg-current opacity-25";
const count = "inline-flex items-center gap-1 tabular-nums";
const star = "size-3.5 shrink-0";
const srOnly = "sr-only";

const COUNT_DURATION = 1200;

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href with a scheme other than http, https, mailto, or tel (javascript:, for example) becomes "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};
/** 980, 12.4k, 1.2M. Same rule as the Blade version. */
const compact = (n: number) =>
  n >= 1e6
    ? `${Math.round(n / 1e5) / 10}M`
    : n >= 1e3
      ? `${Math.round(n / 100) / 10}k`
      : String(Math.round(n));
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type GithubStarsButtonProps = ComponentProps<"a"> & {
  /** Repository URL, for example https://github.com/owner/repo. */
  href: string;
  /** Star count. Pass it in, the component never fetches. */
  stars: number;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Hidden text for the count. {count} is replaced by the full number. */
  starsLabel?: string;
};

export function GithubStarsButton({
  href,
  stars,
  variant = "secondary",
  size = "md",
  starsLabel = "{count} stars",
  className,
  children,
  ...props
}: GithubStarsButtonProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  // Count up from zero the first time the button scrolls into view.
  useEffect(() => {
    const number = numberRef.current;
    if (!number || typeof IntersectionObserver === "undefined") return;
    if (reducedMotion()) return;
    let frame = 0;
    number.textContent = "0";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const begin = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - begin) / COUNT_DURATION, 1);
        number.textContent = compact(stars * (1 - (1 - t) ** 3));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(number);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      number.textContent = compact(stars);
    };
  }, [stars]);

  return (
    <a
      href={safeHref(href)}
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <svg
        className={icon}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.94c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
      {children}
      <span className={divider} aria-hidden="true" />
      <span className={count}>
        <svg
          className={star}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.19L12 17.2l-5.56 2.91 1.06-6.19L3 9.53l6.22-.9L12 3Z" />
        </svg>
        <span ref={numberRef} aria-hidden="true">
          {compact(stars)}
        </span>
        <span className={srOnly}>
          {starsLabel.replace("{count}", stars.toLocaleString("en-US"))}
        </span>
      </span>
    </a>
  );
}
