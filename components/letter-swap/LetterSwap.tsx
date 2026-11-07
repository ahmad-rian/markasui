"use client";

import { useEffect, useRef, type ComponentProps } from "react";

const root = "relative inline-flex overflow-hidden";
const letter = "relative inline-block whitespace-pre";
const copies = {
  up: "absolute inset-x-0 top-full",
  down: "absolute inset-x-0 bottom-full",
};

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Peringkat stagger tiap huruf. Mode random memakai urutan acak tetap (hash), sama di setiap render. */
function ranks(count: number, random: boolean) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (random) order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => (rank[index] = position));
  return rank;
}

export type LetterSwapProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
  mode?: "forward" | "pingpong" | "random";
  direction?: keyof typeof copies;
  stagger?: number;
  duration?: number;
};

export function LetterSwap({
  text,
  mode = "forward",
  direction = "up",
  stagger = 30,
  duration = 400,
  className,
  ...props
}: LetterSwapProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion()) return;
    const target = element.closest<HTMLElement>(TRIGGER) ?? element;
    const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
    const rank = ranks(letters.length, mode === "random");
    const shift = `translateY(${direction === "up" ? "-100%" : "100%"})`;
    let busyUntil = 0;

    // Pingpong: transisi CSS bolak-balik. Forward/random: sekali jalan lalu kembali tanpa terlihat.
    const move = (enter: boolean) => {
      const now = performance.now();
      if (mode !== "pingpong") {
        if (!enter || now < busyUntil) return;
        busyUntil = now + duration + stagger * letters.length;
      }
      letters.forEach((el, i) => {
        const delay = rank[i]! * stagger;
        if (mode !== "pingpong") {
          el.animate?.([{ transform: "none" }, { transform: shift }], {
            duration,
            delay,
            easing: EASING,
          });
          return;
        }
        el.style.transition = `transform ${duration}ms ${EASING} ${delay}ms`;
        el.style.transform = enter ? shift : "";
      });
    };
    const enter = () => move(true);
    const leave = () => move(false);
    target.addEventListener("pointerenter", enter);
    target.addEventListener("focusin", enter);
    target.addEventListener("pointerleave", leave);
    target.addEventListener("focusout", leave);
    return () => {
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("focusin", enter);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("focusout", leave);
      letters.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
      });
    };
  }, [text, mode, direction, stagger, duration]);

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, index) => (
        <span key={index} aria-hidden="true" data-letter="" className={letter}>
          {char}
          <span className={copies[direction]}>{char}</span>
        </span>
      ))}
    </span>
  );
}
