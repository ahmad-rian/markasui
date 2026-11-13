<script lang="ts">
  import Screensaver from "../../components/screensaver/Screensaver.svelte";
  import Button from "../../components/button/Button.svelte";

  const card = "rounded-xl border border-line bg-surface p-5 text-center";
  const area = "h-44 rounded-lg bg-subtle";
  const logo = "flex items-center gap-2 text-3xl font-bold tabular-nums";
  const icon = "size-8";
  const title = "mt-5 text-base font-semibold text-ink";
  const text = "mt-1 text-sm text-muted";
  const action = "mt-4";
</script>

<div class={card}>
  <Screensaver class={area} aria-hidden="true">
    <span class={logo}
      ><svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class={icon}
      >
        <path d="M4 6h16v12H4z"></path>
        <path d="m4 6 8 6 8-6"></path></svg
      >404</span
    >
  </Screensaver>
  <p class={title}>Page not found</p>
  <p class={text}>The link may be old, or the page moved somewhere else.</p>
  <Button class={action}>Back to home</Button>
</div>
