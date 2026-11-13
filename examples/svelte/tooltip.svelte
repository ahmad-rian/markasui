<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Tooltip from "../../components/tooltip/Tooltip.svelte";
</script>

<div class="flex justify-center py-10">
  <Tooltip content="Copy link to clipboard">
    <Button variant="secondary">Copy link</Button>
  </Tooltip>
</div>
