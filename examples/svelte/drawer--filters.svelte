<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Checkbox from "../../components/checkbox/Checkbox.svelte";
  import Drawer from "../../components/drawer/Drawer.svelte";
</script>

<div class="flex justify-center">
  <Drawer title="Filter products">
    {#snippet trigger()}
      <Button variant="secondary">
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 5h18M6 12h12M10 19h4" />
        </svg>
        Filters
      </Button>
    {/snippet}

    <fieldset class="grid gap-3">
      <legend class="mb-3 font-medium text-ink">Category</legend>
      <Checkbox name="category-shoes" label="Shoes" />
      <Checkbox name="category-bags" label="Bags" />
      <Checkbox name="category-accessories" label="Accessories" />
    </fieldset>

    {#snippet footer()}
      <Button variant="secondary" type="submit" value="reset">Reset</Button>
      <Button type="submit" value="apply">Show results</Button>
    {/snippet}
  </Drawer>
</div>
