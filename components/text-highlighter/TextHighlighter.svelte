<script lang="ts" module>
  export type TextHighlighterDirection = "ltr" | "rtl" | "ttb" | "btt";
</script>

<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const base =
    "bg-transparent text-ink bg-no-repeat box-decoration-clone [--markas-th-fill:color-mix(in_oklab,var(--markas-th-c)_var(--markas-th-a,28%),transparent)] -mx-[0.12em] px-[0.12em] bg-left [background-size:var(--markas-th-size,0%_100%)] data-[direction=rtl]:bg-right data-[direction=ttb]:bg-top data-[direction=btt]:bg-bottom data-[direction$=b]:[--markas-th-size:100%_0%] data-[state=active]:[background-size:100%_100%] transition-[background-size] ease-out motion-reduce:transition-none motion-reduce:data-[trigger=view]:[background-size:100%_100%] motion-reduce:data-[trigger=auto]:[background-size:100%_100%]";
  const variants = {
    solid:
      "rounded-[0.2em] [background-image:linear-gradient(var(--markas-th-fill)_0_0)]",
    marker:
      "rounded-[0.1em_0.5em_0.2em_0.6em] [background-image:linear-gradient(transparent_40%,var(--markas-th-fill)_40%_94%,transparent_94%)]",
    underline:
      "[background-image:linear-gradient(transparent_84%,var(--markas-th-c)_84%)]",
    gradient:
      "rounded-[0.2em] [background-image:linear-gradient(100deg,var(--markas-th-fill),color-mix(in_oklab,var(--markas-th-c2,var(--color-warning))_var(--markas-th-a,28%),transparent))]",
  };
  const colors = {
    warning:
      "[--markas-th-c:var(--color-warning)] [--markas-th-c2:var(--color-danger)]",
    primary: "[--markas-th-a:16%] [--markas-th-c:var(--color-primary)]",
    "primary-soft":
      "[--markas-th-a:100%] [--markas-th-c:var(--color-primary-soft)]",
    success: "[--markas-th-c:var(--color-success)]",
    danger: "[--markas-th-c:var(--color-danger)]",
  };

  /** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
  const TRIGGER = "a, button, label, [tabindex]";
  /** The first two events draw the highlight, the last two clear it. */
  const EVENTS = ["pointerenter", "focusin", "pointerleave", "focusout"];

  type Props = HTMLAttributes<HTMLElement> & {
    as?: string;
    trigger?: "view" | "hover" | "auto" | "manual";
    direction?: TextHighlighterDirection;
    variant?: keyof typeof variants;
    color?: keyof typeof colors;
    /** Highlight state for trigger manual. */
    active?: boolean;
    /** Trigger view: draw once, or clear again when the text leaves the viewport. */
    once?: boolean;
    /** Trigger view: how much of the text must be visible (0 to 1). */
    threshold?: number;
    duration?: number;
    delay?: number;
    children?: Snippet;
  };

  let {
    as = "span",
    trigger = "view",
    direction = "ltr",
    variant = "solid",
    color = "warning",
    active = false,
    once = true,
    threshold = 0.5,
    duration = 700,
    delay = 0,
    class: className,
    style,
    children,
    ...rest
  }: Props = $props();

  let element = $state<HTMLElement>();
  let on = $state(untrack(() => active));
  /** A direction from animate(direction) wins over the direction prop. */
  let override = $state<TextHighlighterDirection>();

  // Manual follows active every time it changes.
  $effect.pre(() => {
    if (trigger === "manual") on = active;
  });

  $effect(() => {
    const options = { trigger, once, threshold };
    if (!element || options.trigger === "manual") return;
    if (options.trigger === "hover") {
      const target = element.closest<HTMLElement>(TRIGGER) ?? element;
      const toggle = (event: Event) => (on = EVENTS.indexOf(event.type) < 2);
      EVENTS.forEach((name) => target.addEventListener(name, toggle));
      return () =>
        EVENTS.forEach((name) => target.removeEventListener(name, toggle));
    }
    // Auto draws right away. offsetWidth applies the empty start first, so the transition runs.
    if (options.trigger === "auto") {
      void element.offsetWidth;
      on = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && options.once) observer.disconnect();
        if (visible || !options.once) on = visible;
      },
      { threshold: options.threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  });

  const styleText = $derived(
    [`transition-duration: ${duration}ms; transition-delay: ${delay}ms`, style]
      .filter(Boolean)
      .join("; "),
  );

  /** Draws the highlight, optionally from another direction. */
  export function animate(next?: TextHighlighterDirection) {
    if (next) override = next;
    on = true;
  }

  /** Clears the highlight. */
  export function reset() {
    on = false;
  }
</script>

<svelte:element
  this={as}
  bind:this={element}
  data-state={on ? "active" : "inactive"}
  data-direction={override ?? direction}
  data-trigger={trigger}
  {...rest}
  class={[base, variants[variant], colors[color], className]}
  style={styleText}>{@render children?.()}</svelte:element
>
