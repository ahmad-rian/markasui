<script lang="ts">
  import Tabs from "../../components/tabs/Tabs.svelte";

  const items = [
    {
      value: "account",
      label: "Account",
      content: "Change your account name and email.",
    },
    {
      value: "password",
      label: "Password",
      content: "Change your password regularly.",
    },
    {
      value: "notifications",
      label: "Notifications",
      content: "Choose which emails you want to receive.",
    },
  ];
</script>

<Tabs {items} defaultValue="account" />
