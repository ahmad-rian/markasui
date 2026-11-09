<script lang="ts">
  import Switch from "../../components/switch/Switch.svelte";
</script>

<div class="grid gap-4">
  <Switch name="notifications" label="Email notifications" checked />
  <Switch name="saver" label="Data saver mode" />
  <Switch name="beta" label="Beta features" disabled />
</div>
