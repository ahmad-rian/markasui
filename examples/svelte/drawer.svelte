<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Drawer from "../../components/drawer/Drawer.svelte";
</script>

<Drawer title="Filter products">
  {#snippet trigger()}
    <Button variant="secondary">Open filters</Button>
  {/snippet}

  Choose a category and price range to filter the product list.

  {#snippet footer()}
    <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
    <Button type="submit" value="apply">Apply</Button>
  {/snippet}
</Drawer>
