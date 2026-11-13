<script lang="ts">
  import Slider from "../../components/slider/Slider.svelte";
</script>

<div class="grid gap-6">
  <Slider name="contrast" label="Contrast" value={40} />
  <Slider name="opacity" label="Opacity" value={80} showValue={false} />
  <Slider name="quality" label="Export quality" value={70} disabled />
</div>
