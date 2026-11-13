<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const keycap =
    "inline-flex items-center justify-center rounded-md bg-surface font-sans font-medium text-muted ring-1 ring-line";
  const sizes = {
    sm: "h-5 min-w-5 px-1 text-[11px]",
    md: "h-6 min-w-6 px-1.5 text-xs",
  };
  const group = "inline-flex items-center gap-1 font-sans";
  const joiner = "text-xs text-muted";

  type Props = HTMLAttributes<HTMLElement> & {
    size?: keyof typeof sizes;
    /** Key combination, rendered as separate keycaps. Replaces children. */
    keys?: string[];
    /** Text between keys in a combination. */
    separator?: string;
    children?: Snippet;
  };

  let {
    size = "md",
    keys = [],
    separator = "+",
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

{#if keys.length === 0}
  <kbd class={[keycap, sizes[size], className]} {...rest}
    >{@render children?.()}</kbd
  >
{:else}
  <kbd class={[group, className]} {...rest}
    >{#each keys as key, index (index)}{#if index > 0}<span class={joiner}
          >{separator}</span
        >{/if}<kbd class={[keycap, sizes[size]]}>{key}</kbd>{/each}</kbd
  >
{/if}
