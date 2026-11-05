import type { ComponentProps } from "react";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const star =
  "absolute rounded-full bg-current animate-[markas-twinkle_3s_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const keyframes = "@keyframes markas-twinkle{50%{opacity:.15}}";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan bintang yang sama. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_STARS = 400;

function makeStars(count: number, seed: number) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_STARS));
  return Array.from({ length: total }, () => {
    const size = next() % 5 === 0 ? 2 : 1;
    return {
      left: `${(next() % 10000) / 100}%`,
      top: `${(next() % 10000) / 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: ((next() % 6) + 4) / 10,
      animationDelay: `${(next() % 30) * 100}ms`,
      animationDuration: `${(next() % 3) + 2}s`,
    };
  });
}

export type StarsBackgroundProps = ComponentProps<"div"> & {
  count?: number;
  seed?: number;
  color?: keyof typeof colors;
};

export function StarsBackground({
  count = 80,
  seed = 7,
  color = "primary",
  className,
  children,
  ...props
}: StarsBackgroundProps) {
  return (
    <div {...props} className={cx(base, className)}>
      <style>{keyframes}</style>
      <div aria-hidden="true" className={cx(layer, colors[color])}>
        {makeStars(count, seed).map((style, index) => (
          <span key={index} className={star} style={style} />
        ))}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
