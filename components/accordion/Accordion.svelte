<script lang="ts" module>
  import type { Snippet } from "svelte";

  export type AccordionItem = {
    value: string;
    title: string;
    /** Plain text or a snippet for rich content. */
    content?: string | Snippet;
  };
</script>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const root = "w-full divide-y divide-line border-y border-line";
  const item = "group";
  const summary =
    "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
  const icon =
    "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
  const content = "pb-4 text-sm text-muted";

  type Props = HTMLAttributes<HTMLDivElement> & {
    items: AccordionItem[];
    type?: "single" | "multiple";
    defaultValue?: string | string[];
  };

  let {
    items,
    type = "single",
    defaultValue,
    class: className,
    ...rest
  }: Props = $props();

  const generatedName = $props.id();
  const openValues = $derived.by(() => {
    const defaults = ([] as string[]).concat(defaultValue ?? []);
    return type === "single" ? defaults.slice(0, 1) : defaults;
  });
  const name = $derived(type === "single" ? generatedName : undefined);
</script>

<div class={[root, className]} {...rest}>
  {#each items as entry (entry.value)}
    <details class={item} {name} open={openValues.includes(entry.value)}>
      <summary class={summary}>
        <span>{entry.title}</span>
        <svg
          class={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div class={content}>
        {#if typeof entry.content === "function"}
          {@render entry.content()}
        {:else}
          {entry.content ?? ""}
        {/if}
      </div>
    </details>
  {/each}
</div>
