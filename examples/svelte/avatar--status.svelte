<script lang="ts">
  import Avatar from "../../components/avatar/Avatar.svelte";

  const wrap = "relative inline-flex";
  const dot =
    "absolute right-0 bottom-0 size-3 rounded-full ring-2 ring-canvas";
</script>

<div class="flex items-center gap-6">
  <span class={wrap}>
    <Avatar name="Budi Santoso" size="lg" />
    <span class="{dot} bg-success"><span class="sr-only">Online</span></span>
  </span>
  <span class={wrap}>
    <Avatar name="Siti Aminah" size="lg" />
    <span class="{dot} bg-warning"><span class="sr-only">Away</span></span>
  </span>
  <span class={wrap}>
    <Avatar name="John Carter" size="lg" />
    <span class="{dot} bg-faint"><span class="sr-only">Offline</span></span>
  </span>
</div>
