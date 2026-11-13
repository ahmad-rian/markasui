<script lang="ts">
  import Collapsible from "../../components/collapsible/Collapsible.svelte";
</script>

<div class="grid gap-2">
  <p class="text-sm font-medium text-ink">Team members</p>
  <ul class="grid gap-1 text-sm text-muted">
    <li>Rina Kusuma</li>
    <li>Budi Santoso</li>
    <li>Dewi Lestari</li>
  </ul>
  <Collapsible title="Show 3 more">
    <ul class="grid gap-1">
      <li>Agus Pratama</li>
      <li>Sari Wulandari</li>
      <li>Yusuf Hidayat</li>
    </ul>
  </Collapsible>
</div>
