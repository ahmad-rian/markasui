"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Ease-out eksponensial: cepat di awal, melambat menjelang angka akhir. */
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/** Panggil `callback` sekali saat elemen pertama kali terlihat. Mengembalikan fungsi pelepas. */
function whenVisible(element: Element, callback: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    callback();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

export type NumberTickerProps = Omit<ComponentProps<"span">, "children"> & {
  value: number;
  from?: number;
  duration?: number;
  decimals?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
};

export function NumberTicker({
  value,
  from = 0,
  duration = 2000,
  decimals = 0,
  locale = "en-US",
  prefix = "",
  suffix = "",
  className,
  ...props
}: NumberTickerProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const current = useRef(from);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion()) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const start = current.current;
    let frame = 0;
    setDisplay(start);
    const stop = whenVisible(element, () => {
      let began: number | undefined;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began) / duration, 1);
        current.current = start + (value - start) * easeOut(progress);
        setDisplay(current.current);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const text = (n: number) => `${prefix}${formatter.format(n)}${suffix}`;

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{text(value)}</span>
      <span aria-hidden="true" className={holder}>
        {text(value)}
      </span>
      <span aria-hidden="true" className={layer}>
        {text(display)}
      </span>
    </span>
  );
}
