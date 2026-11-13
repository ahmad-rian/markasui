<script lang="ts">
  import Faq from "../../components/faq/Faq.svelte";

  const items = [
    {
      question: "Is there a free trial?",
      answer: "Yes. Every plan starts with a 14 day trial, no card required.",
    },
    {
      question: "Can I cancel at any time?",
      answer:
        "Yes. Your plan stays active until the end of the billing period.",
    },
    {
      question: "Can I invite my team?",
      answer:
        "Invite as many members as your plan allows from the team settings.",
    },
    {
      question: "Where is my data stored?",
      answer: "Data is stored in Jakarta and backed up every day.",
    },
  ];
</script>

<Faq
  variant="split"
  title="Questions and answers"
  description="Cannot find what you need? Our team replies within a day."
  {items}
>
  {#snippet contact()}
    Still have questions?
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a href="#">Contact support</a>
  {/snippet}
</Faq>
