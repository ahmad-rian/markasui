<script lang="ts">
  import Switch from "../../../components/switch/Switch.svelte";

  let checked = $state(false);
</script>

<Switch bind:checked label="Wi-Fi" class="ml-1" />
<output>{checked ? "on" : "off"}</output>
