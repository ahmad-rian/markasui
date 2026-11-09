<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Modal from "../../components/modal/Modal.svelte";
</script>

<Modal title="Delete project?">
  {#snippet trigger()}
    <Button variant="danger">Delete project</Button>
  {/snippet}

  The project and all of its data will be deleted permanently.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button variant="danger" type="submit" value="delete">Delete</Button>
  {/snippet}
</Modal>
