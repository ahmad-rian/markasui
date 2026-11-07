"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";

const root = "relative inline-flex overflow-hidden align-bottom";
const unit = "inline-block whitespace-pre";

const EASE_IN = "cubic-bezier(0.55, 0, 1, 0.45)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const WORD_SEPARATOR = "\n";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Potong frasa menjadi huruf, atau kata beserta spasi sesudahnya. */
const splitText = (text: string, split: "chars" | "words") =>
  split === "chars" ? Array.from(text) : text.split(/(?<= )/);

/** Jeda stagger tiap bagian sesuai titik awal. Random memakai urutan acak tetap (hash). */
function ranks(count: number, from: TextRotateProps["from"]) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (from === "random") order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => {
    const middle = Math.abs(index - (count - 1) / 2);
    rank[index] =
      from === "last"
        ? count - 1 - index
        : from === "center"
          ? middle
          : position;
  });
  return rank;
}

export type TextRotateProps = Omit<ComponentProps<"span">, "children"> & {
  words: string[];
  split?: "chars" | "words";
  from?: "first" | "last" | "center" | "random";
  interval?: number;
  stagger?: number;
  duration?: number;
  pauseOnHover?: boolean;
};

export function TextRotate({
  words,
  split = "chars",
  from = "first",
  interval = 2500,
  stagger = 25,
  duration = 400,
  pauseOnHover = true,
  className,
  ...props
}: TextRotateProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const width = useRef(0);
  const [index, setIndex] = useState(0);
  const key = words.join(WORD_SEPARATOR);
  const units = () => [
    ...(rootRef.current?.querySelectorAll<HTMLElement>("[data-unit]") ?? []),
  ];

  // Kata baru masuk dari bawah per bagian, dan lebar pembungkus ikut melebar atau menyempit halus.
  useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element || !width.current) return;
    const list = units();
    const rank = ranks(list.length, from);
    list.forEach((el, i) =>
      el.animate?.(
        [
          { transform: "translateY(100%)", opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        {
          duration,
          delay: rank[i]! * stagger,
          easing: EASE_OUT,
          fill: "backwards",
        },
      ),
    );
    element.animate?.(
      [{ width: `${width.current}px` }, { width: `${element.offsetWidth}px` }],
      { duration, easing: EASE_OUT },
    );
    width.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Kata lama keluar ke atas, lalu kata berikutnya dipasang. Berhenti saat di-hover, di luar layar, atau tab tersembunyi.
  useEffect(() => {
    const element = rootRef.current;
    const count = key.split(WORD_SEPARATOR).length;
    if (!element || count < 2 || reducedMotion()) return;
    let hovered = false;
    let busy = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      if (busy || (hovered && pauseOnHover) || document.hidden) return;
      busy = true;
      const list = units();
      const rank = ranks(list.length, from);
      const exits = list.map((el, i) =>
        el.animate?.(
          [
            { transform: "none", opacity: 1 },
            { transform: "translateY(-100%)", opacity: 0 },
          ],
          {
            duration,
            delay: rank[i]! * stagger,
            easing: EASE_IN,
            fill: "forwards",
          },
        ),
      );
      Promise.all(exits.map((animation) => animation?.finished))
        .then(() => {
          width.current = element.offsetWidth;
          setIndex((current) => (current + 1) % count);
        })
        .catch(() => {})
        .finally(() => (busy = false));
    };
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            clearInterval(timer);
            if (entries.some((entry) => entry.isIntersecting))
              timer = setInterval(tick, interval);
          });
    if (observer) observer.observe(element);
    else timer = setInterval(tick, interval);
    return () => {
      observer?.disconnect();
      clearInterval(timer);
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointerleave", leave);
    };
  }, [key, split, from, interval, stagger, duration, pauseOnHover]);

  // Modulo menjaga indeks tetap sah saat daftar kata berganti.
  const current = words[index % Math.max(words.length, 1)] ?? "";

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {splitText(current, split).map((part, i) => (
        <span
          key={`${index}-${i}`}
          aria-hidden="true"
          data-unit=""
          className={unit}
        >
          {part}
        </span>
      ))}
    </span>
  );
}
