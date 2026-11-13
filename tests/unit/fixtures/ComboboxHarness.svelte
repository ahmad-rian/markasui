<script lang="ts">
  import Combobox from "../../../components/combobox/Combobox.svelte";

  let { onvaluechange }: { onvaluechange?: (value: string) => void } = $props();
  let country = $state("au");
  const options = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
    { value: "my", label: "Malaysia" },
  ];
</script>

<Combobox
  bind:value={country}
  id="c"
  name="country"
  label="Country"
  emptyLabel="Tidak ada hasil"
  class="max-w-xs"
  {options}
  {onvaluechange}
/>
<output>{country}</output>
<button type="button" onclick={() => (country = "my")}>Pick</button>
