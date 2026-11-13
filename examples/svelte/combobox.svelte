<script lang="ts">
  import Combobox from "../../components/combobox/Combobox.svelte";

  const countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
    { value: "my", label: "Malaysia" },
    { value: "ph", label: "Philippines" },
    { value: "sg", label: "Singapore" },
    { value: "th", label: "Thailand" },
    { value: "vn", label: "Vietnam" },
  ];
</script>

<Combobox
  name="country"
  label="Country"
  placeholder="Search countries"
  hint="Start typing to filter the list."
  options={countries}
/>
