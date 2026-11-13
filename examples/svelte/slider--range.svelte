<script lang="ts">
  import Slider from "../../components/slider/Slider.svelte";
</script>

<div class="grid gap-2">
  <Slider name="budget" label="Budget" max={500} step={25} value={250} />
  <div class="flex justify-between text-xs text-muted">
    <span>0</span>
    <span>500</span>
  </div>
</div>
