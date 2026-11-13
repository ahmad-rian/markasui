<script module lang="ts">
  import type { Snippet } from "svelte";

  export type ToggleGroupItem = {
    value: string;
    /** Text, or a snippet for an icon (pass ariaLabel then). */
    label: string | Snippet;
    ariaLabel?: string;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
  const item =
    "inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:bg-surface data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";

  const STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

  type Props = Omit<HTMLAttributes<HTMLDivElement>, "role"> & {
    items: ToggleGroupItem[];
    label?: string;
    type?: "single" | "multiple";
    /** Pressed items, bindable with bind:value. A string for single, an array for multiple. */
    value?: string | string[];
  };

  let {
    items,
    label,
    type = "single",
    value = $bindable(),
    class: className,
    onkeydown,
    ...rest
  }: Props = $props();

  const toArray = (entry: string | string[] | undefined) =>
    Array.isArray(entry) ? entry : entry ? [entry] : [];

  let focused = $state<string>();
  const selected = $derived(toArray(value));
  const tabStop = $derived(focused ?? selected[0] ?? items[0]?.value);

  function toggle(key: string) {
    focused = key;
    const wanted = selected.includes(key)
      ? selected.filter((entry) => entry !== key)
      : type === "multiple"
        ? [...selected, key]
        : [key];
    const next = items
      .map((entry) => entry.value)
      .filter((entry) => wanted.includes(entry));
    value = type === "multiple" ? next : (next[0] ?? "");
  }

  function handleKeydown(
    event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    onkeydown?.(event);
    const step = STEPS[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        ":scope > button",
      ),
    );
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const target = buttons[(index + step + buttons.length) % buttons.length];
    if (!target) return;
    focused = target.dataset.value;
    target.focus();
  }
</script>

<div
  role="group"
  aria-label={label}
  onkeydown={handleKeydown}
  class={[root, className]}
  {...rest}
>
  {#each items as entry (entry.value)}
    {@const isOn = selected.includes(entry.value)}
    <button
      type="button"
      data-value={entry.value}
      aria-pressed={isOn ? "true" : "false"}
      data-state={isOn ? "on" : "off"}
      tabindex={entry.value === tabStop ? 0 : -1}
      aria-label={entry.ariaLabel}
      onclick={() => toggle(entry.value)}
      class={item}
    >
      {#if typeof entry.label === "string"}{entry.label}{:else}{@render entry.label()}{/if}
    </button>
  {/each}
</div>
