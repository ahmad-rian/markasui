"use client";

import { useState, type ComponentProps } from "react";

const base =
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle";
const image = "object-cover";
const fallback = "bg-primary-soft font-medium text-primary select-none";
const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

/** Huruf pertama kata pertama dan terakhir, sama dengan versi Blade dan Vue. */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked
    .map((word) => Array.from(word ?? "")[0] ?? "")
    .join("")
    .toUpperCase();
}

export type AvatarProps = Omit<ComponentProps<"img">, "src" | "alt"> & {
  name: string;
  src?: string | null;
  alt?: string;
  size?: keyof typeof sizes;
};

export function Avatar({
  name,
  src,
  alt,
  size = "md",
  className,
  onError,
  ...props
}: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const label = alt ?? name;

  if (!src || failedSrc === src) {
    return (
      <span
        role={label ? "img" : undefined}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        className={cx(base, fallback, sizes[size], className)}
      >
        {getInitials(name)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      className={cx(base, image, sizes[size], className)}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      {...props}
    />
  );
}
