<script lang="ts" module>
  export type ComboboxOption = { value: string; label: string };
</script>

<script lang="ts">
  import { tick, untrack } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  const wrapper = "grid gap-1.5";
  const labelClass = "text-sm font-medium text-ink";
  const control = "relative";
  const field =
    "h-10 w-full rounded-md border border-line bg-surface ps-3 pe-9 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
  const chevron =
    "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
  const panel =
    "inset-auto m-0 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
  const optionClass =
    "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-subtle aria-selected:bg-subtle";
  const check = "size-4 shrink-0 text-primary";
  const emptyClass = "px-3 py-2 text-sm text-muted";
  const hintClass = "text-sm text-muted";
  const errorClass = "text-sm text-danger";

  const GAP = 4;

  type Props = Omit<HTMLInputAttributes, "value" | "type" | "role" | "name"> & {
    options: ComboboxOption[];
    label?: string;
    hint?: string;
    error?: string;
    name?: string;
    value?: string;
    emptyLabel?: string;
    /** Called when the selected value changes, with "" when cleared. */
    onvaluechange?: (value: string) => void;
  };

  let {
    options,
    label,
    hint,
    error,
    name,
    value = $bindable(""),
    emptyLabel = "No results",
    onvaluechange,
    id,
    class: className,
    oninput,
    onkeydown,
    onblur,
    onclick,
    ...rest
  }: Props = $props();

  const labelOf = (list: ComboboxOption[], selected: string) =>
    list.find((option) => option.value === selected)?.label ?? "";

  const generatedId = $props.id();
  const inputId = $derived(id ?? generatedId);
  const listId = $derived(`${inputId}-listbox`);
  const describedBy = $derived(
    error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined,
  );
  const optionId = (index: number) => `${inputId}-option-${index}`;

  let inputEl = $state<HTMLInputElement>();
  let panelEl = $state<HTMLDivElement>();
  let text = $state(untrack(() => labelOf(options, value)));
  let filter = $state("");
  let active = $state(-1);
  let open = $state(false);
  let lastValue = untrack(() => value);

  /** Indexes (in the original list) of options whose label contains the filter text. */
  const visible = $derived.by(() => {
    const query = filter.trim().toLowerCase();
    return options.flatMap((option, index) =>
      option.label.toLowerCase().includes(query) ? [index] : [],
    );
  });

  // A value changed from outside syncs the input text.
  $effect(() => {
    if (value === lastValue) return;
    lastValue = value;
    text = labelOf(options, value);
  });

  /** Place the list below the input at its width, flip above when it does not fit. */
  function place() {
    if (!inputEl || !panelEl) return;
    const anchor = inputEl.getBoundingClientRect();
    panelEl.style.width = `${anchor.width}px`;
    const { height } = panelEl.getBoundingClientRect();
    const below = anchor.bottom + GAP;
    const above = anchor.top - GAP - height;
    const fitsBelow = below + height <= window.innerHeight;
    panelEl.style.top = `${fitsBelow || above < 0 ? below : above}px`;
    panelEl.style.left = `${anchor.left}px`;
  }

  // Re-place the list while the page scrolls or the window resizes.
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

  async function setActive(index: number) {
    active = index;
    if (index < 0) return;
    await tick();
    document
      .getElementById(optionId(index))
      ?.scrollIntoView?.({ block: "nearest" });
  }

  function commit(next: string) {
    if (next === value) return;
    lastValue = next;
    value = next;
    onvaluechange?.(next);
  }

  function show() {
    if (!open) panelEl?.showPopover();
  }

  function hide() {
    active = -1;
    if (open) panelEl?.hidePopover();
  }

  function select(index: number) {
    const option = options[index];
    if (!option) return;
    commit(option.value);
    text = option.label;
    filter = "";
    hide();
  }

  function move(step: 1 | -1) {
    if (visible.length === 0) return;
    const position = visible.indexOf(active);
    const next =
      position === -1
        ? step === 1
          ? 0
          : visible.length - 1
        : (position + step + visible.length) % visible.length;
    setActive(visible[next] ?? -1);
  }

  function handleInput(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    oninput?.(event);
    text = event.currentTarget.value;
    filter = event.currentTarget.value;
    active = -1;
    commit("");
    show();
  }

  function handleKeydown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    onkeydown?.(event);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      if (open) return move(step);
      show();
      const edge = step === 1 ? visible[0] : visible[visible.length - 1];
      return setActive(edge ?? -1);
    }
    if (event.key === "Enter" && open && active >= 0) {
      event.preventDefault();
      return select(active);
    }
    if (event.key !== "Escape") return;
    event.preventDefault();
    if (open) return hide();
    text = "";
    filter = "";
    commit("");
  }

  function handleBlur(
    event: FocusEvent & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    onblur?.(event);
    hide();
  }

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    onclick?.(event);
    show();
  }

  // beforetoggle runs synchronously, so the state is current for the next key press.
  function handleBeforeToggle(event: ToggleEvent) {
    open = event.newState === "open";
  }

  function handleToggle(event: ToggleEvent) {
    if (event.newState === "open") place();
  }
</script>

<div class={wrapper}>
  {#if label}
    <label id={`${inputId}-label`} for={inputId} class={labelClass}
      >{label}</label
    >
  {/if}
  <div class={control}>
    <input
      bind:this={inputEl}
      id={inputId}
      type="text"
      role="combobox"
      autocomplete="off"
      aria-autocomplete="list"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={active >= 0 ? optionId(active) : undefined}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy}
      data-state={open ? "open" : "closed"}
      class={[field, className]}
      {...rest}
      value={text}
      oninput={handleInput}
      onkeydown={handleKeydown}
      onblur={handleBlur}
      onclick={handleClick}
    />
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
  </div>
  {#if name}
    <input type="hidden" {name} {value} />
  {/if}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={panelEl}
    id={`${inputId}-popup`}
    popover="manual"
    data-state={open ? "open" : "closed"}
    class={panel}
    onbeforetoggle={handleBeforeToggle}
    ontoggle={handleToggle}
    onmousedown={(event) => event.preventDefault()}
  >
    <ul
      id={listId}
      role="listbox"
      aria-labelledby={label ? `${inputId}-label` : undefined}
    >
      {#each visible as index (index)}
        {@const option = options[index]!}
        {@const isSelected = option.value === value && value !== ""}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          id={optionId(index)}
          role="option"
          aria-selected={index === active}
          data-state={isSelected ? "checked" : "unchecked"}
          class={optionClass}
          onclick={() => select(index)}
        >
          {option.label}
          {#if isSelected}
            <svg
              class={check}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12 5 5L20 7" />
            </svg>
          {/if}
        </li>
      {/each}
    </ul>
    {#if visible.length === 0}
      <p class={emptyClass}>{emptyLabel}</p>
    {/if}
  </div>
  {#if error}
    <p id={`${inputId}-error`} class={errorClass}>{error}</p>
  {:else if hint}
    <p id={`${inputId}-hint`} class={hintClass}>{hint}</p>
  {/if}
</div>
