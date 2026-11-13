<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Drawer from "../../components/drawer/Drawer.svelte";
  import Input from "../../components/input/Input.svelte";
</script>

<div class="flex justify-center">
  <Drawer title="Edit profile">
    {#snippet trigger()}
      <Button>Edit profile</Button>
    {/snippet}

    <div class="grid gap-4">
      <Input
        name="profile-name"
        label="Display name"
        placeholder="Budi Santoso"
      />
      <Input
        name="profile-role"
        label="Job title"
        placeholder="Product designer"
      />
      <Input
        name="profile-website"
        type="url"
        label="Website"
        placeholder="https://example.com"
      />
    </div>

    {#snippet footer()}
      <Button variant="secondary" type="submit" value="cancel">Cancel</Button>
      <Button type="submit" value="save">Save changes</Button>
    {/snippet}
  </Drawer>
</div>
