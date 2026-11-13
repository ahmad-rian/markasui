<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Card from "../../components/card/Card.svelte";
</script>

<Card
  title="Delete project"
  description="This removes the project, its files, and all deployments. This cannot be undone."
>
  <p class="text-muted">
    Project: <span class="font-medium text-ink">marketing-site</span>
  </p>

  {#snippet footer()}
    <Button variant="secondary" size="sm" class="ml-auto">Cancel</Button>
    <Button variant="danger" size="sm">Delete project</Button>
  {/snippet}
</Card>
