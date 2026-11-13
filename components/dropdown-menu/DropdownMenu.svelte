<script lang="ts" module>
  export type DropdownMenuItem =
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

  const root = "inline-block";
  const triggerClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
  const chevron = "size-4 text-muted";
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

  /** Places the menu below the trigger, aligned to its start, and flips above when it does not fit. */
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

  type FocusTarget = "first" | "last";

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "onselect"> & {
    items: DropdownMenuItem[];
    label?: string;
    trigger?: Snippet;
    onselect?: (value: string) => void;
  };

  let {
    items,
    label = "Options",
    trigger,
    onselect,
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const menuId = $derived(id ?? generatedId);
  let triggerEl = $state<HTMLButtonElement>();
  let menuEl = $state<HTMLDivElement>();
  let open = $state(false);
  const dataState = $derived(open ? "open" : "closed");
  let focusTarget: FocusTarget = "first";

  const place = () => {
    if (triggerEl && menuEl) placeMenu(triggerEl, menuEl);
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

  const focusEdge = (target: FocusTarget) =>
    focusItem(target === "first" ? 0 : -1);

  function close() {
    menuEl?.hidePopover();
    triggerEl?.focus();
  }

  function select(value: string) {
    onselect?.(value);
    close();
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  function handleBeforeToggle(event: ToggleEvent) {
    open = event.newState === "open";
  }

  function handleToggle(event: ToggleEvent) {
    if (event.newState !== "open") return;
    place();
    focusEdge(focusTarget);
    focusTarget = "first";
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    const targets: Record<string, FocusTarget | undefined> = {
      ArrowDown: "first",
      ArrowUp: "last",
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    if (open) return focusEdge(target);
    focusTarget = target;
    menuEl?.showPopover();
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

<div class={[root, className]} {...rest}>
  <button
    bind:this={triggerEl}
    type="button"
    id={`${menuId}-trigger`}
    popovertarget={menuId}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls={menuId}
    data-state={dataState}
    class={triggerClass}
    onkeydown={handleTriggerKeydown}
  >
    {#if trigger}{@render trigger()}{:else}{label}{/if}
    <svg
      class={chevron}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    bind:this={menuEl}
    id={menuId}
    popover="auto"
    role="menu"
    aria-labelledby={`${menuId}-trigger`}
    data-state={dataState}
    class={menu}
    onbeforetoggle={handleBeforeToggle}
    ontoggle={handleToggle}
    onkeydown={handleMenuKeydown}
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
