<script lang="ts">
  import Kbd from "../../components/kbd/Kbd.svelte";

  const row = "flex items-center justify-between gap-4 px-4 py-3";
</script>

<dl
  class="divide-y divide-line rounded-xl border border-line bg-surface text-sm text-ink"
>
  <div class={row}>
    <dt>Search</dt>
    <dd><Kbd keys={["Ctrl", "K"]} /></dd>
  </div>
  <div class={row}>
    <dt>New document</dt>
    <dd><Kbd keys={["Ctrl", "Alt", "N"]} /></dd>
  </div>
  <div class={row}>
    <dt>Go to next page</dt>
    <dd><Kbd keys={["G", "N"]} separator="then" /></dd>
  </div>
  <div class={row}>
    <dt>Show shortcuts</dt>
    <dd><Kbd>?</Kbd></dd>
  </div>
</dl>
