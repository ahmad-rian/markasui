<script lang="ts">
  import Toggle from "../../components/toggle/Toggle.svelte";
</script>

<div class="grid gap-4">
  <div class="flex items-center justify-center gap-2">
    <Toggle>Wrap lines</Toggle>
    <Toggle pressed>Show grid</Toggle>
  </div>
  <div class="flex items-center justify-center gap-2">
    <Toggle variant="outline">Subscribe</Toggle>
    <Toggle variant="outline" pressed>Following</Toggle>
  </div>
</div>
