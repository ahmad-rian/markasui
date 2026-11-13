<script lang="ts">
  import ImageTrail from "../../components/image-trail/ImageTrail.svelte";

  const area =
    "grid h-72 content-center justify-items-center rounded-xl border border-line bg-surface p-6 text-center";
  const people = [
    {
      initials: "RP",
      avatar:
        "grid size-14 place-items-center rounded-full bg-primary text-base font-semibold text-on-primary",
    },
    {
      initials: "DS",
      avatar:
        "grid size-14 place-items-center rounded-full bg-primary-soft text-base font-semibold text-primary",
    },
    {
      initials: "SW",
      avatar:
        "grid size-14 place-items-center rounded-full border border-line bg-subtle text-base font-semibold text-ink",
    },
    {
      initials: "BA",
      avatar:
        "grid size-14 place-items-center rounded-full bg-ink text-base font-semibold text-canvas",
    },
  ];
  const title = "text-xl font-semibold text-ink";
  const names = "mt-2 text-sm text-muted";
</script>

<ImageTrail variant="stack" threshold={56} max={6} class={area}>
  {#snippet items()}
    {#each people as person (person.initials)}<span class={person.avatar}
        >{person.initials}</span
      >{/each}
  {/snippet}
  <h3 class={title}>Meet the people behind Markas</h3>
  <p class={names}>Rania, Dimas, Sekar, and Bayu</p>
</ImageTrail>
