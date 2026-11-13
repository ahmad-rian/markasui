<script lang="ts">
  import AlertDialog from "../../components/alert-dialog/AlertDialog.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<div class="flex justify-center">
  <AlertDialog
    title="Delete your account?"
    variant="danger"
    actionLabel="Delete account"
  >
    {#snippet trigger()}
      <Button variant="danger">Delete account</Button>
    {/snippet}
    All of your projects, invoices, and team members will be removed. You cannot undo
    this action.
  </AlertDialog>
</div>
