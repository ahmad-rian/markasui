<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-flex";
  const tooltip =
    "inset-auto m-0 max-w-64 rounded-md bg-ink px-2 py-1 text-xs font-medium text-canvas shadow-overlay";

  const GAP = 6;
  const SHOW_DELAY = 300;

  type Side = "top" | "bottom";

  /** Places the tooltip centered on the trigger on the chosen side, flipping when it does not fit. */
  function placeTooltip(trigger: HTMLElement, tip: HTMLElement, side: Side) {
    const anchor = trigger.getBoundingClientRect();
    const { width, height } = tip.getBoundingClientRect();
    const above = anchor.top - GAP - height;
    const below = anchor.bottom + GAP;
    const fitsAbove = above >= 0;
    const fitsBelow = below + height <= window.innerHeight;
    const onTop =
      side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
    const left = Math.max(
      GAP,
      Math.min(
        anchor.left + anchor.width / 2 - width / 2,
        window.innerWidth - width - GAP,
      ),
    );
    tip.style.top = `${onTop ? above : below}px`;
    tip.style.left = `${left}px`;
  }

  /** Re-runs placement on scroll and resize. Returns the cleanup function. */
  function followViewport(update: () => void) {
    const scrollOptions = { capture: true, passive: true };
    window.addEventListener("scroll", update, scrollOptions);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update, scrollOptions);
      window.removeEventListener("resize", update);
    };
  }

  type Props = HTMLAttributes<HTMLSpanElement> & {
    content: string;
    side?: Side;
    children?: Snippet;
  };

  let {
    content,
    side = "top",
    id,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const tooltipId = $derived(id ?? generatedId);
  let rootEl = $state<HTMLSpanElement>();
  let tip = $state<HTMLSpanElement>();
  let open = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  function show() {
    clearTimeout(timer);
    tip?.showPopover();
  }

  function showLater() {
    clearTimeout(timer);
    timer = setTimeout(show, SHOW_DELAY);
  }

  function hide() {
    clearTimeout(timer);
    tip?.hidePopover();
  }

  function place() {
    if (rootEl && tip) placeTooltip(rootEl, tip, side);
  }

  function handleToggle(event: ToggleEvent) {
    open = event.newState === "open";
    if (open) place();
  }

  $effect(() => {
    const trigger = rootEl?.firstElementChild;
    const described = trigger?.getAttribute("aria-describedby") ?? "";
    if (trigger && trigger !== tip && !described.split(" ").includes(tooltipId))
      trigger.setAttribute(
        "aria-describedby",
        [described, tooltipId].filter(Boolean).join(" "),
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

  $effect(() => {
    if (open) return followViewport(place);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  bind:this={rootEl}
  {...rest}
  class={[root, className]}
  onmouseenter={showLater}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
>
  {@render children?.()}<span
    bind:this={tip}
    id={tooltipId}
    popover="manual"
    role="tooltip"
    data-state={open ? "open" : "closed"}
    class={tooltip}
    ontoggle={handleToggle}>{content}</span
  >
</span>
