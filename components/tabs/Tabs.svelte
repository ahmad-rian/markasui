<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type TabItem = {
    value: string;
    label: string;
    /** Panel content: plain text or a snippet. */
    content?: string | Snippet;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "w-full";
  const list = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
  const tab =
    "inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
  const panel =
    "mt-4 rounded-md text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  type Props = HTMLAttributes<HTMLDivElement> & {
    items: TabItem[];
    defaultValue?: string;
    /** Active tab, bindable with bind:value. */
    value?: string;
    onValueChange?: (value: string) => void;
  };

  let {
    items,
    defaultValue,
    value = $bindable(),
    onValueChange,
    id,
    class: className,
    ...rest
  }: Props = $props();

  const generatedId = $props.id();
  const tabsId = $derived(id ?? generatedId);
  const active = $derived(value ?? defaultValue ?? items[0]?.value);

  function select(next: string) {
    value = next;
    onValueChange?.(next);
  }

  function handleKeydown(event: KeyboardEvent) {
    const keys = items.map((item) => item.value);
    const index = keys.indexOf(active ?? "");
    const targets: Record<string, string | undefined> = {
      ArrowRight: keys[(index + 1) % keys.length],
      ArrowLeft: keys[(index - 1 + keys.length) % keys.length],
      Home: keys[0],
      End: keys[keys.length - 1],
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target);
    document.getElementById(`${tabsId}-tab-${target}`)?.focus();
  }
</script>

<div id={tabsId} class={[root, className]} {...rest}>
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    role="tablist"
    aria-orientation="horizontal"
    class={list}
    onkeydown={handleKeydown}
  >
    {#each items as item (item.value)}
      {@const selected = item.value === active}
      <button
        type="button"
        role="tab"
        id={`${tabsId}-tab-${item.value}`}
        aria-controls={`${tabsId}-panel-${item.value}`}
        aria-selected={selected}
        tabindex={selected ? 0 : -1}
        data-state={selected ? "active" : "inactive"}
        onclick={() => select(item.value)}
        class={tab}>{item.label}</button
      >
    {/each}
  </div>
  {#each items as item (item.value)}
    {@const selected = item.value === active}
    <div
      role="tabpanel"
      id={`${tabsId}-panel-${item.value}`}
      aria-labelledby={`${tabsId}-tab-${item.value}`}
      tabindex="0"
      data-state={selected ? "active" : "inactive"}
      hidden={!selected}
      class={panel}
    >
      {#if typeof item.content === "string"}{item.content}{:else}{@render item.content?.()}{/if}
    </div>
  {/each}
</div>
