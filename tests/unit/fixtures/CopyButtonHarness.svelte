<script lang="ts">
  import CopyButton from "../../../components/copy-button/CopyButton.svelte";

  let { onclick }: { onclick?: (event: MouseEvent) => void } = $props();
</script>

<CopyButton text="INV-2048" copiedLabel="Tersalin" class="ml-1" {onclick}>
  Copy ID
</CopyButton>
