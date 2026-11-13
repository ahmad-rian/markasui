<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Tooltip from "../../components/tooltip/Tooltip.svelte";
</script>

<div class="flex flex-wrap items-center justify-center gap-3 py-10">
  <Tooltip content="Shown above the button">
    <Button variant="secondary">Top</Button>
  </Tooltip>
  <Tooltip content="Shown below the button" side="bottom">
    <Button variant="secondary">Bottom</Button>
  </Tooltip>
</div>
