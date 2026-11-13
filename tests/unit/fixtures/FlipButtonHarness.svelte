<script lang="ts">
  import FlipButton from "../../../components/flip-button/FlipButton.svelte";
</script>

<FlipButton size="lg">
  Download
  {#snippet back()}<em>PDF</em>{/snippet}
</FlipButton>
<FlipButton variant="secondary">Same on both</FlipButton>
