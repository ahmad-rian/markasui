<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base =
    "grid gap-4 rounded-xl border border-line bg-surface p-6 text-ink";
  const header = "grid gap-1.5";
  const titleClass = "text-base font-semibold text-ink";
  const descriptionClass = "text-sm text-muted";
  const body = "text-sm text-ink";
  const footerClass = "flex flex-wrap items-center gap-2";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    title?: string;
    description?: string;
    footer?: Snippet;
    children?: Snippet;
  };

  let {
    title,
    description,
    footer,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<article class={[base, className]} {...rest}>
  {#if title || description}
    <header class={header}>
      {#if title}<h3 class={titleClass}>{title}</h3>{/if}
      {#if description}<p class={descriptionClass}>{description}</p>{/if}
    </header>
  {/if}
  {#if children}
    <div class={body}>{@render children()}</div>
  {/if}
  {#if footer}
    <div class={footerClass}>{@render footer()}</div>
  {/if}
</article>
