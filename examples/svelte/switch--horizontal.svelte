<script lang="ts">
  import Switch from "../../components/switch/Switch.svelte";
</script>

<div class="flex flex-wrap gap-x-6 gap-y-3">
  <Switch name="autoplay" label="Autoplay" checked />
  <Switch name="captions" label="Captions" />
  <Switch name="loop" label="Loop" />
</div>
