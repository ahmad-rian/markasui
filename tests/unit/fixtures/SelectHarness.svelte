<script lang="ts">
  import Select from "../../../components/select/Select.svelte";

  let city = $state<string>();
</script>

<Select bind:value={city} name="city" label="City" hint="Pick one" class="ml-1">
  <option value="jakarta">Jakarta</option>
  <option value="bandung" selected>Bandung</option>
</Select>
<output>{city ?? "none"}</output>
