<script lang="ts" module>
  /** Split code into lines, ignoring one trailing empty line. */
  export const splitLines = (code: string): string[] =>
    code.replace(/\r?\n$/, "").split(/\r?\n/);
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  const root = "overflow-hidden rounded-xl border border-line bg-subtle";
  const header =
    "flex items-center gap-2 border-b border-line py-1.5 pr-1.5 pl-4";
  const titleClass = "min-w-0 truncate text-xs font-medium text-muted";
  const copyButton =
    "ml-auto inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
  const icon = "size-4";
  const pre =
    "overflow-x-auto p-4 font-mono text-sm leading-6 text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
  const lineClass = "block min-h-6 whitespace-pre";
  const lineNumber =
    "mr-4 inline-block min-w-6 text-right text-muted select-none";

  const COPIED_DURATION = 2000;

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    code: string;
    title?: string;
    showLineNumbers?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
  };

  let {
    code,
    title,
    showLineNumbers = false,
    copyLabel = "Copy code",
    copiedLabel = "Copied",
    class: className,
    ...rest
  }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const lines = $derived(splitLines(code));

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      copied = false;
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), COPIED_DURATION);
  }

  onDestroy(() => clearTimeout(timer));
</script>

<div class={[root, className]} {...rest}>
  <div class={header}>
    {#if title}<span class={titleClass}>{title}</span>{/if}
    <button
      type="button"
      data-state={copied ? "copied" : "idle"}
      class={copyButton}
      onclick={copy}
    >
      {#if copied}
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
          <path d="m5 12 5 5L20 7" />
        </svg>
      {:else}
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
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      {/if}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre tabindex="0" class={pre}><code
      >{#each lines as line, index (index)}<span class={lineClass}
          >{#if showLineNumbers}<span aria-hidden="true" class={lineNumber}
              >{index + 1}</span
            >{/if}{line}</span
        >{/each}</code
    ></pre>
</div>
