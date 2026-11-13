<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const wrapper = "contents";
  const base =
    "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
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
  const iconSizes = {
    sm: "size-8 rounded-md text-sm",
    md: "size-10 rounded-lg text-sm",
    lg: "size-12 rounded-lg text-base",
  };
  const iconStack = "grid size-4 shrink-0 place-items-center";
  const copyIcon =
    "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-50 group-data-[state=copied]:opacity-0 motion-reduce:transition-none";
  const checkIcon =
    "col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-100 group-data-[state=copied]:opacity-100 motion-reduce:transition-none";
  const checkPath =
    "[stroke-dasharray:24] [stroke-dashoffset:24] transition-[stroke-dashoffset] delay-100 duration-300 ease-out group-data-[state=copied]:[stroke-dashoffset:0] motion-reduce:transition-none";
  const srOnly = "sr-only";

  /** How long the check mark stays before the button returns to idle. */
  const RESET_DELAY = 2000;

  type Props = HTMLButtonAttributes & {
    /** Text written to the clipboard. */
    text: string;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    copyLabel?: string;
    copiedLabel?: string;
    children?: Snippet;
  };

  let {
    text,
    variant = "primary",
    size = "md",
    copyLabel = "Copy",
    copiedLabel = "Copied",
    type = "button",
    class: className,
    children,
    onclick,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onDestroy(() => clearTimeout(timer));

  async function copy(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onclick?.(event);
    if (event.defaultPrevented) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard blocked or unavailable: stay idle so the check mark never lies.
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), RESET_DELAY);
  }
</script>

<span class={wrapper}>
  <button
    {type}
    data-state={copied ? "copied" : "idle"}
    onclick={copy}
    class={[
      base,
      variants[variant],
      children ? sizes[size] : iconSizes[size],
      className,
    ]}
    {...rest}
  >
    <span class={iconStack} aria-hidden="true">
      <svg
        class={copyIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
      </svg>
      <svg
        class={checkIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path class={checkPath} d="m4 12 5 5L20 6" />
      </svg>
    </span>
    {#if children}{@render children()}{:else}<span class={srOnly}
        >{copyLabel}</span
      >{/if}
  </button>
  <span role="status" class={srOnly}>{copied ? copiedLabel : ""}</span>
</span>
