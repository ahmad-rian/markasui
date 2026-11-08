import type { ComponentProps, CSSProperties } from "react";

const base = "group/sparkles relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const sparkle = "absolute -translate-1/2 fill-current";
const content = "relative";
const colors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const twinkle =
  "animate-[markas-sparkle_3s_ease-in-out_infinite] motion-reduce:animate-none";
const variants = {
  field: twinkle,
  text: twinkle,
  burst:
    "top-1/2 left-1/2 opacity-0 motion-safe:group-focus-within/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite] motion-safe:group-hover/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite]",
};
/** Ukuran terkecil dan rentang tambahan dalam piksel. */
const sizes = { sm: [4, 4], md: [6, 6], lg: [10, 8] } as const;
const star =
  "M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z";
const keyframes =
  "@keyframes markas-sparkle{0%,to{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes markas-sparkle-burst{0%{opacity:0;transform:translate(0,0) scale(.3)}30%{opacity:1}to{opacity:0;transform:translate(var(--markas-sparkle-x),var(--markas-sparkle-y)) scale(1) rotate(90deg)}}";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan kilau yang sama. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_SPARKLES = 120;
const BURST_X = 240;
const BURST_Y = 140;
const BURST_DELAY_MS = 600;
const EDGE = 1500;

type Variant = keyof typeof variants;

/** Posisi dalam persen: acak di seluruh area (field), atau di pita tepi atas, bawah, kiri, kanan (text). */
function place(variant: Variant, next: () => number) {
  if (variant === "field")
    return [(next() % 10000) / 100, (next() % 10000) / 100];
  const side = next() % 4;
  const along = (next() % 10000) / 100;
  const near = (next() % EDGE) / 100;
  const far = (10000 - (next() % EDGE)) / 100;
  return [[along, along, near, far][side], [near, far, along, along][side]];
}

function makeSparkles(
  variant: Variant,
  density: number,
  seed: number,
  size: keyof typeof sizes,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(density), MAX_SPARKLES));
  const [minSize, sizeRange] = sizes[size] ?? sizes.md;
  return Array.from({ length: total }, () => {
    const px = `${minSize + (next() % sizeRange)}px`;
    const dot = variant === "field" && next() % 3 === 0;
    if (variant === "burst") {
      const style = {
        width: px,
        height: px,
        animationDelay: `${next() % BURST_DELAY_MS}ms`,
        "--markas-sparkle-x": `${(next() % BURST_X) - BURST_X / 2}px`,
        "--markas-sparkle-y": `${(next() % BURST_Y) - BURST_Y / 2}px`,
      } as CSSProperties;
      return { dot, style };
    }
    const [left, top] = place(variant, next);
    const style = {
      left: `${left}%`,
      top: `${top}%`,
      width: px,
      height: px,
      opacity: ((next() % 5) + 5) / 10,
      animationDelay: `${(next() % 30) * 100}ms`,
      animationDuration: `${(next() % 3) + 2}s`,
    };
    return { dot, style };
  });
}

export type SparklesProps = ComponentProps<"div"> & {
  variant?: Variant;
  density?: number;
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
  seed?: number;
};

export function Sparkles({
  variant = "field",
  density = 24,
  size = "md",
  color = "warning",
  seed = 5,
  className,
  children,
  ...props
}: SparklesProps) {
  const key: Variant = variant in variants ? variant : "field";
  return (
    <div {...props} className={cx(base, className)}>
      <style>{keyframes}</style>
      <div
        aria-hidden="true"
        className={cx(layer, colors[color] ?? colors.warning)}
      >
        {makeSparkles(key, density, seed, size).map((item, index) => (
          <svg
            key={index}
            className={cx(sparkle, variants[key])}
            style={item.style}
            viewBox="0 0 24 24"
          >
            {item.dot ? <circle cx="12" cy="12" r="5" /> : <path d={star} />}
          </svg>
        ))}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
