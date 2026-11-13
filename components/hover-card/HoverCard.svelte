<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-block";
  const card =
    "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

  const GAP = 8;
  const SHOW_DELAY = 400;
  /** Short delay so the pointer can move from the trigger to the card. */
  const HIDE_DELAY = 100;

  type Props = HTMLAttributes<HTMLSpanElement> & {
    /** Content of the preview card. */
    content?: Snippet;
    children?: Snippet;
  };

  let { content, id, class: className, children, ...rest }: Props = $props();

  const generatedId = $props.id();
  const cardId = $derived(id ?? generatedId);
  let rootEl = $state<HTMLSpanElement>();
  let cardEl = $state<HTMLSpanElement>();
  let open = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function show() {
    clearTimeout(timer);
    cardEl?.showPopover();
  }

  function showLater() {
    clearTimeout(timer);
    if (open) return;
    timer = setTimeout(show, SHOW_DELAY);
  }

  function hide() {
    clearTimeout(timer);
    cardEl?.hidePopover();
  }

  function hideLater() {
    clearTimeout(timer);
    timer = setTimeout(hide, HIDE_DELAY);
  }

  // Focus that moves into the card (a link in the card, for example) keeps it open.
  function handleFocusOut(event: FocusEvent) {
    if (!rootEl?.contains(event.relatedTarget as Node | null)) hide();
  }

  /** Place the card below the center of the trigger, flip above when it does not fit. */
  function place() {
    if (!rootEl || !cardEl) return;
    const anchor = rootEl.getBoundingClientRect();
    const { width, height } = cardEl.getBoundingClientRect();
    const above = anchor.top - GAP - height;
    const below = anchor.bottom + GAP;
    const onTop = below + height > window.innerHeight && above >= 0;
    const left = Math.max(
      GAP,
      Math.min(
        anchor.left + anchor.width / 2 - width / 2,
        window.innerWidth - width - GAP,
      ),
    );
    cardEl.style.top = `${onTop ? above : below}px`;
    cardEl.style.left = `${left}px`;
  }

  function handleToggle(event: ToggleEvent) {
    open = event.newState === "open";
    if (open) place();
  }

  // The first element is the trigger: link it to the card. Escape hides the card anywhere.
  $effect(() => {
    const trigger = rootEl?.firstElementChild;
    const described = trigger?.getAttribute("aria-describedby") ?? "";
    if (trigger && trigger !== cardEl && !described.split(" ").includes(cardId))
      trigger.setAttribute(
        "aria-describedby",
        [described, cardId].filter(Boolean).join(" "),
      );

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      clearTimeout(timer);
    };
  });

  // Re-place while open when the page scrolls or the window resizes.
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
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  bind:this={rootEl}
  {...rest}
  class={[root, className]}
  onmouseenter={showLater}
  onmouseleave={hideLater}
  onfocusin={show}
  onfocusout={handleFocusOut}
>
  {@render children?.()}<span
    bind:this={cardEl}
    id={cardId}
    popover="manual"
    data-state={open ? "open" : "closed"}
    class={card}
    ontoggle={handleToggle}>{@render content?.()}</span
  >
</span>
