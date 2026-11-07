"use client";

import { useEffect, useRef, type ComponentProps } from "react";

const root = "inline";
const letter =
  "transition-[font-variation-settings,font-weight] duration-200 ease-out motion-reduce:transition-none";

/** Satu napas gelombang (ms) dan selisih fase antarhuruf (radian). */
const WAVE_PERIOD = 2400;
const WAVE_PHASE = 0.45;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Atur berat huruf lewat sumbu wght font variabel, dengan font-weight sebagai cadangan. */
const weight = (value: number) => ({
  fontVariationSettings: `'wght' ${value}`,
  fontWeight: value,
});

export type VariableWeightTextProps = Omit<
  ComponentProps<"span">,
  "children"
> & {
  text: string;
  radius?: number;
  min?: number;
  max?: number;
  wave?: boolean;
};

export function VariableWeightText({
  text,
  radius = 120,
  min = 300,
  max = 800,
  wave = false,
  className,
  ...props
}: VariableWeightTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion()) return;
    const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
    const set = (values: number[]) =>
      letters.forEach((el, i) => Object.assign(el.style, weight(values[i]!)));
    let pointer: { x: number; y: number } | undefined;
    let visible = false;
    let frame = 0;

    // Huruf terdekat dari kursor paling tebal; di luar radius kembali ke min. Tanpa kursor, wave bernapas.
    const draw = (now: number) => {
      frame = 0;
      const span = max - min;
      const near = pointer
        ? letters.map((el) => {
            const rect = el.getBoundingClientRect();
            const distance = Math.hypot(
              pointer!.x - (rect.left + rect.width / 2),
              pointer!.y - (rect.top + rect.height / 2),
            );
            return Math.min(distance / radius, 1);
          })
        : [];
      if (near.some((t) => t < 1))
        return set(
          near.map((t) =>
            Math.round(min + span * (0.5 + 0.5 * Math.cos(Math.PI * t))),
          ),
        );
      if (!wave) return set(letters.map(() => min));
      set(
        letters.map((_, i) =>
          Math.round(
            min +
              span *
                (0.5 -
                  0.5 *
                    Math.cos(
                      (now / WAVE_PERIOD) * 2 * Math.PI - i * WAVE_PHASE,
                    )),
          ),
        ),
      );
      if (visible) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const out = () => {
      pointer = undefined;
      schedule();
    };

    const observer =
      typeof IntersectionObserver === "undefined"
        ? undefined
        : new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            cancelAnimationFrame(frame);
            frame = 0;
            schedule();
          });
    visible = !observer;
    observer?.observe(element);
    schedule();
    addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", out);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", out);
      set(letters.map(() => min));
    };
  }, [text, radius, min, max, wave]);

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          data-letter=""
          className={letter}
          style={weight(min)}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
