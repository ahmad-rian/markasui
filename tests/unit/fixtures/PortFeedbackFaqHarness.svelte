<script lang="ts">
  import Faq from "../../../components/faq/Faq.svelte";

  const items = [
    { question: "Trial?", answer: "Yes, 14 days.", category: "Billing" },
    { question: "Invite?", answer: "From settings.", category: "Account" },
  ];
</script>

<Faq title="Help" variant="split" {items} id="help" schema>
  {#snippet contact()}Ask <a href="/contact">support</a>{/snippet}
</Faq>
