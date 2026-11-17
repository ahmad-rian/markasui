<script lang="ts">
  import TextScramble from "../../components/text-scramble/TextScramble.svelte";

  const mark = [
    { points: "354,578 1256,138 1171,430 268,868", class: "fill-ink/15" },
    { points: "553,443 1455,3 1370,295 467,733", class: "fill-ink/55" },
    { points: "421,762 1325,318 1240,611 336,1050", class: "fill-success/35" },
    { points: "265,1073 1169,629 1084,922 180,1362", class: "fill-ink/25" },
    { points: "93,965 997,521 912,814 8,1253", class: "fill-ink/75" },
    { points: "347,1135 1251,691 1166,984 262,1424", class: "fill-success" },
  ];
  const links = ["Docs", "Templates", "Blog"];
</script>

<nav
  aria-label="Main"
  class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3 font-mono text-sm text-ink"
>
  <span class="flex items-center gap-2 font-sans font-semibold">
    <svg class="size-6 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true">
      {#each mark as shape (shape.points)}
        <polygon points={shape.points} class={shape.class} />
      {/each}
    </svg>
    MarkasUI
  </span>
  <div class="flex gap-4 sm:gap-5">
    {#each links as link (link)}
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <TextScramble text={link} charset="symbols" duration={500} />
      </a>
    {/each}
  </div>
</nav>
