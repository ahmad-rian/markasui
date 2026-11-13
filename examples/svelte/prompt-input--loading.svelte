<script lang="ts">
  import PromptInput from "../../components/prompt-input/PromptInput.svelte";

  let loading = $state(true);
  let text = $state("Summarize the March invoices by client");
</script>

<PromptInput
  bind:value={text}
  {loading}
  onStop={() => (loading = false)}
  onSend={() => (loading = true)}
/>
