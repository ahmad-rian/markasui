<script lang="ts">
  import AlertDialog from "../../../components/alert-dialog/AlertDialog.svelte";
  import Button from "../../../components/button/Button.svelte";

  let { onaction, oncancel }: { onaction?: () => void; oncancel?: () => void } =
    $props();
</script>

<AlertDialog
  title="Delete account?"
  variant="danger"
  cancelLabel="Batal"
  actionLabel="Hapus"
  class="max-w-sm"
  {onaction}
  {oncancel}
>
  {#snippet trigger()}
    <Button variant="danger">Delete account</Button>
  {/snippet}
  This cannot be undone.
</AlertDialog>
