<script lang="ts">
  import PromptInput from "../../components/prompt-input/PromptInput.svelte";

  const tool =
    "inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-primary-line aria-pressed:bg-primary-soft aria-pressed:text-ink motion-reduce:transition-none";
  const icon = "size-3.5";

  const tools = [
    {
      label: "Search",
      icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
    },
    {
      label: "Reason",
      icon: "M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3zM9 21h6",
    },
  ];

  let active = $state<string[]>(["Search"]);
  const toggle = (label: string) => {
    active = active.includes(label)
      ? active.filter((item) => item !== label)
      : [...active, label];
  };
</script>

<PromptInput placeholderLabel="Ask about your sales, invoices, or stock">
  {#snippet actions()}
    {#each tools as item (item.label)}
      <button
        type="button"
        aria-pressed={active.includes(item.label)}
        class={tool}
        onclick={() => toggle(item.label)}
      >
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
          <path d={item.icon} />
        </svg>{item.label}
      </button>
    {/each}
  {/snippet}
</PromptInput>
