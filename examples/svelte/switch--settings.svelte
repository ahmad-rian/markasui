<script lang="ts">
  import Switch from "../../components/switch/Switch.svelte";

  const row = "flex items-start justify-between gap-4 p-4";
  const text = "grid gap-0.5";
  const title = "text-sm font-medium text-ink";
  const description = "text-sm text-muted";
</script>

<div class="divide-y divide-line rounded-lg border border-line bg-surface">
  <div class={row}>
    <div class={text}>
      <p class={title}>Push notifications</p>
      <p class={description}>Alerts on your phone for new messages.</p>
    </div>
    <Switch name="push" aria-label="Push notifications" checked />
  </div>
  <div class={row}>
    <div class={text}>
      <p class={title}>Weekly digest</p>
      <p class={description}>A summary of activity every Monday.</p>
    </div>
    <Switch name="digest" aria-label="Weekly digest" checked />
  </div>
  <div class={row}>
    <div class={text}>
      <p class={title}>Product news</p>
      <p class={description}>Occasional emails about new features.</p>
    </div>
    <Switch name="news" aria-label="Product news" />
  </div>
</div>
