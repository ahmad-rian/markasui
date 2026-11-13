<script lang="ts" module>
  export type CommandItem = {
    group: string;
    label: string;
    value?: string;
    href?: string;
    shortcut?: string;
  };
</script>

<script lang="ts">
  import { tick, type Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  const dialogClass =
    "mx-auto mt-24 mb-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
  const search = "flex items-center gap-2 border-b border-line px-4";
  const searchIcon = "size-4 shrink-0 text-muted";
  const input =
    "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted";
  const list = "max-h-72 overflow-y-auto p-1";
  const groupClass = "py-1";
  const heading = "px-3 pt-1 pb-1.5 text-xs font-medium text-muted";
  const option =
    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out aria-selected:bg-subtle motion-reduce:transition-none";
  const shortcutClass = "font-sans text-xs text-muted";
  const empty = "px-4 py-6 text-center text-sm text-muted";

  const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
  const SAFE_SCHEME = /^(https?|mailto|tel):/i;

  /** Href with a scheme other than http, https, mailto, and tel (such as javascript:) becomes "#". */
  const safeHref = (href: string) => {
    const cleaned = href.replace(/[\t\n\r]/g, "");
    const start = [...cleaned].findIndex((char) => char > " ");
    const value = cleaned.slice(Math.max(start, 0));
    return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
  };

  type Entry = { item: CommandItem; index: number };

  /** Group names in order of first appearance. */
  const groupNames = (items: CommandItem[]) => [
    ...new Set(items.map((entry) => entry.group)),
  ];

  const matches = (item: CommandItem, query: string) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase());

  type Props = Omit<HTMLDialogAttributes, "open" | "onselect"> & {
    items: CommandItem[];
    /** Ctrl+K or Cmd+K opens and closes the palette. */
    hotkey?: boolean;
    placeholderLabel?: string;
    emptyLabel?: string;
    /** Accessible label of the search field. */
    searchLabel?: string;
    /** Accessible label of the dialog and the result list. */
    dialogLabel?: string;
    /** Called with the value (or label) of the chosen command. */
    onselect?: (value: string) => void;
    trigger?: Snippet;
  };

  let {
    items,
    hotkey = false,
    placeholderLabel = "Type a command or search...",
    emptyLabel = "No results found.",
    searchLabel = "Search commands",
    dialogLabel = "Command palette",
    onselect,
    trigger,
    id,
    class: className,
    onclose,
    onclick,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const dialogId = $derived(id ?? generatedId);
  const listId = $derived(`${dialogId}-list`);
  const optionId = (index: number) => `${dialogId}-option-${index}`;
  let dialog = $state<HTMLDialogElement>();
  let open = $state(false);
  let query = $state("");
  let active = $state(0);

  const groups = $derived(
    groupNames(items).map((name, groupIndex) => ({
      name,
      id: `${dialogId}-group-${groupIndex}`,
      entries: items
        .map((item, index): Entry => ({ item, index }))
        .filter((entry) => entry.item.group === name)
        .filter((entry) => matches(entry.item, query)),
    })),
  );
  const visible = $derived(groups.flatMap((group) => group.entries));
  const activeId = $derived.by(() => {
    const entry = visible[Math.min(active, visible.length - 1)];
    return entry ? optionId(entry.index) : undefined;
  });

  function show() {
    dialog?.showModal();
    open = true;
  }

  function handleHotkey(event: KeyboardEvent) {
    if (!hotkey) return;
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
      return;
    event.preventDefault();
    if (dialog?.open) return dialog.close();
    show();
  }

  $effect(() => {
    const target = activeId;
    if (!target) return;
    tick().then(() =>
      document.getElementById(target)?.scrollIntoView?.({ block: "nearest" }),
    );
  });

  function select(value: string) {
    onselect?.(value);
    dialog?.close();
  }

  function handleClose(event: Event & { currentTarget: HTMLDialogElement }) {
    open = false;
    query = "";
    active = 0;
    onclose?.(event);
  }

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLDialogElement },
  ) {
    if (event.target === event.currentTarget) dialog?.close();
    onclick?.(event);
  }

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    query = event.currentTarget.value;
    active = 0;
  }

  function handleKeydown(event: KeyboardEvent) {
    const count = visible.length;
    const steps: Record<string, number | undefined> = {
      ArrowDown: 1,
      ArrowUp: -1,
    };
    const step = steps[event.key];
    if (step !== undefined) {
      event.preventDefault();
      if (count > 0) active = (active + step + count) % count;
      return;
    }
    if (event.key !== "Enter" || !activeId) return;
    event.preventDefault();
    document.getElementById(activeId)?.click();
  }
</script>

<svelte:window onkeydown={handleHotkey} />

<div class="contents">
  {#if trigger}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="contents" onclick={show}>{@render trigger()}</div>
  {/if}
  <dialog
    bind:this={dialog}
    id={dialogId}
    aria-label={dialogLabel}
    data-state={open ? "open" : "closed"}
    class={[dialogClass, className]}
    onclose={handleClose}
    onclick={handleClick}
    {...rest}
  >
    <div class={search}>
      <svg
        class={searchIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="text"
        role="combobox"
        aria-label={searchLabel}
        aria-expanded={visible.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeId}
        autocomplete="off"
        spellcheck={false}
        placeholder={placeholderLabel}
        value={query}
        class={input}
        oninput={handleInput}
        onkeydown={handleKeydown}
      />
    </div>
    <div
      id={listId}
      role="listbox"
      aria-label={dialogLabel}
      hidden={visible.length === 0}
      class={list}
    >
      {#each groups as group (group.id)}
        {#if group.entries.length > 0}
          <div
            role="group"
            aria-labelledby={`${group.id}-heading`}
            class={groupClass}
          >
            <div id={`${group.id}-heading`} class={heading}>{group.name}</div>
            {#each group.entries as entry (entry.index)}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <svelte:element
                this={entry.item.href ? "a" : "div"}
                href={entry.item.href ? safeHref(entry.item.href) : undefined}
                id={optionId(entry.index)}
                role="option"
                aria-selected={optionId(entry.index) === activeId}
                tabindex="-1"
                class={option}
                onmousemove={() => (active = visible.indexOf(entry))}
                onclick={() => select(entry.item.value ?? entry.item.label)}
                ><span>{entry.item.label}</span>{#if entry.item.shortcut}<kbd
                    class={shortcutClass}>{entry.item.shortcut}</kbd
                  >{/if}</svelte:element
              >
            {/each}
          </div>
        {/if}
      {/each}
    </div>
    {#if visible.length === 0}
      <p class={empty}>{emptyLabel}</p>
    {/if}
  </dialog>
</div>
