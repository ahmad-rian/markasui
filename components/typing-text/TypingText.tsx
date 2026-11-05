"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

const root = "inline";
const caret = "ml-0.5 inline-block h-[1.1em] w-0.5 bg-current align-[-0.2em]";

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Panggil `callback(true/false)` setiap kali elemen masuk atau keluar layar. Mengembalikan fungsi pelepas. */
function onVisibility(element: Element, callback: (visible: boolean) => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback(true);
    return () => {};
  }
  const observer = new IntersectionObserver((entries) =>
    callback(entries.some((entry) => entry.isIntersecting)),
  );
  observer.observe(element);
  return () => observer.disconnect();
}

/** Kursor berkedip setiap 500 ms memakai Web Animations API. */
function blink(element: HTMLElement | null) {
  return element?.animate?.([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    iterations: Infinity,
    easing: "steps(2, jump-none)",
  });
}

const WORD_SEPARATOR = "\n";

export type TypingTextProps = Omit<ComponentProps<"span">, "children"> & {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  loop?: boolean;
  cursor?: boolean;
};

export function TypingText({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1800,
  loop = true,
  cursor = true,
  className,
  ...props
}: TypingTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(words[0] ?? "");
  const key = words.join(WORD_SEPARATOR);

  useEffect(() => {
    const list = key.split(WORD_SEPARATOR).map((word) => Array.from(word));
    const element = rootRef.current;
    if (!element || !key || reducedMotion()) return;

    let index = 0;
    let count = list[0]?.length ?? 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const animation = blink(caretRef.current);

    // Ketik satu huruf, jeda di kata penuh, hapus, lalu pindah ke kata berikutnya.
    const step = () => {
      const chars = list[index] ?? [];
      let delay = deleting ? deleteSpeed : typeSpeed;
      if (!deleting && count >= chars.length) {
        if (!loop && index === list.length - 1) return;
        deleting = true;
        delay = pause;
      } else if (deleting && count === 0) {
        deleting = false;
        index = (index + 1) % list.length;
      } else {
        count += deleting ? -1 : 1;
        setText(chars.slice(0, count).join(""));
      }
      timer = setTimeout(step, delay);
    };

    setText(list[0]?.join("") ?? "");
    const stop = onVisibility(element, (visible) => {
      clearTimeout(timer);
      if (visible) step();
    });
    return () => {
      stop();
      clearTimeout(timer);
      animation?.cancel();
    };
  }, [key, typeSpeed, deleteSpeed, pause, loop, cursor]);

  return (
    <span ref={rootRef} {...props} className={cx(root, className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      {cursor && <span ref={caretRef} aria-hidden="true" className={caret} />}
    </span>
  );
}
