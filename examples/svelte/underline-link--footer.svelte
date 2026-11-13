<script lang="ts">
  import UnderlineLink from "../../components/underline-link/UnderlineLink.svelte";

  const groups = [
    { title: "Product", links: ["Components", "Templates", "Changelog"] },
    { title: "Community", links: ["GitHub", "Discord", "Showcase"] },
  ];
</script>

<footer
  class="grid grid-cols-2 gap-6 rounded-xl border border-line bg-surface p-6 text-sm"
>
  {#each groups as group (group.title)}
    <div>
      <p class="font-medium text-ink">{group.title}</p>
      <ul class="mt-3 grid gap-2 text-muted">
        {#each group.links as link (link)}
          <li>
            <UnderlineLink href="#" variant="slide">{link}</UnderlineLink>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</footer>
