<script lang="ts">
  import HoverCard from "../../../components/hover-card/HoverCard.svelte";
</script>

<HoverCard class="ml-2" data-testid="root">
  <a href="https://github.com/markasui" aria-describedby="note">@markasui</a>
  {#snippet content()}
    <span>MarkasUI preview</span>
  {/snippet}
</HoverCard>
<p id="note">Note</p>
