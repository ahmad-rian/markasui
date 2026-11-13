<script lang="ts">
  import Popover from "../../../components/popover/Popover.svelte";
</script>

<Popover id="share" class="ml-2" align="end" data-testid="root">
  {#snippet trigger()}
    <span class="sr-only">Notification settings</span>
  {/snippet}
  <button type="button">Copy link</button>
</Popover>
