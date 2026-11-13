<script lang="ts" module>
  export type ContextMenuItem =
    | { separator: true }
    | {
        separator?: false;
        label: string;
        value?: string;
        href?: string;
        danger?: boolean;
        disabled?: boolean;
      };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const area =
    "block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const hint = "sr-only";
  const menu =
    "inset-auto m-0 min-w-48 rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
  const item =
    "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
  const tones = {
    default: "text-ink hover:bg-subtle focus:bg-subtle",
    danger: "text-danger hover:bg-danger/10 focus:bg-danger/10",
  };
  const separator = "my-1 h-px bg-line";

  const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
  const SAFE_SCHEME = /^(https?|mailto|tel):/i;

  /** Hrefs with a scheme other than http, https, mailto, and tel (such as javascript:) become "#". */
  const safeHref = (href: string) => {
    const cleaned = href.replace(/[\t\n\r]/g, "");
    const start = [...cleaned].findIndex((char) => char > " ");
    const value = cleaned.slice(Math.max(start, 0));
    return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
  };

  const GAP = 4;
  const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

  type Offset = { x: number; y: number };

  /** Places the menu at the point (relative to the area), shifting or flipping up when it does not fit. */
  function placeMenu(target: HTMLElement, panel: HTMLElement, offset: Offset) {
    const anchor = target.getBoundingClientRect();
    const { width, height } = panel.getBoundingClientRect();
    const x = anchor.left + offset.x;
    const y = anchor.top + offset.y;
    const fitsBelow = y + height <= window.innerHeight - GAP;
    const top = fitsBelow ? y : Math.max(GAP, y - height);
    const left = Math.max(GAP, Math.min(x, window.innerWidth - width - GAP));
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }

  /** Shift+F10 and the ContextMenu key open the menu from the keyboard. */
  const isMenuKey = (event: KeyboardEvent) =>
    event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "onselect"> & {
    items: ContextMenuItem[];
    /** Accessible label of the menu panel. */
    menuLabel?: string;
    /** Hidden screen reader hint on how to open the menu. */
    hintLabel?: string;
    onselect?: (value: string) => void;
    children?: Snippet;
  };

  let {
    items,
    menuLabel = "Context menu",
    hintLabel = "Press Shift+F10 to open the context menu",
    onselect,
    id,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const menuId = $derived(id ?? generatedId);
  let areaEl = $state<HTMLDivElement>();
  let menuEl = $state<HTMLDivElement>();
  let open = $state(false);
  const dataState = $derived(open ? "open" : "closed");
  let offset: Offset = { x: 0, y: 0 };

  const place = () => {
    if (areaEl && menuEl) placeMenu(areaEl, menuEl, offset);
  };

  // Re-run placement while the page scrolls or the window resizes.
  $effect(() => {
    if (!open) return;
    const scrollOptions = { capture: true, passive: true };
    window.addEventListener("scroll", place, scrollOptions);
    window.addEventListener("resize", place, { passive: true });
    return () => {
      window.removeEventListener("scroll", place, scrollOptions);
      window.removeEventListener("resize", place);
    };
  });

  const menuItems = () =>
    Array.from(menuEl?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);

  function focusItem(index: number) {
    const list = menuItems();
    if (list.length === 0) return;
    list[(index + list.length) % list.length]?.focus();
  }

  function openAt(next: Offset) {
    offset = next;
    // Place synchronously after showPopover; the toggle event arrives later.
    if (!open) menuEl?.showPopover();
    place();
    focusItem(0);
  }

  function close() {
    menuEl?.hidePopover();
    areaEl?.focus();
  }

  function select(value: string) {
    onselect?.(value);
    close();
  }

  function handleContextMenu(
    event: MouseEvent & { currentTarget: HTMLDivElement },
  ) {
    event.preventDefault();
    const anchor = event.currentTarget.getBoundingClientRect();
    openAt({ x: event.clientX - anchor.left, y: event.clientY - anchor.top });
  }

  function handleAreaKeydown(event: KeyboardEvent) {
    if (!isMenuKey(event)) return;
    event.preventDefault();
    openAt({ x: 0, y: 0 });
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  function handleBeforeToggle(event: ToggleEvent) {
    open = event.newState === "open";
  }

  function handleToggle(event: ToggleEvent) {
    if (event.newState !== "open") return;
    place();
    focusItem(0);
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      return close();
    }
    if (event.key === "Tab") return menuEl?.hidePopover();
    const index = menuItems().indexOf(document.activeElement as HTMLElement);
    const targets: Record<string, number | undefined> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: -1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusItem(target);
  }
</script>

<div class="contents">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    {...rest}
    bind:this={areaEl}
    role="group"
    tabindex="0"
    aria-describedby={`${menuId}-hint`}
    data-state={dataState}
    class={[area, className]}
    oncontextmenu={handleContextMenu}
    onkeydown={handleAreaKeydown}
  >
    {@render children?.()}
  </div>
  <span id={`${menuId}-hint`} class={hint}>{hintLabel}</span>
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    bind:this={menuEl}
    id={menuId}
    popover="auto"
    role="menu"
    aria-label={menuLabel}
    data-state={dataState}
    class={menu}
    onbeforetoggle={handleBeforeToggle}
    ontoggle={handleToggle}
    onkeydown={handleMenuKeydown}
    oncontextmenu={(event) => event.preventDefault()}
  >
    {#each items as entry, index (index)}
      {#if entry.separator}
        <div role="separator" class={separator}></div>
      {:else if entry.href && !entry.disabled}
        <a
          href={safeHref(entry.href)}
          role="menuitem"
          tabindex="-1"
          class={[item, tones[entry.danger ? "danger" : "default"]]}
          onclick={() => select(entry.value ?? entry.label)}>{entry.label}</a
        >
      {:else}
        <button
          type="button"
          role="menuitem"
          tabindex="-1"
          disabled={entry.disabled}
          class={[item, tones[entry.danger ? "danger" : "default"]]}
          onclick={() => select(entry.value ?? entry.label)}
          >{entry.label}</button
        >
      {/if}
    {/each}
  </div>
</div>
