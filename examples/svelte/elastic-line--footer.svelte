<script lang="ts">
  import ElasticLine from "../../components/elastic-line/ElasticLine.svelte";

  const footer = "grid gap-1";
  const row = "flex items-center justify-between gap-4 text-sm text-muted";
  const links = "flex gap-4";
  const link =
    "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const pages = [
    { label: "Docs", href: "/docs" },
    { label: "Templates", href: "/templates" },
    { label: "GitHub", href: "https://github.com/markasui/markasui" },
  ];
</script>

<footer class={footer}>
  <ElasticLine color="muted" strokeWidth={1} reach={20} />
  <div class={row}>
    <p>2026 MarkasUI, Bandung</p>
    <nav aria-label="Footer">
      <ul class={links}>
        {#each pages as page (page.label)}
          <li>
            <a href={page.href} class={link}>{page.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</footer>
