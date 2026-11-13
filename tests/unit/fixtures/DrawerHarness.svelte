<script lang="ts">
  import Button from "../../../components/button/Button.svelte";
  import Drawer from "../../../components/drawer/Drawer.svelte";

  let { side, onclose }: { side?: "left" | "right"; onclose?: () => void } =
    $props();
</script>

<Drawer title="Filter" closeLabel="Tutup" class="max-w-md" {side} {onclose}>
  {#snippet trigger()}
    <Button>Open</Button>
  {/snippet}
  <p>Drawer content</p>
  {#snippet footer()}
    <Button type="submit" value="ok">OK</Button>
  {/snippet}
</Drawer>
