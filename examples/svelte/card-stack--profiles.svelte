<script lang="ts">
  import CardStack from "../../components/card-stack/CardStack.svelte";

  const cardClass = "grid h-full justify-items-center gap-3 p-6 text-center";
  const avatar =
    "inline-flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-on-primary";
  const name = "text-base font-semibold text-ink";
  const role = "text-sm text-muted";
  const tags = "flex flex-wrap justify-center gap-1.5";
  const tag = "rounded-full bg-subtle px-2.5 py-0.5 text-xs text-ink";

  const people = [
    {
      name: "Rina Kusuma",
      initials: "RK",
      role: "Product designer in Jakarta",
      skills: ["Figma", "Design systems", "Research"],
    },
    {
      name: "Liam Carter",
      initials: "LC",
      role: "Frontend engineer in Toronto",
      skills: ["React", "Accessibility", "Testing"],
    },
    {
      name: "Ayu Lestari",
      initials: "AL",
      role: "Data analyst in Bandung",
      skills: ["SQL", "Python", "Dashboards"],
    },
  ];
</script>

<CardStack
  label="Suggested teammates"
  prevLabel="Previous person"
  nextLabel="Next person"
  class="mx-auto max-w-xs"
  items={people}
>
  {#snippet card(person)}
    <div class={cardClass}>
      <span aria-hidden="true" class={avatar}>{person.initials}</span>
      <div>
        <p class={name}>{person.name}</p>
        <p class={role}>{person.role}</p>
      </div>
      <ul class={tags}>
        {#each person.skills as skill (skill)}
          <li class={tag}>{skill}</li>
        {/each}
      </ul>
    </div>
  {/snippet}
</CardStack>
