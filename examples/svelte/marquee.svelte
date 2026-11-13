<script lang="ts">
  import Marquee from "../../components/marquee/Marquee.svelte";

  const stack = [
    "Laravel",
    "React",
    "Vue",
    "Alpine.js",
    "Tailwind CSS",
    "Vite",
  ];
</script>

<Marquee>
  {#each stack as name (name)}
    <span
      class="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink"
      >{name}</span
    >
  {/each}
</Marquee>
