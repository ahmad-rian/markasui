<script lang="ts">
  import Checkbox from "../../../components/checkbox/Checkbox.svelte";

  let checked = $state(false);
</script>

<Checkbox
  bind:checked
  label="Remember me"
  description="For 30 days."
  class="ml-1"
/>
<output>{checked ? "on" : "off"}</output>
