<script lang="ts" module>
  export type SidebarItem = {
    label: string;
    /** Link target. Ignored when the item has children. */
    href?: string;
    /** SVG path data (d attribute) for a 24x24 stroke icon. */
    icon?: string;
    badge?: string | number;
    /** Marks the current page. */
    active?: boolean;
    disabled?: boolean;
    /** Sub-items. The parent item becomes an open/close button. */
    children?: SidebarItem[];
    /** Sub-items start open. Default: open when a sub-item is active. */
    open?: boolean;
  };

  export type SidebarSection = { title?: string; items: SidebarItem[] };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "@container flex overflow-hidden bg-canvas";
  const aside =
    "relative hidden w-56 shrink-0 flex-col bg-surface text-sm transition-[width] duration-200 ease-out data-[state=collapsed]:w-16 motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
  const variants = {
    default: "border-r border-line",
    floating: "m-2 rounded-xl border border-line",
  };
  const showAside = { sm: "@sm:flex", md: "@2xl:flex", lg: "@4xl:flex" };
  const hideBar = { sm: "@sm:hidden", md: "@2xl:hidden", lg: "@4xl:hidden" };
  const headerClass =
    "flex h-14 shrink-0 items-center border-b border-line px-4";
  /** Header and footer content is clipped at the content edge so the rail shows only the first 32px. */
  const slotClass =
    "flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap";
  const footerClass = "shrink-0 border-t border-line px-4 py-3";
  const collapseButton =
    "absolute top-4 -right-3 z-10 grid size-6 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:text-ink";
  const collapseIcon =
    "size-3.5 transition-transform duration-200 ease-out in-data-[state=collapsed]:rotate-180";
  const navClass =
    "min-h-0 flex-1 overflow-y-auto p-3 in-data-[state=collapsed]:overflow-visible";
  const listWrap = "relative grid gap-3 [anchor-scope:--active,--hover]";
  const indicator =
    "absolute inset-[anchor(--hover_top,anchor(--active_top))_anchor(--hover_right,anchor(--active_right))_anchor(--hover_bottom,anchor(--active_bottom))_anchor(--hover_left,anchor(--active_left))] rounded-md bg-subtle transition-[inset] duration-200 ease-out";
  const sectionClass =
    "grid gap-0.5 border-t border-line pt-3 first-of-type:border-t-0 first-of-type:pt-0";
  const titleClass =
    "px-2.5 pb-1 text-xs font-medium text-faint in-data-[state=collapsed]:sr-only";
  const listClass = "grid gap-0.5";
  const item =
    "group/item relative flex h-9 w-full items-center gap-3 rounded-md px-2.5 text-left text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] [&:has(+div_[aria-current=page])]:[anchor-name:--active]";
  const iconClass = "size-5 shrink-0";
  const labelClass =
    "min-w-0 flex-1 truncate in-data-[state=collapsed]:sr-only";
  const badgeClass =
    "rounded-full bg-primary-soft px-1.5 py-0.5 text-xs leading-none font-medium text-primary in-data-[state=collapsed]:sr-only";
  const dot =
    "absolute top-1.5 right-1.5 hidden size-2 rounded-full bg-primary in-data-[state=collapsed]:block";
  const chevron =
    "size-4 shrink-0 text-faint transition-transform duration-200 ease-out group-aria-expanded/item:rotate-90 in-data-[state=collapsed]:hidden";
  const tip =
    "absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-canvas shadow-overlay in-data-[state=collapsed]:group-hover/item:block in-data-[state=collapsed]:group-focus-visible/item:block";
  const region =
    "invisible grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=open]:visible data-[state=open]:grid-rows-[1fr] in-data-[state=collapsed]:hidden";
  const regionInner = "min-h-0 overflow-hidden";
  const subList = "ml-5 grid gap-0.5 border-l border-line py-1 pr-1 pl-2";
  const subItem =
    "relative flex h-8 w-full items-center rounded-md px-2.5 text-muted transition-colors duration-150 ease-out hover:text-ink aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-[current=page]:font-medium aria-[current=page]:text-ink hover:[anchor-name:--hover] focus-visible:[anchor-name:--hover] aria-[current=page]:[anchor-name:--active] in-data-[state=closed]:[anchor-name:none]!";
  const content = "flex min-w-0 flex-1 flex-col";
  const mobileBar = "flex h-14 shrink-0 items-center border-b border-line px-3";
  const iconButton =
    "grid size-9 shrink-0 place-items-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const dialogClass =
    "right-auto left-0 m-0 h-dvh max-h-dvh w-72 flex-col border-r border-line bg-surface p-0 text-sm text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 open:flex starting:open:-translate-x-full motion-reduce:transition-none **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";

  /** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for example) become "#". Whitespace and control characters are ignored as in browsers. */
  const safeHref = (href: string) =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;

  const linkProps = (entry: SidebarItem) =>
    entry.disabled
      ? { role: "link", "aria-disabled": "true" as const }
      : {
          href: safeHref(entry.href ?? "#"),
          "aria-current": entry.active ? ("page" as const) : undefined,
        };

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    sections?: SidebarSection[];
    /** Brand or workspace at the top. Rendered twice: in the sidebar and in the mobile dialog. */
    header?: Snippet;
    /** User profile at the bottom. Rendered twice like header. */
    footer?: Snippet;
    children?: Snippet;
    variant?: keyof typeof variants;
    /** Minimum container width for the sidebar to sit next to the content: sm 24rem, md 42rem, lg 56rem. */
    breakpoint?: keyof typeof showAside;
    /** Icon rail mode. Works with bind:collapsed. */
    collapsed?: boolean;
    navLabel?: string;
    collapseLabel?: string;
    expandLabel?: string;
    openLabel?: string;
    closeLabel?: string;
  };

  let {
    sections = [],
    header,
    footer,
    children,
    variant = "default",
    breakpoint = "md",
    collapsed = $bindable(false),
    navLabel = "Sidebar",
    collapseLabel = "Collapse sidebar",
    expandLabel = "Expand sidebar",
    openLabel = "Open sidebar",
    closeLabel = "Close sidebar",
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const rootId = $derived(id ?? generatedId);
  let dialog = $state<HTMLDialogElement>();

  /** Sub-item groups start open when open is set or a sub-item is active. */
  const initialGroups = () =>
    Object.fromEntries(
      sections.flatMap((section, s) =>
        section.items.map((entry, i) => [
          `${s}-${i}`,
          entry.open ?? !!entry.children?.some((child) => child.active),
        ]),
      ),
    ) as Record<string, boolean>;
  let groups = $state(initialGroups());

  /** In the rail, a parent item expands the sidebar and opens its group. */
  function toggleGroup(key: string, rail: boolean) {
    if (rail) collapsed = false;
    groups = { ...groups, [key]: rail || !groups[key] };
  }

  function onDialogClick(
    event: MouseEvent & { currentTarget: HTMLDialogElement },
  ) {
    const target = event.target as Element;
    if (target === event.currentTarget || target.closest("a[href]"))
      event.currentTarget.close();
  }
</script>

{#snippet icon(d: string, iconClassName: string)}
  <svg
    class={iconClassName}
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

<!-- Header or footer box, clipped at the content edge (see slotClass). -->
{#snippet box(boxClass: string, content: Snippet | undefined)}
  <div class={boxClass}>
    <div class={slotClass}>{@render content?.()}</div>
  </div>
{/snippet}

<!-- The same nav serves the desktop sidebar (prefix d) and the mobile dialog (prefix m). -->
{#snippet nav(prefix: string, rail: boolean)}
  <nav aria-label={navLabel} class={navClass}>
    <div class={listWrap}>
      <span aria-hidden="true" class={indicator}></span>
      {#each sections as section, s}
        <div class={sectionClass}>
          {#if section.title}
            <p aria-hidden="true" class={titleClass}>{section.title}</p>
          {/if}
          <ul aria-label={section.title} class={listClass}>
            {#each section.items as entry, i}
              {@const key = `${s}-${i}`}
              {@const regionId = `${rootId}-${prefix}-g${key}`}
              <li>
                <svelte:element
                  this={entry.children?.length ? "button" : "a"}
                  {...entry.children?.length
                    ? {
                        type: "button",
                        "aria-expanded": !!groups[key],
                        "aria-controls": regionId,
                        onclick: () => toggleGroup(key, rail),
                      }
                    : linkProps(entry)}
                  class={item}
                >
                  {#if entry.icon}{@render icon(entry.icon, iconClass)}{/if}
                  <span class={labelClass}>{entry.label}</span>
                  {#if entry.badge != null && entry.badge !== ""}
                    <span class={badgeClass}>{entry.badge}</span>
                    <span aria-hidden="true" class={dot}></span>
                  {/if}
                  {#if entry.children?.length}
                    {@render icon("m9 6 6 6-6 6", chevron)}
                  {/if}
                  <span aria-hidden="true" class={tip}>{entry.label}</span>
                </svelte:element>
                {#if entry.children?.length}
                  <div
                    id={regionId}
                    data-state={groups[key] ? "open" : "closed"}
                    class={region}
                  >
                    <div class={regionInner}>
                      <ul class={subList}>
                        {#each entry.children as child}
                          <li>
                            <a {...linkProps(child)} class={subItem}
                              >{child.label}</a
                            >
                          </li>
                        {/each}
                      </ul>
                    </div>
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </nav>
{/snippet}

<div id={rootId} class={[root, className]} {...rest}>
  <aside
    id={`${rootId}-aside`}
    data-state={collapsed ? "collapsed" : "expanded"}
    class={[aside, variants[variant], showAside[breakpoint]]}
  >
    {#if header}{@render box(headerClass, header)}{/if}
    {@render nav("d", collapsed)}
    {#if footer}{@render box(footerClass, footer)}{/if}
    <button
      type="button"
      aria-label={collapsed ? expandLabel : collapseLabel}
      aria-expanded={!collapsed}
      aria-controls={`${rootId}-aside`}
      class={collapseButton}
      onclick={() => (collapsed = !collapsed)}
    >
      {@render icon("m15 6-6 6 6 6", collapseIcon)}
    </button>
  </aside>
  <dialog
    bind:this={dialog}
    id={`${rootId}-dialog`}
    aria-label={navLabel}
    class={dialogClass}
    onclick={onDialogClick}
  >
    <div class={headerClass}>
      <div class={slotClass}>{@render header?.()}</div>
      <form method="dialog">
        <button type="submit" aria-label={closeLabel} class={iconButton}>
          {@render icon("M18 6 6 18M6 6l12 12", iconClass)}
        </button>
      </form>
    </div>
    {@render nav("m", false)}
    {#if footer}{@render box(footerClass, footer)}{/if}
  </dialog>
  <div class={content}>
    <div class={[mobileBar, hideBar[breakpoint]]}>
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls={`${rootId}-dialog`}
        class={iconButton}
        onclick={() => dialog?.showModal()}
      >
        {@render icon("M4 6h16M4 12h16M4 18h16", iconClass)}
      </button>
    </div>
    {@render children?.()}
  </div>
</div>
