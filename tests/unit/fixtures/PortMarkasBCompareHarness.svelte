<script lang="ts">
  import ImageCompare from "../../../components/image-compare/ImageCompare.svelte";

  let {
    orientation = "horizontal",
  }: { orientation?: "horizontal" | "vertical" } = $props();
  let position = $state(40);
</script>

<ImageCompare
  bind:position
  {orientation}
  sliderLabel="Posisi"
  aria-label="Kitchen"
  class="mt-2"
>
  {#snippet before()}<span>Old</span>{/snippet}
  {#snippet after()}<span>New</span>{/snippet}
</ImageCompare>
<output>{position}</output>
