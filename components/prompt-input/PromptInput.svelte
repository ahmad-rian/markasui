<script lang="ts" module>
  export type PromptInputValue = { text: string; files: File[] };
  export type PromptInputModel = string | { value: string; label: string };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";

  const root =
    "grid gap-1 rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 ease-out has-[textarea:focus-visible]:border-primary-line has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-offset-2 has-[textarea:focus-visible]:outline-primary motion-reduce:transition-none";
  const chips = "flex flex-wrap gap-1.5 px-1 pt-1";
  const chip =
    "inline-flex h-7 max-w-full items-center gap-1.5 rounded-md border border-line bg-subtle pr-1 pl-2 text-xs font-medium text-ink";
  const chipName = "max-w-40 truncate";
  const chipRemove =
    "grid size-5 shrink-0 place-items-center rounded text-muted transition-colors duration-150 ease-out hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary motion-reduce:transition-none";
  const field =
    "block min-h-10 w-full resize-none overflow-y-auto bg-transparent px-2 py-2 text-sm leading-6 text-ink outline-none field-sizing-content placeholder:text-faint";
  const bar = "flex items-center gap-1";
  const iconButton =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const select =
    "h-8 max-w-40 cursor-pointer truncate rounded-full bg-transparent px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const counter =
    "ml-auto px-1.5 text-xs text-muted tabular-nums data-[state=limit]:text-danger";
  const send =
    "group grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-[background-color,opacity,scale] duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";
  const sendIcon =
    "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-50 group-data-[state=stop]:opacity-0 motion-reduce:transition-none";
  const stopIcon =
    "col-start-1 row-start-1 size-3 scale-50 rounded-xs bg-current opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-100 group-data-[state=stop]:opacity-100 motion-reduce:transition-none";
  const icon = "size-4";
  const smallIcon = "size-3";

  /** Browsers without field-sizing grow the textarea by hand. */
  function grow(el: HTMLTextAreaElement | undefined) {
    if (!el || globalThis.CSS?.supports?.("field-sizing", "content")) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  type Props = Omit<HTMLFormAttributes, "onsubmit"> & {
    /** Text in the field, bindable with bind:value. */
    value?: string;
    /** Fires on the send button or Enter with the text and attached files. */
    onSend?: (value: PromptInputValue) => void;
    /** Fires when the stop button is pressed while loading. */
    onStop?: () => void;
    /** Turns the send button into a stop button. */
    loading?: boolean;
    /** Character limit. Shows a counter next to the send button. */
    maxLength?: number;
    /** Tallest the field grows before it scrolls, in px. */
    maxHeight?: number;
    /** Shows the attach button. */
    attachments?: boolean;
    accept?: string;
    /** Options of the small model picker on the left. */
    models?: PromptInputModel[];
    /** Picked model, bindable with bind:model. */
    model?: string;
    /** Extra tools on the left of the action row. */
    actions?: Snippet;
    placeholderLabel?: string;
    inputLabel?: string;
    sendLabel?: string;
    stopLabel?: string;
    attachLabel?: string;
    /** Name of each remove button. Accepts {name}. */
    removeLabel?: string;
    modelLabel?: string;
  };

  let {
    value = $bindable(""),
    onSend,
    onStop,
    loading = false,
    maxLength,
    maxHeight = 200,
    attachments = true,
    accept,
    models = [],
    model = $bindable(),
    actions,
    placeholderLabel = "Ask anything",
    inputLabel = "Message",
    sendLabel = "Send",
    stopLabel = "Stop",
    attachLabel = "Attach files",
    removeLabel = "Remove {name}",
    modelLabel = "Model",
    class: className,
    ...rest
  }: Props = $props();

  let files = $state<File[]>([]);
  let fieldEl = $state<HTMLTextAreaElement>();
  let fileEl = $state<HTMLInputElement>();
  const canSend = $derived(value.trim() !== "" && !loading);
  const options = $derived(
    models.map((option) =>
      typeof option === "string" ? { value: option, label: option } : option,
    ),
  );
  const atLimit = $derived(
    maxLength !== undefined && value.length >= maxLength,
  );

  $effect(() => {
    void value;
    grow(fieldEl);
  });

  function onsubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!canSend) return;
    onSend?.({ text: value, files });
    value = "";
    files = [];
  }

  function onkeydown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement },
  ) {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  function onpick(
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    const input = event.currentTarget;
    files = [...files, ...Array.from(input.files ?? [])];
    input.value = "";
  }

  function remove(index: number) {
    files = files.filter((_, i) => i !== index);
    fieldEl?.focus();
  }

  /** The button turns into submit during this click, so keep it from sending. */
  function onSendClick(event: MouseEvent) {
    if (!loading) return;
    event.preventDefault();
    onStop?.();
  }
</script>

<form {onsubmit} class={[root, className]} {...rest}>
  {#if files.length > 0}
    <ul class={chips}>
      {#each files as file, index (`${file.name}-${index}`)}
        <li class={chip}>
          <span class={chipName}>{file.name}</span>
          <button
            type="button"
            aria-label={removeLabel.replace("{name}", file.name)}
            class={chipRemove}
            onclick={() => remove(index)}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class={smallIcon}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
  <textarea
    bind:this={fieldEl}
    bind:value
    rows="1"
    maxlength={maxLength}
    aria-label={inputLabel}
    placeholder={placeholderLabel}
    style:max-height={`${maxHeight}px`}
    class={field}
    {onkeydown}></textarea>
  <div class={bar}>
    {#if attachments}
      <button
        type="button"
        aria-label={attachLabel}
        class={iconButton}
        onclick={() => fileEl?.click()}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={icon}
        >
          <path
            d="m21 11-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6L15 7.6"
          />
        </svg>
      </button>
      <input
        bind:this={fileEl}
        type="file"
        multiple
        hidden
        tabindex="-1"
        {accept}
        onchange={onpick}
      />
    {/if}
    {#if options.length > 0}
      <select bind:value={model} aria-label={modelLabel} class={select}>
        {#each options as item (item.value)}
          <option value={item.value}>{item.label}</option>
        {/each}
      </select>
    {/if}
    {@render actions?.()}
    <span data-state={atLimit ? "limit" : "ok"} class={counter}
      >{maxLength !== undefined ? `${value.length}/${maxLength}` : ""}</span
    >
    <button
      type={loading ? "button" : "submit"}
      aria-label={loading ? stopLabel : sendLabel}
      data-state={loading ? "stop" : "send"}
      disabled={!loading && !canSend}
      class={send}
      onclick={onSendClick}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={sendIcon}
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
      <span aria-hidden="true" class={stopIcon}></span>
    </button>
  </div>
</form>
