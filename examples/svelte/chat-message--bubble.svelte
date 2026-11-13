<script lang="ts">
  import ChatMessage from "../../components/chat-message/ChatMessage.svelte";

  const log = "grid gap-4 rounded-xl border border-line bg-surface p-4";
</script>

<div role="log" aria-label="Support chat" class={log}>
  <ChatMessage
    from="user"
    text="My invoice shows Rp 0 for shipping. Is that right?"
    time="14:02"
  />
  <ChatMessage
    variant="bubble"
    text="Yes. Orders above Rp 500.000 ship for free, so the shipping line stays at Rp 0."
    time="14:02"
    assistantLabel="Support bot"
  />
</div>
