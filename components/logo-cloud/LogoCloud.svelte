<script module lang="ts">
  export type LogoCloudLogo = {
    name: string;
    href?: string;
    /** SVG path (d attribute) filled with currentColor. */
    path?: string;
    viewBox?: string;
    /** Show the name as text next to the path. false: SVG only, the name becomes aria-label. */
    wordmark?: boolean;
    quote?: string;
    author?: string;
  };
  export type LogoCloudStat = { value: string; label: string };
  export type LogoCloudVariant = "row" | "grid" | "marquee" | "cards" | "stats";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "@container w-full";
  const layouts = {
    row: {
      root: "grid gap-8",
      title: "text-center text-sm font-medium text-muted",
      list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
      item: "flex",
    },
    grid: {
      root: "grid gap-8",
      title: "text-center text-sm font-medium text-muted",
      list: "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line @lg:grid-cols-3 @3xl:grid-cols-4",
      item: "flex h-24 items-center justify-center bg-surface px-4",
    },
    marquee: {
      root: "grid gap-8",
      title: "text-center text-sm font-medium text-muted",
      list: "flex shrink-0 items-center gap-12 pr-12 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0",
      item: "flex",
    },
    cards: {
      root: "grid gap-8",
      title: "text-center text-sm font-medium text-muted",
      list: "grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-3",
      item: "flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-5",
    },
    stats: {
      root: "grid items-center gap-8 @2xl:grid-cols-[2fr_3fr] @2xl:gap-12",
      title: "text-2xl font-semibold tracking-tight text-balance text-ink",
      list: "grid grid-cols-2 items-center gap-x-8 gap-y-6 @lg:grid-cols-3",
      item: "flex",
    },
  };
  const viewport =
    "group overflow-hidden mask-x-from-80% motion-reduce:mask-none";
  const track =
    "flex w-max animate-[markas-logo-cloud_30s_linear_infinite] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none";
  const copy = "motion-reduce:hidden";
  const keyframes = "@keyframes markas-logo-cloud{to{translate:-50% 0}}";
  const header = "grid gap-6";
  const statList = "grid grid-cols-2 gap-6";
  const stat = "flex flex-col-reverse gap-1";
  const statValue = "text-3xl font-semibold tracking-tight text-ink";
  const statLabel = "text-sm text-muted";
  const logoBase =
    "inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const tones = {
    gray: "text-muted grayscale transition-[color,filter] duration-200 ease-out hover:text-ink hover:grayscale-0 motion-reduce:transition-none",
    color: "text-ink",
  };
  const mark = "h-7 w-auto shrink-0";
  const quote = "text-sm text-pretty text-ink";
  const author = "mt-auto text-xs text-muted";
  const COPIES = [0, 1];

  /** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored, as browsers do. */
  const safeHref = (href: string) =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;
  const showsWordmark = (logo: LogoCloudLogo) =>
    logo.wordmark !== false || !logo.path;

  type Props = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    logos: LogoCloudLogo[];
    title?: string;
    variant?: LogoCloudVariant;
    grayscale?: boolean;
    stats?: LogoCloudStat[];
    logosLabel?: string;
    /** Replaces the content of one logo, for example with an img element. */
    logo?: Snippet<[LogoCloudLogo, number]>;
  };

  let {
    logos,
    title = "",
    variant = "row",
    grayscale = true,
    stats = [],
    logosLabel = "Customer logos",
    logo: logoSnippet,
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const baseId = $derived(id ?? generatedId);
  const layout = $derived(layouts[variant]);
  const tone = $derived(grayscale ? tones.gray : tones.color);
</script>

{#snippet logoContent(logo: LogoCloudLogo, index: number)}
  {#if logoSnippet}
    {@render logoSnippet(logo, index)}
  {:else}
    {@const wordmark = showsWordmark(logo)}
    {#if logo.path}
      <svg
        class={mark}
        viewBox={logo.viewBox ?? "0 0 24 24"}
        fill="currentColor"
        role={wordmark ? undefined : "img"}
        aria-label={wordmark ? undefined : logo.name}
        aria-hidden={wordmark ? "true" : undefined}
      >
        <path d={logo.path} />
      </svg>
    {/if}
    {#if wordmark}<span>{logo.name}</span>{/if}
  {/if}
{/snippet}

{#snippet list(copyIndex: number)}
  <ul
    role="list"
    aria-hidden={copyIndex > 0 ? "true" : undefined}
    inert={copyIndex > 0}
    class={[layout.list, copyIndex > 0 && copy]}
  >
    {#each logos as logo, index (logo.name)}
      <li class={layout.item}>
        {#if logo.href}
          <a href={safeHref(logo.href)} class={[logoBase, tone]}
            >{@render logoContent(logo, index)}</a
          >
        {:else}
          <span class={[logoBase, tone]}
            >{@render logoContent(logo, index)}</span
          >
        {/if}
        {#if variant === "cards" && logo.quote}
          <blockquote class={quote}>{logo.quote}</blockquote>
        {/if}
        {#if variant === "cards" && logo.author}
          <p class={author}>{logo.author}</p>
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet titleElement()}
  {#if title}
    <h2 id={`${baseId}-title`} class={layout.title}>{title}</h2>
  {/if}
{/snippet}

<section
  id={baseId}
  aria-labelledby={title ? `${baseId}-title` : undefined}
  aria-label={title ? undefined : logosLabel}
  class={[root, className]}
  {...rest}
>
  <div class={layout.root}>
    {#if variant === "stats"}
      <div class={header}>
        {@render titleElement()}
        {#if stats.length}
          <dl class={statList}>
            {#each stats as entry (entry.label)}
              <div class={stat}>
                <dt class={statLabel}>{entry.label}</dt>
                <dd class={statValue}>{entry.value}</dd>
              </div>
            {/each}
          </dl>
        {/if}
      </div>
    {:else}
      {@render titleElement()}
    {/if}
    {#if variant === "marquee"}
      <div class={viewport}>
        {@html `<style>${keyframes}</style>`}
        <div class={track}>
          {#each COPIES as copyIndex (copyIndex)}
            {@render list(copyIndex)}
          {/each}
        </div>
      </div>
    {:else}
      {@render list(0)}
    {/if}
  </div>
</section>
