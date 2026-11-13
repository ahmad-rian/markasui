<script lang="ts">
  import Toggle from "../../../components/toggle/Toggle.svelte";

  let pressed = $state(false);
</script>

<Toggle bind:pressed aria-label="Bold" class="ml-1">B</Toggle>
<output>{pressed ? "on" : "off"}</output>
