<script lang="ts">
  import Carousel from "../../components/carousel/Carousel.svelte";

  const card = "flex h-40 flex-col justify-end rounded-xl bg-subtle p-5";
  const title = "text-sm font-medium text-ink";
  const text = "mt-1 text-sm text-muted";

  const slides = [
    {
      title: "Plan your week",
      text: "Drag tasks onto the calendar to block focus time.",
    },
    {
      title: "Share with your team",
      text: "Invite teammates and assign tasks in one click.",
    },
    {
      title: "Track progress",
      text: "See what shipped this week on a single dashboard.",
    },
  ];
</script>

<Carousel label="Product tour" showDots items={slides}>
  {#snippet slide(item)}
    <div class={card}>
      <p class={title}>{item.title}</p>
      <p class={text}>{item.text}</p>
    </div>
  {/snippet}
</Carousel>
