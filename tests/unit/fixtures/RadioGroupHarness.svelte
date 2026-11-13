<script lang="ts">
  import RadioGroup from "../../../components/radio-group/RadioGroup.svelte";

  let value = $state("pro");
</script>

<RadioGroup
  bind:value
  name="plan"
  label="Plan"
  class="mt-2"
  options={[
    { value: "free", label: "Free", description: "For personal projects." },
    { value: "pro", label: "Pro" },
  ]}
/>
<output>{value}</output>
