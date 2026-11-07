"use client";

import { Fragment, useLayoutEffect, useRef, type ComponentProps } from "react";

const root = "block";
const line = "block";
const lineCut = "block overflow-hidden pb-[0.12em] -mb-[0.12em]";
const cut = "inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]";
const unit = "inline-block whitespace-pre";
const lineUnit = "block";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const offsets = { up: "translateY(120%)", down: "translateY(-120%)" };

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Jeda stagger tiap bagian sesuai titik awal. Random memakai urutan acak tetap (hash). */
function ranks(count: number, from: VerticalCutRevealProps["from"]) {
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

export type VerticalCutRevealProps = Omit<
  ComponentProps<"span">,
  "children"
> & {
  /** Baris baru (\n) memecah teks menjadi beberapa baris. */
  text: string;
  split?: "chars" | "words" | "lines";
  direction?: keyof typeof offsets;
  from?: "first" | "last" | "center" | "random";
  stagger?: number;
  duration?: number;
  delay?: number;
};

export function VerticalCutReveal({
  text,
  split = "words",
  direction = "up",
  from = "first",
  stagger = 60,
  duration = 700,
  delay = 0,
  className,
  ...props
}: VerticalCutRevealProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const lines = text.split("\n");

  // Sembunyikan setiap bagian di balik garis potong, lalu munculkan bergiliran saat teks masuk layar.
  useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion()) return;
    const units = [...element.querySelectorAll<HTMLElement>("[data-unit]")];
    const rank = ranks(units.length, from);
    const offset = offsets[direction];
    units.forEach((el) => (el.style.transform = offset));
    const reveal = () =>
      units.forEach((el, i) => {
        el.animate?.([{ transform: offset }, { transform: "none" }], {
          duration,
          delay: delay + rank[i]! * stagger,
          easing: EASING,
          fill: "backwards",
        });
        el.style.transform = "";
      });
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      reveal();
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      units.forEach((el) => (el.style.transform = ""));
    };
  }, [text, split, direction, from, stagger, duration, delay]);

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((lineText, l) =>
          split === "lines" ? (
            <span key={l} className={lineCut}>
              <span data-unit="" className={lineUnit}>
                {lineText}
              </span>
            </span>
          ) : (
            <span key={l} className={line}>
              {lineText.split(" ").map((word, w) => (
                <Fragment key={w}>
                  {w > 0 && " "}
                  <span className={cut}>
                    {split === "words" ? (
                      <span data-unit="" className={unit}>
                        {word}
                      </span>
                    ) : (
                      Array.from(word).map((char, c) => (
                        <span key={c} data-unit="" className={unit}>
                          {char}
                        </span>
                      ))
                    )}
                  </span>
                </Fragment>
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
