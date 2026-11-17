<script lang="ts" module>
  export type NavbarChild = {
    label: string;
    href: string;
    description?: string;
    /** SVG path data (d attribute) for a 24x24 stroke icon. */
    icon?: string;
  };

  export type NavbarLink = {
    label: string;
    /** Plain link target. Ignored when the item has children. */
    href?: string;
    active?: boolean;
    /** Dropdown links. An item with children becomes a dropdown trigger. */
    children?: NavbarChild[];
  };
</script>

<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root =
    "@container w-full **:focus-visible:outline-2 **:focus-visible:outline-offset-2 **:focus-visible:outline-primary motion-reduce:**:transition-none";
  const variants = {
    default: "top-0 border-b border-line bg-surface",
    floating: "top-3 rounded-2xl border border-line bg-surface shadow-overlay",
    blur: "top-0 border-b border-line/60 bg-surface/70 backdrop-blur-md",
  };
  const stickyClass = "sticky z-40";
  const bar = "flex h-14 items-center gap-4 px-3 @sm:px-4";
  const brandClass =
    "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
  const desktopNav = "relative hidden items-center @2xl:flex";
  const indicator =
    "absolute inset-y-0 left-0 rounded-md bg-subtle transition-[translate,width] duration-200 ease-out";
  const list = "relative flex items-center";
  const item =
    "flex h-9 cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink aria-expanded:text-ink aria-[current]:bg-subtle aria-[current]:text-ink @max-2xl:hover:bg-subtle [&::-webkit-details-marker]:hidden";
  const chevron =
    "size-3.5 text-faint transition-transform duration-200 ease-out in-aria-expanded:rotate-180 in-open:rotate-180";
  const panel =
    "inset-auto m-0 rounded-xl border border-line bg-surface p-2 text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:open:translate-y-1.5 starting:open:opacity-0";
  const panelList = "grid grid-flow-col grid-rows-3 gap-1";
  const panelLink =
    "flex w-64 items-start gap-3 rounded-lg p-3 text-sm transition-colors duration-150 ease-out hover:bg-subtle focus-visible:bg-subtle";
  const iconClass =
    "size-9 shrink-0 rounded-md border border-line bg-canvas p-[7px]";
  const linkBody = "grid gap-0.5";
  const linkTitle = "font-medium";
  const linkDescription = "text-muted";
  const actionsClass = "ml-auto flex items-center gap-2";
  const toggle =
    "inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors duration-150 ease-out hover:bg-subtle @2xl:hidden";
  const openIcon = "size-5 in-aria-expanded:hidden";
  const closeIcon = "hidden size-5 in-aria-expanded:block";
  const mobilePanel =
    "border-t border-line px-4 py-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0 @2xl:hidden";
  const mobileList = "grid gap-1";
  const groupList =
    "my-1 ml-3 grid gap-1 border-l border-line pl-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0";

  /** Hrefs with a scheme other than http, https, mailto, and tel (javascript: for one) become "#". Spaces and control characters are ignored like browsers do. */
  const safeHref = (href = "#") =>
    /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
      ? "#"
      : href;

  /** Delay before a panel opens when the pointer lingers, and before it closes when the pointer leaves. */
  const OPEN_DELAY = 120;
  const CLOSE_DELAY = 180;
  /** Distance of the panel from its trigger and from the viewport edge. */
  const GAP = 8;

  /**
   * Slide the indicator to the hovered item, the open panel, or the active item, then place the
   * open panel under its trigger. The indicator is the nav's first child, the panel is the trigger's next sibling.
   */
  function sync(nav: Element) {
    const find = (selector: string) => nav.querySelector<HTMLElement>(selector);
    const open = find("[aria-expanded=true]");
    const target =
      find(":scope>ul>li:hover>:first-child") ?? open ?? find("[aria-current]");
    const pill = nav.firstElementChild as HTMLElement;
    pill.hidden = !target;
    if (target) {
      pill.style.width = `${target.offsetWidth}px`;
      pill.style.translate = `${target.offsetLeft}px 0`;
    }
    const popover = open?.nextElementSibling as HTMLElement | undefined;
    if (!popover) return;
    const box = open!.getBoundingClientRect();
    const maxLeft = innerWidth - popover.offsetWidth - GAP;
    popover.style.top = `${box.bottom + GAP}px`;
    popover.style.left = `${Math.max(GAP, Math.min(box.left, maxLeft))}px`;
  }

  type Props = HTMLAttributes<HTMLElement> & {
    links?: NavbarLink[];
    brand?: Snippet;
    actions?: Snippet;
    /** default: hairline bottom border, floating: rounded and floating, blur: translucent background. */
    variant?: keyof typeof variants;
    sticky?: boolean;
    /** Accessible label of the mobile menu button. */
    menuLabel?: string;
    /** Accessible label of the desktop nav element. */
    navLabel?: string;
    /** Accessible label of the mobile nav element. */
    mobileNavLabel?: string;
  };

  let {
    links = [],
    brand,
    actions,
    variant = "default",
    sticky = false,
    menuLabel = "Menu",
    navLabel = "Main",
    mobileNavLabel = "Main mobile",
    id,
    class: className,
    onkeydown,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const navbarId = $derived(id ?? generatedId);
  const menuId = $derived(`${navbarId}-menu`);
  let open = $state(false);
  let toggleButton = $state<HTMLButtonElement>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  function handleKeyDown(
    event: KeyboardEvent & { currentTarget: HTMLElement },
  ) {
    if (event.key === "Escape" && open) {
      open = false;
      toggleButton?.focus();
    }
    onkeydown?.(event);
  }

  /** Mouse hover: entering a dropdown item opens it after a delay, leaving closes it after a delay. Items without a dropdown do not cancel the close delay. */
  function handleHover(event: PointerEvent & { currentTarget: HTMLElement }) {
    const entry = event.currentTarget;
    const popover = entry.querySelector<HTMLElement>("[popover]");
    sync(entry.closest("nav")!);
    if (event.pointerType !== "mouse" || !popover) return;
    const enter = event.type === "pointerenter";
    clearTimeout(timer);
    timer = setTimeout(
      () => popover.togglePopover(enter),
      enter ? OPEN_DELAY : CLOSE_DELAY,
    );
  }

  /** A mouse click on a trigger that is already open (usually by hover) does not close it. */
  function handleClick(event: MouseEvent & { currentTarget: HTMLElement }) {
    if (event.detail && event.currentTarget.matches("[aria-expanded=true]"))
      event.preventDefault();
  }

  /** ArrowDown on a trigger opens the panel and focuses the first link. */
  function handleTriggerKeyDown(
    event: KeyboardEvent & { currentTarget: HTMLElement },
  ) {
    const popover = event.currentTarget.nextElementSibling as HTMLElement;
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    popover.showPopover();
    popover.querySelector("a")?.focus();
  }

  /** beforetoggle runs synchronously so aria-expanded is always current; toggle places the panel once it shows. */
  function handleToggle(event: ToggleEvent & { currentTarget: HTMLElement }) {
    const popover = event.currentTarget;
    popover.previousElementSibling!.setAttribute(
      "aria-expanded",
      String(event.newState === "open"),
    );
    sync(popover.closest("nav")!);
  }
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

{#snippet link(entry: Omit<NavbarLink, "children">)}
  <a
    href={safeHref(entry.href)}
    aria-current={entry.active ? "page" : undefined}
    class={item}>{entry.label}</a
  >
{/snippet}

<header
  id={navbarId}
  class={[root, variants[variant], sticky && stickyClass, className]}
  onkeydown={handleKeyDown}
  {...rest}
>
  <div class={bar}>
    {#if brand}
      <div class={brandClass}>{@render brand()}</div>
    {/if}
    <nav aria-label={navLabel} class={desktopNav}>
      <span aria-hidden="true" hidden class={indicator}></span>
      <ul class={list}>
        {#each links as entry, index (index)}
          {@const panelId = `${navbarId}-panel-${index}`}
          <li onpointerenter={handleHover} onpointerleave={handleHover}>
            {#if entry.children?.length}
              <button
                type="button"
                popovertarget={panelId}
                aria-expanded="false"
                aria-controls={panelId}
                class={item}
                onclick={handleClick}
                onkeydown={handleTriggerKeyDown}
                >{entry.label}{@render icon("m6 9 6 6 6-6", chevron)}</button
              >
              <div
                id={panelId}
                popover="auto"
                class={panel}
                onbeforetoggle={handleToggle}
                ontoggle={handleToggle}
              >
                <ul class={panelList}>
                  {#each entry.children as child, childIndex (childIndex)}
                    <li>
                      <a href={safeHref(child.href)} class={panelLink}>
                        {#if child.icon}{@render icon(
                            child.icon,
                            iconClass,
                          )}{/if}
                        <span class={linkBody}>
                          <span class={linkTitle}>{child.label}</span>
                          {#if child.description}
                            <span class={linkDescription}
                              >{child.description}</span
                            >
                          {/if}
                        </span>
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {:else}
              {@render link(entry)}
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
    <div class={actionsClass}>
      {@render actions?.()}
      <button
        bind:this={toggleButton}
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls={menuId}
        onclick={() => (open = !open)}
        class={toggle}
      >
        {@render icon("M4 6h16M4 12h16M4 18h16", openIcon)}
        {@render icon("M18 6 6 18M6 6l12 12", closeIcon)}
      </button>
    </div>
  </div>
  <div
    id={menuId}
    data-state={open ? "open" : "closed"}
    hidden={!open}
    class={mobilePanel}
  >
    <nav aria-label={mobileNavLabel} class={mobileList}>
      {#each links as entry, index (index)}
        {#if entry.children?.length}
          <details>
            <summary class={item}
              >{entry.label}{@render icon("m6 9 6 6 6-6", chevron)}</summary
            >
            <div class={groupList}>
              {#each entry.children as child, childIndex (childIndex)}
                {@render link(child)}
              {/each}
            </div>
          </details>
        {:else}
          {@render link(entry)}
        {/if}
      {/each}
    </nav>
  </div>
</header>
