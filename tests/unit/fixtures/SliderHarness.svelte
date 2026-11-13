<script lang="ts">
  import Slider from "../../../components/slider/Slider.svelte";

  let value = $state(30);
</script>

<Slider
  bind:value
  name="volume"
  label="Volume"
  min={0}
  max={200}
  class="mt-1"
/>
<output>{value}</output>
