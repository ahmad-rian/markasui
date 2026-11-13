<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import PixelTrail from "../../components/pixel-trail/PixelTrail.svelte";

  const bar =
    "flex h-16 items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4";
  const brand = "text-base font-semibold text-ink";
  const links = "flex gap-4 text-sm text-muted";
  const link =
    "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const pages = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates" },
  ];
</script>

<PixelTrail color="ink" cellSize={8} fade={400} class={bar}>
  <span class={brand}>Markas</span>
  <nav aria-label="Main">
    <ul class={links}>
      {#each pages as page (page.label)}<li>
          <a href={page.href} class={link}>{page.label}</a>
        </li>{/each}
    </ul>
  </nav>
  <Button size="sm">Sign in</Button>
</PixelTrail>
