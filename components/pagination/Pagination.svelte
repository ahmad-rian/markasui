<script lang="ts" module>
  export type PageItem = number | "ellipsis";

  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, index) => from + index);

  /** Logika sama persis dengan pageRange di Pagination.tsx dan $pageRange di pagination.blade.php. */
  export function pageRange(
    page: number,
    total: number,
    siblings: number,
  ): PageItem[] {
    if (total < 1) return [];
    const slots = siblings * 2 + 5;
    if (total <= slots) return range(1, total);
    const current = Math.min(Math.max(page, 1), total);
    const start = Math.min(
      Math.max(current - siblings, 3),
      total - 2 - siblings * 2,
    );
    const end = start + siblings * 2;

    return [
      1,
      start > 3 ? "ellipsis" : 2,
      ...range(start, end),
      end < total - 2 ? "ellipsis" : total - 1,
      total,
    ];
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "@container";
  const list = "flex flex-wrap items-center gap-1";
  const link =
    "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border border-transparent px-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-line data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
  const ellipsis =
    "inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted";
  const icon = "size-4 shrink-0";
  const label = "sr-only @lg:not-sr-only";

  const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
  const SAFE_SCHEME = /^(https?|mailto|tel):/i;

  /** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
  const safeHref = (href: string) => {
    const cleaned = href.replace(/[\t\n\r]/g, "");
    const start = [...cleaned].findIndex((char) => char > " ");
    const value = cleaned.slice(Math.max(start, 0));
    return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
  };

  type Props = HTMLAttributes<HTMLElement> & {
    page: number;
    total: number;
    href?: string;
    siblings?: number;
    /** Accessible label of the nav element. */
    navLabel?: string;
    /** Text of the previous page link. */
    previousLabel?: string;
    /** Text of the next page link. */
    nextLabel?: string;
  };

  let {
    page,
    total,
    href = "?page={page}",
    siblings = 1,
    navLabel = "Pagination",
    previousLabel = "Previous",
    nextLabel = "Next",
    class: className,
    ...rest
  }: Props = $props();

  const current = $derived(Math.min(Math.max(page, 1), Math.max(total, 1)));
  const pages = $derived(pageRange(current, total, siblings));
  const hrefFor = (target: number) =>
    safeHref(href.replaceAll("{page}", String(target)));
</script>

{#snippet prevIcon()}
  <svg
    class={icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
{/snippet}

{#snippet nextIcon()}
  <svg
    class={icon}
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
{/snippet}

<nav aria-label={navLabel} class={[root, className]} {...rest}>
  <ul class={list}>
    <li>
      {#if current > 1}
        <a href={hrefFor(current - 1)} rel="prev" class={link}>
          {@render prevIcon()}
          <span class={label}>{previousLabel}</span>
        </a>
      {:else}
        <span aria-disabled="true" class={link}>
          {@render prevIcon()}
          <span class={label}>{previousLabel}</span>
        </span>
      {/if}
    </li>
    {#each pages as item, index (index)}
      <li>
        {#if item === "ellipsis"}
          <span class={ellipsis} aria-hidden="true">…</span>
        {:else}
          <a
            href={hrefFor(item)}
            aria-current={item === current ? "page" : undefined}
            data-state={item === current ? "active" : "inactive"}
            class={link}>{item}</a
          >
        {/if}
      </li>
    {/each}
    <li>
      {#if current < total}
        <a href={hrefFor(current + 1)} rel="next" class={link}>
          <span class={label}>{nextLabel}</span>
          {@render nextIcon()}
        </a>
      {:else}
        <span aria-disabled="true" class={link}>
          <span class={label}>{nextLabel}</span>
          {@render nextIcon()}
        </span>
      {/if}
    </li>
  </ul>
</nav>
