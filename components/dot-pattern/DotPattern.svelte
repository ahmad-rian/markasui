<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base = "relative isolate overflow-hidden";
  const layer =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_var(--markas-dot-size),transparent_calc(var(--markas-dot-size)_+_0.5px))] [background-size:var(--markas-dot-spacing)_var(--markas-dot-spacing)]";
  const content = "relative";
  const colors = {
    muted: "text-muted/50",
    primary: "text-primary/40",
    success: "text-success/50",
    warning: "text-warning/50",
    danger: "text-danger/50",
  };
  const masks = {
    none: "",
    radial:
      "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
    linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
  };

  type Props = HTMLAttributes<HTMLDivElement> & {
    spacing?: number;
    dotSize?: number;
    color?: keyof typeof colors;
    mask?: keyof typeof masks;
    children?: Snippet;
  };

  let {
    spacing = 16,
    dotSize = 1,
    color = "muted",
    mask = "none",
    class: className,
    style,
    children,
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  class={[base, className]}
  style="--markas-dot-spacing:{spacing}px;--markas-dot-size:{dotSize}px;{style ??
    ''}"
>
  <div aria-hidden="true" class={[layer, colors[color], masks[mask]]}></div>
  <div class={content}>{@render children?.()}</div>
</div>
