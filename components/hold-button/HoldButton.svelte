<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const wrapper = "contents";
  const base =
    "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-strong",
    secondary: "border border-line bg-surface text-ink hover:bg-subtle",
    ghost: "text-ink hover:bg-subtle",
    danger: "bg-danger text-on-primary hover:bg-danger/90",
  };
  const sizes = {
    sm: "h-8 rounded-md px-3 text-sm",
    md: "h-10 rounded-lg px-4 text-sm",
    lg: "h-12 rounded-lg px-6 text-base",
  };
  const fill =
    "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-data-[state=complete]:scale-x-100 group-data-[state=holding]:scale-x-100 group-data-[state=holding]:duration-(--hold-duration) group-data-[state=holding]:ease-linear";
  const fillVariants = {
    primary: "bg-on-primary/25",
    secondary: "bg-primary/10",
    ghost: "bg-primary/10",
    danger: "bg-on-primary/25",
  };
  const srOnly = "sr-only";

  const HOLD_KEYS = new Set([" ", "Enter"]);

  type Props = HTMLButtonAttributes & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** How long the button must be held, in milliseconds. */
    duration?: number;
    /** Hidden hint read by screen readers. */
    holdLabel?: string;
    /** Called once the hold reaches the full duration. */
    oncomplete?: () => void;
    children?: Snippet;
  };

  let {
    variant = "primary",
    size = "md",
    duration = 1500,
    holdLabel = "Press and hold to confirm",
    oncomplete,
    type = "button",
    class: className,
    style,
    children,
    onpointerdown,
    onpointerup,
    onpointerleave,
    onpointercancel,
    onkeydown,
    onkeyup,
    onblur,
    ...rest
  }: Props = $props();

  const hintId = $props.id();
  let state = $state<"idle" | "holding" | "complete">("idle");
  let timer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timer));

  type Handler<E extends Event> = E & {
    currentTarget: EventTarget & HTMLButtonElement;
  };

  function start() {
    if (state !== "idle") return;
    state = "holding";
    timer = setTimeout(() => {
      state = "complete";
      oncomplete?.();
    }, duration);
  }
  function cancel() {
    clearTimeout(timer);
    state = "idle";
  }
</script>

<span class={wrapper}>
  <button
    {type}
    data-state={state}
    aria-describedby={hintId}
    style={`${style ? `${style};` : ""}--hold-duration: ${duration}ms`}
    class={[base, variants[variant], sizes[size], className]}
    onpointerdown={(event: Handler<PointerEvent>) => {
      onpointerdown?.(event);
      if (event.button === 0) start();
    }}
    onpointerup={(event: Handler<PointerEvent>) => {
      onpointerup?.(event);
      cancel();
    }}
    onpointerleave={(event: Handler<PointerEvent>) => {
      onpointerleave?.(event);
      cancel();
    }}
    onpointercancel={(event: Handler<PointerEvent>) => {
      onpointercancel?.(event);
      cancel();
    }}
    onkeydown={(event: Handler<KeyboardEvent>) => {
      onkeydown?.(event);
      if (!HOLD_KEYS.has(event.key)) return;
      event.preventDefault();
      if (!event.repeat) start();
    }}
    onkeyup={(event: Handler<KeyboardEvent>) => {
      onkeyup?.(event);
      if (HOLD_KEYS.has(event.key)) cancel();
    }}
    onblur={(event: Handler<FocusEvent>) => {
      onblur?.(event);
      cancel();
    }}
    oncontextmenu={(event) => event.preventDefault()}
    {...rest}
  >
    <span class={[fill, fillVariants[variant]]} aria-hidden="true"></span>
    {@render children?.()}
  </button>
  <span id={hintId} class={srOnly}>{holdLabel}</span>
</span>
