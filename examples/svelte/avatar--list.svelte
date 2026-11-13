<script lang="ts">
  import Avatar from "../../components/avatar/Avatar.svelte";

  const row = "flex items-center gap-3 px-4 py-3";
  const name = "text-sm font-medium text-ink";
  const meta = "text-xs text-muted";
</script>

<ul class="divide-y divide-line rounded-xl border border-line bg-surface">
  <li class={row}>
    <Avatar name="Sarah Miller" size="sm" alt="" />
    <div class="min-w-0 flex-1">
      <p class={name}>Sarah Miller</p>
      <p class={meta}>sarah@markasui.com</p>
    </div>
    <span class={meta}>Owner</span>
  </li>
  <li class={row}>
    <Avatar name="Budi Santoso" size="sm" alt="" />
    <div class="min-w-0 flex-1">
      <p class={name}>Budi Santoso</p>
      <p class={meta}>budi@markasui.com</p>
    </div>
    <span class={meta}>Editor</span>
  </li>
  <li class={row}>
    <Avatar name="Siti Aminah" size="sm" alt="" />
    <div class="min-w-0 flex-1">
      <p class={name}>Siti Aminah</p>
      <p class={meta}>siti@markasui.com</p>
    </div>
    <span class={meta}>Viewer</span>
  </li>
</ul>
