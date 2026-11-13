<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Input from "../../components/input/Input.svelte";
  import Tabs from "../../components/tabs/Tabs.svelte";

  const items = [
    { value: "profile", label: "Profile", content: profile },
    { value: "password", label: "Password", content: password },
  ];
</script>

{#snippet profile()}
  <div class="grid gap-4">
    <Input name="name" label="Name" value="Siti Aminah" />
    <Input name="email" type="email" label="Email" value="siti@example.com" />
    <div>
      <Button>Save changes</Button>
    </div>
  </div>
{/snippet}

{#snippet password()}
  <div class="grid gap-4">
    <Input name="current-password" type="password" label="Current password" />
    <Input
      name="new-password"
      type="password"
      label="New password"
      hint="At least 8 characters"
    />
    <div>
      <Button>Update password</Button>
    </div>
  </div>
{/snippet}

<Tabs {items} defaultValue="profile" />
