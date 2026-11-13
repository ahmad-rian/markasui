<script lang="ts">
  import ToggleGroup from "../../components/toggle-group/ToggleGroup.svelte";
</script>

{#snippet leftIcon()}
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
    <path d="M4 6h16M4 12h10M4 18h14" />
  </svg>
{/snippet}

{#snippet centerIcon()}
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
    <path d="M4 6h16M7 12h10M5 18h14" />
  </svg>
{/snippet}

{#snippet rightIcon()}
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
    <path d="M4 6h16M10 12h10M6 18h14" />
  </svg>
{/snippet}

<div class="flex justify-center">
  <ToggleGroup
    label="Text alignment"
    value="left"
    items={[
      { value: "left", label: leftIcon, ariaLabel: "Align left" },
      { value: "center", label: centerIcon, ariaLabel: "Align center" },
      { value: "right", label: rightIcon, ariaLabel: "Align right" },
    ]}
  />
</div>
