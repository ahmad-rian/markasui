<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base = "relative isolate overflow-hidden";
  const layer =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-grid-size)_var(--markas-grid-size)]";
  const cell =
    "absolute bg-current animate-[markas-grid-cell_4s_ease-in-out_infinite] motion-reduce:animate-none";
  const content = "relative";
  const colors = {
    muted: "text-muted/20",
    primary: "text-primary/15",
    success: "text-success/30",
    warning: "text-warning/30",
    danger: "text-danger/30",
  };
  const masks = {
    none: "",
    radial:
      "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
    linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
  };
  const keyframes = "@keyframes markas-grid-cell{50%{opacity:.4}}";
  const CELL_DELAY_MS = 800;

  /** Posisi satu sel sorotan di dalam garis grid (kolom, baris mulai dari 0). */
  const cellStyle = (
    [col, row]: [number, number],
    size: number,
    index: number,
  ) =>
    `left:${col * size + 1}px;top:${row * size + 1}px;width:${size - 1}px;height:${size - 1}px;animation-delay:${index * CELL_DELAY_MS}ms`;

  type Props = HTMLAttributes<HTMLDivElement> & {
    cellSize?: number;
    cells?: [number, number][];
    color?: keyof typeof colors;
    mask?: keyof typeof masks;
    children?: Snippet;
  };

  let {
    cellSize = 32,
    cells = [],
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
  style="--markas-grid-size:{cellSize}px;{style ?? ''}"
>
  {@html `<style>${keyframes}</style>`}
  <div aria-hidden="true" class={[layer, colors[color], masks[mask]]}>
    {#each cells as position, index (position.join("-"))}
      <span class={cell} style={cellStyle(position, cellSize, index)}></span>
    {/each}
  </div>
  <div class={content}>{@render children?.()}</div>
</div>
