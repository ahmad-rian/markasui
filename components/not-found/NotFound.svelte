<script module lang="ts">
  export type NotFoundLink = { label: string; href: string };
  export type NotFoundVariant =
    "minimal" | "split" | "search" | "glitch" | "illustrated" | "terminal";
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "@container grid w-full text-ink **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:animate-none motion-reduce:**:transition-none";
  const centered = "mx-auto max-w-lg justify-items-center text-center";
  const layouts = {
    minimal: centered,
    split: "items-center gap-8 @xl:grid-cols-2",
    search: centered,
    glitch: centered,
    illustrated: centered,
    terminal: "mx-auto max-w-xl gap-6",
  };
  const big = "mb-2 text-8xl leading-none font-semibold tracking-tighter";
  const eyebrow =
    "rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted";
  const codes: Record<string, string> = {
    minimal: big,
    glitch: `${big} relative before:absolute before:inset-0 before:animate-[markas-glitch_2s_steps(1)_infinite] before:text-danger before:content-[attr(data-text)] after:absolute after:inset-0 after:animate-[markas-glitch_1.5s_steps(1)_infinite_reverse] after:text-success after:content-[attr(data-text)] motion-reduce:before:hidden motion-reduce:after:hidden`,
    illustrated: `${big} relative grid *:col-start-1 *:row-start-1`,
    split: eyebrow,
    search: eyebrow,
  };
  const content = "grid w-full gap-4 [justify-items:inherit]";
  const shadow = "translate-2.5 text-primary/15";
  const outline = "text-transparent [-webkit-text-stroke:2px_var(--color-ink)]";
  const compass =
    "absolute -top-4 -right-10 size-12 rotate-12 rounded-full bg-canvas p-1 text-muted";
  const art = "order-last mx-auto w-full max-w-xs";
  const artSoft = "fill-primary-soft";
  const artStroke = "fill-surface stroke-line";
  const artInk = "fill-subtle stroke-ink";
  const titleClass = "text-3xl font-semibold tracking-tight text-balance";
  const descriptionClass = "max-w-prose text-pretty text-muted";
  const terminal =
    "rounded-xl border border-line bg-surface p-4 text-left font-mono text-sm";
  const prompt = "text-muted";
  const terminalTitle = "text-danger";
  const cursor = "inline-block h-4 w-2 animate-pulse bg-ink align-middle";
  const searchWrap = "relative w-full text-sm";
  const searchIcon = "absolute top-3 left-3 size-4 text-muted";
  const searchInput =
    "h-10 w-full rounded-lg border border-line bg-surface pr-3 pl-9 placeholder:text-faint";
  const list =
    "mt-3 divide-y divide-line rounded-xl border border-line bg-surface text-left";
  const listLink =
    "flex justify-between rounded-xl px-4 py-3 font-medium hover:bg-subtle";
  const arrow = "size-4 text-muted";
  const empty = "text-muted not-empty:mt-3";
  const actions = "flex flex-wrap gap-3";
  const button =
    "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-150 ease-out";
  const primary = "bg-primary text-on-primary hover:bg-primary-strong";
  const secondary = "border border-line bg-surface hover:bg-subtle";
  const backIcon = "size-4";
  const keyframes =
    "@keyframes markas-glitch{0%{clip-path:inset(20% 0 55% 0);translate:-3px 1px}33%{clip-path:inset(60% 0 10% 0);translate:3px -1px}66%{clip-path:inset(35% 0 40% 0);translate:-2px 2px}}";

  /** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored, as browsers do. */
  const safeHref = (href = "#") =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;

  /** Go back to the previous page; without history the link simply goes to homeHref. */
  const goBack = (event: MouseEvent) => {
    if (history.length < 2) return;
    event.preventDefault();
    history.back();
  };

  type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    /** minimal, split, search, glitch, illustrated, or terminal. */
    variant?: NotFoundVariant;
    /** Status code, for example 404, 403, or 500. */
    code?: string;
    title?: string;
    description?: string;
    homeHref?: string;
    /** Popular links that can be filtered in the search variant. */
    links?: NotFoundLink[];
    /** Path shown in the terminal variant. */
    path?: string;
    homeLabel?: string;
    backLabel?: string;
    searchLabel?: string;
    emptyLabel?: string;
  };

  let {
    variant = "minimal",
    code = "404",
    title = "Page not found",
    description = "The page you are looking for does not exist or has been moved.",
    homeHref = "/",
    links = [],
    path = "/page",
    homeLabel = "Back to home",
    backLabel = "Go back",
    searchLabel = "Search pages",
    emptyLabel = "No pages match your search",
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const titleId = $derived(`${id ?? generatedId}-title`);
  let query = $state("");
  const needle = $derived(query.trim().toLowerCase());
  const visible = $derived(
    links.filter((link) => link.label.toLowerCase().includes(needle)),
  );
</script>

{#snippet icon(path: string, className: string)}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
{/snippet}

<section
  {id}
  aria-labelledby={titleId}
  class={[root, layouts[variant], className]}
  {...rest}
>
  {#if variant === "split"}
    <svg viewBox="0 0 240 200" class={art} aria-hidden="true">
      <circle cx="150" cy="92" r="64" class={artSoft} />
      <rect
        x="34"
        y="48"
        width="92"
        height="92"
        rx="14"
        stroke-width="2"
        class={artStroke}
      />
      <path d="M60 176 108 96l48 80z" stroke-width="2" class={artInk} />
    </svg>
  {/if}
  {#if variant === "terminal"}
    <div class={terminal}>
      <p><span class={prompt}>$ </span>cd {path}</p>
      <h1 id={titleId} class={terminalTitle}>{`${code}: `}{title}</h1>
      <p aria-hidden="true">
        <span class={prompt}>$ </span><span class={cursor}></span>
      </p>
    </div>
  {/if}
  <div class={content}>
    {#if codes[variant]}
      <p aria-hidden="true" data-text={code} class={codes[variant]}>
        {#if variant === "glitch"}{@html `<style>${keyframes}</style>`}{/if}{#if variant === "illustrated"}<span
            class={shadow}>{code}</span
          ><span class={outline}>{code}</span>{@render icon(
            "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3z",
            compass,
          )}{:else}{code}{/if}
      </p>
    {/if}
    {#if variant !== "terminal"}
      <h1 id={titleId} class={titleClass}>{title}</h1>
    {/if}
    <p class={descriptionClass}>{description}</p>
    {#if variant === "search"}
      <div class={searchWrap}>
        {@render icon(
          "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
          searchIcon,
        )}
        <input
          type="search"
          aria-label={searchLabel}
          placeholder={searchLabel}
          bind:value={query}
          class={searchInput}
        />
        {#if visible.length > 0}
          <ul class={list}>
            {#each visible as link (link.href)}
              <li>
                <a href={safeHref(link.href)} class={listLink}
                  >{link.label}{@render icon("M5 12h14m-6-6 6 6-6 6", arrow)}</a
                >
              </li>
            {/each}
          </ul>
        {/if}
        <p role="status" class={empty}>
          {needle && !visible.length ? emptyLabel : ""}
        </p>
      </div>
    {/if}
    <div class={actions}>
      <a href={safeHref(homeHref)} class={[button, primary]}>{homeLabel}</a>
      <a href={safeHref(homeHref)} onclick={goBack} class={[button, secondary]}
        >{@render icon("M19 12H5m6 6-6-6 6-6", backIcon)}{backLabel}</a
      >
    </div>
  </div>
</section>
