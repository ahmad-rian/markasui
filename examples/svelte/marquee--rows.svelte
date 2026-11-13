<script lang="ts">
  import Marquee from "../../components/marquee/Marquee.svelte";

  const first = ["Accordion", "Avatar", "Badge", "Button", "Card", "Carousel"];
  const second = ["Modal", "Popover", "Select", "Slider", "Tabs", "Tooltip"];
  const chip =
    "rounded-lg bg-subtle px-3 py-1.5 text-sm whitespace-nowrap text-ink";
</script>

<div class="flex flex-col gap-3">
  <Marquee duration={25}>
    {#each first as name (name)}
      <span class={chip}>{name}</span>
    {/each}
  </Marquee>
  <Marquee duration={25} reverse>
    {#each second as name (name)}
      <span class={chip}>{name}</span>
    {/each}
  </Marquee>
</div>
