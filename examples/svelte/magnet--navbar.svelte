<script lang="ts">
  import Magnet from "../../components/magnet/Magnet.svelte";
  import Button from "../../components/button/Button.svelte";

  const nav =
    "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3";
  const brand = "text-base font-semibold text-ink";
  const links = "flex items-center gap-1";
  const link =
    "block rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
</script>

<nav aria-label="Main" class={nav}>
  <!-- svelte-ignore a11y_invalid_attribute -->
  <a href="#" class={brand}>Warung</a>
  <div class={links}>
    <Magnet strength={0.25} radius={20}
      ><!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class={link}>Menu</a></Magnet
    >
    <Magnet strength={0.25} radius={20}
      ><!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class={link}>Outlets</a></Magnet
    >
    <Magnet strength={0.25} radius={20}
      ><!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class={link}>About</a></Magnet
    >
    <Magnet strength={0.4} radius={40}><Button size="sm">Order</Button></Magnet>
  </div>
</nav>
