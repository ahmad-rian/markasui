<script lang="ts">
  import Card from "../../../components/card/Card.svelte";
</script>

<Card title="Pro plan" description="For teams" class="max-w-sm">
  Body text
  {#snippet footer()}
    <button type="button">Choose</button>
  {/snippet}
</Card>
