import type { ComponentProps, CSSProperties } from "react";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const meteor =
  "absolute rounded-full bg-current [transform:rotate(var(--markas-meteor-angle))] animate-[markas-meteor_6s_linear_infinite] motion-reduce:animate-none before:absolute before:top-1/2 before:left-1/2 before:w-(--markas-meteor-tail) before:-translate-y-1/2 before:rounded-full before:bg-linear-to-r before:from-current before:to-transparent";
const content = "relative";
const colors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const variants = {
  rain: { meteor: "size-px before:h-px", count: 20, tail: [40, 60] as const },
  comet: {
    meteor: "size-1 shadow-[0_0_8px_2px_currentColor] before:h-0.5",
    count: 6,
    tail: [100, 80] as const,
  },
};
/** Durasi minimum dan rentang tambahan dalam detik. */
const speeds = { slow: [9, 6], normal: [5, 4], fast: [2, 3] } as const;
const keyframes =
  "@keyframes markas-meteor{0%{transform:rotate(var(--markas-meteor-angle)) translateX(0);opacity:1}70%{opacity:1}to{transform:rotate(var(--markas-meteor-angle)) translateX(-640px);opacity:0}}";
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan meteor yang sama. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_METEORS = 60;
const MAX_ANGLE = 180;

type Variant = keyof typeof variants;

function makeMeteors(
  variant: Variant,
  count: number,
  seed: number,
  speed: keyof typeof speeds,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_METEORS));
  const [minTail, tailRange] = variants[variant].tail;
  const [minSeconds, secondsRange] = speeds[speed] ?? speeds.normal;
  return Array.from({ length: total }, () => {
    const seconds = minSeconds + (next() % secondsRange);
    return {
      left: `${next() % 100}%`,
      top: `${(next() % 70) - 10}%`,
      opacity: ((next() % 5) + 5) / 10,
      animationDuration: `${seconds}s`,
      animationDelay: `${-(next() % (seconds * 10)) * 100}ms`,
      "--markas-meteor-tail": `${minTail + (next() % tailRange)}px`,
    } as CSSProperties;
  });
}

export type MeteorsProps = ComponentProps<"div"> & {
  variant?: Variant;
  count?: number;
  angle?: number;
  speed?: keyof typeof speeds;
  color?: keyof typeof colors;
  seed?: number;
};

export function Meteors({
  variant = "rain",
  count,
  angle = 35,
  speed = "normal",
  color = "primary",
  seed = 3,
  className,
  children,
  ...props
}: MeteorsProps) {
  const key: Variant = variant in variants ? variant : "rain";
  const turn = 180 + Math.max(0, Math.min(Math.trunc(angle), MAX_ANGLE));
  return (
    <div {...props} className={cx(base, className)}>
      <style>{keyframes}</style>
      <div
        aria-hidden="true"
        className={cx(layer, colors[color] ?? colors.primary)}
        style={{ "--markas-meteor-angle": `${turn}deg` } as CSSProperties}
      >
        {makeMeteors(key, count ?? variants[key].count, seed, speed).map(
          (item, index) => (
            <span
              key={index}
              className={cx(meteor, variants[key].meteor)}
              style={item}
            />
          ),
        )}
      </div>
      <div className={content}>{children}</div>
    </div>
  );
}
