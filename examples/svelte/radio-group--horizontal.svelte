<script lang="ts">
  import RadioGroup from "../../components/radio-group/RadioGroup.svelte";

  const themes = [
    {
      value: "light",
      label: "Light",
    },
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "system",
      label: "System",
    },
  ];
  const sizes = [
    {
      value: "s",
      label: "Small",
    },
    {
      value: "m",
      label: "Medium",
    },
    {
      value: "l",
      label: "Large",
    },
    {
      value: "xl",
      label: "Extra large",
    },
  ];
</script>

<div class="grid gap-6">
  <RadioGroup
    name="theme"
    label="Theme"
    value="system"
    orientation="horizontal"
    options={themes}
  />
  <RadioGroup
    name="size"
    label="Size"
    value="m"
    orientation="horizontal"
    options={sizes}
  />
</div>
