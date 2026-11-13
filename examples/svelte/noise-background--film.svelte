<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import NoiseBackground from "../../components/noise-background/NoiseBackground.svelte";
</script>

<NoiseBackground
  variant="film"
  color="danger"
  intensity="high"
  class="dark rounded-xl bg-canvas px-6 py-14 text-ink"
>
  <div class="grid justify-items-center gap-3 text-center">
    <p class="text-sm font-medium text-danger">Premieres Friday</p>
    <h3 class="text-3xl font-semibold tracking-tight text-ink">
      The Last Release
    </h3>
    <p class="max-w-72 text-sm text-muted">
      A documentary about the team that shipped on time, every time.
    </p>
    <Button>Watch the trailer</Button>
  </div>
</NoiseBackground>
