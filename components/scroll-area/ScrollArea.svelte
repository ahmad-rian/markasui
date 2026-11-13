<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base =
    "rounded-lg [scrollbar-color:var(--markas-line)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-track]:bg-transparent";
  const orientations = {
    vertical: "overflow-x-hidden overflow-y-auto",
    horizontal: "overflow-x-auto overflow-y-hidden",
    both: "overflow-auto",
  };

  type Props = HTMLAttributes<HTMLDivElement> & {
    orientation?: keyof typeof orientations;
    /** Accessible name of the scrollable region. */
    label?: string;
    children?: Snippet;
  };

  let {
    orientation = "vertical",
    label = "Scrollable content",
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  role="region"
  aria-label={label}
  tabindex="0"
  data-orientation={orientation}
  class={[base, orientations[orientation], className]}
  {...rest}
>
  {@render children?.()}
</div>
