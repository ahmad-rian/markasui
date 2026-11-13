<script lang="ts">
  import Accordion from "../../components/accordion/Accordion.svelte";

  const items = [
    {
      value: "account",
      title: "Account",
      content: "Update your name, email, and profile photo.",
    },
    {
      value: "billing",
      title: "Billing",
      content: "Manage your plan, payment method, and invoices.",
    },
    {
      value: "security",
      title: "Security",
      content: "Turn on two-step verification and review active sessions.",
    },
  ];
</script>

<Accordion {items} type="multiple" defaultValue={["account", "billing"]} />
