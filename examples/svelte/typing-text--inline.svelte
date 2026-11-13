<script lang="ts">
  import TypingText from "../../components/typing-text/TypingText.svelte";
</script>

<p class="text-base text-muted">
  Your order is <TypingText
    words={["packed", "on its way", "out for delivery"]}
    cursor={false}
    class="font-medium text-ink"
  />
</p>
