<script lang="ts">
  import Marquee from "../../components/marquee/Marquee.svelte";

  const quotes = [
    {
      name: "Dewi Lestari",
      role: "Product designer",
      text: "Our Blade and React apps finally look the same.",
    },
    {
      name: "John Carter",
      role: "Frontend lead",
      text: "Copy, paste, ship. No wrapper library to fight.",
    },
    {
      name: "Siti Aminah",
      role: "Indie maker",
      text: "The dark mode tokens saved me a whole weekend.",
    },
  ];
</script>

<Marquee duration={30}>
  {#each quotes as quote (quote.name)}
    <figure class="w-60 rounded-xl border border-line bg-surface p-4">
      <blockquote class="text-sm text-ink">{quote.text}</blockquote>
      <figcaption class="mt-3 text-xs text-muted">
        <span class="font-medium text-ink">{quote.name}</span>, {quote.role}
      </figcaption>
    </figure>
  {/each}
</Marquee>
