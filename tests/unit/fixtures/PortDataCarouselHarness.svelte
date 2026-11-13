<script lang="ts">
  import Carousel from "../../../components/carousel/Carousel.svelte";

  let { showDots = true }: { showDots?: boolean } = $props();
  const slides = ["Plan", "Share", "Track"];
</script>

<Carousel
  label="Tour"
  {showDots}
  items={slides}
  nextLabel="Berikutnya"
  slideLabel={"Slide {index} dari {total}"}
  class="max-w-sm"
>
  {#snippet slide(title, index)}
    <p>{index + 1}. {title}</p>
  {/snippet}
</Carousel>
