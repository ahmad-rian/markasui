<script lang="ts" module>
  export type MenubarItem =
    | { separator: true }
    | {
        separator?: false;
        label: string;
        value?: string;
        href?: string;
        danger?: boolean;
        disabled?: boolean;
      };

  export type MenubarMenu = { label: string; items: MenubarItem[] };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const bar =
    "inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1";
  const wrapper = "contents";
  const triggerClass =
    "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
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

  /** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
  const safeHref = (href: string) => {
    const cleaned = href.replace(/[\t\n\r]/g, "");
    const start = [...cleaned].findIndex((char) => char > " ");
    const value = cleaned.slice(Math.max(start, 0));
    return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
  };

  const GAP = 4;
  const TRIGGER_SELECTOR = ':scope > [role="none"] > [role="menuitem"]';
  const MENU_SELECTOR = ':scope > [role="none"] > [role="menu"]';
  const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

  /** Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. */
  function placeMenu(trigger: HTMLElement, panel: HTMLElement) {
    const anchor = trigger.getBoundingClientRect();
    const { width, height } = panel.getBoundingClientRect();
    const below = anchor.bottom + GAP;
    const above = anchor.top - GAP - height;
    const fitsBelow = below + height <= window.innerHeight;
    const top = fitsBelow || above < 0 ? below : above;
    const left = Math.max(
      GAP,
      Math.min(anchor.left, window.innerWidth - width - GAP),
    );
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }

  /** Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. Mengembalikan fungsi pelepas. */
  function followViewport(update: () => void) {
    const scrollOptions = { capture: true, passive: true };
    window.addEventListener("scroll", update, scrollOptions);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, scrollOptions);
      window.removeEventListener("resize", update);
    };
  }

  type FocusTarget = "first" | "last";

  const wrap = (index: number, length: number) => (index + length) % length;

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "onselect"> & {
    menus: MenubarMenu[];
    /** Nama aksesibel bar (aria-label). */
    label?: string;
    onselect?: (value: string) => void;
  };

  let {
    menus,
    label = "Menu",
    onselect,
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const baseId = $derived(id ?? generatedId);
  let barEl = $state<HTMLDivElement>();
  let openIndex = $state<number | null>(null);
  let activeIndex = $state(0);
  let focusTarget: FocusTarget = "first";

  const triggers = () =>
    Array.from(barEl?.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR) ?? []);
  const panels = () =>
    Array.from(barEl?.querySelectorAll<HTMLElement>(MENU_SELECTOR) ?? []);
  const menuItems = (index: number) =>
    Array.from(
      panels()[index]?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
    );

  $effect(() => {
    const index = openIndex;
    if (index === null) return;
    return followViewport(() => {
      const trigger = triggers()[index];
      const panel = panels()[index];
      if (trigger && panel) placeMenu(trigger, panel);
    });
  });

  const focusItem = (menuIndex: number, index: number) => {
    const list = menuItems(menuIndex);
    if (list.length === 0) return;
    list[wrap(index, list.length)]?.focus();
  };
  const focusEdge = (menuIndex: number, target: FocusTarget) =>
    focusItem(menuIndex, target === "first" ? 0 : -1);

  const focusTrigger = (index: number) => {
    const next = wrap(index, menus.length);
    activeIndex = next;
    triggers()[next]?.focus();
    return next;
  };

  const openMenu = (index: number, target: FocusTarget) => {
    focusTarget = target;
    panels()[index]?.showPopover();
  };

  const close = (index: number) => {
    panels()[index]?.hidePopover();
    triggers()[index]?.focus();
  };

  /** Tutup menu sekarang, pindah ke menu di sebelahnya, lalu buka. */
  const switchMenu = (from: number, to: number) => {
    panels()[from]?.hidePopover();
    openMenu(focusTrigger(to), "first");
  };

  const select = (index: number, value: string) => {
    onselect?.(value);
    close(index);
  };

  // beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
  function handleBeforeToggle(index: number, event: ToggleEvent) {
    if (event.newState === "open") {
      openIndex = index;
      activeIndex = index;
      return;
    }
    if (openIndex === index) openIndex = null;
  }

  function handleToggle(index: number, event: ToggleEvent) {
    const trigger = triggers()[index];
    const panel = panels()[index];
    if (event.newState !== "open" || !trigger || !panel) return;
    placeMenu(trigger, panel);
    focusEdge(index, focusTarget);
    focusTarget = "first";
  }

  function handleTriggerKeydown(index: number, event: KeyboardEvent) {
    const moves: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: -1,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      focusTrigger(move);
      return;
    }
    const targets: Record<string, FocusTarget | undefined> = {
      ArrowDown: "first",
      ArrowUp: "last",
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    if (openIndex === index) return focusEdge(index, target);
    openMenu(index, target);
  }

  function handleMenuKeydown(index: number, event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      return close(index);
    }
    if (event.key === "Tab") return panels()[index]?.hidePopover();
    const sideways: Record<string, number | undefined> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
    };
    const side = sideways[event.key];
    if (side !== undefined) {
      event.preventDefault();
      return switchMenu(index, side);
    }
    const current = menuItems(index).indexOf(
      document.activeElement as HTMLElement,
    );
    const targets: Record<string, number | undefined> = {
      ArrowDown: current + 1,
      ArrowUp: current - 1,
      Home: 0,
      End: -1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusItem(index, target);
  }
</script>

<div
  bind:this={barEl}
  id={baseId}
  role="menubar"
  aria-label={label}
  class={[bar, className]}
  {...rest}
>
  {#each menus as entry, menuIndex (menuIndex)}
    {@const menuId = `${baseId}-menu-${menuIndex}`}
    {@const triggerId = `${baseId}-trigger-${menuIndex}`}
    {@const state = openIndex === menuIndex ? "open" : "closed"}
    <div role="none" class={wrapper}>
      <button
        id={triggerId}
        type="button"
        role="menuitem"
        tabindex={activeIndex === menuIndex ? 0 : -1}
        popovertarget={menuId}
        aria-haspopup="menu"
        aria-expanded={openIndex === menuIndex}
        aria-controls={menuId}
        data-state={state}
        class={triggerClass}
        onfocus={() => (activeIndex = menuIndex)}
        onkeydown={(event) => handleTriggerKeydown(menuIndex, event)}
        >{entry.label}</button
      >
      <!-- Fokus ada di item menu, bukan di wadah menu (sama dengan React). -->
      <!-- svelte-ignore a11y_interactive_supports_focus -->
      <div
        id={menuId}
        popover="auto"
        role="menu"
        aria-labelledby={triggerId}
        data-state={state}
        class={menu}
        onbeforetoggle={(event) => handleBeforeToggle(menuIndex, event)}
        ontoggle={(event) => handleToggle(menuIndex, event)}
        onkeydown={(event) => handleMenuKeydown(menuIndex, event)}
      >
        {#each entry.items as option, index (index)}
          {#if option.separator}
            <div role="separator" class={separator}></div>
          {:else if option.href && !option.disabled}
            <a
              href={safeHref(option.href)}
              role="menuitem"
              tabindex="-1"
              class={[item, tones[option.danger ? "danger" : "default"]]}
              onclick={() => select(menuIndex, option.value ?? option.label)}
              >{option.label}</a
            >
          {:else}
            <button
              type="button"
              role="menuitem"
              tabindex="-1"
              disabled={option.disabled}
              class={[item, tones[option.danger ? "danger" : "default"]]}
              onclick={() => select(menuIndex, option.value ?? option.label)}
              >{option.label}</button
            >
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>
