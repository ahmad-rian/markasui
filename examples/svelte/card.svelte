<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Card from "../../components/card/Card.svelte";
</script>

<Card title="Pro plan" description="For small teams that are growing.">
  Includes 10 team members, 50 GB of storage, and monthly reports.

  {#snippet footer()}
    <Button size="sm">Choose plan</Button>
    <Button variant="ghost" size="sm">Compare</Button>
  {/snippet}
</Card>
