<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const wrapper = "contents";
  const trigger =
    "group relative grid w-full content-start gap-3 rounded-xl border border-line bg-surface p-3 text-left text-ink transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:opacity-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
  const cardMedia = "block h-28 overflow-hidden rounded-lg bg-subtle";
  const cardText = "grid gap-1 px-1 pb-1";
  const cardTitle = "text-sm font-medium text-ink";
  const cardDescription = "line-clamp-2 text-sm text-muted";
  const expandIcon =
    "absolute top-5 right-5 inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-200 ease-out group-hover:rotate-90 motion-reduce:transition-none";
  const dialogClass =
    "m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
  const panel = "relative";
  const dialogMedia = "h-48 overflow-hidden bg-subtle";
  const dialogBody = "grid gap-3 p-5";
  const dialogTitle = "pr-10 text-lg font-semibold text-ink";
  const dialogDescription = "text-sm text-muted";
  const details = "grid gap-3 text-sm text-ink";
  const footerClass = "flex flex-wrap justify-end gap-2 pt-2";
  const close =
    "absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const icon = "size-4";

  const OPEN_MS = 420;
  const CLOSE_MS = 320;
  const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

  const canAnimate = (el: HTMLElement) =>
    typeof el.animate === "function" &&
    !(
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    );

  /** Transform that puts the dialog exactly over the card (FLIP "first" frame). */
  function overCard(card: DOMRect, dialog: HTMLElement) {
    const box = dialog.getBoundingClientRect();
    return `translate(${card.left - box.left}px, ${card.top - box.top}px) scale(${card.width / box.width}, ${card.height / box.height})`;
  }

  /** Grow the dialog out of the card, or shrink it back into it. */
  function morph(
    dialog: HTMLElement,
    panelEl: HTMLElement,
    card: DOMRect,
    opening: boolean,
  ) {
    const duration = opening ? OPEN_MS : CLOSE_MS;
    // Stop a running grow or shrink first so the measurement below is not mid-flight.
    dialog
      .getAnimations?.({ subtree: true })
      .forEach((animation) => animation.cancel());
    const frames: Keyframe[] = [
      { transform: overCard(card, dialog), transformOrigin: "top left" },
      { transform: "none", transformOrigin: "top left" },
    ];
    const fade: Keyframe[] = [
      { opacity: 0 },
      { opacity: 0, offset: 0.35 },
      { opacity: 1 },
    ];
    // Closing holds the last frame until the dialog is closed, so it never flashes back to full size.
    const options: KeyframeAnimationOptions = {
      duration,
      easing: EASE,
      direction: opening ? "normal" : "reverse",
      fill: opening ? "none" : "forwards",
    };
    panelEl.animate(fade, options);
    dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
      ...options,
      pseudoElement: "::backdrop",
    });
    return dialog.animate(frames, options);
  }

  type Props = Omit<HTMLButtonAttributes, "title" | "type"> & {
    title: string;
    /** Short text, clamped to two lines on the card and shown in full when open. */
    description?: string;
    /** Image or illustration shown on top of the card and the open view. */
    media?: Snippet;
    /** Actions at the bottom of the open view. */
    footer?: Snippet;
    closeLabel?: string;
    children?: Snippet;
  };

  let {
    title,
    description,
    media,
    footer,
    closeLabel = "Close",
    id,
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const cardId = $derived(id ?? generatedId);
  const dialogId = $derived(`${cardId}-dialog`);
  let triggerEl = $state<HTMLButtonElement>();
  let dialogEl = $state<HTMLDialogElement>();
  let panelEl = $state<HTMLDivElement>();
  let closing = false;
  let open = $state(false);

  function show(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
    onclick?.(event);
    if (event.defaultPrevented || !dialogEl || !triggerEl || dialogEl.open)
      return;
    const from = triggerEl.getBoundingClientRect();
    dialogEl.showModal();
    open = true;
    if (canAnimate(dialogEl) && panelEl) morph(dialogEl, panelEl, from, true);
  }

  function hide() {
    const dialog = dialogEl;
    if (!dialog?.open || closing) return;
    if (!triggerEl || !panelEl || !canAnimate(dialog)) {
      dialog.close();
      return;
    }
    closing = true;
    const animation = morph(
      dialog,
      panelEl,
      triggerEl.getBoundingClientRect(),
      false,
    );
    animation.onfinish = () => dialog.close();
  }

  function handleClosed() {
    dialogEl
      ?.getAnimations?.({ subtree: true })
      .forEach((animation) => animation.cancel());
    closing = false;
    open = false;
    triggerEl?.focus();
  }

  function handleCancel(event: Event) {
    event.preventDefault();
    hide();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    hide();
  }

  function handleBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) hide();
  }
</script>

<div class={wrapper}>
  <button
    bind:this={triggerEl}
    id={cardId}
    type="button"
    aria-haspopup="dialog"
    aria-controls={dialogId}
    data-state={open ? "open" : "closed"}
    class={[trigger, className]}
    onclick={show}
    {...rest}
  >
    {#if media}
      <span class={cardMedia}>{@render media()}</span>
    {/if}
    <span class={cardText}>
      <span class={cardTitle}>{title}</span>
      {#if description}
        <span class={cardDescription}>{description}</span>
      {/if}
    </span>
    <span aria-hidden="true" class={expandIcon}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={icon}
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  </button>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <dialog
    bind:this={dialogEl}
    id={dialogId}
    aria-labelledby={`${cardId}-title`}
    data-state={open ? "open" : "closed"}
    class={dialogClass}
    onclose={handleClosed}
    oncancel={handleCancel}
    onkeydown={handleKeydown}
    onclick={handleBackdrop}
  >
    <div bind:this={panelEl} class={panel}>
      <button
        type="button"
        aria-label={closeLabel}
        class={close}
        onclick={hide}
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
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      {#if media}
        <div class={dialogMedia}>{@render media()}</div>
      {/if}
      <div class={dialogBody}>
        <h2 id={`${cardId}-title`} class={dialogTitle}>{title}</h2>
        {#if description}
          <p class={dialogDescription}>{description}</p>
        {/if}
        {#if children}
          <div class={details}>{@render children()}</div>
        {/if}
        {#if footer}
          <div class={footerClass}>{@render footer()}</div>
        {/if}
      </div>
    </div>
  </dialog>
</div>
