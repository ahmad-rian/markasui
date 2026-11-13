<script lang="ts">
  import ToggleGroup from "../../components/toggle-group/ToggleGroup.svelte";
</script>

<div class="flex justify-center">
  <ToggleGroup
    label="Calendar view"
    value="week"
    items={[
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
    ]}
  />
</div>
