"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const charsets = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@$%&*+=<>/?{}[]",
  binary: "01",
};

/** Huruf acak diganti paling cepat setiap 50 ms supaya tetap terbaca sebagai efek, bukan kedipan. */
const FRAME = 50;
/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Acak deterministik (Park-Miller): urutan huruf acak sama di setiap putaran dan framework. */
function scrambler(text: string, charset: string) {
  const chars = Array.from(text);
  let seed = 1;
  const pick = () => {
    seed = (seed * 48271) % 2147483647;
    return charset[seed % charset.length];
  };
  return (revealed: number) =>
    chars
      .map((char, i) => (i < revealed || char.trim() === "" ? char : pick()))
      .join("");
}

export type TextScrambleProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
  trigger?: "hover" | "view" | "mount";
  charset?: keyof typeof charsets;
  duration?: number;
  delay?: number;
};

export function TextScramble({
  text,
  trigger = "hover",
  charset = "letters",
  duration = 800,
  delay = 0,
  className,
  ...props
}: TextScrambleProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  // Teks acak disimpan bersama sumbernya; kalau text berubah, teks asli langsung tampil lagi.
  const [frame, setFrame] = useState({ source: "", value: "" });
  const display = frame.source === text ? frame.value : text;

  useEffect(() => {
    const element = rootRef.current;
    if (!element || reducedMotion()) return;
    const set = charsets[charset];
    const total = Array.from(text).length;
    let frame = 0;
    let observer: IntersectionObserver | undefined;

    // Acak semua huruf, lalu buka dari kiri ke kanan sampai teks asli kembali utuh.
    const run = (wait: number) => {
      if (frame) return;
      const scramble = scrambler(text, set);
      let began: number | undefined;
      let last = -FRAME;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began - wait) / duration, 1);
        if (now - last >= FRAME || progress >= 1) {
          last = now;
          const revealed = Math.max(Math.floor(progress * total), 0);
          setFrame({ source: text, value: scramble(revealed) });
        }
        frame = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      frame = requestAnimationFrame(tick);
    };

    const target = element.closest<HTMLElement>(TRIGGER) ?? element;
    const hover = () => run(0);
    if (trigger === "hover") {
      target.addEventListener("pointerenter", hover);
      target.addEventListener("focusin", hover);
    } else {
      if (trigger === "mount" || typeof IntersectionObserver === "undefined")
        run(delay);
      else {
        // Di luar layar teks sudah teracak, lalu terdekripsi sekali saat terlihat.
        observer = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting))
            return setFrame({ source: text, value: scrambler(text, set)(0) });
          observer?.disconnect();
          run(delay);
        });
        observer.observe(element);
      }
    }
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      target.removeEventListener("pointerenter", hover);
      target.removeEventListener("focusin", hover);
    };
  }, [text, trigger, charset, duration, delay]);

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={holder}>
        {text}
      </span>
      <span aria-hidden="true" className={layer}>
        {display}
      </span>
    </span>
  );
}
