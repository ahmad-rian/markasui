<script lang="ts">
  import VerticalCutReveal from "../../components/vertical-cut-reveal/VerticalCutReveal.svelte";
</script>

<div class="rounded-xl border border-line bg-surface p-6">
  <h3 class="text-xl font-semibold text-ink">
    <VerticalCutReveal text="Team plan" />
  </h3>
  <p class="mt-2 text-4xl font-semibold tracking-tight text-ink">
    <VerticalCutReveal
      text="Rp 149.000"
      split="chars"
      from="random"
      stagger={30}
      delay={200}
    />
  </p>
  <p class="mt-1 text-sm text-muted">
    <VerticalCutReveal
      text="per member each month, billed yearly"
      stagger={30}
      delay={500}
    />
  </p>
</div>
