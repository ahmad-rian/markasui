<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-block";
  const triggerClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
  const panel =
    "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

  const GAP = 4;
  const FOCUSABLE =
    "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

  type Side = "top" | "bottom";
  type Align = "start" | "center" | "end";

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Text of the trigger button. */
    label?: string;
    /** Custom trigger button content, replaces label. */
    trigger?: Snippet;
    side?: Side;
    align?: Align;
    children?: Snippet;
  };

  let {
    label = "Open",
    trigger,
    side = "bottom",
    align = "start",
    id,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const panelId = $derived(id ?? generatedId);
  let triggerEl = $state<HTMLButtonElement>();
  let panelEl = $state<HTMLDivElement>();
  let open = $state(false);
  const dataState = $derived(open ? "open" : "closed");

  /** Place the panel on the chosen side with the chosen alignment, flip when it does not fit. */
  function place() {
    if (!triggerEl || !panelEl) return;
    const anchor = triggerEl.getBoundingClientRect();
    const { width, height } = panelEl.getBoundingClientRect();
    const above = anchor.top - GAP - height;
    const below = anchor.bottom + GAP;
    const fitsAbove = above >= 0;
    const fitsBelow = below + height <= window.innerHeight;
    const onTop =
      side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
    const starts: Record<Align, number> = {
      start: anchor.left,
      center: anchor.left + anchor.width / 2 - width / 2,
      end: anchor.right - width,
    };
    const start = starts[align] ?? starts.start;
    const left = Math.max(
      GAP,
      Math.min(start, window.innerWidth - width - GAP),
    );
    panelEl.style.top = `${onTop ? above : below}px`;
    panelEl.style.left = `${left}px`;
  }

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

  // beforetoggle runs synchronously, so the state is current for the next click.
  function handleBeforeToggle(event: ToggleEvent) {
    open = event.newState === "open";
  }

  function handleToggle(event: ToggleEvent) {
    if (!panelEl) return;
    if (event.newState === "open") {
      place();
      panelEl.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      return;
    }
    // Focus returns to the trigger, unless the user already moved it outside the panel.
    const active = document.activeElement;
    if (active === document.body || panelEl.contains(active))
      triggerEl?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    panelEl?.hidePopover();
    triggerEl?.focus();
  }
</script>

<div class={[root, className]} {...rest}>
  <button
    bind:this={triggerEl}
    type="button"
    id={`${panelId}-trigger`}
    popovertarget={panelId}
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={panelId}
    data-state={dataState}
    class={triggerClass}
  >
    {#if trigger}{@render trigger()}{:else}{label}{/if}
  </button>
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    bind:this={panelEl}
    id={panelId}
    popover="auto"
    role="dialog"
    aria-labelledby={`${panelId}-trigger`}
    data-state={dataState}
    class={panel}
    onbeforetoggle={handleBeforeToggle}
    ontoggle={handleToggle}
    onkeydown={handleKeydown}
  >
    {@render children?.()}
  </div>
</div>
