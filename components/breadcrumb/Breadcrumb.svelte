<script lang="ts" module>
  export type BreadcrumbItem = { label: string; href?: string };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const list = "flex flex-wrap items-center gap-1.5 text-sm text-muted";
  const item = "inline-flex items-center gap-1.5";
  const link =
    "rounded-md transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const current = "font-medium text-ink";
  const separator = "size-3.5 shrink-0 text-faint";

  const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
  const SAFE_SCHEME = /^(https?|mailto|tel):/i;

  /** Hrefs with a scheme other than http, https, mailto, and tel (such as javascript:) become "#". */
  const safeHref = (href: string) => {
    const cleaned = href.replace(/[\t\n\r]/g, "");
    const start = [...cleaned].findIndex((char) => char > " ");
    const value = cleaned.slice(Math.max(start, 0));
    return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
  };

  type Props = HTMLAttributes<HTMLElement> & {
    items: BreadcrumbItem[];
    /** Accessible label of the nav element. */
    navLabel?: string;
  };

  let { items, navLabel = "Breadcrumb", ...rest }: Props = $props();
  const lastIndex = $derived(items.length - 1);
</script>

<nav aria-label={navLabel} {...rest}>
  <ol class={list}>
    {#each items as crumb, index (index)}
      <li class={item}>
        {#if index === lastIndex}
          <span aria-current="page" class={current}>{crumb.label}</span>
        {:else if crumb.href}
          <a href={safeHref(crumb.href)} class={link}>{crumb.label}</a>
        {:else}
          <span>{crumb.label}</span>
        {/if}
        {#if index !== lastIndex}
          <svg
            class={separator}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
