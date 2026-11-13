<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  const dialogClass =
    "m-auto w-full max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
  const panel = "grid gap-4 p-6";
  const titleClass = "text-lg font-semibold text-ink";
  const body = "text-sm text-muted";
  const footerClass = "flex flex-wrap justify-end gap-2";
  const button =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const cancelClass = "border border-line bg-surface text-ink hover:bg-subtle";
  const actionTones = {
    default: "bg-primary text-on-primary hover:bg-primary-strong",
    danger: "bg-danger text-on-primary hover:bg-danger/90",
  };

  const ACTION = "action";
  const CANCEL = "cancel";

  type Props = Omit<HTMLDialogAttributes, "title" | "open" | "oncancel"> & {
    title: string;
    /** Color of the action button. Use danger for destructive or irreversible actions. */
    variant?: keyof typeof actionTones;
    cancelLabel?: string;
    actionLabel?: string;
    /** Called when the action button is chosen. */
    onaction?: () => void;
    /** Called when the dialog closes through the cancel button or Escape. */
    oncancel?: () => void;
    trigger?: Snippet;
    children?: Snippet;
  };

  let {
    title,
    variant = "default",
    cancelLabel = "Cancel",
    actionLabel = "Continue",
    onaction,
    oncancel,
    id,
    class: className,
    trigger,
    children,
    onclose,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const dialogId = $derived(id ?? generatedId);
  let dialog = $state<HTMLDialogElement>();
  let cancelButton = $state<HTMLButtonElement>();
  let open = $state(false);

  function show() {
    if (!dialog) return;
    dialog.returnValue = "";
    dialog.showModal();
    open = true;
    cancelButton?.focus();
  }

  // Anything but the action button (cancel button, Escape, close() from code) counts as cancel.
  function handleClose(event: Event & { currentTarget: HTMLDialogElement }) {
    const target = event.currentTarget;
    open = false;
    if (target.returnValue === ACTION) onaction?.();
    else {
      target.returnValue = CANCEL;
      oncancel?.();
    }
    onclose?.(event);
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
    role="alertdialog"
    aria-labelledby={`${dialogId}-title`}
    aria-describedby={`${dialogId}-description`}
    data-state={open ? "open" : "closed"}
    class={[dialogClass, className]}
    onclose={handleClose}
    {...rest}
  >
    <div class={panel}>
      <h2 id={`${dialogId}-title`} class={titleClass}>{title}</h2>
      <div id={`${dialogId}-description`} class={body}>
        {@render children?.()}
      </div>
      <form method="dialog" class={footerClass}>
        <button
          bind:this={cancelButton}
          type="submit"
          value={CANCEL}
          class={[button, cancelClass]}
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          value={ACTION}
          class={[button, actionTones[variant] ?? actionTones.default]}
        >
          {actionLabel}
        </button>
      </form>
    </div>
  </dialog>
</div>
