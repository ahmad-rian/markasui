<script lang="ts" module>
  /** First letter of the first and last word, same as the Blade, React, and Vue versions. */
  export function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const picked =
      words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return picked
      .map((word) => Array.from(word ?? "")[0] ?? "")
      .join("")
      .toUpperCase();
  }
</script>

<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";

  const base =
    "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle";
  const image = "object-cover";
  const fallback = "bg-primary-soft font-medium text-primary select-none";
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-12 text-base",
  };

  type Props = Omit<HTMLImgAttributes, "src" | "alt"> & {
    name: string;
    src?: string | null;
    alt?: string;
    size?: keyof typeof sizes;
  };

  let {
    name,
    src,
    alt,
    size = "md",
    class: className,
    onerror,
    ...rest
  }: Props = $props();

  let failedSrc = $state<string | null>(null);
  const label = $derived(alt ?? name);

  function handleError(
    event: Event & { currentTarget: EventTarget & Element },
  ) {
    failedSrc = src ?? null;
    onerror?.(event);
  }
</script>

{#if !src || failedSrc === src}
  <span
    role={label ? "img" : undefined}
    aria-label={label || undefined}
    aria-hidden={label ? undefined : true}
    class={[base, fallback, sizes[size], className]}>{getInitials(name)}</span
  >
{:else}
  <img
    {src}
    alt={label}
    class={[base, image, sizes[size], className]}
    onerror={handleError}
    {...rest}
  />
{/if}
