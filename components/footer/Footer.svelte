<script lang="ts" module>
  export type FooterLink = { label: string; href: string };
  export type FooterColumn = { title?: string; links: FooterLink[] };
  /** icon: SVG path data (the d attribute) for a 24x24 stroke icon. */
  export type FooterSocial = { label: string; href: string; icon: string };
  export type FooterVariant =
    "columns" | "newsletter" | "big-brand" | "centered" | "cta" | "compact";
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "@container w-full border-t border-line bg-canvas text-sm text-muted **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
  const wrap = "grid gap-12 px-4 py-14 @2xl:px-8";
  const main = "grid gap-10 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]";
  const brandArea = "grid max-w-sm content-start gap-4";
  const bottom =
    "flex flex-col gap-4 border-t border-line pt-6 @2xl:flex-row @2xl:items-center";
  const row = "flex flex-wrap items-center justify-between gap-6";
  const stack = "grid justify-items-center gap-4";
  const contents = "contents";
  /** Layout of each variant: [footer, main row, brand area, bottom row]. */
  const layouts = {
    columns: [wrap, main, brandArea, bottom],
    newsletter: [wrap, main, brandArea, bottom],
    "big-brand": [
      "grid gap-12 overflow-hidden bg-linear-to-b to-primary-soft px-4 pt-14 @2xl:px-8",
      main,
      brandArea,
      bottom,
    ],
    centered: [
      "grid justify-items-center gap-8 bg-radial-[at_top] from-primary-soft to-70% px-4 py-14 text-center",
      "grid justify-items-center gap-6",
      "grid max-w-md justify-items-center gap-3",
      stack,
    ],
    cta: [wrap, row, contents, bottom],
    compact: [
      "flex flex-wrap items-center gap-x-5 gap-y-2 rounded-3xl border px-5 py-3 shadow-overlay @xl:rounded-full",
      contents,
      contents,
      contents,
    ],
  };
  const brandClass = "flex items-center gap-2 text-base font-semibold text-ink";
  const descriptionClass = "leading-relaxed";
  const actionsClass = "flex flex-wrap items-center gap-2";
  const columnsNav =
    "grid grid-cols-2 gap-x-6 gap-y-8 @xl:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))]";
  const columnTitle = "font-medium text-ink";
  const columnList = "mt-4 grid gap-2.5";
  const flatList = "flex flex-wrap justify-center gap-x-6 gap-y-2";
  const link =
    "rounded-sm transition-colors duration-150 ease-out hover:text-ink";
  const copyrightClass = "@2xl:mr-auto";
  const legalList = "flex flex-wrap gap-x-4 gap-y-2";
  const socialList = "flex items-center gap-1";
  const socialLink =
    "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-150 ease-out hover:border-primary-line hover:text-ink";
  const icon = "size-4";
  const topLink =
    "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle";
  const card =
    "grid gap-6 rounded-3xl border border-line bg-linear-to-br from-surface to-primary-soft p-6 @3xl:grid-cols-2 @3xl:items-center @3xl:p-10";
  const cardTitle =
    "text-xl font-semibold tracking-tight text-balance text-ink";
  const cardText = "mt-1.5 leading-relaxed";
  const form = "grid gap-3";
  const field =
    "flex items-center gap-1 rounded-full border border-line bg-canvas p-1 shadow-xs";
  const input =
    "h-10 w-0 flex-1 rounded-full bg-transparent px-4 text-ink placeholder:text-faint";
  const button =
    "h-10 shrink-0 cursor-pointer rounded-full bg-primary px-5 font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong";
  const status =
    "flex items-center gap-2 px-4 font-medium text-ink before:size-1.5 before:rounded-full before:bg-success empty:sr-only";
  const cta =
    "dark grid justify-items-start gap-6 rounded-3xl border border-line bg-surface bg-radial-[at_top_right] from-success/30 to-60% p-6 text-muted @2xl:p-12";
  const ctaTitle =
    "max-w-xl text-2xl font-semibold tracking-tight text-balance text-ink @2xl:text-4xl";
  const ctaText = "mt-3 max-w-lg text-base leading-relaxed";
  const wordmarkBox =
    "-mx-4 h-[0.6em] overflow-hidden text-[calc(200cqw/var(--chars))] leading-none select-none @2xl:-mx-8";
  const wordmarkText =
    "-mt-[0.08em] bg-linear-to-b from-ink via-ink/50 bg-clip-text text-center font-semibold tracking-tighter whitespace-nowrap text-transparent";

  /** Hrefs with a scheme other than http, https, mailto, and tel (such as javascript:) become "#". Spaces and control characters are ignored, as browsers do. */
  const safeHref = (href = "#") =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;

  type Props = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    variant?: FooterVariant;
    description?: string;
    columns?: FooterColumn[];
    socials?: FooterSocial[];
    legal?: FooterLink[];
    copyright?: string;
    /** Heading of the call to action block (cta variant). */
    heading?: string;
    /** Text under the newsletter card heading (newsletter variant). */
    newsletterDescription?: string;
    /** Giant wordmark (big-brand variant). */
    wordmark?: string;
    backToTop?: boolean;
    navLabel?: string;
    legalLabel?: string;
    socialLabel?: string;
    newsletterLabel?: string;
    emailLabel?: string;
    subscribeLabel?: string;
    successLabel?: string;
    backToTopLabel?: string;
    brand?: Snippet;
    /** Buttons or extra content. cta variant: the buttons of the call to action block. */
    actions?: Snippet;
    /** Replaces the built-in subscribe form (newsletter variant). */
    newsletter?: Snippet;
  };

  let {
    variant = "columns",
    description,
    columns = [],
    socials = [],
    legal = [],
    copyright,
    heading,
    newsletterDescription,
    wordmark = "",
    backToTop = false,
    navLabel = "Footer",
    legalLabel = "Legal",
    socialLabel = "Social media",
    newsletterLabel = "Subscribe to our newsletter",
    emailLabel = "Email address",
    subscribeLabel = "Subscribe",
    successLabel = "Thanks for subscribing",
    backToTopLabel = "Back to top",
    brand,
    actions,
    newsletter,
    class: className,
    ...rest
  }: Props = $props();

  const layout = $derived(layouts[variant] ?? layouts.columns);
  const hasColumns = $derived(layout[1] === main);
  const isCta = $derived(variant === "cta");
  const links = $derived(columns.flatMap((column) => column.links));
  let subscribed = $state(false);

  function subscribe(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault();
    event.currentTarget.reset();
    subscribed = true;
  }
</script>

{#snippet text(tag: string, textClass: string, value?: string)}
  {#if value}<svelte:element this={tag} class={textClass}
      >{value}</svelte:element
    >{/if}
{/snippet}

{#snippet box(boxClass: string, content?: Snippet)}
  {#if content}<div class={boxClass}>{@render content()}</div>{/if}
{/snippet}

{#snippet iconSvg(d: string)}
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
    <path {d} />
  </svg>
{/snippet}

{#snippet linkList(items: FooterLink[], listClass: string)}
  <ul class={listClass}>
    {#each items as item}
      <li><a href={safeHref(item.href)} class={link}>{item.label}</a></li>
    {/each}
  </ul>
{/snippet}

{#snippet socialsList()}
  {#if socials.length > 0}
    <ul aria-label={socialLabel} class={socialList}>
      {#each socials as social}
        <li>
          <a
            href={safeHref(social.href)}
            aria-label={social.label}
            class={socialLink}>{@render iconSvg(social.icon)}</a
          >
        </li>
      {/each}
    </ul>
  {/if}
{/snippet}

<footer class={[root, layout[0], className]} {...rest}>
  {#if variant === "newsletter"}
    <div class={card}>
      <div>
        <h2 class={cardTitle}>{newsletterLabel}</h2>
        {@render text("p", cardText, newsletterDescription)}
      </div>
      {#if newsletter}
        {@render newsletter()}
      {:else}
        <form class={form} onsubmit={subscribe}>
          <div class={field}>
            <input
              type="email"
              name="email"
              required
              autocomplete="email"
              aria-label={emailLabel}
              placeholder={emailLabel}
              class={input}
            />
            <button type="submit" class={button}>{subscribeLabel}</button>
          </div>
          <p role="status" class={status}>
            {#if subscribed}{successLabel}{/if}
          </p>
        </form>
      {/if}
    </div>
  {/if}
  {#if isCta}
    <div class={cta}>
      <div>
        {@render text("h2", ctaTitle, heading)}
        {@render text("p", ctaText, description)}
      </div>
      {@render box(actionsClass, actions)}
    </div>
  {/if}
  <div class={layout[1]}>
    <div class={layout[2]}>
      {@render box(brandClass, brand)}
      {@render text(
        "p",
        descriptionClass,
        isCta || variant === "compact" ? "" : description,
      )}
      {@render box(actionsClass, isCta ? undefined : actions)}
    </div>
    {#if links.length > 0}
      <nav aria-label={navLabel} class={hasColumns ? columnsNav : undefined}>
        {#if hasColumns}
          {#each columns as column}
            <div>
              {@render text("h2", columnTitle, column.title)}
              {@render linkList(column.links, columnList)}
            </div>
          {/each}
        {:else}
          {@render linkList(links, flatList)}
        {/if}
      </nav>
    {/if}
  </div>
  <div class={layout[3]}>
    {#if variant === "centered"}{@render socialsList()}{/if}
    {@render text("p", copyrightClass, copyright)}
    {#if legal.length > 0}
      <nav aria-label={legalLabel}>{@render linkList(legal, legalList)}</nav>
    {/if}
    {#if variant !== "centered"}{@render socialsList()}{/if}
    {#if backToTop}
      <a href="#top" class={topLink}
        >{backToTopLabel}{@render iconSvg("M12 19V5M5 12l7-7 7 7")}</a
      >
    {/if}
  </div>
  {#if variant === "big-brand" && wordmark}
    <div aria-hidden="true" class={wordmarkBox} style:--chars={wordmark.length}>
      <p class={wordmarkText}>{wordmark}</p>
    </div>
  {/if}
</footer>
