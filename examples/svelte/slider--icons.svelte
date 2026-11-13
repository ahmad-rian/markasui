<script lang="ts">
  import Slider from "../../components/slider/Slider.svelte";
</script>

<div class="flex items-center gap-3 text-muted">
  <svg
    class="size-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M11 5 6 9H3v6h3l5 4z" />
  </svg>
  <div class="flex-1">
    <Slider name="volume" aria-label="Volume" value={45} showValue={false} />
  </div>
  <svg
    class="size-5 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path
      d="M11 5 6 9H3v6h3l5 4zm4.5 3.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"
    />
  </svg>
</div>
