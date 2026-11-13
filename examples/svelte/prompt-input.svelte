<script lang="ts">
  import PromptInput from "../../components/prompt-input/PromptInput.svelte";

  const panel = "grid gap-4";
  const title = "text-center text-lg font-semibold text-ink";
</script>

<div class={panel}>
  <p class={title}>What should we build today?</p>
  <PromptInput
    models={["Markas Pro", "Markas Mini"]}
    model="Markas Pro"
    maxLength={500}
    accept="image/*,.pdf"
  />
</div>
