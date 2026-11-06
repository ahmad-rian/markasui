<script setup lang="ts">
import ChatMessage from "../../components/chat-message/ChatMessage.vue";

const log = "grid gap-4";
</script>

<template>
  <div role="log" aria-label="Conversation" :class="log">
    <ChatMessage
      from="user"
      text="When is VAT due for my October invoices?"
      time="09:12"
    />
    <ChatMessage
      stream
      text="VAT for October is due by the end of November. Report it in your monthly return and pay before you file, so the payment code is already on record."
      time="09:12"
      assistant-label="Markas AI"
    />
  </div>
</template>
