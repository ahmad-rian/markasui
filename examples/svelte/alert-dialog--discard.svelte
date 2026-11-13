<script lang="ts">
  import AlertDialog from "../../components/alert-dialog/AlertDialog.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<div
  class="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4"
>
  <div class="grid gap-1">
    <p class="text-sm font-medium text-ink">Draft: Q3 product update</p>
    <p class="text-sm text-muted">3 unsaved changes</p>
  </div>
  <AlertDialog
    title="Discard unsaved changes?"
    variant="danger"
    cancelLabel="Keep editing"
    actionLabel="Discard"
  >
    {#snippet trigger()}
      <Button variant="secondary">Close editor</Button>
    {/snippet}
    Your edits since the last save will be lost.
  </AlertDialog>
</div>
