<script lang="ts">
  import ToggleGroup from "../../../components/toggle-group/ToggleGroup.svelte";

  let {
    type = "single",
    value = $bindable("b"),
  }: { type?: "single" | "multiple"; value?: string | string[] } = $props();
</script>

{#snippet icon()}
  <svg aria-hidden="true"></svg>
{/snippet}

<ToggleGroup
  bind:value
  {type}
  label="View"
  class="w-full"
  items={[
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
    { value: "c", label: icon, ariaLabel: "Gamma" },
  ]}
/>
<output>{JSON.stringify(value)}</output>
