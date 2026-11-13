<script lang="ts">
  import Slider from "../../components/slider/Slider.svelte";
</script>

<div class="grid gap-6">
  <Slider name="volume" label="Volume" value={60} />
  <Slider name="brightness" label="Brightness" step={10} value={30} />
</div>
