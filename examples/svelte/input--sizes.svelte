<script lang="ts">
  import Input from "../../components/input/Input.svelte";
</script>

<div class="grid gap-4">
  <Input
    name="small"
    label="Small"
    placeholder="Search docs"
    class="h-8! text-xs!"
  />
  <Input name="medium" label="Medium" placeholder="Search docs" />
  <Input
    name="large"
    label="Large"
    placeholder="Search docs"
    class="h-12! px-4! text-base!"
  />
</div>
