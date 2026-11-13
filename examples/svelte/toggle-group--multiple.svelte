<script lang="ts">
  import ToggleGroup from "../../components/toggle-group/ToggleGroup.svelte";
</script>

{#snippet boldIcon()}
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
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" />
  </svg>
{/snippet}

{#snippet italicIcon()}
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
    <path d="M10 4h9M5 20h9M15 4 9 20" />
  </svg>
{/snippet}

{#snippet underlineIcon()}
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
    <path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14" />
  </svg>
{/snippet}

<div class="flex justify-center">
  <ToggleGroup
    type="multiple"
    label="Text style"
    value={["bold", "underline"]}
    items={[
      { value: "bold", label: boldIcon, ariaLabel: "Bold" },
      { value: "italic", label: italicIcon, ariaLabel: "Italic" },
      { value: "underline", label: underlineIcon, ariaLabel: "Underline" },
    ]}
  />
</div>
