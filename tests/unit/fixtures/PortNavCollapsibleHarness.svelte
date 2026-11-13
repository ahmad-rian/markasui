<script lang="ts">
  import Collapsible from "../../../components/collapsible/Collapsible.svelte";

  let open = $state(false);
</script>

<Collapsible bind:open class="border-t" id="details">
  {#snippet title()}Show <strong>3</strong> more{/snippet}
  Hidden body
</Collapsible>
<output>{open ? "open" : "closed"}</output>
