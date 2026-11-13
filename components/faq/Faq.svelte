<script module lang="ts">
  export type FaqItem = { question: string; answer: string; category?: string };
  export type FaqVariant =
    "simple" | "split" | "cards" | "centered" | "searchable" | "categories";
</script>

<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "@container w-full [interpolate-size:allow-keywords]";
  const header = "grid gap-2";
  const lined = { list: "border-t border-line", item: "border-b border-line" };
  const withTools = { root: "mx-auto grid max-w-3xl gap-6", header, ...lined };
  const layouts = {
    simple: { root: "mx-auto grid max-w-3xl gap-8", header, ...lined },
    split: {
      root: "grid gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
      header: "grid content-start gap-2",
      ...lined,
    },
    cards: {
      root: "grid gap-8",
      header,
      list: "grid items-start gap-3 @xl:grid-cols-2",
      item: "rounded-xl border border-line bg-surface px-5",
    },
    centered: {
      root: "mx-auto grid max-w-2xl gap-8 text-center",
      header: "grid justify-items-center gap-2",
      list: "grid gap-2 text-left",
      item: "rounded-lg bg-subtle px-4",
    },
    searchable: withTools,
    categories: withTools,
  };
  const titleClass =
    "text-2xl font-semibold tracking-tight text-balance text-ink";
  const descriptionClass = "max-w-prose text-sm text-pretty text-muted";
  const contactClass =
    "text-sm text-muted [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4";
  const body = "grid content-start gap-4";
  const details =
    "group details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none";
  const summary =
    "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden";
  const icon =
    "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none";
  const answer = "pb-4 text-sm leading-relaxed text-pretty text-muted";
  const search = "relative";
  const searchIcon =
    "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted";
  const searchInput =
    "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 text-sm text-ink placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const status = "contents";
  const empty = "py-6 text-center text-sm text-muted";
  const tablist = "flex flex-wrap gap-2";
  const tab =
    "inline-flex h-8 items-center rounded-full border border-line px-3 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-on-primary motion-reduce:transition-none";

  /** A question matches when its question or answer text contains the search term. */
  const matches = (item: FaqItem, query: string) =>
    `${item.question} ${item.answer}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());

  /** FAQPage structured data for search engines. `<` is escaped so it cannot close the script tag. */
  const faqSchema = (items: FaqItem[]) =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }).replace(/</g, "\\u003c");

  /** Target tab index for the arrow keys, Home, and End (WAI-ARIA Tabs pattern). */
  const targetTab = (key: string, index: number, count: number) =>
    (
      ({
        ArrowRight: (index + 1) % count,
        ArrowLeft: (index - 1 + count) % count,
        Home: 0,
        End: count - 1,
      }) as Record<string, number>
    )[key];

  type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    items: FaqItem[];
    title?: string;
    description?: string;
    variant?: FaqVariant;
    exclusive?: boolean;
    schema?: boolean;
    /** Text or snippet below the questions (in the header for split). */
    contact?: Snippet | string;
    searchLabel?: string;
    emptyLabel?: string;
    categoriesLabel?: string;
  };

  let {
    items,
    title = "",
    description = "",
    variant = "simple",
    exclusive = false,
    schema = false,
    contact,
    searchLabel = "Search questions",
    emptyLabel = "No questions match your search",
    categoriesLabel = "Question categories",
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const baseId = $derived(id ?? generatedId);
  let query = $state("");
  let active = $state(0);
  const layout = $derived(layouts[variant]);
  const searchable = $derived(variant === "searchable");
  const categories = $derived(
    variant === "categories"
      ? [...new Set(items.map((item) => item.category ?? ""))]
      : [],
  );
  /** One panel per category (categories variant) or one list with every question. */
  const groups = $derived(
    categories.length
      ? categories.map((category) =>
          items.filter((item) => (item.category ?? "") === category),
        )
      : [items],
  );
  const noMatches = $derived(
    searchable && !items.some((item) => matches(item, query)),
  );

  async function onTabKeydown(event: KeyboardEvent) {
    const target = targetTab(event.key, active, categories.length);
    if (target === undefined) return;
    event.preventDefault();
    active = target;
    await tick();
    document.getElementById(`${baseId}-tab-${target}`)?.focus();
  }
</script>

{#snippet contactBlock()}
  {#if contact}
    <div class={contactClass}>
      {#if typeof contact === "string"}{contact}{:else}{@render contact()}{/if}
    </div>
  {/if}
{/snippet}

<section
  id={baseId}
  aria-labelledby={title ? `${baseId}-title` : undefined}
  class={[root, className]}
  {...rest}
>
  <div class={layout.root}>
    <div class={layout.header}>
      {#if title}
        <h2 id={`${baseId}-title`} class={titleClass}>{title}</h2>
      {/if}
      {#if description}
        <p class={descriptionClass}>{description}</p>
      {/if}
      {#if variant === "split"}{@render contactBlock()}{/if}
    </div>
    <div class={body}>
      {#if searchable}
        <div class={search}>
          <svg
            class={searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            autocomplete="off"
            aria-label={searchLabel}
            placeholder={searchLabel}
            bind:value={query}
            class={searchInput}
          />
        </div>
      {/if}
      {#if categories.length}
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <div
          role="tablist"
          aria-label={categoriesLabel}
          class={tablist}
          onkeydown={onTabKeydown}
        >
          {#each categories as category, index (category)}
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-controls={`${baseId}-panel-${index}`}
              aria-selected={index === active}
              tabindex={index === active ? 0 : -1}
              data-state={index === active ? "active" : "inactive"}
              onclick={() => (active = index)}
              class={tab}>{category}</button
            >
          {/each}
        </div>
      {/if}
      {#each groups as group, index (index)}
        {@const panel = categories.length > 0}
        <div
          role={panel ? "tabpanel" : undefined}
          id={panel ? `${baseId}-panel-${index}` : undefined}
          aria-labelledby={panel ? `${baseId}-tab-${index}` : undefined}
          hidden={panel && index !== active}
          class={layout.list}
        >
          {#each group as item (item.question)}
            <details
              class={[details, layout.item]}
              name={exclusive ? `${baseId}-item` : undefined}
              hidden={searchable && !matches(item, query)}
            >
              <summary class={summary}>
                <span>{item.question}</span>
                <svg
                  class={icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p class={answer}>{item.answer}</p>
            </details>
          {/each}
        </div>
      {/each}
      {#if searchable}
        <div role="status" class={status}>
          {#if noMatches}
            <p class={empty}>{emptyLabel}</p>
          {/if}
        </div>
      {/if}
    </div>
    {#if variant !== "split"}{@render contactBlock()}{/if}
  </div>
  {#if schema}
    {@html `<script type="application/ld+json">${faqSchema(items)}</` +
      `script>`}
  {/if}
</section>
