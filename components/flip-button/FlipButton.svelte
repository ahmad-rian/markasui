<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const base =
    "group inline-grid font-medium whitespace-nowrap perspective-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";
  const sizes = {
    sm: "h-8 rounded-md text-sm",
    md: "h-10 rounded-lg text-sm",
    lg: "h-12 rounded-lg text-base",
  };
  const inner =
    "grid rounded-[inherit] transition-transform duration-500 ease-out transform-3d group-hover:rotate-x-180 group-focus-visible:rotate-x-180 motion-reduce:transition-none";
  const face =
    "col-start-1 row-start-1 inline-flex items-center justify-center gap-2 rounded-[inherit] backface-hidden";
  const facePadding = {
    sm: "px-3",
    md: "px-4",
    lg: "px-6",
  };
  const variants = {
    primary: "bg-primary text-on-primary",
    secondary: "border border-line bg-surface text-ink",
    ghost: "text-ink",
    danger: "bg-danger text-on-primary",
  };
  const backVariants = {
    primary: "rotate-x-180 bg-primary-strong text-on-primary",
    secondary:
      "rotate-x-180 border border-primary-line bg-primary-soft text-ink",
    ghost: "rotate-x-180 bg-subtle text-ink",
    danger: "rotate-x-180 bg-danger text-on-primary",
  };

  type Props = HTMLButtonAttributes & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Text on the back face, shown on hover and focus. The back snippet wins, the label is the fallback. */
    backLabel?: string;
    back?: Snippet;
    children?: Snippet;
  };

  let {
    variant = "primary",
    size = "md",
    backLabel = "",
    type = "button",
    class: className,
    back,
    children,
    ...rest
  }: Props = $props();
</script>

<button {type} class={[base, sizes[size], className]} {...rest}>
  <span class={inner}>
    <span class={[face, facePadding[size], variants[variant]]}>
      {@render children?.()}
    </span>
    <span
      class={[face, facePadding[size], backVariants[variant]]}
      aria-hidden="true"
    >
      {#if back}{@render back()}{:else if backLabel}{backLabel}{:else}{@render children?.()}{/if}
    </span>
  </span>
</button>
