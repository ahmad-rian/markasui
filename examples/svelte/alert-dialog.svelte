<script lang="ts">
  import AlertDialog from "../../components/alert-dialog/AlertDialog.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<AlertDialog title="Publish this post?">
  {#snippet trigger()}
    <Button>Publish post</Button>
  {/snippet}
  Your post will be visible to everyone who follows your blog.
</AlertDialog>
