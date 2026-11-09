<script lang="ts">
  import Button from "../../../components/button/Button.svelte";
  import Modal from "../../../components/modal/Modal.svelte";

  let { onclose }: { onclose?: () => void } = $props();
</script>

<Modal title="Delete project?" closeLabel="Tutup" class="max-w-sm" {onclose}>
  {#snippet trigger()}
    <Button variant="danger">Delete project</Button>
  {/snippet}
  Body text
  {#snippet footer()}
    <Button type="submit" value="cancel">Cancel</Button>
  {/snippet}
</Modal>
