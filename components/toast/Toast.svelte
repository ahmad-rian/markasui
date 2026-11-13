<script module lang="ts">
  const DEFAULT_DURATION = 5000;

  export type ToastVariant = "default" | "success" | "danger";
  export type ToastOptions = {
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** Milliseconds before the toast dismisses itself. 0 keeps it open. */
    duration?: number;
  };
  type ToastItem = Required<Omit<ToastOptions, "description">> & {
    id: number;
    description?: string;
  };
  type Timer = {
    handle?: ReturnType<typeof setTimeout>;
    remaining: number;
    startedAt: number;
  };

  // Module store: one toast queue for the whole app.
  let toasts = $state<ToastItem[]>([]);
  const timers = new Map<number, Timer>();
  let nextId = 0;

  /** On the server (SSR) there is no queue or timer, so every toast function does nothing. */
  const isServer = () => typeof window === "undefined";

  function startTimer(id: number, ms: number) {
    timers.set(id, {
      handle: setTimeout(() => dismissToast(id), ms),
      remaining: ms,
      startedAt: Date.now(),
    });
  }

  export function dismissToast(id: number) {
    if (isServer()) return;
    clearTimeout(timers.get(id)?.handle);
    timers.delete(id);
    toasts = toasts.filter((item) => item.id !== id);
  }

  export function pauseToast(id: number) {
    if (isServer()) return;
    const timer = timers.get(id);
    if (!timer?.handle) return;
    clearTimeout(timer.handle);
    timers.set(id, {
      remaining: timer.remaining - (Date.now() - timer.startedAt),
      startedAt: 0,
    });
  }

  export function resumeToast(id: number) {
    if (isServer()) return;
    const timer = timers.get(id);
    if (!timer || timer.handle) return;
    startTimer(id, Math.max(timer.remaining, 0));
  }

  /** Show a toast from anywhere. Returns an id for dismissToast(), or 0 on the server. */
  export function toast({
    title,
    description,
    variant = "default",
    duration = DEFAULT_DURATION,
  }: ToastOptions): number {
    if (isServer()) return 0;
    const id = ++nextId;
    toasts = [...toasts, { id, title, description, variant, duration }];
    if (duration > 0) startTimer(id, duration);
    return id;
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const region =
    "pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2";
  const card =
    "pointer-events-auto flex items-start gap-3 rounded-lg border bg-surface p-4 text-sm text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none";
  const variants = {
    default: "border-line",
    success: "border-success/40",
    danger: "border-danger/40",
  };
  const iconBase = "mt-0.5 size-4 shrink-0";
  const iconVariants = {
    default: "",
    success: "text-success",
    danger: "text-danger",
  };
  const icons = {
    default: "",
    success: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8.5 12l2.5 2.5 4.5-5",
    danger: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM15 9l-6 6M9 9l6 6",
  };
  const content = "grid flex-1 gap-1";
  const titleClass = "font-semibold";
  const descriptionClass = "text-muted";
  const close =
    "-mt-1 -mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

  type Props = HTMLAttributes<HTMLDivElement> & {
    /** Accessible label of the close button on each toast. */
    closeLabel?: string;
    /** Accessible label of the live region. */
    regionLabel?: string;
  };

  let {
    closeLabel = "Close",
    regionLabel = "Notifications",
    class: className,
    ...rest
  }: Props = $props();

  function handleMouseLeave(
    id: number,
    event: MouseEvent & { currentTarget: HTMLElement },
  ) {
    if (!event.currentTarget.contains(document.activeElement)) resumeToast(id);
  }

  function handleFocusOut(
    id: number,
    event: FocusEvent & { currentTarget: HTMLElement },
  ) {
    const target = event.currentTarget;
    if (target.contains(event.relatedTarget as Node | null)) return;
    if (target.matches(":hover")) return;
    resumeToast(id);
  }
</script>

<div
  role="status"
  aria-live="polite"
  aria-label={regionLabel}
  class={[region, className]}
  {...rest}
>
  {#each toasts as item (item.id)}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      data-state="open"
      class={[card, variants[item.variant]]}
      onmouseenter={() => pauseToast(item.id)}
      onmouseleave={(event) => handleMouseLeave(item.id, event)}
      onfocusin={() => pauseToast(item.id)}
      onfocusout={(event) => handleFocusOut(item.id, event)}
    >
      {#if icons[item.variant]}
        <svg
          class={[iconBase, iconVariants[item.variant]]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d={icons[item.variant]} />
        </svg>
      {/if}
      <div class={content}>
        <p class={titleClass}>{item.title}</p>
        {#if item.description}
          <p class={descriptionClass}>{item.description}</p>
        {/if}
      </div>
      <button
        type="button"
        class={close}
        aria-label={closeLabel}
        onclick={() => dismissToast(item.id)}
      >
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
    </div>
  {/each}
</div>
