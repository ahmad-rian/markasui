"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type Ref,
} from "react";

const base =
  "bg-transparent text-ink bg-no-repeat box-decoration-clone [--markas-th-fill:color-mix(in_oklab,var(--markas-th-c)_var(--markas-th-a,28%),transparent)] -mx-[0.12em] px-[0.12em] bg-left [background-size:var(--markas-th-size,0%_100%)] data-[direction=rtl]:bg-right data-[direction=ttb]:bg-top data-[direction=btt]:bg-bottom data-[direction$=b]:[--markas-th-size:100%_0%] data-[state=active]:[background-size:100%_100%] transition-[background-size] ease-out motion-reduce:transition-none motion-reduce:data-[trigger=view]:[background-size:100%_100%] motion-reduce:data-[trigger=auto]:[background-size:100%_100%]";
const variants = {
  solid:
    "rounded-[0.2em] [background-image:linear-gradient(var(--markas-th-fill)_0_0)]",
  marker:
    "rounded-[0.1em_0.5em_0.2em_0.6em] [background-image:linear-gradient(transparent_40%,var(--markas-th-fill)_40%_94%,transparent_94%)]",
  underline:
    "[background-image:linear-gradient(transparent_84%,var(--markas-th-c)_84%)]",
  gradient:
    "rounded-[0.2em] [background-image:linear-gradient(100deg,var(--markas-th-fill),color-mix(in_oklab,var(--markas-th-c2,var(--color-warning))_var(--markas-th-a,28%),transparent))]",
};
const colors = {
  warning:
    "[--markas-th-c:var(--color-warning)] [--markas-th-c2:var(--color-danger)]",
  primary: "[--markas-th-a:16%] [--markas-th-c:var(--color-primary)]",
  "primary-soft":
    "[--markas-th-a:100%] [--markas-th-c:var(--color-primary-soft)]",
  success: "[--markas-th-c:var(--color-success)]",
  danger: "[--markas-th-c:var(--color-danger)]",
};

/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";
/** Dua event pertama menyalakan sorotan, dua terakhir mematikannya. */
const EVENTS = ["pointerenter", "focusin", "pointerleave", "focusout"];

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export type TextHighlighterDirection = "ltr" | "rtl" | "ttb" | "btt";

export type TextHighlighterHandle = {
  /** Sorot teks, opsional dengan arah lain. */
  animate: (direction?: TextHighlighterDirection) => void;
  /** Hapus sorotan. */
  reset: () => void;
};

export type TextHighlighterProps = ComponentPropsWithoutRef<"span"> & {
  as?: ElementType;
  trigger?: "view" | "hover" | "auto" | "manual";
  direction?: TextHighlighterDirection;
  variant?: keyof typeof variants;
  color?: keyof typeof colors;
  /** Keadaan sorotan untuk trigger manual. */
  active?: boolean;
  /** Trigger view: sorot sekali saja, atau hapus lagi saat keluar layar. */
  once?: boolean;
  /** Trigger view: bagian teks yang harus terlihat (0 sampai 1). */
  threshold?: number;
  duration?: number;
  delay?: number;
  ref?: Ref<TextHighlighterHandle>;
};

export function TextHighlighter({
  as: Tag = "span",
  trigger = "view",
  direction = "ltr",
  variant = "solid",
  color = "warning",
  active = false,
  once = true,
  threshold = 0.5,
  duration = 700,
  delay = 0,
  className,
  style,
  ref,
  ...props
}: TextHighlighterProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [on, setOn] = useState(active);
  // Arah dari animate(direction) menimpa prop direction.
  const [override, setOverride] = useState<TextHighlighterDirection>();

  useImperativeHandle(ref, () => ({
    animate: (next) => {
      if (next) setOverride(next);
      setOn(true);
    },
    reset: () => setOn(false),
  }));

  // Trigger manual mengikuti prop active setiap kali nilainya berubah.
  const [lastActive, setLastActive] = useState(active);
  if (active !== lastActive) {
    setLastActive(active);
    if (trigger === "manual") setOn(active);
  }

  useEffect(() => {
    const element = rootRef.current;
    if (!element || trigger === "manual") return;
    if (trigger === "hover") {
      const target = element.closest<HTMLElement>(TRIGGER) ?? element;
      const toggle = (event: Event) => setOn(EVENTS.indexOf(event.type) < 2);
      EVENTS.forEach((name) => target.addEventListener(name, toggle));
      return () =>
        EVENTS.forEach((name) => target.removeEventListener(name, toggle));
    }
    // Auto menyorot di frame berikutnya, supaya transisi berjalan dari keadaan kosong.
    if (trigger === "auto") {
      const frame = requestAnimationFrame(() => setOn(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && once) observer.disconnect();
        if (visible || !once) setOn(visible);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger, once, threshold]);

  return (
    <Tag
      ref={rootRef}
      data-state={on ? "active" : "inactive"}
      data-direction={override ?? direction}
      data-trigger={trigger}
      {...props}
      className={cx(base, variants[variant], colors[color], className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    />
  );
}
