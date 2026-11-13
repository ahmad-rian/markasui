<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  const dialogClass =
    "fixed inset-y-0 m-0 h-dvh max-h-dvh w-full max-w-sm border-line bg-surface p-0 text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 motion-reduce:transition-none";
  const sides = {
    right: "right-0 left-auto border-l starting:open:translate-x-full",
    left: "right-auto left-0 border-r starting:open:-translate-x-full",
  };
  const panel = "flex h-full flex-col gap-4 p-6";
  const header = "flex items-start justify-between gap-4";
  const titleClass = "text-lg font-semibold text-ink";
  const body = "flex-1 overflow-y-auto text-sm text-muted";
  const footerClass = "flex flex-wrap justify-end gap-2";
  const close =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

  type Props = Omit<HTMLDialogAttributes, "title" | "open"> & {
    title: string;
    side?: keyof typeof sides;
    /** Accessible label of the close button. */
    closeLabel?: string;
    trigger?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  };

  let {
    title,
    side = "right",
    closeLabel = "Close",
    id,
    class: className,
    trigger,
    footer,
    children,
    onclose,
    onclick,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const dialogId = $derived(id ?? generatedId);
  let dialog = $state<HTMLDialogElement>();
  let open = $state(false);

  function show() {
    dialog?.showModal();
    open = true;
  }

  function handleClose(event: Event & { currentTarget: HTMLDialogElement }) {
    open = false;
    onclose?.(event);
  }

  function handleClick(
    event: MouseEvent & { currentTarget: HTMLDialogElement },
  ) {
    if (event.target === event.currentTarget) dialog?.close();
    onclick?.(event);
  }
</script>

<div class="contents">
  {#if trigger}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="contents" onclick={show}>{@render trigger()}</div>
  {/if}
  <dialog
    bind:this={dialog}
    id={dialogId}
    aria-labelledby={`${dialogId}-title`}
    data-state={open ? "open" : "closed"}
    class={[dialogClass, sides[side], className]}
    onclose={handleClose}
    onclick={handleClick}
    {...rest}
  >
    <div class={panel}>
      <div class={header}>
        <h2 id={`${dialogId}-title`} class={titleClass}>{title}</h2>
        <form method="dialog">
          <button type="submit" class={close} aria-label={closeLabel}>
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>
      <div class={body}>{@render children?.()}</div>
      {#if footer}
        <form method="dialog" class={footerClass}>{@render footer()}</form>
      {/if}
    </div>
  </dialog>
</div>
