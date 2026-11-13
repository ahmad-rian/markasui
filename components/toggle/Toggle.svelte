<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-subtle data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";
  const variants = {
    default: "bg-transparent",
    outline: "border border-line bg-surface",
  };
  const sizes = {
    sm: "h-8 min-w-8 px-2",
    md: "h-9 min-w-9 px-2.5",
    lg: "h-10 min-w-10 px-3",
  };

  type Props = HTMLButtonAttributes & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Pressed state, bindable with bind:pressed. */
    pressed?: boolean;
  };

  let {
    variant = "default",
    size = "md",
    pressed = $bindable(false),
    type = "button",
    class: className,
    onclick,
    children,
    ...rest
  }: Props = $props();

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onclick?.(event);
    if (event.defaultPrevented) return;
    pressed = !pressed;
  }
</script>

<button
  {type}
  aria-pressed={pressed ? "true" : "false"}
  data-state={pressed ? "on" : "off"}
  onclick={handleClick}
  class={[base, variants[variant], sizes[size], className]}
  {...rest}
>
  {@render children?.()}
</button>
