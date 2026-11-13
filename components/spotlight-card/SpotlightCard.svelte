<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "group/spotlight relative isolate rounded-xl bg-line p-px [--spot-x:50%] [--spot-y:50%]";
  const glow =
    "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(240px_circle_at_var(--spot-x)_var(--spot-y),var(--spot-color),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none";
  const inner = "relative h-full overflow-hidden rounded-[11px] bg-surface";
  const light =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),color-mix(in_oklab,var(--spot-color)_12%,transparent),transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within/spotlight:opacity-100 group-hover/spotlight:opacity-100 motion-reduce:transition-none";
  const content = "relative";
  const colors = {
    primary: "[--spot-color:var(--color-primary)]",
    success: "[--spot-color:var(--color-success)]",
    warning: "[--spot-color:var(--color-warning)]",
    danger: "[--spot-color:var(--color-danger)]",
  };

  /** Stores the pointer position relative to the card as CSS custom properties. */
  function follow(event: PointerEvent & { currentTarget: HTMLDivElement }) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  type Props = HTMLAttributes<HTMLDivElement> & {
    color?: keyof typeof colors;
    children?: Snippet;
  };

  let {
    color = "primary",
    class: className,
    children,
    onpointermove,
    ...rest
  }: Props = $props();

  function handlePointerMove(
    event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    follow(event);
    onpointermove?.(event);
  }
</script>

<div
  {...rest}
  class={[root, colors[color], className]}
  onpointermove={handlePointerMove}
>
  <div aria-hidden="true" class={glow}></div>
  <div class={inner}>
    <div aria-hidden="true" class={light}></div>
    <div class={content}>{@render children?.()}</div>
  </div>
</div>
