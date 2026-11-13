<script lang="ts">
  import PromptInput, {
    type PromptInputValue,
  } from "../../../components/prompt-input/PromptInput.svelte";

  let { onSend }: { onSend?: (value: PromptInputValue) => void } = $props();
  let text = $state("Hello");
  let loading = $state(false);
</script>

<PromptInput
  bind:value={text}
  {loading}
  maxLength={20}
  sendLabel="Kirim"
  class="mt-2"
  onSend={(value) => {
    loading = true;
    onSend?.(value);
  }}
  onStop={() => (loading = false)}
/>
<output>{text}</output>
